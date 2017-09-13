
class Ship {
  constructor(health, shield, armor, laser, bullet) {
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

function fightFrame(fighter1, fighter2){
  fighter1.fire(fighter2);
  fighter2.fire(fighter1);
  return {fighter1, fighter2};
}

module.exports={
  Ship,
  fightFrame
};
