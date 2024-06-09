import { z } from "zod";
import { isUUID } from "./validations.js";

const diarySchema = z.object({
  id: z.string().refine((id) => {
    return isUUID(id); // Validamos el UUID utilizando la función isUUID
  }, {
    message: "The id must be a valid UUID"
  }),
  title: z.string({
    required_error: "The title is required",
    invalid_type_error: "The title must be a string"
  }).min(1, "The title must be at least 1 character long")
    .max(12, "The title must be at most 12 characters long"),
  description: z.string({
    invalid_type_error: "The description must be a string",
    required_error: "The description is required",
  }).max(500, "The description must be at most 500 characters long"),
  date: z.date(),
  user_id: z.string(),
});

export function validateDiary(input) {
  return diarySchema.safeParse(input);
}

export function validatePartialDiary(input) {
  return diarySchema.partial().safeParse(input);
}
