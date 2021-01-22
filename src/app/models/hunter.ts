import Coordenada from './coordenada';

export default interface Hunter {
  position : Coordenada;
  direction : string;
  arrows : number;
}