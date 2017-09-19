const Unit = require('./../Unit');

class Ship extends Unit {
  constructor(health, hullSize, armor, shield, bulletPower, laserPower) {
    super();
    this.hullSize = hullSize;

    this.maxHealth = health;
    this.health = health;

    this.maxShield = shield;
    this.shield = shield;

    this.armor = armor;

    this.laserPower = laserPower;
    this.bulletPower = bulletPower;
  }
  getStateReport(){
    return {
      class: this.constructor.name,
      hullSize: this.hullSize,
      health: {
        current: this.health,
        max: this.maxHealth,
        string: `${this.health}/${this.maxHealth} (${Math.round(this.health/this.maxHealth*100, 2)}%)`
      },
      shield: {
        current: this.shield,
        max: this.maxShield,
        string: `${this.shield}/${this.maxShield} (${Math.round(this.shield/this.maxShield*100, 2)}%)`
      },
      armor: this.armor,
      bullet: this.bulletPower,
      laser: this.laserPower
    };
  }
  receiveBulletHit(power){
    // bullet gun fire power gets reduced by shields and armor
    // shields receive damage
    // armor absorbs damage -> Just to be clear, this is not physically correct
    // 50% of damage ignores the shields
    let shieldPenetration = power * 0.5;
    // 50% of fire power damages the shield
    let shieldDamage = power * 0.5;
    // If the shield goes down by an attack, the rest of the fire power hits the health
    // how much fire power is left after hitting the shield down?
    let rest = Math.max(shieldDamage - this.shield, 0);
    // shield receives damage but does not fall below 0
    this.shield = Math.max(this.shield - shieldDamage, 0);
    // after hitting the shield the total damage after shields will be absorbed by the armor
    let armorDamage = rest + shieldPenetration;
    // the armor works like this: armor will result in a percentage damage reduction
    // armor_value / hull_size
    let damage = (this.armor/this.hullSize) * armorDamage;
    // the final damage will reduce the health
    this.health = Math.max(this.health - damage, 0);
  }
  receiveLaserHit(power){
    // 15% of laser gun fire power ignores the shield
    let shieldPenetration = power * 0.15;
    // 85% of laser gun fire power hits the shield
    let shieldDamage = power * 0.85;
    // If the shield goes down by an attack, the rest of the fire power hits the health
    // how much fire power is left after hitting the shield down?
    let rest = Math.max(shieldDamage - this.shield, 0);
    // shield receives damage but does not fall below 0
    this.shield = Math.max(this.shield - shieldDamage, 0);
    // finally the ships health gets reduced by shieldPenetration + rest damage
    let damage = (shieldPenetration + rest);
    this.health = Math.max(this.health - damage, 0);
  }
  fireBulletOn(ship){
    ship.receiveBulletHit(this.bulletPower);
  }
  fireLaserOn(ship){
    ship.receiveLaserHit(this.laserPower);
  }
  fireOn(ship){
    this.fireLaserOn(ship);
    this.fireBulletOn(ship);
  }
  isAlive(){
    return (this.health > 0);
  }
}

module.exports = Ship;
