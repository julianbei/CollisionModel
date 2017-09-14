class Ship {
  constructor(health, armor, shield, bullet, laser) {
    this.base = 100;
    this.health = health;
    this.shield = shield;
    this.armor = armor;
    this.laser = laser;
    this.bullet = bullet;
  }
  bulletHit(power){
    let rest = power * 0.25;
    this.shield = Math.max(this.shield - rest, 0);
    rest = rest * (this.armor / this.base);
    this.health = this.health - rest;
  }
  laserHit(power){
    let rest = power * 0.75;
    this.shield = this.shield - rest;
    this.health = this.health - rest;
  }
  fireBullet(ship){
    ship.bulletHit(this.bullet);
  }
  fireLaser(ship){
    ship.laserHit(this.laser);
  }
  fire(ship){
    this.fireLaser(ship);
    this.fireBullet(ship);
  }
  alive(){
    return (this.health > 0);
  }
}

module.exports = Ship;
