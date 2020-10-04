export type TBaseInputProps<T> = {
  placeholder: string;
  emit: (value: T | null) => void;
  initValue?: T | null;
}

export type TTextInputProps<T> = TBaseInputProps<T> & {
  keyboardType?: EKeyboardType
}

export type TAutocompleteProps<T> = TBaseInputProps<T> & {
  retrieveFunc?: (param: string) => T[];
}

export enum EKeyboardType {
  Default = 'default',
  NumberPad = 'number-pad',
  DecimalPad = 'decimal-pad',
  Numeric = 'numeric',
  EmailAddress = 'email-address',
  PhonePad = 'phone-pad',
}

