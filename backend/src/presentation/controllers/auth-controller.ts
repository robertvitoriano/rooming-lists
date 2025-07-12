import { Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/application/services/auth.service';
import { env } from 'src/config/env';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('/')
  async seed() {
   const result = await this.authService.handle(env.JWT_PAYLOAD)
   console.log(result)
    
  }
}
