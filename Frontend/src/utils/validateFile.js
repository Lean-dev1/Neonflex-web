export const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB

export const validateFile = (file, { types = IMAGE_TYPES, maxBytes = MAX_FILE_BYTES } = {}) => {
  if (!file) return null;
  if (!types.includes(file.type)) return 'Formato no permitido. Solo aceptamos JPG, PNG o WEBP.';
  if (file.size > maxBytes) return `El archivo supera los ${maxBytes / 1024 / 1024} MB permitidos.`;
  return null;
};