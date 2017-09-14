const combatFrame = require('./combatFrame');
const Fighter = require('./classes/Fighter');
const Corvette = require('./classes/Corvette');
const Cruiser = require('./classes/Cruiser');
const Dreadnaught = require('./classes/Dreadnaught');

module.exports = {
  combatFrame,
  classes: {
    Fighter,
    Corvette,
    Cruiser,
    Dreadnaught
  }
};
