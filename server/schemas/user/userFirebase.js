import { z } from "zod";
import { firebaseUid } from "../validations.js";

const userSchema = z.object({
  id: firebaseUid(),
  name: z
    .string()
    .min(1, {
      invalid_type_error: "User name must be a string",
      message: "The name of the user must be required",
    })
    .max(255), 
  date: z.date(),
  url_image: z.string().url({ message: "Poster must be a valid URL" }),
  admin: z.boolean(),
});

export function validateUser(input) {
  return userSchema.safeParse(input);
}

export function validatePartialUser(input) {
  return userSchema.partial().safeParse(input);
}
