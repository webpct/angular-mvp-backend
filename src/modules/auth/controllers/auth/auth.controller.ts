import { Controller, Get, Req, Response, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthRequest } from '../../models/auth-request';
import { AuthResponse } from '../../models/auth-response';
import { AuthService } from '../../services/auth/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@decorators/public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  @Public()
  async googleAuth(@Req() req) {}

  @Get('login')
  @UseGuards(AuthGuard('google'))
  @Public()
  async login(
    @Req() req: AuthRequest,
    @Response({ passthrough: true }) res: AuthResponse,
  ) {
    const { accessToken } = req.user;
    const registeredUser = await this.authService.login(req.user);
    res.cookie('accessToken', accessToken, { httpOnly: true });
    return registeredUser;
  }
}
