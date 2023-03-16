import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { IUser } from './interfaces/users.interface';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async getAllUsers(): Promise<IUser[]> {
    return this.prismaService.user.findMany();
  }

  async getUserByUsername(arg: { username: string }): Promise<IUser> {
    const { username } = arg;
    return this.prismaService.user.findFirstOrThrow({
      where: { username: username },
    });
  }

  async findUserById(arg: { id: number }): Promise<IUser> {
    const { id } = arg;
    return this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async updateUserById(args: { id: number; data: { password: string } }) {
    const { id, data } = args;
    return this.prismaService.user.update({
      where: {
        id: id,
      },
      data: data,
    });
  }

  async createUser(arg: { username: string; password: string }) {
    const { username, password } = arg;
    return this.prismaService.user.create({
      data: { username, password },
    });
  }
}
