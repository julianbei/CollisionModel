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
    if(unit.getPosition()) unit.getPosition().removeContent(unit);
    unit.setPosition(this);
  }
  removeContent(unit){
    this.content = this.content.filter( contended => (contended !== unit));
    if(unit.getPosition() === this) unit.setPosition(undefined);
    return unit;
  }
  findNearUnits(range){
    return this.system.findNearUnits(this.coordinates, range);
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
  findNearUnits(coordinates, range){
    const collection = [];
    const pole = {
      x: coordinates.x -range,
      y: coordinates.y -range,
    };
    const square = 1+ range * 2;
    for (let x = pole.x; x < (square + pole.x); x++) {
      if(x >= this.system.length || x < 0) continue;
      for (let y = pole.y; y < (square + pole.y); y++) {
        if(y >= this.system[0].length || y < 0) continue;
        collection.push({x,y});
      }
    }
    return collection
      .map((coords) => this.getContent(coords))
      .reduce((p, c) => {c.forEach((unit) => p.push(unit)); return p;}, []);
  }
}

module.exports = {Map};
