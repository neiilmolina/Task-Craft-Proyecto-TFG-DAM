import { TaskUIWithID, GroupedTasks } from "../store/interfaces";
import useTasksLoader from "./useTasksLoader";

const useGroupTasksByDate = (tasks: TaskUIWithID[]): GroupedTasks => {
  // Agrupar las tareas por fecha
  const groupedTasks = tasks.reduce((acc: GroupedTasks, task: TaskUIWithID) => {
    const date = task.date.split('T')[0]; // Extraer solo la parte de fecha
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push({
      id: task.id,
      name: task.title, // Utilizar la propiedad `title`
      height: 50,       // Suponiendo un valor de altura predeterminado
      day: task.date
    });
    return acc;
  }, {});

  return groupedTasks;
};

export default useGroupTasksByDate;
