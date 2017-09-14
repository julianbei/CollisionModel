const Ship = require('./Ship');

class Corvette extends Ship{
  constructor() {
    super(900, 150, 500, 150, 100);
  }
}

module.exports = Corvette;
