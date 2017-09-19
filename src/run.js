const game = require('./index');

function run(gameState, final){
  const screen = game.consoleUI.getScreen();

  function combatSimulation(state){
    game.combat.combatFrame(state.combat);
    if(!state.combat.ship1.alive() || !state.combat.ship2.alive()) {
      state.final = true;
    }
    screen.updateScreen(state);
    return state;
  }

  game.clockEngine.nextFrame(combatSimulation, gameState, final);
}

module.exports = run;
