import { z } from "zod";
import { isUUID } from "./validations.js";

const taskSchema = z.object({
  id: z.string().refine(
    (id) => {
      return isUUID(id); // Validamos el UUID utilizando la función isUUID
    },
    {
      message: "The id must be a valid UUID",
    }
  ),
  title: z.string({
    invalid_type_error: "Task title must be a string",
    required_error: "Task title is required.",
  }),
  description: z.string({
    invalid_type_error: "Task description must be a string",
    required_error: "Task description is required.",
  }),
  completed: z.boolean(),
  date: z.date(),
  category: z.enum(["Tarea", "Objetivo", "Evento", "Otros"]).optional(), // Hacer que la categoría sea opcional
  user_id: z.string(), // Ejemplo de validación de formato para user_id
});

export function validateTask(input) {
  return taskSchema.safeParse(input);
}

export function validatePartialTask(input) {
  return taskSchema.partial().safeParse(input);
}
