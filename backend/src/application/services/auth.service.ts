import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async handle(payload:string) {
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
