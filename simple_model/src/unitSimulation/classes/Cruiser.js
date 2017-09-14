const Ship = require('./Ship');

class Cruiser extends Ship{
  constructor() {
    super(5000, 600, 8000, 200, 200);
  }
}

module.exports = Cruiser;
