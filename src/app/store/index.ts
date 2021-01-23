import { ActionReducerMap } from '@ngrx/store';
import AppState from '../models/appstate';
import * as fromHunter from './hunter/reducer';
import * as fromPayment from '../store/payment.reducer';

export const reducers : ActionReducerMap<AppState> = {
  hunter : fromHunter.reducer,
  pay : fromPayment.reducer
}