import { Field, Int, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class Game {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  winner: string;

  @Field(() => Int)
  playerTurn: number;

  @Field(() => [GraphQLJSON], { nullable: true })
  gameBoard: JSON[];

  @Field(() => Boolean)
  isGameFinished: boolean;

  @Field(() => Int)
  currentGameID: number;
}
