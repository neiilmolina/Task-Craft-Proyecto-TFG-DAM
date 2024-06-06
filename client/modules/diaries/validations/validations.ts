export const maxLengthTitle = 20;
export const maxLengthDescription = 500;

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
