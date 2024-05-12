import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TaskWithId } from "./interfaces"

const tasksSlice = createSlice({
  name: "tasks",
  initialState: [] as TaskWithId[],
  reducers: {
    addTask: (state, action: PayloadAction<TaskWithId>) => {
      state.push({...action.payload});
    },
    editTask: (state, action: PayloadAction<TaskWithId>) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      return state.filter((task) => task.id !== action.payload);
    },
    setTasks: (state, action: PayloadAction<TaskWithId[]>) => {
      return action.payload;
    }
  },
});

export const { addTask, editTask, deleteTask, setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
