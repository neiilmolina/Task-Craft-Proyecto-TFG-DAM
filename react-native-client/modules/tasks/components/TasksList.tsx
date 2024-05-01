import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useAppSelector } from "../../../store/hooks/store";
import { useUserActions } from "../hooks/useTaskActions";

export function TasksList() {
  const tasks = useAppSelector((state) => state.tasks);
  const {
    addNewTask,
    editExistingTask,
    removeTask,
    markTaskAsComplete,
    markTaskAsIncomplete,
  } = useUserActions();

  return (
    <View style={styles.taskContainer}>
    {tasks.map((task) => (
      <View key={task.id} style={styles.task}>
        <Text style={styles.taskText}>{task.title}</Text>
        {/* <Text style={styles.dateText}>{task.date}</Text> */}
      </View>
    ))}
  </View>
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    flex: 1,
    padding: 10,
    width: "100%"
  },
  task: {
    backgroundColor: '#ffff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    color:"black"
  },
  taskText: {
    fontSize: 16,
  },
  dateText: {
    fontSize: 12,
    color: 'gray',
  },
});