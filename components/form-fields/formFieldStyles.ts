import {StyleSheet} from "react-native";

const formFieldStyles = StyleSheet.create({
  componentContainer: {
    // alignItems: "center",
    margin: 20
  },
  row: {
    flexDirection: "row",
  },
  inputAndButtonContainer: {
    flex: 0.99,
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
    color: 'red',
    alignContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "flex-start"
  }
});

export default formFieldStyles;
