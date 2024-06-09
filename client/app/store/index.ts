import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../modules/tasks/store/slice";
import userReducer from "../modules/users/store/slice";
import diaryReducer from "../modules/diaries/store/slice";
import syncWithDatabaseMiddlewareTasks from "./middlewares/tasks";
import syncWithDatabaseMiddlewareUsers from "./middlewares/users";
import syncWithDatabaseMiddlewareDiaries from "./middlewares/diaries";

// Configuración del store de Redux
export const store = configureStore({
  // Reducers que definen la estructura del estado global
  reducer: {
    tasks: taskReducer,
    users: userReducer,
    diaries: diaryReducer,
  },
  // Middleware para la sincronización con la base de datos
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      syncWithDatabaseMiddlewareTasks,
      syncWithDatabaseMiddlewareDiaries,
      syncWithDatabaseMiddlewareUsers
    ),
});

// Definición de tipos para el estado global y el dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
