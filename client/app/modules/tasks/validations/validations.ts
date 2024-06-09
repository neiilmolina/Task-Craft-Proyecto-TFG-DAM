// src/validations/validations.ts
import { isAfter } from 'date-fns';

export const maxLengthTitle = 20;
export const maxLengthDescription = 200;

export const validateTitle = (title: string): string | null => {
  if (title.length < 1 || title.length > maxLengthTitle) {
    return `El título debe tener entre 1 y ${maxLengthTitle} caracteres.`;
  }
  return null;
};

export const validateDescription = (description: string): string | null => {
  if (description.length < 1 || description.length > maxLengthDescription) {
    return `La descripción debe tener entre 1 y ${maxLengthDescription} caracteres.`;
  }
  return null;
};

export const validateDateTime = (date: Date, time: Date): string | null => {
  const now = new Date();
  const selectedDateTime = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    time.getHours(),
    time.getMinutes(),
    time.getSeconds()
  );

  if (selectedDateTime <= now) {
    return "La fecha y hora deben ser mayores que la fecha y hora actuales.";
  }
  return null;
};

export const combineDateAndTime = (date: Date, time: Date): Date => {
  const combinedDate = new Date(date);
  combinedDate.setHours(time.getHours());
  combinedDate.setMinutes(time.getMinutes());
  combinedDate.setSeconds(time.getSeconds());
  return combinedDate;
};
