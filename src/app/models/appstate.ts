import Game from "./game";
import Hunter from "./hunter";

export default interface AppState {
  hunter : Hunter,
  game : Game
}