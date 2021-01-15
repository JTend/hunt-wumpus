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

const _paymentReducer = createReducer(initialPayment, 
  on(action.clearPayment, () => initialPayment),
  on(action.setPayment, (state, { pay }) => pay)  
);

export const paymentReducer = (state, action) => {
  return _paymentReducer(state, action);
}