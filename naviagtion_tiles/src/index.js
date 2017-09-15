
class Tile {
  constructor(x, y) {
    this.content = [];
    this.coordinates = {x,y};
  }
}

class Map {
  constructor(xAxisTiles, yAxisTiles) {
    const xAxis = [];

    for(let x = 0; x < xAxisTiles; x++){
      xAxis[x] = new Array(yAxisTiles);
      for(let y = 0; y < yAxisTiles; y++){
        xAxis[x][y] = new Tile(x,y);
      }
    }

    this.system = xAxis;
  }
}

module.exports = {Map};
