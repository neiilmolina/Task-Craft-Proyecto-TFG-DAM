import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

interface TaskHeaderProps {
  navigation: any;
}

const TaskHeader: React.FC<TaskHeaderProps> = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Tareas</Text>
      <Button
        title="Añadir tarea"
        onPress={() => navigation.navigate("Añadir Tarea")}
      />
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
    backgroundColor: "#1A659E",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default TaskHeader;
