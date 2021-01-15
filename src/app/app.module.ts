import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { HomeComponent } from './components/home/home.component';
import { RESTapiService } from './services/restapi.service';
import { PaymentService } from './services/payment.service';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { paymentReducer } from './store/payment.reducer';
import { PaymentComponent } from './components/payment/payment.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavigatorComponent,
    HomeComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({ pay : paymentReducer})
  ],
  providers: [RESTapiService, PaymentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
