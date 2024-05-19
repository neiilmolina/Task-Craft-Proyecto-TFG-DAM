import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../modules/tasks/store/slice";
import userReducer from "../modules/user/store/slice";
import syncWithDatabaseMiddlewareTasks  from "./middlewares/tasks"
import syncWithDatabaseMiddlewareUsers from "./middlewares/users";
 
export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(syncWithDatabaseMiddlewareTasks, syncWithDatabaseMiddlewareUsers),
});

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
