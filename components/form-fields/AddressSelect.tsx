import React, {useEffect, useState} from 'react';
import {TAutocompleteProps} from "../../types/IFormField";
import {Text, View, TextInput} from "../Themed";
import {Button} from "react-native";
import { geocodeAsync } from 'expo-location';
import {formFieldStyles} from "./formFieldStyles";
import {IAddress} from "../../types/IGeography";

export default function AddressSelect(props: TAutocompleteProps<IAddress>) {
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
