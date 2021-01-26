import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import AppState from 'src/app/models/appstate';
import Game from 'src/app/models/game';
import Hunter from 'src/app/models/hunter';
import { selectGame } from 'src/app/store/game/selectors';
import { selectHunter } from 'src/app/store/hunter/selectors';
import * as hunterActions from '../../store/hunter/actions';
import * as gameActions from '../../store/game/actions';
import * as dir from '../../models/directions';
import Coordinate from 'src/app/models/coordinate';

@Component({
  selector: 'app-wumpus',
  templateUrl: './wumpus.component.html',
  styleUrls: ['./wumpus.component.css']
})
export class WumpusComponent implements OnInit {
  public $hunter : Hunter;
  public $game : Game;

  constructor(private router : Router, private store : Store<AppState>) { }

  girarIzquierda() { this.store.dispatch(hunterActions.girarIzquierda()); }
  girarDerecha() { this.store.dispatch(hunterActions.girarDerecha()); }

  disparar() {
    if(this.$hunter.arrows > 0) {
      this.store.dispatch(hunterActions.dispararFlecha());
      this.store.dispatch(gameActions.dispararFlecha({
        orig : this.$hunter.position,
        dire : this.$hunter.direction
      }));
    }
  }

  async avanzar() {
    let newCell : Coordinate;
    switch(this.$hunter.direction) {
      case dir.UP:
        newCell = { X: this.$hunter.position.X, Y: this.$hunter.position.Y + 1 };
        break;
      case dir.DOWN:
        newCell = { X: this.$hunter.position.X, Y: this.$hunter.position.Y - 1 };
        break;
      case dir.RIGHT:
        newCell = { X: this.$hunter.position.X + 1, Y: this.$hunter.position.Y };
        break;
      case dir.LEFT:
        newCell = { X: this.$hunter.position.X - 1, Y: this.$hunter.position.Y };
    }
    await this.store.dispatch(gameActions.tryMoving({ cell : newCell }));
    if(!this.$game.feelWall) {
      this.store.dispatch(hunterActions.avanzarPosicion());
      this.store.dispatch(gameActions.moveHunter({ cell : newCell }));
    }
  }

  goHome() {
    this.router.navigateByUrl('/');
  }

  ngOnInit(): void {
    this.store.select(state => {
      this.$hunter = selectHunter(state);
      this.$game = selectGame(state);
    }).subscribe();
  }
}
