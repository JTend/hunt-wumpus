import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import AppState from 'src/app/models/appstate';
import Hunter from 'src/app/models/hunter';
import { payment } from 'src/app/models/payment';
import { selectHunter } from 'src/app/store/hunter/selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public payment$ : Observable<payment>;
  public hunter$ : Observable<Hunter>;
  
  constructor(private store : Store<AppState>) {}

  ngOnInit(): void {
    this.payment$ = this.store.select('pay');
    this.hunter$ = this.store.select(selectHunter);
  }
}