import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import { TaskApi, TaskUIWithID } from "./interfaces";

export const fetchTasks = async (): Promise<TaskUIWithID[]> => {
  const userId = FIREBASE_AUTH.currentUser ? FIREBASE_AUTH.currentUser.uid : null;

  if (!userId) {
    console.error("User ID is null");
    return []; // Devuelve un arreglo vacío
  }

  try {
    const response = await fetch(`http://192.168.56.1:2508/tasks?user_id=${userId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json(); // Parsea la respuesta JSON

    // Mapea los datos a un arreglo de tareas con la interfaz TaskUIWithID
    const tasks: TaskUIWithID[] = data.map((task: TaskApi) => {

      let date: Date;
      if (task.date && typeof task.date === 'object' && typeof task.date._seconds === 'number') {
        // Caso 1: La fecha es un objeto con _seconds
        date = new Date(task.date._seconds * 1000);
      } else if (typeof task.date === 'string') {
        // Caso 2: La fecha es una cadena ISO 8601
        date = new Date(task.date);
      } else {
        console.error("Invalid date format in task:", JSON.stringify(task, null, 2));
        throw new Error(`Invalid date value for task with ID ${task.id}`);
      }

      if (isNaN(date.getTime())) {
        console.error("Date value out of bounds for task:", JSON.stringify(task, null, 2));
        throw new Error(`Date value out of bounds for task with ID ${task.id}`);
      }

      return {
        id: task.id,
        date: date.toISOString(), // Convertir la fecha a cadena ISO 8601
        user_id: task.user_id,
        description: task.description,
        completed: task.completed,
        title: task.title,
        category: task.category,
      };
    });

    return tasks; // Devuelve las tareas mapeadas
  } catch (error) {
    console.error("There was a problem with the fetch task operation:", error);
    return []; // Devuelve un arreglo vacío en caso de error
  }
};
