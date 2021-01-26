import { ActionReducerMap } from '@ngrx/store';
import AppState from '../models/appstate';
import * as fromHunter from './hunter/reducer';
import * as fromGame from './game/reducer';

export const reducers : ActionReducerMap<AppState> = {
  hunter : fromHunter.reducer,
  game : fromGame.reducer
}