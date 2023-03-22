import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UsersService } from '../Users/users.service';
import { GameService } from './game.service';
import { Game } from './models/game.model';
import { IGame } from './interfaces/game.interface';
import { User } from '../Users/models/users.model';
import { PostGameArgs } from './dto/post-game-args';
import { GetUserArgs } from './dto/get-userID-args';

@Resolver(() => Game)
export class GameResolver {
  constructor(
    private gameService: GameService,
    private userService: UsersService,
  ) {}

  @Query(() => [Game])
  async getAllGamesResolver(): Promise<IGame[]> {
    return this.gameService.getAllGames();
  }

  @Query(() => Game)
  async getGameByIdResolver(args: { id: number }): Promise<IGame> {
    const { id } = args;
    return this.gameService.getGamebyId({ id });
  }

  @Mutation(() => Game)
  async createGameBoardResolver(): Promise<IGame> {
    return this.gameService.createGameBoard();
  }

  @Mutation(() => Game)
  async updateGameStateResolver(args: PostGameArgs): Promise<IGame> {
    return this.gameService.updateGameState({
      ...args,
    });
  }

  @Mutation(() => Game)
  async addPlayersToGameState(args: GetUserArgs): Promise<IGame> {
    return this.gameService.addPlayersToGameState({ ...args });
  }

  @ResolveField('users', () => [User])
  async getUser(@Parent() user: User) {
    const { id } = user;
    return this.userService.findAll({ userId: id });
  }
}
