import { Router } from "express";
import { TaskController } from "../controller/tasks.js";

export const createTaskRoute = ({ taskModel }) => {
  const taskRouter = Router();
  const taskController = new TaskController({ taskModel });

  // Ruta para obtener todas las tareas
  taskRouter.get("/", taskController.getAllTasks);
  // Ruta para crear una nueva tarea
  taskRouter.post("/", taskController.createTask);  
  
  // Ruta para obtener una tarea por su ID
  taskRouter.get("/:id", taskController.getTaskById);
  // Ruta para actualizar una tarea existente
  taskRouter.put("/:id", taskController.updateTask);
  // Ruta para eliminar una tarea por su ID
  taskRouter.delete("/:id", taskController.deleteTask);

  return taskRouter;
};
