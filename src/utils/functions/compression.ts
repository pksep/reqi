import { compressToBase64, decompressFromBase64 } from 'lz-string';

/**
 * Функция для компрессии JSON строки.
 * @param jsonString - JSON строка для сжатия.
 * @returns Сжатая JSON строка в формате base64.
 */
export function compressJson(jsonString: string): string {
  return compressToBase64(jsonString);
}

/**
 * Функция для декомпрессии JSON строки.
 * @param compressedBase64 - Сжатая JSON строка в формате base64.
 * @returns Восстановленная JSON строка.
 */
export function decompressJson(compressedBase64: string): string {
  return decompressFromBase64(compressedBase64);
}
