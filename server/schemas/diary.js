import { z } from "zod";
import { isUUID } from "./validations.js"

const diarySchema = z.object({
  id: z.string().refine((id) => {
    return isUUID(id); // Validamos el UUID utilizando la función isUUID
  }, {
    message: "The id must be a valid UUID"
  }),
  description: z.string({
    invalid_type_error: "The description must be a string",
    required_error: "The description is required",
    max_length_error: "The description must be at most 500 characters long",
  }).max(500),
  date: z.date(),
  user_id: z.string().refine((userId) => {
    return isUUID(userId); // Validamos el user_id utilizando la función isUUID
  }, {
    message: "The user_id must be a valid UUID"
  })
});

export function validateDiary(input) {
  return diarySchema.safeParse(input);
}

export function validatePartialDiary(input) {
  return diarySchema.partial().safeParse(input);
}
