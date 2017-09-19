const Ship = require('./Ship');

class Dreadnought extends Ship{
  constructor() {
    //  (health, hullSize, armor, shield, bulletPower, laserPower)
    super(24000,  2000,     1000, 10000,  350,         370);
  }
}

module.exports = Dreadnought;
