import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TaskNavigationParamList } from "../navigation/ListTaskNavigation";


type HeaderNavigationProp = StackNavigationProp<TaskNavigationParamList, "List">;

interface HeaderProps {
  navigation: HeaderNavigationProp;
}

// Unir la pantalla la lista de tareas y el header
const Header: React.FC<HeaderProps> = ({ navigation }) => {
  const handleAddTaskPress = () => {
    navigation.navigate("AddTaskScreen"); // Cambiar a la pantalla de añadir tarea
  };

  return (
    <View style={styles.header}>
      <Text style={styles.title}>Tareas</Text>
      <Button title="Añadir tarea" onPress={handleAddTaskPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Header;
