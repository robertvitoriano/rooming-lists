import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseHttpException extends HttpException {
  constructor({
    code,
    message,
    status,
  }: {
    code: string;
    message: string;
    status: HttpStatus;
  }) {
    super({ code, message }, status);
  }
}
