import * as React from 'react';
import {useEffect, useState} from 'react';
import {TAutocompleteProps} from "../../types/IFormField";
import {Text, View} from "../Themed";
import {Button, StyleSheet, TextInput} from "react-native";
import * as Location from 'expo-location';
import {formFieldStyles} from "./formFieldStyles";
import {IAddress} from "../../types/IGeography";

export default function AddressSelect(props: TAutocompleteProps<IAddress>) {
  const [addressString, setAddressString] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fieldValue, setFieldValue] = useState<IAddress | null>(null);


  useEffect(() => {
    if (addressString === null && props.initValue) {
      setFieldValue(props.initValue);
      setAddressString(props.initValue.readable);
    }
  });

  const geocodeAndEmit = async () => {
    if (addressString) {
      const coords = await Location.geocodeAsync(addressString);
      if (coords.length) {
        const value = {
          readable: addressString,
          coordinates: {
            lat: coords[0].latitude,
            lon: coords[0].longitude
          }
        };
        setFieldValue(value);
        props.emit(value);
        setError( null);
      } else {

        props.emit(null);
      }
    }
  }

  return (
    <View style={{alignItems: "center", alignContent: "center"}}>
      <View style={{flexDirection: "row"}}>
        <View style={styles.inputContainer}>
          <TextInput
            value={addressString ?? ''}
            onChangeText={text => setAddressString(text)}
            onSubmitEditing={geocodeAndEmit}
            style={styles.input}
            placeholder={props.placeholder}
          />
          <Button title={'Set'} onPress={geocodeAndEmit}/>
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
