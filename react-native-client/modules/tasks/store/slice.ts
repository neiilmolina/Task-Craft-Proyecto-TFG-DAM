import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';
import { fetchTasks } from "./initialTasks";
// import { fetchTasks } from "./initialTasks";

export interface TaskApi {
    id: string;
    date: {
      _seconds: number;
      _nanoseconds: number;
    };
    user_id: string;
    title: string;
    category: string;
    description?: string;
    completed: boolean;
  
}

export interface Task {
  date: string;
  user_id: string;
  description: string;
  completed: boolean;
  title: string;
  category: string;
}

export interface TaskWithId extends Task{
  id: string;
}

const INITIAL_STATE: TaskWithId[] = [];

(async () => {
  try {
    const url = 'http://192.168.56.1:2508/tasks'; // Reemplaza 'tu_url_aqui' con la URL real
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    // Mapea los datos JSON a objetos TypeScript
    const tasksApi: TaskApi[] = data.map( (taskApi: TaskApi) => (
      {
      id: taskApi.id,
      date: taskApi.date, // Convertir a string directamente aquí
      user_id: taskApi.user_id,
      description: taskApi.description,
      completed: taskApi.completed,
      title: taskApi.title,
      category: taskApi.category
    }));

    const tasks: TaskWithId[] = tasksApi.map(taskApi => {
      const { id, date, user_id, description = "", completed, title, category } = taskApi;
      const dateString = new Date(date._seconds * 1000).toISOString();
      return { id, date: dateString, user_id, description, completed, title, category };
    });
    
    tasks.forEach(task => {
      console.log(`Tarea ID: ${task.id}`);
      console.log(`Tarea: ${task.title}`);
      console.log(`Descripción: ${task.description}`);
      console.log(`Completada: ${task.completed}`);
      console.log(`Fecha: ${task.date}`);
      console.log(`Usuario ID: ${task.user_id}`);
      console.log("------------------------");
    });


    // Asigna los datos a INITIAL_STATE después de la resolución de la promesa
    INITIAL_STATE.push(...tasks);
  } catch (error) {
    console.error('Hubo un problema con la operación de búsqueda:', error);
  }
})();

const tasksSlice = createSlice({
  name: "tasks",
  initialState: INITIAL_STATE,
  reducers: {
    // Agregar una nueva tarea
    addTask: (state, action: PayloadAction<Task>) => {
      const id = uuidv4();
      console.log(id)
      state.push({id, ...action.payload});
    },
    // Editar una tarea existente
    editTask: (state, action: PayloadAction<TaskWithId>) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    // Eliminar una tarea por ID
    deleteTask: (state, action: PayloadAction<string>) => {
      return state.filter((task) => task.id !== action.payload);
    },
  },
  
});



// Exporta acciones y el reducer
export const { addTask, editTask, deleteTask, } =
  tasksSlice.actions;
export default tasksSlice.reducer;

