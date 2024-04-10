import { Router } from "express";
import { UserController } from "../controller/users.js";

export const createUserRoute = ({ userModel }) => {
  const userRouter = Router();

  const userController = new UserController({ userModel });

  // Ruta para obtener todos los usuarios
  userRouter.get("/", userController.getAll);

  // Ruta para obtener un usuario por su ID
  userRouter.get("/:id", userController.getById);

  // Ruta para crear un nuevo usuario
  userRouter.post("/", userController.create);

  // Ruta para actualizar un usuario por su ID
  userRouter.put("/:id", userController.update);

  // Ruta para eliminar un usuario por su ID
  userRouter.delete("/:id", userController.delete);

  return userRouter;
};