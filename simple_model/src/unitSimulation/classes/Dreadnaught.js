const Ship = require('./Ship');

class Cruiser extends Ship{
  constructor() {
    super(25000, 800, 10000, 380, 370);
  }
}

module.exports = Cruiser;
