import React from "react";
import TaskSection from "./TasksSection";
import { TaskUIWithID } from "../store/interfaces";

interface TaskListProps {
  tasks: TaskUIWithID[];
  navigation: any;
}

const TaskListSection : React.FC<TaskListProps> = ({ tasks, navigation }) => {
  const todayDate = new Date().toISOString().split("T")[0];
  return (
    <>
      <TaskSection
        title="Tareas para hoy"
        tasks={tasks}
        filterFn={(task) =>
          task.date.split("T")[0] === todayDate && !task.completed
        }
        emptyMessage="No hay tareas para hoy"
        navigation={navigation}
      />
      <TaskSection
        title="Tareas pendientes"
        tasks={tasks}
        filterFn={(task) =>
          task.date.split("T")[0] !== todayDate && !task.completed
        }
        emptyMessage="No hay tareas pendientes"
        navigation={navigation}
      />
      <TaskSection
        title="Tareas completadas"
        tasks={tasks}
        filterFn={(task) => task.completed}
        emptyMessage="No hay tareas completadas"
        navigation={navigation}
      />
    </>
  );
};

export default TaskListSection;
