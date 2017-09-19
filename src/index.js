const units = require('./unitSimulation/index');
const consoleUI = require('./consoleUI/index');
const tileMap = require('./tileMap');

function run(gameState, final){
  const screen = consoleUI.getScreen();

  function combatSimulation(state){
    units.combatFrame(state.combat);
    if(!state.combat.ship1.alive() || !state.combat.ship2.alive()) {
      state.final = true;
    }
    screen.updateScreen(state);
    return state;
  }

  units.clockEngine.nextFrame(combatSimulation, gameState, final);
}

module.exports = {
  units,
  run,
  tileMap
};
