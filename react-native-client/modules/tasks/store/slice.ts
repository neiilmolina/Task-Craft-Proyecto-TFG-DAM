import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Task {
  date: Date;
  user_id: string;
  description: string;
  completed: boolean;
  title: string;
  category: string;
}

export interface TaskWithId extends Task{
  id: string;
}

const INITIAL_STATE: TaskWithId[] = [
  {
    id: "cBrzl0EH0iMEQN8nrjO0",
    date: new Date(1712361600000), // Date correspondiente a 1712361600 segundos UNIX
    user_id: "5yExbJuVC3NLrLVjA0e7",
    description: "Realizar una tarea importante",
    completed: false,
    title: "Tarea importante",
    category: "Tarea",
  },
  {
    id: "dZQpqLOW0kz3hiXxIMYt",
    date: new Date(1712361600000), // Date correspondiente a 1712361600 segundos UNIX
    user_id: "5yExbJuVC3NLrLVjA0e7",
    title: "Tarea importante",
    category: "Tarea",
    description:
      "Completar el informe mensual de ventas y enviarlo por correo electrónico",
    completed: true,
  },
  {
    id: "gldjWLz8fJDZ4jvX1Tgd",
    date: new Date(1712361600000), // Date correspondiente a 1712361600 segundos UNIX
    user_id: "5yExbJuVC3NLrLVjA0e7",
    description: "Realizar una tarea importante",
    completed: false,
    title: "Tarea importante",
    category: "Tarea",
  },
];

const tasksSlice = createSlice({
  name: "tasks",
  initialState: INITIAL_STATE,
  reducers: {
    // Agregar una nueva tarea
    addTask: (state, action: PayloadAction<Task>) => {
      const id = crypto.randomUUID();
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
    // Marcar una tarea como completada
    completeTask: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((task) => task.id === action.payload);
      if (index !== -1) {
        state[index].completed = true;
      }
    },
    // Marcar una tarea como incompleta
    incompleteTask: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((task) => task.id === action.payload);
      if (index !== -1) {
        state[index].completed = false;
      }
    },
  },
});

// Exporta acciones y el reducer
export const { addTask, editTask, deleteTask, completeTask, incompleteTask } =
  tasksSlice.actions;
export default tasksSlice.reducer;
