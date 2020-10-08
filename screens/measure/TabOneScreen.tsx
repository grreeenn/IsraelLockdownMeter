import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Text, View} from '../../components/Themed';
import {ICoordinates} from "../../types/IGeography";
import {useNavigation} from '@react-navigation/native'
import {getDistanceFromLatLon} from "../../utils/LocationUtils";
import {GlobalContext} from "../../GlobalContext";
import Button from "../../components/Button";
import {LocationObject} from "expo-location/src/Location.types";
import {getCurrentPositionAsync, requestPermissionsAsync} from "expo-location";
import {useTranslation} from "react-i18next";

export default function TabOneScreen() {
  const [t] = useTranslation(['measure']);

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
      console.log('---------CONTEXT UPDATED!!----------', retries.current);
      setErrorMsg(null);
      refreshLocation();
    }

  }, [context.userSettings]);

  const setInitState = async () => {
    const {status} = await requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg(t('ErrLocationPermissionDenied'));
    }
    checkUserSettings();
    // if (retries.current < 1) {
      await identifyLocation();
    // }
  };

  const checkUserSettings = () => {
    if (!context?.userSettings?.address) {
      navigation.navigate('Settings');
      setErrorMsg(t('ErrNoAddress'));
    }
  }

  const identifyLocation = async () => {
    let location: LocationObject | null = null;
    if (retries.current === 0) {
      locationAccuracy.current = null;
      setLocation(null);
      setIsUpdatingLocation(true);
      setStatus(t('StatusGettingLocation'));
      setDistance(null);
    }
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
      setStatus(t('StatusNoSkyView'));
      setIsUpdatingLocation(false);
    } else {
      setStatus('');
      setIsUpdatingLocation(false);
    }
  }

  const refreshLocation = useCallback(() => {
    retries.current = 0;

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
    } else {
      setDistanceStyleState({...styles.distance, ...styles.noWarn});
    }


  };


  return (
    <View style={styles.container}>

      {distance ?
        <>
          <Text style={styles.stateText}>{t('DistanceFromHome')}</Text>
          <Text style={distanceStyle}>
            {distance} {t('Meters')}
          </Text>
          {locationAccuracy.current ?
            <Text style={styles.stateText}>{t('LocationAccuracy')}: {locationAccuracy.current} {t('Meters')}</Text>
            : []
          }
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
        </>
        : []
      }


      {status ? <Text style={styles.messageText}>{status}</Text> : []}

      {!isUpdatingLocation ?
        <>
          <Button title={t('RefreshLocation')} onPress={refreshLocation}/>
        </>
        : <ActivityIndicator size="large" />
      }

      {errorMsg ? <Text style={styles.messageText}>{errorMsg}</Text> : []}
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
  messageText: {
    fontSize: 20,
    marginBottom: 10,
    marginHorizontal: 15
  },
  stateText: {
    fontSize: 20,
    marginVertical: 5
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
