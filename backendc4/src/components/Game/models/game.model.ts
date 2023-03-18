import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../Users/models/users.model';

@ObjectType()
export class Game {
  @Field(() => Int, { description: 'Game ID' })
  id: number;

  @Field(() => String, { nullable: true, description: 'Winner of the game' })
  winner: string;

  @Field(() => Int, { description: 'Player"s Turn' })
  playerTurn: number;

  @Field(() => String, { nullable: true, description: 'Game Board' })
  gameBoard: string;

  @Field(() => Boolean, {
    nullable: true,
    description: 'True if game is over and false if game is still ongoing',
  })
  isGameFinished: boolean;

  @Field(() => [User], {
    nullable: true,
    description: 'Players currently playing',
  })
  players: User[];
}
