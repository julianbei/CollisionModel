class Unit {
  constructor(id) {
    this.id = id;
    this.tile = undefined;
  }
  setPosition(tile){
    this.tile = tile;
  }
  changePosition(coords){
    const old = this.tile;
    this.tile.system.setContent(this, coords);
    old.removeContent(this);
  }
  removeFromMap(){
    this.tile.removeContent(this);
  }
}

class Tile {
  constructor(x, y, system) {
    this.content = [];
    this.coordinates = {x,y};
    this.system = system;
  }
  getContent(){
    return this.content;
  }
  setContent(unit){
    this.content.push(unit);
    if(unit.tile) unit.tile.removeContent(unit);
    unit.setPosition(this);
  }
  removeContent(unit){
    this.content = this.content.filter( contended => (contended !== unit));
    if(unit.tile === this) unit.tile = undefined;
    return unit;
  }
}

class Map {
  constructor(xAxisTiles, yAxisTiles) {
    const xAxis = [];

    for(let x = 0; x < xAxisTiles; x++){
      xAxis[x] = new Array(yAxisTiles);
      for(let y = 0; y < yAxisTiles; y++){
        xAxis[x][y] = new Tile(x,y, this);
      }
    }
    this.system = xAxis;
  }
  getContent(coords){
    return this.system[coords.x][coords.y].getContent();
  }
  setContent(unit, coords){
    const tile = this.system[coords.x][coords.y];
    return tile.setContent(unit);
  }
}

module.exports = {Map, Unit};
