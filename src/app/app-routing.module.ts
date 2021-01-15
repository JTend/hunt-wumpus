import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PaymentComponent } from './components/payment/payment.component';
const routes: Routes = [
  {
    path : '',
    component : HomeComponent,
    pathMatch : 'full',
  },
  {
    path : 'payment',
    component : PaymentComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
