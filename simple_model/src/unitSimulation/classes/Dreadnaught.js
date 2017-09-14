const Ship = require('./Ship');

class Dreadnought extends Ship{
  constructor() {
    //  (health, hullSize, armor, shield, bullet, laser)
    super(24000,  1600,     800,   10000,   350,    370);
  }
}

module.exports = Dreadnought;
