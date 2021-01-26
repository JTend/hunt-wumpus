import AppState from '../../models/appstate';
import Hunter from '../../models/hunter';
import Coordinate from '../../models/coordinate';

export const selectHunter = (state : AppState) : Hunter => state.hunter;

export const selectHunterDirection = (state : AppState) : String => selectHunter(state).direction;

export const selectHunterPosition = (state : AppState) : Coordinate => selectHunter(state).position;

export const selectHunterArrows = (state : AppState) : number => selectHunter(state).arrows;