import {StyleSheet} from "react-native";

export const formFieldStyles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "row",
  },
  input: {
    flex: 0.9,
    height: 35,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#cdcdcd',
    borderRadius: 8,
    marginHorizontal: 10
  },
});
