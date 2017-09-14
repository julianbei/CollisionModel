const Ship = require('./Ship');

class Fighter extends Ship{
  constructor() {
    super(300, 50, 150, 100, 50);
  }
}

module.exports = Fighter;
