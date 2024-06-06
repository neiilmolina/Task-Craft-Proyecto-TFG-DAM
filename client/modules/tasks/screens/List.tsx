import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TaskNavigationParamList } from "../navigation/ListTaskNavigation";

import useTasksLoader from "../hooks/useTasksLoader";
import TaskHeader from "../components/TaskHeader";
import TaskListSection from "../components/TaskListSection";

type ListNavigationProp = StackNavigationProp<TaskNavigationParamList, "List">;

interface ListProps {
  navigation: ListNavigationProp;
}

const List = ({ navigation }: ListProps) => {
  const { tasks, loading, error } = useTasksLoader();

  return (
    <SafeAreaView style={styles.container}>
      <TaskHeader title="Tareas" navigation={navigation} />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorMessage}>{error}</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.taskContainer}
          contentContainerStyle={styles.scrollViewContent}
        >
          {tasks.length > 0 ? (
            <>
              <TaskListSection tasks={tasks} navigation={navigation} />
              {/* Espacio adicional para evitar que el contenido sea cortado */}
              <View style={styles.bottomSpacing} />
            </>
          ) : (
            <Text style={styles.message}>No tienes tareas en este momento</Text>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  taskContainer: {
    flex: 1,
    padding: 10,
    width: "100%",
  },
  scrollViewContent: {
    paddingBottom: 50, // Espacio adicional al final del contenido
  },
  bottomSpacing: {
    height: 50, // Altura del espacio adicional
  },
  message: {
    marginVertical: 25,
    color: "gray",
    textAlign: "center",
    fontSize: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    fontSize: 18,
  },
});
