import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../modules/tasks/store/slice";
import authReducer from "../modules/user/store/slice.auth"
import syncWithDatabaseMiddlewareTasks  from "./middlewares/tasks"
 
export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    auth : authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(syncWithDatabaseMiddlewareTasks),
});

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
