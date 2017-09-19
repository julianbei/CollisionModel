const frameRateInMilliseconds = 250;

function nextFrame(simulate, gameState, final){
  const enter = Date.now();
  const resultState = simulate(gameState);
  const exit = Date.now();
  const timing = Math.max(frameRateInMilliseconds - (exit - enter), 0);
  if(resultState.final === false){
    setTimeout(function () {
      return nextFrame(simulate, resultState, final);
    }, timing);
  } else {
    return final(resultState);
  }
}

function gameStateCalculation(game){
  return game;
}

function startGame(game){
  nextFrame(gameStateCalculation, game);
}

module.exports = {
  nextFrame,
  startGame,
};
