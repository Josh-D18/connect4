import { User } from '../../Users/models/users.model';

export interface IGame {
  winner?: string;
  playerTurn: number;
  gameBoard: string;
  isGameFinished?: boolean;
  players?: User[];
}
