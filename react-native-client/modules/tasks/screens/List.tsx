import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";

import { useAppSelector } from "../../../store/hooks/store";
import { useUserActions } from "../hooks/useTaskActions";

import { StackNavigationProp } from "@react-navigation/stack";
import { TaskNavigationParamList } from "../navigation/TaskNavigation";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";

type ListNavigationProp = StackNavigationProp<TaskNavigationParamList, "List">;

interface ListProps {
  navigation: ListNavigationProp;
}

const List = ({ navigation }: ListProps) => {
  const tasks = useAppSelector((state) => state.tasks);
  const {
    addNewTask,
    editExistingTask,
    removeTask,
    markTaskAsComplete,
    markTaskAsIncomplete,
  } = useUserActions();

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
        <Button title="Añadir tarea" onPress={() => navigation.navigate('AddTaskScreen')} />
      </View>

      <View style={styles.taskContainer}>
        {tasks.map((task) => (
          <View key={task.id} style={styles.task}>
            <Text style={styles.taskText}>{task.title}</Text>
            {/* <Text style={styles.dateText}>{task.date}</Text> */}
          </View>
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
    backgroundColor: "#ffff",
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    color: "black",
  },
  taskText: {
    fontSize: 16,
  },
  dateText: {
    fontSize: 12,
    color: "gray",
  },
});
