import { TestBed } from '@angular/core/testing';
import AppState from '../models/appstate';

import Hunter from '../models/hunter';
import * as action from '../store/hunter/actions';
import * as fromHunter from '../store/hunter/reducer';
import { selectHunter, selectHunterArrows, selectHunterDirection, selectHunterPosition, selHunterDirection } from '../store/hunter/selectors';

describe('Hunter Store', () => {
  const initialState : Hunter = fromHunter.initialState;
  let state : AppState;
  beforeAll( () => {
    state = { hunter : initialState, pay : null };
  });

  describe('Selectors', () => {
    it('should have initial state', () => {
      expect( selectHunter(state) ).toEqual( jasmine.objectContaining({
        position : { X: 0, Y: 0},
        direction : 'UP',
        arrows : 0 
      }) );
    });
  
    it('should have starting position [0,0]', () => {
      expect( selectHunterPosition(state) ).toEqual( jasmine.objectContaining({ X : 0, Y : 0 }) );
    });
  
    it("should have 'UP' direction", () => {
      expect( selectHunterDirection(state) ).toBe('UP');
    });
    
    it('should have 0 arrows', () => {
      expect( selectHunterArrows(state) ).toBe(0);
    });
  });

  describe('Reducer/Actions', () => {
    let newHunter : Hunter = { position : {X:5,Y:5}, direction : 'UP', arrows : 10 };
    
    beforeAll( () => {
      state.hunter = fromHunter.reducer(selectHunter(state), action.iniciarHunter({ hunter : newHunter }));
    });
  
    it('should have changed to a new hunter setup', () => {
      expect( selectHunter(state) ).toEqual( jasmine.objectContaining(
        { position : {X:5,Y:5}, direction : 'UP', arrows : 10 }
      ));
    });
  
    describe('changing directions by turning left', () => {
      it('should turn from UP to LEFT', () => {
        state.hunter = fromHunter.reducer(state.hunter, action.girarIzquierda());
        console.info(selectHunterDirection(state));
        expect( selHunterDirection(state) ).toEqual('LEFT');
      });
      it('should turn from LEFT do DOWN direction', () => {
        state.hunter = fromHunter.reducer(selectHunter(state), action.girarIzquierda());
        expect( selectHunterDirection(state) ).toBe('DOWN');
      });
      it('should turn from DOWN do RIGHT direction', () => {
        state.hunter = fromHunter.reducer(selectHunter(state), action.girarIzquierda());
        expect( selectHunterDirection(state) ).toBe('RIGHT');
      });
      it('should turn from RIGHT do UP direction', () => {
        state.hunter = fromHunter.reducer(selectHunter(state), action.girarIzquierda());
        expect( selectHunterDirection(state) ).toBe('UP');
      });
    });
  });
});