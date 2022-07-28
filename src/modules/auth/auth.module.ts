import { Module } from '@nestjs/common';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '@models/user.model';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [GoogleStrategy, AuthService, AuthGuard],
  exports: [GoogleStrategy, AuthGuard, AuthService],
})
export class AuthModule {}
