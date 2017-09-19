const game = require('./index');
const run = require('./run');

// setup szenario
const ship1 = new game.units.classes.Dreadnaught();
const ship2 = new game.units.classes.Cruiser();

const gameState = {
  combat: {
    ship1,
    ship2,
  },
  final: false
};

function final(state){
  return state;
}


run(gameState, final);
