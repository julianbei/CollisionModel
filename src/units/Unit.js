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
  moveToCoords(cords){
    this.movementTarget = cords;
  }
  move(){
    for (let i = 0; i < this.speed; i++) {
      const position = this.position.getCoordinates();
      if(position.x === this.movementTarget.x && position.y === this.movementTarget.y) continue;
      const distanceX = this.position.coordinates.x - this.movementTarget.x;
      const distanceY = this.position.coordinates.y - this.movementTarget.y;
      if (distanceX != 0) {
        this.changePosition({x:position.x - (distanceX > 0?1:-1), y:position.y});
      }else if (distanceY != 0){
        this.changePosition({x:position.x, y:position.y - (distanceY > 0?1:-1)});
      }else {
        continue;
      }
    }
  }
}

module.exports = Unit;
