import { createReducer, on } from '@ngrx/store';
import { payment } from '../models/payment';
import * as action from './payment.actions';

export const initialPayment : payment = {
  creditCardNumber : null,
  creditCardHolder : null,
  expirationDate : null,
  securityCode : null,
  paymentAmount : 0
};

export const reducer = createReducer(initialPayment, 
  on(action.clearPayment, () => initialPayment),
  on(action.setPayment, (state, { pay }) => pay)
);