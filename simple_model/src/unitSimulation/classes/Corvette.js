const Ship = require('./Ship');

class Corvette extends Ship{
  constructor() {
    //  (health, hullSize, armor, shield, bullet, laser)
    super(900,   900,      150,   500,    150,    100);
  }
}

module.exports = Corvette;
