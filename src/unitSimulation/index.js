const clockEngine = require('./clockEngine');
const combatFrame = require('./combatFrame');
const Unit = require('./Unit');
// ships
const Fighter = require('./classes/Fighter');
const Corvette = require('./classes/Corvette');
const Cruiser = require('./classes/Cruiser');
const Dreadnaught = require('./classes/Dreadnaught');

module.exports = {
  Unit,
  clockEngine,
  combatFrame,
  classes: {
    Fighter,
    Corvette,
    Cruiser,
    Dreadnaught
  }
};
