export interface AppError extends Error {
  code: string;
  message: string;
}
