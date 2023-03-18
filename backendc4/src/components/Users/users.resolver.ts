import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IUser } from './interfaces/users.interface';
import { User } from '../../components/Users/models/users.model';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private userService: UsersService) {}

  @Query(() => User, { name: 'getAllUsers' })
  async getAllUsersResolver(): Promise<IUser[]> {
    return this.userService.getAllUsers();
  }

  @Query(() => User, { name: 'getUsersById' })
  async findUserbyIdResolver(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<IUser> {
    return this.userService.findUserById({ id });
  }

  @Mutation(() => User, { name: 'createPlayersArray' })
  async createPlayersArray(
    @Args('playerOneId', { type: () => Int }) playerOneId: number,
    @Args('playerTwoId', { type: () => Int }) playerTwoId: number,
  ): Promise<IUser[]> {
    return this.userService.createGameStatePlayerArray({
      playerOneId,
      playerTwoId,
    });
  }
}
