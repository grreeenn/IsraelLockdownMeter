import React, {useEffect, useState} from 'react';
import {TAutocompleteProps} from "../../types/IFormField";
import {Text, TextInput, View} from "../Themed";
import {Button} from "react-native";
import {geocodeAsync} from 'expo-location';
import {formFieldStyles} from "./formFieldStyles";
import {IAddress} from "../../types/IGeography";
import {useTranslation} from "react-i18next";

export default function AddressSelect(props: TAutocompleteProps<IAddress>) {
  const [t] = useTranslation(['formFields']);

  const [addressString, setAddressString] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    if (addressString === null && props.initValue) {
      setAddressString(props.initValue.readable);
    }
  }, []);

  const geocodeAndEmit = async () => {
    if (addressString) {
      const coords = await geocodeAsync(addressString);
      if (coords.length) {
        const value = {
          readable: addressString,
          coordinates: {
            lat: coords[0].latitude,
            lon: coords[0].longitude
          }
        };
        props.emit(value);
        setError(null);
      } else {

        props.emit(null);
      }
    }
  }

  return (
    <View style={styles.componentContainer}>
      <View style={styles.row}>
        <View style={styles.inputAndButtonContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              value={addressString ?? ''}
              onChangeText={text => setAddressString(text)}
              onSubmitEditing={geocodeAndEmit}
              onBlur={geocodeAndEmit}
              style={styles.input}
              placeholder={props.placeholder}
            />
          </View>
          <Button title={t('Set')} onPress={geocodeAndEmit}/>
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
