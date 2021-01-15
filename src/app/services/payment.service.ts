import { Injectable } from '@angular/core';
import { payment } from '../models/payment';
import { RESTapiService } from './restapi.service'

@Injectable({
  providedIn: 'root'
})

export class PaymentService {

  constructor(private API : RESTapiService) { }

  sendPayment = (pay : payment) => this.API.insert('payment', pay);

}
