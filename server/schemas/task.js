import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

const taskSchema = z.object({
  id: z.string().refine((id) => {
    return isUUID(id); // Validamos el UUID utilizando la función isUUID
  }, {
    message: "The id must be a valid UUID"
  }),
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
  category: z.enum([
    "Tarea",
    "Objetivo",
    "Evento",
    "Otros"
  ]).optional(), // Hacer que la categoría sea opcional
  user_id: z.string(), // Ejemplo de validación de formato para user_id
});

// Función para validar UUID utilizando una expresión regular
function isUUID(uuid) {
  const uuidRegex = /^[0-9a-fA-F]{8}[0-9a-fA-F]{4}[1-5][0-9a-fA-F]{3}[89abAB][0-9a-fA-F]{3}[0-9a-fA-F]{12}$/;
  return uuidRegex.test(uuid);
}

export function validateTask(input) {
  return taskSchema.safeParse(input);
}

export function validatePartialTask(input) {
  return taskSchema.partial().safeParse(input);
}
