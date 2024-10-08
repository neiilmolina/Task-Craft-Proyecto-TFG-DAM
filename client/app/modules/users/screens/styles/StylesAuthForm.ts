import { StyleSheet } from "react-native";

const StylesAuthForm = StyleSheet.create({
    h1: {
      textAlign:"center",
      paddingTop: 10,
      fontSize: 20,
      fontWeight: "bold",
    },
    headerText: {
      marginTop: 120,
      marginBottom: 10,
      paddingTop: 40,
      fontSize: 25,
      fontWeight: "bold",
    },
    h3: {
      marginTop: 20,
      textAlign: "center",
    },
    container: {
      flex: 1,
      backgroundColor: "#1A659E", // Blue background
      justifyContent: "center",
      alignItems: "center",
    },
    card: {
      backgroundColor: "#F5F5F5", // White card
      margin: 20,
      borderRadius: 10,
      padding: 20,
      width: "80%",
      height: "90%",
    },
    form: {
      flexDirection: "column",
      gap: 20,
      marginTop:30,
      marginBottom: 40,
    },
    input: {
      width: "100%",
      marginBottom: 10,
      padding: 10,
      borderRadius: 20,
    },
    bottom: {
      flexDirection:"column",
      gap:10,
    },
    switchText: {
      marginTop: 20,
      textAlign: "center",
      color: "#000000", // Black text
    },
    link: {
      color: "#1A659E", // Blue text
    },
  });

  export default StylesAuthForm;