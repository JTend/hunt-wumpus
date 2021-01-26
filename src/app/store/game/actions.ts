import { createAction, props } from '@ngrx/store';
import Coordinate from '../../models/coordinate';

export const initGame   = createAction('INIT_GAME', props<{
  size: Coordinate,
  holes: number
}>() );

export const tryMoving  = createAction('TRY_MOVING', props<{cell : Coordinate}>() );

export const moveHunter = createAction('MOVE_HUNTER', props<{cell : Coordinate}>() );

export const shootArrow = createAction('SHOOT_ARROW', props<{orig : Coordinate, dire : string}>() );