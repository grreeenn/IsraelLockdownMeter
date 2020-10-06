import {EKeyboardType, TTextInputProps} from "../../types/IFormField";
import React, {useEffect, useState} from "react";
import {Text, TextInput, View} from "../Themed";
import {Button, Keyboard} from "react-native";
import {formFieldStyles} from "./formFieldStyles";
import {useTranslation} from "react-i18next";

export default function TextField(props: TTextInputProps<string | number>) {
  const [t] = useTranslation(['formFields']);

  const [value, setValue] = useState<string | number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (value === null && props.initValue) {
      setValue(props.initValue);
    }
  }, []);

  const emit = () => {
    props.emit(value);
    Keyboard.dismiss();
  }

  return (
    <View style={styles.componentContainer}>
      <View style={styles.row}>
        <View style={styles.inputAndButtonContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              value={(value?.toString()) ?? ''}
              keyboardType={props.keyboardType || EKeyboardType.Default}
              onChangeText={text => setValue(text)}
              onSubmitEditing={emit}
              onBlur={emit}
              style={styles.input}
              placeholder={props.placeholder}
            />
          </View>
          <Button title={t('Set')} onPress={emit}/>
        </View>
      </View>
      <View style={styles.row}>
        {
          error ? <Text style={styles.errorText}>{error}</Text> : []
        }
      </View>
    </View>
  )
}

const styles = formFieldStyles;
