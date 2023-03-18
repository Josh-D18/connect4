import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from '../Users/users.service';
import { GameService } from './game.service';
import { Game } from './models/game.model';
import { IGame } from './interfaces/game.interface';
import { User } from '../Users/models/users.model';

@Resolver(() => Game)
export class GameResolver {
  constructor(
    private gameService: GameService,
    private userService: UsersService,
  ) {}

  @Mutation(() => Game)
  async createGameBoardResolver(): Promise<IGame> {
    return this.gameService.createGameBoard();
  }

  @Mutation(() => Game)
  async updateGameStateResolver(
    @Args('id', { type: () => Int }) id: number,
    @Args('gameBoard', { type: () => String }) gameBoard: string,
    @Args('playerTurn', { type: () => Int }) playerTurn: number,
    @Args('isGameFinished', { type: () => Boolean }) isGameFinished?: boolean,
    @Args('winner', { type: () => String }) winner?: string,
  ): Promise<IGame> {
    return this.gameService.updateGameState({
      id,
      gameBoard,
      playerTurn,
      isGameFinished,
      winner,
    });
  }

  @Mutation(() => Game)
  async addPlayersToGameState(
    @Args('id', { type: () => Int }) id: number,
    @Args('players') playersInGame: User[],
  ) {
    return this.gameService.addPlayersToGameState({ id, playersInGame });
  }
}
