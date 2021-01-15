import { createAction, props } from '@ngrx/store';
import { payment } from '../models/payment';

export const clearPayment = createAction('CLEAR');
export const setPayment = createAction('SET', 
  props<{ pay : payment }>()
);