import React from "react";
import { View, Button, StyleSheet, Text, TouchableOpacity } from "react-native";

import { useAppSelector } from "../../../store/hooks/store";

import { StackNavigationProp } from "@react-navigation/stack";
import { TaskNavigationParamList } from "../navigation/ListTaskNavigation";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";

import { format } from "date-fns";
import { TaskWithId } from "../store/slice";

type ListNavigationProp = StackNavigationProp<TaskNavigationParamList, "List">;

interface ListProps {
  navigation: ListNavigationProp;
}

const List = ({ navigation }: ListProps) => {
  const tasks = useAppSelector((state) => state.tasks);
  const handleTaskPress = (task: TaskWithId) => {
    // Navegar a la pantalla de detalles y pasar la tarea como parámetro
    navigation.navigate("Detalles", { task });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Tareas</Text>
        <Button
          title="Añadir tarea"
          onPress={() => navigation.navigate("Añadir Tarea")}
        />
      </View>

      <View style={styles.taskContainer}>
        {tasks.map((task) => (
          <TouchableOpacity key={task.id} onPress={() => handleTaskPress(task)}>
            <View style={styles.task}>
              <Text style={styles.taskText}>{task.title}</Text>
              <View style={styles.dateContainer}>
                <Text style={styles.dateText}>
                  {format(task.date, "yyyy-MM-dd")}
                </Text>
                <Text style={styles.dateText}>
                  {format(task.date, "HH:mm:ss")}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" />
    </View>
  );
};

export default List;

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
  taskContainer: {
    flex: 1,
    padding: 10,
    width: "100%",
  },
  task: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#ffff",
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    color: "black",
  },
  taskText: {
    fontSize: 16,
    color: "#1A659E",
  },
  dateContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  dateText: {
    fontSize: 12,
    color: "black",
  },
});
