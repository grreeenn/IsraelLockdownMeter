import {ButtonProps} from "react-native";
import {View} from "./Themed";
import React from "react";
import { Button as DefaultButton } from 'react-native';

export default function Button(props: ButtonProps & { marginVertical?: number, marginHorizontal?: number }) {
  const {marginVertical, marginHorizontal} = props;

  return (
    <View style={{marginVertical, marginHorizontal}}>
      <DefaultButton {...props} />
    </View>
  )
}
