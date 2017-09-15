const units = require('./unitSimulation');
const game = require('./index');

const ship1 = new units.classes.Dreadnaught();
const ship2 = new units.classes.Cruiser();

const gameState = {
  combat: {
    ship1,
    ship2,
  },
  final: false
};

function final(state){
  console.log(state);
}

game.run(gameState, final);
