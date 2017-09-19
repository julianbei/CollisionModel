const clockEngine = require('./clockEngine');
const combatFrame = require('./combatFrame');

// ships
const Fighter = require('./classes/Fighter');
const Corvette = require('./classes/Corvette');
const Cruiser = require('./classes/Cruiser');
const Dreadnaught = require('./classes/Dreadnaught');

module.exports = {
  clockEngine,
  combatFrame,
  classes: {
    Fighter,
    Corvette,
    Cruiser,
    Dreadnaught
  }
};
