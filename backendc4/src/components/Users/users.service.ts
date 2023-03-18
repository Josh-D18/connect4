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

  async updateUserById(params: {
    id: number;
    data: { password: string };
  }): Promise<IUser> {
    const { id, data } = params;
    return this.prismaService.user.update({
      where: {
        id: id,
      },
      data: data,
    });
  }

  async createUser(params: {
    username: string;
    userPassword: string;
  }): Promise<IUser> {
    const { username, userPassword } = params;

    const password: string = await hashPassword(userPassword);
    const gameId: string = this.jwtService.sign(
      { username, password },
      {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: '20m',
      },
    );
    return this.prismaService.user.create({
      data: { username, password, gameId },
    });
  }
}
