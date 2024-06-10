import { StyleSheet } from "react-native";

const StylesFormOptions = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  input: {
    height: 40, // Ajusta esta altura según sea necesario
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  Buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  MyButton: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default StylesFormOptions;
