import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { IUser } from './interfaces/users.interface';
import { JwtService } from '@nestjs/jwt';
import { hashPassword } from '../../util/hashPassword';
@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async getAllUsers(): Promise<IUser[]> {
    return this.prismaService.user.findMany();
  }

  async getUserByUsername(params: { username: string }): Promise<IUser> {
    const { username } = params;
    return this.prismaService.user.findFirstOrThrow({
      where: { username: username },
    });
  }

  async findUserById(params: { id: number }): Promise<IUser> {
    const { id } = params;
    return this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async updateUserById(params: { id: number; data: { password: string } }) {
    const { id, data } = params;
    return this.prismaService.user.update({
      where: {
        id: id,
      },
      data: data,
    });
  }

  async createUser(params: { username: string; password: string }) {
    const { username, password } = params;
    this.jwtService.sign(params, {
      secret: '',
    });
    const hashedPassword: string = await hashPassword(password);
    return this.prismaService.user.create({
      data: { username, hashedPassword },
    });
  }
}
