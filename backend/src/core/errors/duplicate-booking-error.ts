import { AppError } from "./app-error";
import { ErrorCodes } from "./error-codes";

export class DuplicateBookingError extends Error implements AppError {
  code = ErrorCodes.DUPLICATE_BOOKING;

  constructor(id: string) {
    super(`Rooming list with ID "${id}" not found.`);
    this.name = 'DuplicateBookingError';
  }
}
