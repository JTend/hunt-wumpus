import { createReducer, on } from '@ngrx/store';
import * as action from './actions';
import Game from '../../models/game';
import Board from 'src/app/models/board';

export const initialState : Game = {
  board : new Board({X: 5, Y: 5}, 5),
  deadByHole : false,
  deadByWumpus : false,
  feelGold : false,
  feelHole : false,
  feelWumpus : false,
  feelWall : false,
  strikedWall : false,
  strikedWumpus : false,
  goldIsTaken : false,
  wumpusIsAlive : true
}

export const reducer = createReducer(initialState, 
  on(action.initGame, (state, { size, holes }) : Game => ({
      board : new Board(size, holes),
      deadByHole : false,
      deadByWumpus : false,
      feelGold : false,
      feelHole : false,
      feelWumpus : false,
      feelWall : false,
      strikedWall : false,
      strikedWumpus : false,
      goldIsTaken : false,
      wumpusIsAlive : true
  })),
  on(action.tryMoving, (state, { cell }) : Game => {
    return {
      ...state,
      feelWall : state.board.isWallCell(cell)
    }
  }),
  on(action.moveHunter, (state, { cell }) : Game => {
    return {
      ...state,
      deadByHole : state.board.isHoleCell(cell),
      deadByWumpus : !state.wumpusIsAlive ? false : state.board.isWumpusCell(cell),
      feelGold : state.goldIsTaken ? false : state.board.feelingGold(cell),
      feelHole : state.board.feelingHole(cell),
      feelWumpus : state.board.feelingWumpus(cell),
      strikedWall : false,
      strikedWumpus : false,
      goldIsTaken : state.goldIsTaken ? true : state.board.isGoldCell(cell)
    }
  }),
  on(action.dispararFlecha, (state, { orig, dire }) : Game => {
    const killedWumpus = state.board.shootArrow(orig, dire);
    return {
      ...state,
      strikedWall : !killedWumpus,
      strikedWumpus : killedWumpus,
      wumpusIsAlive : killedWumpus ? false : state.wumpusIsAlive
    }
  })
);