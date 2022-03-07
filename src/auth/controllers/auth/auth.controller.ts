import { Controller, Get, Post, Req, Session, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticateGuard, LocalAuthGuard } from './../../utils/LocalGuard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login() {
    return;
  }

  @Get('')
  async getAuthSession(@Session() session: Record<string, any>) {
    session.authenticated = true;
    return session;
  }

  @UseGuards(AuthenticateGuard)
  @Get('status')
  async getAuthStatus(@Req() req: Request) {
    return req.user;
  }
}
