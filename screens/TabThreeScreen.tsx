import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text} from '../components/Themed';


export default function TabThreeScreen() {

  return (
    <View style={styles.container}>
      <View>
        <Text>
          This app helps you to follow the Israeli Lockdown rules.
        </Text>
        <Text>
          It measures the air distance from you to your home, allowing you to stay in the know and avoid issues with the law.
        </Text>
        <Text>
          It measures the air distance from you to your home, allowing you to stay in the know and avoid issues with the law.
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
