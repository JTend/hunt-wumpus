import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { WumpusComponent } from './components/wumpus/wumpus.component';
const routes: Routes = [
  {
    path : '',
    component : HomeComponent,
    pathMatch : 'full',
  },
  {
    path : 'wumpus',
    component : WumpusComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
