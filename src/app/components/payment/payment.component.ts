import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { payment, payResults, validateFields, validPayment } from 'src/app/models/payment';
import * as action from '../../store/payment.actions';
import { toCorrectDate } from '../../models/date';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  public payment$ : Observable<payment>;
  paymentForm : payment = {
    creditCardNumber : '',
    creditCardHolder : '',
    expirationDate : new Date(),
    securityCode : '',
    paymentAmount : 0
  }
  isValid : payResults = {
    creditCardNumber : true, creditCardHolder : true,
    expirationDate : true, securityCode : true,
    paymentAmount : true
  }
  inputDate : string = '';

  constructor(
    private router : Router, 
    private store : Store<{ pay : payment }>, 
    private API : PaymentService
  ) {}  
  
  ccNumberChanged = (e) => {
    this.paymentForm.creditCardNumber = e.target.value;
    this.isValid.creditCardNumber = validateFields(this.paymentForm).creditCardNumber;
  }
  ccHolderChanged = () => this.isValid.creditCardHolder = validateFields(this.paymentForm).creditCardHolder;

  dateChanged = () => {
    this.paymentForm.expirationDate = toCorrectDate(this.inputDate);
    this.isValid.expirationDate = validateFields(this.paymentForm).expirationDate;
  }
  securityCodeChanged = (e) => {
    this.paymentForm.securityCode = e.target.value;
    this.isValid.securityCode = validateFields(this.paymentForm).securityCode;
  }
  amountChanged = () => this.isValid.paymentAmount = validateFields(this.paymentForm).paymentAmount;
  
  handleClick = () => {
    this.isValid = validateFields(this.paymentForm);
    if(validPayment(this.isValid)) {
      this.API.sendPayment(this.paymentForm).subscribe(
        res => {
          console.info(res);
          this.store.dispatch(action.setPayment({ pay : this.paymentForm }));
          this.router.navigateByUrl('/');
        },
        err => {
          console.log(err);
          this.store.dispatch(action.setPayment({ pay : this.paymentForm }));
        }
      )
    }
    else {
      console.log('Validations: ',this.isValid);
    }
  }
  ngOnInit(): void {
    this.payment$ = this.store.select('pay');
  }
}