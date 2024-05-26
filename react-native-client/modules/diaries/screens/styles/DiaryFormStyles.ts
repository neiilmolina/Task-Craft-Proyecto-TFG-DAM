import { StyleSheet } from "react-native";

const DiaryFormStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 5,
  },
  label: {
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 5,
  },
  description: { height: 400 },
  MyButton: {
    width: 90,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around", // Alinea los botones horizontalmente y los separa con espacio
  },
});

export default DiaryFormStyles;