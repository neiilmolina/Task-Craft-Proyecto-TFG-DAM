import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../modules/tasks/store/slice";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
