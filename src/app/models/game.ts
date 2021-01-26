import Board from "./board";

export default interface Game {
  board : Board;
  deadByHole : boolean;
  deadByWumpus : boolean;
  feelWumpus : boolean;
  feelHole : boolean;
  feelGold : boolean;
  feelWall : boolean;
  strikedWall : boolean;
  strikedWumpus : boolean;
  goldIsTaken : boolean;
  wumpusIsAlive : boolean;
}