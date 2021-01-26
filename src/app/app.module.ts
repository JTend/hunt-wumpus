import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { HomeComponent } from './components/home/home.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store';
import { FormsModule } from '@angular/forms';
import { WumpusComponent } from './components/wumpus/wumpus.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigatorComponent,
    HomeComponent,
    WumpusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
