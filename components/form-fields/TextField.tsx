import {EKeyboardType, TTextInputProps} from "../../types/IFormField";
import * as React from "react";
import {useEffect, useState} from "react";
import {Text, View} from "../Themed";
import {Button, Keyboard, TextInput} from "react-native";
import {formFieldStyles} from "./formFieldStyles";

export default function TextField(props: TTextInputProps<string | number>) {
  const [value, setValue] = useState<string | number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (value === null && props.initValue) {
      setValue(props.initValue);
    }
  });

  const emit = () => {
    props.emit(value);
    Keyboard.dismiss();
  }

  return (
    <View style={{alignItems: "center", alignContent: "center"}}>
      <View style={{flexDirection: "row"}}>
        <View style={styles.inputContainer}>
          <TextInput
            value={(value?.toString()) ?? ''}
            keyboardType={props.keyboardType || EKeyboardType.Default}
            onChangeText={text => setValue(text)}
            onSubmitEditing={emit}
            style={styles.input}
            placeholder={props.placeholder}
          />
          <Button title={'Set'} onPress={emit}/>
        </View>
      </View>
      <View style={{flexDirection: "row"}}>
        {
          error ? <Text style={{color: 'red'}}>{error}</Text> : []
        }
      </View>
    </View>
  )
}

const styles = formFieldStyles;
