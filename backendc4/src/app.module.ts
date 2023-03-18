import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import GraphQLJSON from 'graphql-type-json';

import { UsersModule } from './components/Users/users.module';
import { AuthModule } from './components/Auth/auth.module';
import { AuthController } from './components/Auth/auth.controller';
import { AuthService } from './components/Auth/auth.service';
import { UsersService } from './components/Users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      resolvers: { JSON: GraphQLJSON },
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtService, PrismaService],
})
export class AppModule {}
