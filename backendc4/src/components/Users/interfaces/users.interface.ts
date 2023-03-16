import { Game } from '../../Game/models/game.model';

export interface IUser {
  id?: number;
  username: string;
  password: string;
  gameId: string;
  gamesPlayed?: Game[];
}
