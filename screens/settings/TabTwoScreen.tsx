import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Linking, Platform, StyleSheet} from 'react-native';
import {Text, View} from '../../components/Themed';
import AddressSelect from "../../components/form-fields/AddressSelect";
import TextField from "../../components/form-fields/TextField";
import {EKeyboardType} from "../../types/IFormField";
import Button from "../../components/Button";
import {getFromLocalStorage, saveToStorage} from "../../utils/LocalStorage";
import {IAddress} from "../../types/IGeography";
import {GlobalContext} from "../../GlobalContext";
import { useTranslation } from 'react-i18next';


export default function TabTwoScreen() {
  const context = useContext(GlobalContext);

  const [isSettingAddress, setIsSettingAddress] = useState<boolean>(false);
  const [isSettingDistance, setIsSettingDistance] = useState<boolean>(false);
  const [t] = useTranslation(['settings']);


  useEffect(() => {
    // console.log('---------STATE 2!!----------')
    setInitState();
  }, [])

  const setInitState = async () => {
    !context.userSettings?.address && setIsSettingAddress(true);

    const d = context.userSettings?.distance ?? null;
    if (d === null || d === undefined) setIsSettingDistance(true);
  }

  const setAddress = async (a: IAddress | null) => {
    // console.log('---------------------------Updating address')
    const saved = await saveToStorage('address', a);
    if (saved) {
      console.log('updated address', await getFromLocalStorage('address'));
      context.updateUserSettings();
      a && setIsSettingAddress(false);
    } else {
      await setAddress(a);
    }

  }

  const setDistance = (d: string | number | null) => {
    console.log('Updating distance')
    d = d === null ? null : +d;
    saveToStorage('distance', d);
    context.updateUserSettings();
    if (d !== null) setIsSettingDistance(false);
  }

  const changeAddress = () => {
    setIsSettingAddress(true);
  }

  const changeDistance = () => {
    setIsSettingDistance(true);
  }

  const goToMap = useCallback(() => {
    const address = context.userSettings?.address;
    if (address) {
      const latlon = `${address.coordinates.lat},${address.coordinates.lon}`
      const url = Platform.select({
        ios: `maps:0,0?q=${latlon}`,
        android: `geo:0,0?q=${latlon}`,
      })

      url && Linking.openURL(url);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={{alignItems: "center"}}>
        <Text style={styles.title}>{t('Settings')}</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
      </View>

      {
        !isSettingAddress ?
          <View style={styles.valueAndControls}>
            <View style={styles.valueContainer}>
              <Text>
                {t('AddressCaption')}
              </Text>
              <Text style={styles.values}>
                {context.userSettings?.address?.readable}
              </Text>
            </View>
            <View style={styles.buttonsContainer}>
              <Button title={t('ShowOnMap')} onPress={goToMap} {...styles.controlButton} />
              <Button title={t('ChangeAddress')} onPress={changeAddress} {...styles.controlButton} />
            </View>
          </View>
          :
          <AddressSelect placeholder={t('AddressPlaceholder')} emit={setAddress} initValue={context.userSettings?.address}/>
      }

      {
        !isSettingDistance ?
          <View style={styles.valueAndControls}>
            <View style={styles.valueContainer}>
              <Text>
                {t('DistanceCaption')}
              </Text>
              <Text style={styles.values}>
                {context.userSettings?.distance}
              </Text>
            </View>
            <View style={styles.buttonsContainer}>
              <Button title={t('ChangeDistance')} onPress={changeDistance} {...styles.controlButton} />
            </View>
          </View>
          :
          <TextField
            placeholder={t('DistancePlaceholder')}
            emit={setDistance}
            initValue={context.userSettings?.distance}
            keyboardType={EKeyboardType.DecimalPad}
          />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  values: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: "left"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  valueAndControls: {
    margin: 20
  },
  valueContainer: {
    marginVertical: 10
  },
  buttonsContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
  },
  controlButton: {
    marginHorizontal: 5,
  }
});
