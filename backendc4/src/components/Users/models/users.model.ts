import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int, { description: "User's Id" })
  id: number;

  @Field(() => String, { description: "User's Username" })
  username: string;

  @Field(() => String, { description: "User's Password" })
  password: string;

  @Field(() => String, {
    nullable: true,
    description: "User's Game Creation ID",
  })
  gameCreationId: string | null;

  @Field(() => Int, {
    nullable: true,
    description: "User's Current Game Session ID",
  })
  currentGameSessionID: number;
}
