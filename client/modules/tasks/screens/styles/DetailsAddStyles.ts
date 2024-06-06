import { StyleSheet } from "react-native";

const DetailsAddStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  label: {
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 5,
  },
  description: { height: 150 },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  timeDateContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  dateContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },
  MyButton: {
    width: 90,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around", // Alinea los botones horizontalmente y los separa con espacio
  },
  error: {
    color: "red",
    marginTop: 5,
    marginBottom: 5,
    textAlign: "center",
  },
});

export default DetailsAddStyles;