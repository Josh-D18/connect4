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
        id: Number(id),
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
        id: Number(id),
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
    const gameCreationId: string = this.jwtService.sign(
      { username, password },
      {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: '20m',
      },
    );
    return this.prismaService.user.create({
      data: { username, password, gameCreationId },
    });
  }

  async createGameStatePlayerArray(params: {
    playerOneId: number;
    playerTwoId: number;
  }) {
    const { playerOneId, playerTwoId } = params;
    const playerArray: IUser[] = [];

    const playerOne = await this.prismaService.user.findUnique({
      where: { id: Number(playerOneId) },
    });
    const playerTwo = await this.prismaService.user.findUnique({
      where: { id: Number(playerTwoId) },
    });

    playerArray[0] = playerOne;
    playerArray[1] = playerTwo;

    return playerArray;
  }

  async findAll(param: { userId: number }) {
    const { userId } = param;
    return this.prismaService.user.findMany({ where: { id: userId } });
  }
}
