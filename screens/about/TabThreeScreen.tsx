import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text} from '../../components/Themed';
import {useTranslation} from "react-i18next";


export default function TabThreeScreen() {
  const [t] = useTranslation(['about']);

  return (
    <View style={styles.container}>
      <View>
        <Text>
          {t('AboutP1')}
        </Text>
        <Text>
          {t('AboutP2')}
        </Text>
        <Text>
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
});
