function combatFrame(fighter1, fighter2){
  fighter1.fire(fighter2);
  fighter2.fire(fighter1);
  return {fighter1, fighter2};
}

module.exports= combatFrame;
