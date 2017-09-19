class Unit {
  constructor(id) {
    this.id = id;
    this.position = undefined;
  }
  getPosition(){
    return this.position;
  }
  setPosition(tile){
    this.position = tile;
  }
  changePosition(coords){
    const old = this.position;
    this.position.system.setContent(this, coords);
    old.removeContent(this);
  }
  removeFromMap(){
    this.position.removeContent(this);
  }
  findNearUnits(range){
    return this.position.findNearUnits(range)
      .filter(unit => unit !== this);
  }
}

module.exports = Unit;
