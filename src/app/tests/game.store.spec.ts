import AppState from '../models/appstate';
import Board from '../models/board';
import Coordinate from '../models/coordinate';
import * as dir from '../models/directions';
import * as action from '../store/game/actions';
import * as fromGame from '../store/game/reducer';
import Game from '../models/game';
import { selectGame, selectGameBoard } from '../store/game/selectors'; 

describe('Game Store:', () => {
  const initialState : Game = fromGame.initialState;
  let state : AppState;
  beforeAll(() => {
    state = { game : initialState, hunter : null };
  });

  describe('Selectors:', () => {
    describe('Inital state', () => {
      it('board should be instance of Board class', () => {
        expect(selectGame(state).board).toBeInstanceOf(Board);  
      });
      it('should have board with size 5x5', () => {
        expect(selectGameBoard(state).size).toEqual(jasmine.objectContaining({X:5, Y:5}));
      })
      it('deadByHole must be false', () => {
        expect(selectGame(state).deadByHole).toBeFalse();
      });
      it('deadByWumpus must be false', () => {
        expect(selectGame(state).deadByWumpus).toBeFalse();
      });
      it('feelHole must be false', () => {
        expect(selectGame(state).feelHole).toBeFalse();
      });
      it('feelWumpus must be false', () => {
        expect(selectGame(state).feelWumpus).toBeFalse();
      });
      it('feelWall must be false', () => {
        expect(selectGame(state).feelWall).toBeFalse();
      });
      it('strikedWall must be false', () => {
        expect(selectGame(state).strikedWall).toBeFalse();
      });
      it('strikedWumpus must be false', () => {
        expect(selectGame(state).strikedWumpus).toBeFalse();
      });
    });//describe Initial State
  });//describe Selectors

  describe('Reducer and Actions:', () => {
    const size : Coordinate = { X: 10, Y: 10 };
    const holes : number = 10;
    beforeAll(() => {
      state.game = fromGame.reducer(selectGame(state), action.initGame({size, holes}));
    });
    it('should have new board 10x10 and 10 holes', () => {
      expect(selectGameBoard(state).size).toEqual(jasmine.objectContaining({X:10, Y:10}));
      expect(selectGameBoard(state).holes.length).toBe(10);
    });
    describe('feelWall should return true when tryMoving beyond limits', () => {
      beforeEach(() => { selectGame(state).feelWall = false });
      it('above Y limit', () => {
        state.game = fromGame.reducer(selectGame(state), action.tryMoving({ cell : {X:0, Y:size.Y} }));
        expect(selectGame(state).feelWall).toBeTrue();
      });
      it('above X limit', () => {
        state.game = fromGame.reducer(selectGame(state), action.tryMoving({ cell : {X:size.X, Y:0}}));
        expect(selectGame(state).feelWall).toBeTrue();
      });
      it('below Y limit', () => {
        state.game = fromGame.reducer(selectGame(state), action.tryMoving({ cell : {X:0, Y:-1} }));
        expect(selectGame(state).feelWall).toBeTrue();
      });
      it('below X limit', () => {
        state.game = fromGame.reducer(selectGame(state), action.tryMoving({ cell : {X:-1, Y:0}}));
        expect(selectGame(state).feelWall).toBeTrue();
      });
    });//describe feelWall and tryMoving
    describe('Shooting arrows', () => {
      beforeEach(() => {
        selectGameBoard(state).wumpus.isAlive = true;
      });
      it('strikedWumpus should be true and wumpus is not alive', () => {
        state.game = fromGame.reducer(selectGame(state), action.shootArrow({
          orig:{X:selectGameBoard(state).wumpus.position.X, Y:0}, 
          dire:dir.UP
        }));
        expect(selectGameBoard(state).wumpus.isAlive).toBeFalse();
        expect(selectGame(state).strikedWumpus).toBeTrue();
      });
      it('strikedWumpus should be false and wumpus is alive', () => {
        state.game = fromGame.reducer(selectGame(state), action.shootArrow({
          orig:{X:0, Y:selectGameBoard(state).wumpus.position.Y}, 
          dire:dir.UP
        }));
        expect(selectGameBoard(state).wumpus.isAlive).toBeTrue();
        expect(selectGame(state).strikedWumpus).toBeFalse();
      });
    });//describe Shooting Arrows
  });//describe Reducer and Actions
});//Game Store