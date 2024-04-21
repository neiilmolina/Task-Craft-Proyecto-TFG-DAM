import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function Header({ navigation }) {
  const handleAddTaskPress = () => {
    navigation.navigate("AddTask"); // Cambiar a la pantalla de añadir tarea
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tareas</Text>
      {/* Aquí puedes añadir un componente de filtro de búsqueda */}
      <Button title="Añadir tarea" onPress={handleAddTaskPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
