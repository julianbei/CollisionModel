const Ship = require('./Ship');

class Cruiser extends Ship{
  constructor() {
    //  (health, hullSize, armor, shield, bullet, laser)
    super(5000,  2000,     600,   8000,   250,    300);
  }
}

module.exports = Cruiser;
