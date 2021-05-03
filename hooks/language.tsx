import { CODES } from '../constants';

export const useLanguageCodeConverter = (shortCode: string) =>
  CODES.find((code) => code.code === shortCode)?.name || shortCode;
