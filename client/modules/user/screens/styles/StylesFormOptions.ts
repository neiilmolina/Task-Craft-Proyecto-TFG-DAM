import { StyleSheet } from "react-native";

const StylesFormOptions = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 50,
    paddingLeft: 8,
  },
  passwordVisibilityButton: {
    position: "absolute",
    right: 10,
  },
  Buttons: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  MyButton: {
    width: 120,
    height: 50,
  },
});

export default StylesFormOptions;
