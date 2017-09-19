function combatFrame(combat){
  const ship1 = combat.ship1;
  const ship2 = combat.ship2;
  ship1.fire(ship2);
  ship2.fire(ship1);
  return {ship1, ship2};
}

module.exports= combatFrame;
