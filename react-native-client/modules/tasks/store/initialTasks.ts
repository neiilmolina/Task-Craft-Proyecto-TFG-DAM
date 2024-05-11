import { TaskApi, TaskWithId } from "./interfaces"

import { config } from "dotenv"

const URL = process.env.API_URL
const URL_TASK = `${URL}/tasks`

export const fetchTasks = (): Promise<TaskWithId[]> => {
  return fetch("http://192.168.56.1:2508/tasks")
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parsea la respuesta JSON
    })
    .then(data => {
      // Mapea los datos a un arreglo de tareas con la interfaz TaskWithId
      const tasks: TaskWithId[] = data.map((task: TaskApi) => ({
        id: task.id,
        date: new Date(task.date._seconds * 1000).toISOString(), // Convertir la fecha a cadena ISO 8601
        user_id: task.user_id,
        description: task.description,
        completed: task.completed,
        title: task.title,
        category: task.category
      }));

      return tasks; // Devuelve las tareas mapeadas
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      return []; // Devuelve un arreglo vacío en caso de error
    });
};
