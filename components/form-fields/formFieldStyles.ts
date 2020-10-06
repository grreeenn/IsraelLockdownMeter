import {StyleSheet} from "react-native";

export const formFieldStyles = StyleSheet.create({
  componentContainer: {
    alignItems: "center",
    alignContent: "center",
    marginVertical: 10
  },
  row: {
    flexDirection: "row",
  },
  inputAndButtonContainer: {
    flex: 0.9,
    flexDirection: "row",
  },
  inputContainer: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#cdcdcd',
    borderRadius: 8,
    marginRight: 20
  },
  input: {
    flex: 0.9,
    height: 35,
    marginHorizontal: 10
  },
  errorText: {
    color: 'red'
  }
});
