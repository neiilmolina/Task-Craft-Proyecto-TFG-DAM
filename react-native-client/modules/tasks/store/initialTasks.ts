import { TaskWithId } from "./slice";

export const fetchTasks = (): Promise<TaskWithId[]> => {
  return fetch('http://localhost:2508/tasks')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parsea la respuesta JSON
    })
    .then(data => {
      // Mapea los datos a un arreglo de tareas con la interfaz TaskWithId
      const tasks: TaskWithId[] = data.map((task: any) => ({
        id: task.id,
        date: new Date(task.date).toISOString(), // Convertir la fecha a cadena ISO 8601
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
