import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";

import { StackNavigationProp } from "@react-navigation/stack";
import { TaskNavigationParamList } from "../navigation/ListTaskNavigation";

import Task from "../components/Task";
import useTasksLoader from "../hooks/useTasksLoader";
import TaskHeader from "../components/TaskHeader";

type ListNavigationProp = StackNavigationProp<TaskNavigationParamList, "List">;

interface ListProps {
  navigation: ListNavigationProp;
}

const List = ({ navigation }: ListProps) => {
  const tasks = useTasksLoader();
  return (
    <View style={styles.container}>
      <TaskHeader navigation={navigation} />

      <ScrollView style={styles.taskContainer}>
        {tasks.map((task) => (
          <Task key={task.id} task={task} navigation={navigation} />
        ))}
      </ScrollView>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  taskContainer: {
    flex: 1,
    padding: 10,
    width: "100%",
  },
});
