import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../modules/tasks/store/slice";
import userReducer from "../modules/user/store/slice";
import diaryReducer from "../modules/diaries/store/slice";
import syncWithDatabaseMiddlewareTasks from "./middlewares/tasks";
import syncWithDatabaseMiddlewareUsers from "./middlewares/users";
import syncWithDatabaseMiddlewareDiaries from "./middlewares/diaries";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    users: userReducer,
    diaries: diaryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      syncWithDatabaseMiddlewareTasks,
      syncWithDatabaseMiddlewareDiaries,
      syncWithDatabaseMiddlewareUsers
    ),
});

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
