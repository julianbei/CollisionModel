class Unit {
  constructor(id, speed) {
    this.id = id;
    this.position = undefined;
    this.speed = speed || 1;
    this.movementTarget;
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
  distanceTo(unit){
    return this.position.distanceTo(unit.getPosition());
  }
  distanceToNearUnits(range){
    return this.findNearUnits(range)
      .map((unit) => ({distance: this.distanceTo(unit),unit}))
      .sort((a,b)=> (a.distance > b.distance));
  }
}

module.exports = Unit;
