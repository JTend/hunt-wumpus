import { ActionReducerMap } from '@ngrx/store';
import Hunter from '../models/hunter';
import { payment } from '../models/payment';
import * as fromHunter from '../store/hunter.store';
import * as fromPayment from '../store/payment.reducer';

interface AppState {
  hunter : Hunter;
  pay : payment;
}

export const reducers : ActionReducerMap<AppState> = {
  hunter : fromHunter.reducer,
  pay : fromPayment.reducer
}