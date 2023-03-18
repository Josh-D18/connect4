import { Field, ArgsType, Int } from '@nestjs/graphql';

@ArgsType()
export class PostGameArgs {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  gameBoard: string;

  @Field(() => Int)
  playerTurn: number;

  @Field(() => Boolean, { nullable: true })
  isGameFinished?: boolean;

  @Field(() => String, { nullable: true })
  winner?: string;
}
