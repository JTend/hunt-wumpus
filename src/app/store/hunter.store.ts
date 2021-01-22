import { createAction, createReducer, props, on } from '@ngrx/store';
import Hunter from '../models/hunter';
import Coordenada from '../models/coordenada';
import * as dir from '../models/directions';
//INITIAL VALUE
const initialHunter : Hunter = {
  position : { X: 0, Y: 0},
  direction : dir.UP,
  arrows : 0
}
//ACTIONS - ACCIONES
export const iniciarHunter    = createAction('INICIAR_HUNTER', props<{ hunter : Hunter }>() );
export const avanzarPosicion  = createAction('AVANZAR_POSICION');
export const girarIzquierda   = createAction('GIRAR_IZQUIERDA', );
export const girarDerecha     = createAction('GIRAR_DERECHA');
export const dispararFlecha   = createAction('DISPARAR_FLECHA');
//REDUCERS
export const reducer = createReducer(initialHunter, 
  on(iniciarHunter, (state, { hunter }) => hunter),

  on(avanzarPosicion, state => {
    let newPosition : Coordenada = state.position;
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

  on(girarIzquierda, state => {
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

  on(girarDerecha, state => {
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

  on(dispararFlecha, state => {
    let payload = (state.arrows > 0) ? 1 : 0;
    return {
      ...state,
      arrows : state.arrows - payload
    }
  })
);