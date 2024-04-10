import z from "zod";

const diarySchema = z.object({
  description: z.string({
    invalid_type_error: "The description must be a string",
    required_error: "The description is required",
    max_length_error: "The description must be at most 500 characters long", // Ejemplo de mensaje de error para longitud máxima
  }).max(500), // Establece una longitud máxima para la descripción

  date: z.date(),
  user_id: z.string(), // Ejemplo de validación de formato para user_id
});

export function validateDiary(input) {
  return diarySchema.safeParse(input);
}

export function validatePartialDiary(input) {
  return diarySchema.partial().safeParse(input);
}