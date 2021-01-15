import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { payment } from 'src/app/models/payment';
import { initialPayment } from 'src/app/store/payment.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public payment$ : Observable<payment>;
  
  constructor(private store : Store<{ pay : payment }>) {}

  ngOnInit(): void {
    this.payment$ = this.store.select('pay');
  }
}