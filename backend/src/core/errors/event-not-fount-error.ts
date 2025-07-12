import { AppError } from "./app-error";
import { ErrorCodes } from "./error-codes";

export class EventNotFoundError extends Error implements AppError {
  code = ErrorCodes.EVENT_NOT_FOUND;

  constructor(id: string) {
    super(`Rooming list with ID "${id}" not found.`);
    this.name = 'EventNotFoundError';
  }
}
