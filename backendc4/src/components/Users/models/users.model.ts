import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Game } from 'src/components/Game/models/game.model';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field(() => String, { description: "User's Username" })
  username: string;

  @Field(() => String, { description: "User's Password" })
  password: string;

  @Field(() => String, { nullable: true, description: "User's Game ID" })
  gameId: string | null;

  @Field(() => [Game], {
    nullable: true,
    description: 'Games that the user has played',
  })
  gamesPlayed: Game[];
}
