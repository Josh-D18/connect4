import { Injectable } from '@nestjs/common';
import { UsersService } from '../Users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByUsername({ username });
    const isMatch = await bcrypt.compare(pass, user.password);
    if (isMatch) {
      const { ...result } = user;
      return { result };
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, password: user.userPassword };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_KEY,
      }),
    };
  }

  // async createToken(params:{ })
}
