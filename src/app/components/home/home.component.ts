import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import AppState from 'src/app/models/appstate';
import Game from 'src/app/models/game';
import Hunter from 'src/app/models/hunter';
import { selectGame } from 'src/app/store/game/selectors';
import { selectHunter } from 'src/app/store/hunter/selectors';
import * as gameAction from '../../store/game/actions';
import * as hunterAction from '../../store/hunter/actions';
import * as dir from '../../models/directions';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public $game : Observable<Game>;
  public $hunter : Observable<Hunter>;
  
  public ancho : number = 4;
  public alto : number = 4;
  public nroPozos : number = 3;
  public nroFlechas : number = 3; 

  constructor(private store : Store<AppState>, private router : Router) {}

  iniciarPartida() {
    this.store.dispatch(gameAction.initGame({
      size : {X: this.ancho, Y: this.alto}, 
      holes : this.nroPozos
    }));
    this.store.dispatch(hunterAction.iniciarHunter({
      hunter : {
        position : {X:0, Y:0},
        direction : dir.UP,
        arrows : this.nroFlechas
      }
    }));
    this.router.navigateByUrl('/wumpus');
  }

  ngOnInit(): void {
    this.$game = this.store.select(selectGame);
    this.$hunter = this.store.select(selectHunter);
  }
}