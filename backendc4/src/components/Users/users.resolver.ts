import { Args, Int, Query, Resolver } from '@nestjs/graphql';
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

  @Query(() => User)
  async findUserbyId(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<IUser> {
    return this.userService.findUserById({ id });
  }
}
