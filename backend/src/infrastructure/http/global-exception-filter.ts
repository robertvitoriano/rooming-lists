import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorCodes } from 'src/core/errors/error-codes';
import { EventNotFoundError } from 'src/core/errors/event-not-fount-error';
import { RoomingListNotFoundError } from 'src/core/errors/rooming-list-not-found-error';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    
    this.logger.error(exception?.message ?? "Unhandled exception", exception as any);
    
    if (exception instanceof EventNotFoundError) {
      response.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        code: ErrorCodes.EVENT_NOT_FOUND,
        message: exception.message,
      });
      throw new NotFoundException(exception.message);
    }

    if (exception instanceof RoomingListNotFoundError) {
      response.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        code: ErrorCodes.ROOMING_LIST_NOT_FOUND,
        message: exception.message,
      });
      throw new NotFoundException(exception.message);
    }
    
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      code: ErrorCodes.INTERNAL_ERROR,
      message: 'An unexpected error occurred.',
    });
  }
}
