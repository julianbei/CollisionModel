const clockEngine = require('./clockEngine');
const Unit = require('./Unit');
// ships
const Fighter = require('./classes/Fighter');
const Corvette = require('./classes/Corvette');
const Cruiser = require('./classes/Cruiser');
const Dreadnaught = require('./classes/Dreadnaught');

module.exports = {
  Unit,
  clockEngine,
  classes: {
    Fighter,
    Corvette,
    Cruiser,
    Dreadnaught
  }
};
