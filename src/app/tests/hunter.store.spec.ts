import { TestBed } from '@angular/core/testing';
import AppState from '../models/appstate';

import Hunter from '../models/hunter';
import * as action from '../store/hunter/actions';
import * as fromHunter from '../store/hunter/reducer';
import { selectHunter, selectHunterArrows, selectHunterDirection, selectHunterPosition } from '../store/hunter/selectors';

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
  });//describe Selectors

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
      afterAll( () => {
        state.hunter = fromHunter.reducer(selectHunter(state), action.iniciarHunter({ hunter : newHunter }));
      });

      it('should turn from UP to LEFT', () => {
        state.hunter = fromHunter.reducer(state.hunter, action.girarIzquierda());
        expect( selectHunterDirection(state) ).toEqual('LEFT');
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
    });//describe

    describe('changing directions by turning right', () => {
      afterAll( () => {
        state.hunter = fromHunter.reducer(selectHunter(state), action.iniciarHunter({ hunter : newHunter }));
      });

      it('should turn from UP to RIGHT', () => {
        state.hunter = fromHunter.reducer(state.hunter, action.girarDerecha());
        expect( selectHunterDirection(state) ).toEqual('RIGHT');
      });
      it('should turn from RIGHT do DOWN direction', () => {
        state.hunter = fromHunter.reducer(selectHunter(state), action.girarDerecha());
        expect( selectHunterDirection(state) ).toBe('DOWN');
      });
      it('should turn from DOWN do LEFT direction', () => {
        state.hunter = fromHunter.reducer(selectHunter(state), action.girarDerecha());
        expect( selectHunterDirection(state) ).toBe('LEFT');
      });
      it('should turn from LEFT do UP direction', () => {
        state.hunter = fromHunter.reducer(selectHunter(state), action.girarDerecha());
        expect( selectHunterDirection(state) ).toBe('UP');
      });
    });//describe

    describe('Advancing positions', () => {
      beforeEach(() => {
        state.hunter = fromHunter.reducer(selectHunter(state), action.avanzarPosicion());
        state.hunter = fromHunter.reducer(selectHunter(state), action.girarDerecha());
      });

      afterAll( () => {
        state.hunter = fromHunter.reducer(selectHunter(state), action.iniciarHunter({ hunter : newHunter }));
      });

      it('should have advanced to [5,6]', () => {
        expect( selectHunterPosition(state) ).toEqual( jasmine.objectContaining({X:5,Y:6}));
      });
      it('should have advanced to [6,6]', () => {
        expect( selectHunterPosition(state) ).toEqual( jasmine.objectContaining({X:6,Y:6}));
      });
      it('should have advanced to [6,5]', () => {
        expect( selectHunterPosition(state) ).toEqual( jasmine.objectContaining({X:6,Y:5}));
      });
      it('should have advanced to [5,5]', () => {
        expect( selectHunterPosition(state) ).toEqual( jasmine.objectContaining({X:5,Y:5}));
      });
    });//describe Advancing

    describe('shooting 3 arrows', () => {
      beforeEach(() => {
        state.hunter = fromHunter.reducer(selectHunter(state), action.dispararFlecha());
        state.hunter = fromHunter.reducer(selectHunter(state), action.dispararFlecha());
      });
      it('should have 8 arrows', () => {
        expect( selectHunterArrows(state) ).toBe(8);
      });
      it('should have 6 arrows', () => {
        expect( selectHunterArrows(state) ).toBe(6);
      });
      it('should have 4 arrows', () => {
        expect( selectHunterArrows(state) ).toBe(4);
      });
    });
  });//describe Reducer/actions
});//describe Hunter store