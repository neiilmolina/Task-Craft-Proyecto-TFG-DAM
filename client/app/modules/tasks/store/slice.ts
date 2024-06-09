import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TaskUIWithID } from "./interfaces";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: [] as TaskUIWithID[],
  reducers: {
    addTask: (state, action: PayloadAction<TaskUIWithID>) => {
      state.push({ ...action.payload });
    },
    editTask: (state, action: PayloadAction<TaskUIWithID>) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      return state.filter((task) => task.id !== action.payload);
    },
    setTasks: (state, action: PayloadAction<TaskUIWithID[]>) => {
      return action.payload;
    },
    rollbackTask: (state, action: PayloadAction<TaskUIWithID>) => {
      const isTaskAlreadyDefined = state.some(
        (task) => task.id === action.payload.id
      );
      if (!isTaskAlreadyDefined) {
        // Buscar la posición en la que se debería insertar el nuevo elemento
        const indexToInsert = state.findIndex(
          (task) => task.id === action.payload.id
        );
        if (indexToInsert !== -1) {
          // Insertar el nuevo elemento en la posición original usando splice
          state.splice(indexToInsert, 0, action.payload);
        } else {
          // Si no se encuentra la posición, simplemente añadir al final
          state.push(action.payload);
        }
      }
    },
  },
});

export const { addTask, editTask, deleteTask, setTasks, rollbackTask } =
  tasksSlice.actions;
export default tasksSlice.reducer;
