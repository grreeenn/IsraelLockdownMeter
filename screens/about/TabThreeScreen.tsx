import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text} from '../../components/Themed';
import {useTranslation} from "react-i18next";


export default function TabThreeScreen() {
  const [t] = useTranslation(['about']);

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
  }
});
