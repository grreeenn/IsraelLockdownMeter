import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Text, View} from '../components/Themed';
import {ICoordinates} from "../types/IGeography";
import {useNavigation} from '@react-navigation/native'
import {getDistanceFromLatLon} from "../utils/LocationUtils";
import {GlobalContext} from "../GlobalContext";
import Button from "../components/Button";
import {LocationObject} from "expo-location/src/Location.types";
import {getCurrentPositionAsync, requestPermissionsAsync} from "expo-location";

export default function TabOneScreen() {

  const context = useContext(GlobalContext);

  const [location, setLocation] = useState<ICoordinates | null>(null);
  const [isUpdatingLocation, setIsUpdatingLocation] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [distanceStyle, setDistanceStyleState] = useState<ViewStyle | TextStyle | ImageStyle | null>(null);

  const retries = useRef(0);
  const locationAccuracy = useRef<number | null>(null);

  const navigation = useNavigation()

  useEffect(() => {
    console.log('---------STATE 1!!----------')
    setInitState();
  }, []);

  useEffect(() => {
    if (retries.current > 0) {
      console.log('---------CONTEXT UPDATED!!----------', retries.current)
      refreshLocation();
    }

  }, [context.userSettings]);

  const setInitState = async () => {
    const {status} = await requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    }
    const isAddressSet = checkUserSettings();
    if (isAddressSet && retries.current < 1) {
      setStatus('Getting precise location...');
      setIsUpdatingLocation(true);
      await identifyLocation();
    }
  };

  const checkUserSettings = (): boolean => {
    if (!context?.userSettings?.address) {
      navigation.navigate('Settings');
      setErrorMsg('To use this app, please add your address in the settings tab');
      return false;
    }
    return true;
  }

  const identifyLocation = async () => {
    let location: LocationObject | null = null;
    retries.current === 0 && setStatus('');
    retries.current++;
    // console.log('iiiiiiiiiiii:', retries.current);
    try {
      location = await getCurrentPositionAsync({});
    } catch (e) {
      await identifyLocation();
    }

    if (location) {
      // console.log('++++++++++++++++++++++++++++++setting location: ', retries.current)
      const coords = {lat: location.coords.latitude, lon: location.coords.longitude}
      setLocation(coords);
      locationAccuracy.current = location.coords.accuracy ? Math.round(location.coords.accuracy) : null;
      calculateDistance(coords);
    }

    if (location?.coords.accuracy && location?.coords.accuracy > 20 && retries.current < 10) {
      await identifyLocation();
    } else if (location?.coords.accuracy && location?.coords.accuracy > 20 && retries.current >= 10) {
      setStatus(
        'Looks like you are in a building. GPS works poorly in buildings, please get a sky view'
      );
      setIsUpdatingLocation(false);
    } else {
      setStatus('');
      setIsUpdatingLocation(false);
    }
  }

  const refreshLocation = useCallback(() => {
    retries.current = 0;
    locationAccuracy.current = null;
    setLocation(null);
    setIsUpdatingLocation(true);
    identifyLocation();
  }, [location, locationAccuracy, context.userSettings]);

  const calculateDistance = (location: ICoordinates) => {
    if (context.userSettings?.address && location) {
      const d = getDistanceFromLatLon(context.userSettings.address.coordinates, location)
      setDistance(d);
      setDistanceStyle(d);
    }
  };

  const setDistanceStyle = (distance: number) => {
    if (!context.userSettings?.distance) {
      setDistanceStyleState(styles.distance);
    } else if (distance > context.userSettings.distance) {
      setDistanceStyleState({...styles.distance, ...styles.hardWarn});
    } else if (locationAccuracy.current && (distance + locationAccuracy.current) > context.userSettings.distance) {
      setDistanceStyleState({...styles.distance, ...styles.softWarn});
    }
    setDistanceStyleState({...styles.distance, ...styles.noWarn});

  };


  return (
    <View style={styles.container}>


      {status ? <Text>{status}</Text> : []}
      {errorMsg ? <Text>{errorMsg}</Text> : []}

      {distance ?
        <>
          <Text>Distance from home:</Text>
          <Text style={distanceStyle}>
            {distance} meters
          </Text>
        </>
        : []
      }

      {!isUpdatingLocation ?
        <>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
          <Button title={'Refresh location'} onPress={refreshLocation}/>
          {locationAccuracy ? <Text>Location accuracy: {locationAccuracy.current} meters</Text> : []}
        </>
        : []}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  distance: {
    fontSize: 50
  },
  noWarn: {
    color: 'green'
  },
  softWarn: {
    color: 'yellow'
  },
  hardWarn: {
    color: 'red'
  },
});
