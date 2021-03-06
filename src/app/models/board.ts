import Coordinate from './coordinate';
import * as dir from './directions';

export default class Board {
  size : Coordinate;
  wumpus : Coordinate;
  gold : Coordinate;
  holes : Array<Coordinate>;

  constructor(size : Coordinate, numberOfHoles : number) {
    this.size = size;
    this.gold = this.uniqueLocation();
    this.wumpus = this.uniqueLocation();
    this.holes = [];
    for(let i = 0; i<numberOfHoles; i++) this.holes.push(this.uniqueLocation());
  }

  private randomLocation = () : Coordinate => {
    if(this.size) {
      let x : number = Math.floor(Math.random() * (this.size.X - 1)) + 1;
      let y : number = Math.floor(Math.random() * (this.size.Y - 1)) + 1;
      return { X : x, Y : y };
    }
    else return null;
  }

  private uniqueLocation = () : Coordinate => {
    const arrayWithWumpusAndGold : Array<Coordinate> = [];
    if(this.gold) arrayWithWumpusAndGold.push(this.gold);
    if(this.wumpus) arrayWithWumpusAndGold.push(this.wumpus);
    if(this.holes) this.holes.forEach(item => arrayWithWumpusAndGold.push(item));
    const newLocation = this.randomLocation();
    if(arrayWithWumpusAndGold.some( item => item.X === newLocation.X && item.Y === newLocation.Y) )
      return this.uniqueLocation();
    return newLocation;
  }

  public feelingGold(hunter : Coordinate) : boolean {
    if(hunter.X === this.gold.X && hunter.Y === (this.gold.Y + 1)) return true;
    if(hunter.X === (this.gold.X + 1) && hunter.Y === this.gold.Y) return true;
    if(hunter.X === this.gold.X && hunter.Y === (this.gold.Y - 1)) return true;
    if(hunter.X === (this.gold.X - 1) && hunter.Y === this.gold.Y) return true;
    return false;
  }
  
  public feelingHole(hunter : Coordinate) : boolean {
    for(let hole of this.holes) {
      if(hunter.X === (hole.X + 1) && hunter.Y === hole.Y) return true;
      if(hunter.X === (hole.X - 1) && hunter.Y === hole.Y) return true;
      if(hunter.X === hole.X && hunter.Y === (hole.Y + 1)) return true;
      if(hunter.X === hole.X && hunter.Y === (hole.Y - 1)) return true;
    }
    return false;
  }
  
  public feelingWumpus(hunter : Coordinate) : boolean {
    if(hunter.X === this.wumpus.X && hunter.Y === (this.wumpus.Y + 1)) return true;
    if(hunter.X === (this.wumpus.X + 1) && hunter.Y === this.wumpus.Y) return true;
    if(hunter.X === this.wumpus.X && hunter.Y === (this.wumpus.Y - 1)) return true;
    if(hunter.X === (this.wumpus.X - 1) && hunter.Y === this.wumpus.Y) return true;
    return false;
  }

  public isGoldCell(hunter : Coordinate) : boolean {
    return hunter.X === this.gold.X && hunter.Y === this.gold.Y;
  }

  public isWumpusCell(hunter : Coordinate) : boolean {
    return hunter.X === this.wumpus.X && hunter.Y === this.wumpus.Y;
  }

  public isHoleCell(hunter : Coordinate) : boolean {
    return this.holes.some(hole => hunter.X === hole.X && hunter.Y === hole.Y);
  }

  public isWallCell(cell : Coordinate) : boolean {
    return cell.X < 0 || cell.X >= this.size.X || cell.Y < 0 || cell.Y >= this.size.Y;
  }

  public shootArrow(origin : Coordinate, direction : string) : boolean {
    switch(direction) {
      case dir.UP:
        for(let i = origin.Y; i < this.size.Y; i++)
          if(this.isWumpusCell({X:origin.X, Y:i})) return true;
        return false;
      case dir.DOWN:
        for(let i = origin.Y; i >= 0; i--)
          if(this.isWumpusCell({X:origin.X, Y:i})) return true;
        return false;
      case dir.RIGHT:
        for(let i = origin.X; i < this.size.X; i++)
          if(this.isWumpusCell({X:i, Y:origin.Y})) return true;
        return false;
      case dir.LEFT:
        for(let i = origin.X; i >= 0; i--)
          if(this.isWumpusCell({X:i, Y:origin.Y})) return true;
        return false;
    }
  }
}