import { Router } from "express";
import { DiaryController } from "../controller/diaries.js";

export const createDiaryRoute = ({ diaryModel }) => {
  const diaryRouter = Router();

  const diaryController = new DiaryController({ diaryModel });

  // Ruta para obtener todos los diarios
  diaryRouter.get("/", diaryController.getAllDiaries);
  // Ruta para crear un nuevo diario
  diaryRouter.post("/", diaryController.createDiary);
  
  // Ruta para obtener un diario por su ID
  diaryRouter.get("/:id", diaryController.getDiaryById);
  // Ruta para actualizar un diario existente
  diaryRouter.put("/:id", diaryController.updateDiary);
  // Ruta para eliminar un diario por su ID
  diaryRouter.delete("/:id", diaryController.deleteDiary);

  return diaryRouter;
};
