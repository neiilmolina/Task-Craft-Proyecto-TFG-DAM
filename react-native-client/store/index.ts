import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../modules/tasks/store/slice";
import syncWithDatabaseMiddlewareTasks  from "./middlewares/tasks"
 
export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(syncWithDatabaseMiddlewareTasks),
});

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
