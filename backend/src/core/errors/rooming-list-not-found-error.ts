import { AppError } from "./app-error";
import { ErrorCodes } from "./error-codes";

export class RoomingListNotFoundError extends Error implements AppError {
  code = ErrorCodes.ROOMING_LIST_NOT_FOUND;

  constructor(id: string) {
    super(`Rooming list with ID "${id}" not found.`);
    this.name = 'RoomingListNotFoundError';
  }
}
