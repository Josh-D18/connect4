import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { generateGameBoard } from '../../util/generateGameBoard';
import { User } from '../Users/models/users.model';
import { IGame } from './interfaces/game.interface';

@Injectable()
export class GameService {
  constructor(private prismaService: PrismaService) {}

  async getAllGames(): Promise<IGame[]> {
    return this.prismaService.game.findMany();
  }

  async getGamebyId(params: { id: number }): Promise<IGame> {
    const { id } = params;
    return this.prismaService.game.findUnique({
      where: {
        id: id,
      },
    });
  }

  async createGameBoard(): Promise<IGame> {
    const gameBoard: string = JSON.stringify(generateGameBoard());
    return this.prismaService.game.create({
      data: { gameBoard, playerTurn: 0 },
    });
  }

  async updateGameState(params: {
    id: number;
    gameBoard: string;
    playerTurn: number;
    isGameFinished?: boolean;
    winner?: string;
  }) {
    const { id, gameBoard, playerTurn, isGameFinished, winner } = params;
    let data: IGame = { gameBoard, playerTurn, isGameFinished };
    if (isGameFinished) {
      data = {
        ...data,
        winner,
      };
    }

    return this.prismaService.game.update({
      where: {
        id,
      },
      data,
    });
  }

  async addPlayersToGameState(params: { id: number; playersInGame: User[] }) {
    const { id, playersInGame } = params;

    return this.prismaService.game.update({
      where: { id },
      data: { players: playersInGame },
    });
  }
}
