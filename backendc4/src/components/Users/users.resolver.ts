import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { User } from './models/users.model';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private userService: UsersService) {}

  @Query(() => [User])
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Query(() => User)
  async findUserbyId(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findUserById({ id });
  }
}
