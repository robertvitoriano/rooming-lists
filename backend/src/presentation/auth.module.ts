import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { AuthController } from './controllers/auth-controller';
import { env } from 'src/config/env';
import { AuthService } from 'src/application/services/auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: env.JWT_SECRET,
    }),
  ],
  providers: [
    AuthService, 
    JwtStrategy,
  ],
  exports: [
    JwtModule,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
