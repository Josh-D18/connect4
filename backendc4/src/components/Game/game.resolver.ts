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

@Resolver(() => Game)
export class GameResolver {
  constructor(
    private gameService: GameService,
    private userService: UsersService,
  ) {}

  //   @Query(() => [Game])

  //   @Query(() => Game)

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
  async addPlayersToGameState(
    @Args('id', { type: () => Int }) id: number,
    @Args('players') playersInGame: User[],
  ): Promise<IGame> {
    return this.gameService.addPlayersToGameState({ id, playersInGame });
  }

  @ResolveField('users', () => [User])
  async getUser(@Parent() user: User) {
    const { id } = user;
    return this.userService.findAll({ userId: id });
  }
}
