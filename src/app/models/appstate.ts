import Hunter from "./hunter";
import { payment } from "./payment";

export default interface AppState {
  hunter : Hunter,
  pay : payment
}