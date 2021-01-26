import Coordinate from './coordinate';

export default interface Hunter {
  position : Coordinate;
  direction : string;
  arrows : number;
}