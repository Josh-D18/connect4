import { Field, ArgsType, Int } from '@nestjs/graphql';
import { User } from 'src/components/Users/models/users.model';

@ArgsType()
export class GetUserArgs {
  @Field(() => Int, { description: 'Game ID' })
  id: number;

  @Field(() => [User], { description: 'Array of Users Playing The Game' })
  playersInGame: User[];
}
