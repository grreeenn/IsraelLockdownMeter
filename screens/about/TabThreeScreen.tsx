import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, View} from '../../components/Themed';
import {useTranslation} from "react-i18next";
import Button from "../../components/Button";
import {openURL} from "expo-linking";


export default function TabThreeScreen() {
  const [t] = useTranslation(['about']);

  function goToCode() {
    openURL('https://github.com/grreeenn/IsraelLockdownMeter');
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.paragraph}>
          {t('AboutP1')}
        </Text>
        <Text style={styles.paragraph}>
          {t('AboutP2')}
        </Text>
        <Text style={styles.paragraph}>
          {t('AboutP3')}
        </Text>
        <View style={styles.row}>
          <Text style={styles.paragraph}>
            {t('AboutP4')}
          </Text>
          <Button title={t('SeeTheCode')} onPress={goToCode}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  paragraph: {
    fontSize: 18,
    marginVertical: 10,
    marginHorizontal: 5
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  }
});
