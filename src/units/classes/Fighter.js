const Ship = require('./Ship');

class Fighter extends Ship{
  constructor() {
    //  (health, hullSize, armor, shield, bulletPower, laserPower)
    super(300,   300,      30,    100,    100,          50);
  }
}

module.exports = Fighter;
