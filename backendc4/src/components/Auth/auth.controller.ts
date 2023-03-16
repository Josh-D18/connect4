import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { UsersService } from '../Users/users.service';
import { AuthService } from './auth.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/signup')
  async signup(@Request() req) {
    return this.userService.createUser(req.user);
  }
}
