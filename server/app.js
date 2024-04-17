import express, { json } from "express";

import { createUserRoute } from "./routes/users.js";
import { createDiaryRoute } from "./routes/diaries.js";
import { createTaskRoute } from "./routes/tasks.js"

import { corsMiddleware } from "./middleware/cors.js";

export const createApp = ({ userModel, diaryModel, taskModel }) => {
  const app = express();
  app.use(json());
  app.use(corsMiddleware());
  app.disable("x-powered-by");
  
  app.use("/users", createUserRoute({ userModel }));
  app.use("/diaries", createDiaryRoute({ diaryModel }))
  app.use("/tasks", createTaskRoute({ taskModel }))
  
  const PORT = process.env.PORT ?? 2508;

  app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
  });
};
