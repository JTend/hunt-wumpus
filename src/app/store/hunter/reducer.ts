import { createReducer, on } from '@ngrx/store';
import * as action from './actions';
import Hunter from '../../models/hunter';
import Coordinate from '../../models/coordinate';
import * as dir from '../../models/directions';

export const initialState : Hunter = {
  position : { X: 0, Y: 0},
  direction : dir.UP,
  arrows : 0
}

export const reducer = createReducer(initialState, 
  on(action.iniciarHunter, ( state, { hunter } ) : Hunter => hunter),

  on(action.avanzarPosicion, (state) : Hunter => {
    let newPosition : Coordinate = state.position;
    switch(state.direction) {
      case dir.RIGHT: newPosition.X++; break;
      case dir.LEFT : newPosition.X--; break;
      case dir.UP   : newPosition.Y++; break;
      case dir.DOWN : newPosition.Y--; break;
    }
    return {
      ...state,
      position : newPosition
    }
  }),

  on(action.girarIzquierda, (state) : Hunter => {
    let newdir : string = state.direction;
    switch(state.direction) {
      case dir.UP   : newdir = dir.LEFT;  break;
      case dir.RIGHT: newdir = dir.UP;    break;
      case dir.DOWN : newdir = dir.RIGHT; break;
      case dir.LEFT : newdir = dir.DOWN;  break;
    }
    return {
      ...state,
      direction: newdir
    }
  }),

  on(action.girarDerecha, (state) : Hunter => {
    let newdir : string = state.direction;
    switch(state.direction) {
      case dir.UP:      newdir = dir.RIGHT; break;
      case dir.RIGHT:   newdir = dir.DOWN;  break;
      case dir.DOWN:    newdir = dir.LEFT;  break;
      case dir.LEFT:    newdir = dir.UP;    break;
    }
    return {
      ...state,
      direction: newdir
    }
  }),

  on(action.dispararFlecha, (state) : Hunter => {
    let payload = (state.arrows > 0) ? 1 : 0;
    return {
      ...state,
      arrows : state.arrows - payload
    }
  })
);