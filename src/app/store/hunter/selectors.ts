import AppState from '../../models/appstate';
import Hunter from '../../models/hunter';
import Coordenada from '../../models/coordenada';

export const selectHunter = (state : AppState) : Hunter => state.hunter;

export const selectHunterDirection = (state : AppState) : String => selectHunter(state).direction;

export const selectHunterPosition = (state : AppState) : Coordenada => selectHunter(state).position;

export const selectHunterArrows = (state : AppState) : number => selectHunter(state).arrows;