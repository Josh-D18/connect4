import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { CreateUserDto } from '../Users/dto/create-user-.dto';
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
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}