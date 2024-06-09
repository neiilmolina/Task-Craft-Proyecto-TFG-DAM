import React, { useMemo } from "react";
import TaskSection from "./TasksSection";
import { TaskUIWithID } from "../store/interfaces";

interface TaskListProps {
  tasks: TaskUIWithID[];
  navigation: any;
}

const TaskListSection: React.FC<TaskListProps> = ({ tasks, navigation }) => {
  const todayDate = useMemo(() => new Date().toISOString().split("T")[0], []);

  const filterTasks = (tasks, filterFn) => {
    return tasks.filter(filterFn);
  };

  const filteredTasks = useMemo(() => ({
    todayTasks: filterTasks(tasks, (task) =>
      task.date.split("T")[0] === todayDate && !task.completed
    ),
    pendingTasks: filterTasks(tasks, (task) =>
      task.date.split("T")[0] !== todayDate && !task.completed
    ),
    completedTasks: filterTasks(tasks, (task) => task.completed)
  }), [tasks, todayDate]);

  return (
    <>
      <TaskSection
        title="Tareas para hoy"
        tasks={filteredTasks.todayTasks}
        emptyMessage="No hay tareas para hoy"
        navigation={navigation}
      />
      <TaskSection
        title="Tareas pendientes"
        tasks={filteredTasks.pendingTasks}
        emptyMessage="No hay tareas pendientes"
        navigation={navigation}
      />
      <TaskSection
        title="Tareas completadas"
        tasks={filteredTasks.completedTasks}
        emptyMessage="No hay tareas completadas"
        navigation={navigation}
      />
    </>
  );
};

export default React.memo(TaskListSection);
