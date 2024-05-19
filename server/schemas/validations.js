import { z } from "zod";

// Función para validar un UID de Firebase
function validateFirebaseUid(uid) {
  const firebaseUidRegex = /^[a-zA-Z0-9_-]{28}$/;
  return firebaseUidRegex.test(uid);
}

// Función para crear un esquema de validación para un UID de Firebase
export function firebaseUid() {
  return z.string().refine(
    uid => validateFirebaseUid(uid),
    { message: "Must be a valid Firebase UID" }
  );
}

export function isUUID(uuid) {
  const uuidRegex =
    /^[0-9a-fA-F]{8}(?:-[0-9a-fA-F]{4}){3}-[0-9a-fA-F]{12}$|^[0-9a-fA-F]{32}$/;

  return uuidRegex.test(uuid);
}

// Función para validar el formato de fecha ISO 8601
function isValidISODate(dateString) {
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(dateString);
}

// Función para crear un esquema de validación para fechas en formato ISO 8601
export function dateString() {
  return z.string().refine(
    dateString => isValidISODate(dateString),
    {
      message: "Date must be in ISO 8601 format (YYYY-MM-DDTHH:MM:SS)",
    }
  );
}
