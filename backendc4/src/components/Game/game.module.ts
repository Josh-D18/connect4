import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from '../Users/users.service';
import { GameResolver } from './game.resolver';
import { GameService } from './game.service';

@Module({
  providers: [
    GameService,
    GameResolver,
    PrismaService,
    UsersService,
    JwtService,
  ],
  exports: [GameService],
})
export class GameModule {}
