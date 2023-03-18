import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UsersModule } from './components/Users/users.module';
import { AuthModule } from './components/Auth/auth.module';
import { AuthController } from './components/Auth/auth.controller';
import { AuthService } from './components/Auth/auth.service';
import { UsersService } from './components/Users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './prisma.service';
import { GameModule } from './components/Game/game.module';
import { GameService } from './components/Game/game.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    UsersModule,
    AuthModule,
    GameModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    JwtService,
    PrismaService,
    GameService,
  ],
})
export class AppModule {}
