import Board from '../models/board';
import * as dir from '../models/directions';

describe('Class Board', () => {
  let board;
  const xSize = 100;
  const ySize = 100;
  const holes = 100;
  beforeAll( () => {
    board = new Board({X:xSize, Y:ySize}, holes);
  });

  describe('Board definitions', () => {
    it('should have size defined', () => {
      expect(board.size).toBeDefined();
    });
    it('should have size '+ xSize +'x'+ ySize, () => {
      expect(board.size).toEqual( jasmine.objectContaining( {X:xSize, Y:ySize} ) );
    });
    it('should have WUMPUS defined', () => {
      expect(board.wumpus).toBeDefined();
    });
    it('should have WUMPUS valid position with (1 < X < '+ xSize +') (1 < Y < '+ ySize +')', () => {
      expect(board.wumpus.X).toBeGreaterThan(1);
      expect(board.wumpus.X).toBeLessThan(xSize);
      expect(board.wumpus.Y).toBeGreaterThan(1);
      expect(board.wumpus.Y).toBeLessThan(ySize);
    });
    it('should have GOLD position defined', () => {
      expect(board.gold).toBeDefined();
    });
    it('should have GOLD valid position with (1 < X < '+ xSize +') (1 < Y < '+ ySize +')', () => {
      expect(board.gold.X).toBeGreaterThan(1);
      expect(board.gold.X).toBeLessThan(xSize);
      expect(board.gold.Y).toBeGreaterThan(1);
      expect(board.gold.Y).toBeLessThan(ySize);
    });
    it('should have HOLES array defined', () => {
      expect(board.holes).toBeDefined();
    });
    it('should have '+ holes +' holes in the array', () => {
      expect(board.holes.length).toBe(holes);
    });
    it('should have HOLES without null positions', () => {
      expect(board.holes.every(item => item !== null)).toBeTrue();
    });
    it('should have holes, gold and wumpus with no repeated positions', () => {
      let fullArray = board.holes.map(item => item);
      fullArray.push(board.wumpus);
      fullArray.push(board.gold);
      expect(fullArray.filter((item, index, array) => {
        return array.findIndex(elem => item.X === elem.X && item.Y === elem.Y) === index
      }).length).toBe(holes + 2);
    });
  });//describe: Board definition

  describe('Hunter cell behavior', () => {
    it('should be true if the cell is near wumpus', () => {
      expect( board.feelingWumpus({ X : board.wumpus.X, Y : board.wumpus.Y + 1 }) ).toBeTrue();
      expect( board.feelingWumpus({ X : board.wumpus.X, Y : board.wumpus.Y - 1 }) ).toBeTrue();
      expect( board.feelingWumpus({ X : board.wumpus.X + 1, Y : board.wumpus.Y }) ).toBeTrue();
      expect( board.feelingWumpus({ X : board.wumpus.X - 1, Y : board.wumpus.Y }) ).toBeTrue();
    });
    it('should be true if the cell is near to any hole', () => {
      board.holes.forEach(hole => {
        expect( board.feelingHole({ X : hole.X, Y : hole.Y + 1}) ).toBeTrue();
        expect( board.feelingHole({ X : hole.X, Y : hole.Y - 1}) ).toBeTrue();
        expect( board.feelingHole({ X : hole.X + 1, Y : hole.Y}) ).toBeTrue();
        expect( board.feelingHole({ X : hole.X - 1, Y : hole.Y}) ).toBeTrue();
      });
    });
    it('should be true if cell is near gold', () => {
      expect( board.feelingGold({ X : board.gold.X, Y : board.gold.Y + 1 }) ).toBeTrue();
      expect( board.feelingGold({ X : board.gold.X, Y : board.gold.Y - 1 }) ).toBeTrue();
      expect( board.feelingGold({ X : board.gold.X + 1, Y : board.gold.Y }) ).toBeTrue();
      expect( board.feelingGold({ X : board.gold.X - 1, Y : board.gold.Y }) ).toBeTrue();
    });
    it('should be true if it is gold cell', ()  => {
      expect( board.isGoldCell(board.gold) ).toBeTrue();
      expect( board.isGoldCell(board.wumpus) ).toBeFalse();
      expect( board.isGoldCell({X:0, Y:0}) ).toBeFalse();
    });
    it('should be true if it is wumpus cell', () => {
      expect( board.isWumpusCell(board.wumpus) ).toBeTrue();
      expect( board.isWumpusCell(board.gold) ).toBeFalse();
      expect( board.isWumpusCell({X:0, Y:0}) ).toBeFalse();
    });
    it('should be true if it is a hole position', () => {
      for(let hole of board.holes) expect( board.isHoleCell(hole) ).toBeTrue();
      expect( board.isHoleCell(board.gold) ).toBeFalse();
      expect( board.isHoleCell({X:0, Y:0}) ).toBeFalse();
    });
  });//describe: Hunter cell behavior

  describe('shooting arrows', () => {
    it('Should hit wumpus from below', () => {
      expect(board.shootArrow({X: board.wumpus.X, Y: 0}, dir.UP)).toBeTrue();
    });
    it('should hit wumpus from above', () => {
      expect(board.shootArrow({X: board.wumpus.X, Y: ySize}, dir.DOWN)).toBeTrue();
    });
    it('should hit wumpus from the left', () => {
      expect(board.shootArrow({X: 0, Y: board.wumpus.Y}, dir.RIGHT)).toBeTrue();
    });
    it('should hit wumpus from the right', () => {
      expect(board.shootArrow({X: xSize, Y: board.wumpus.Y}, dir.LEFT)).toBeTrue();
    });
    it('should not hit wumpus from {X:0, Y:0}', () => {
      expect(board.shootArrow({X:0, Y:0}, dir.UP)).toBeFalse();
      expect(board.shootArrow({X:0, Y:0}, dir.DOWN)).toBeFalse();
    });
  });//describe: Shooting arrows
});