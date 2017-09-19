const game = require('./index');

function run(gameState, final){
  const screen = game.consoleUI.getScreen();

  function combatSimulation(state){
    game.combat.combatFrame(state.combat);
    if(!state.combat.ship1.isAlive() || !state.combat.ship2.isAlive()) {
      state.final = true;
    }
    screen.updateScreen(state);
    return state;
  }

  game.clockEngine.nextFrame(combatSimulation, gameState, final);
}

module.exports = run;
