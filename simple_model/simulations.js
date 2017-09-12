function numericDecision(fleet1, fleet2){
  if (fleet1.ships > fleet2.ships) return fleet1;
  if (fleet1.ships < fleet2.ships) return fleet2;
  return null;
}

function numericDestruction(fleet1, fleet2){
  // simulate destruction of ships
  let ships = fleet1.ships - fleet2.ships;
  // clone parameter objects for immutability
  let combattant1 = {name: fleet1.name, ships};
  let combattant2 = {name: fleet2.name, ships: ships*-1};

  if (ships > 0) {
    combattant2.ships = 0;
    return {
      winner: combattant1,
      looser: combattant2
    };
  } else {
    combattant1.ships = 0;
    return {
      winner: combattant2,
      looser: combattant1
    };
  }
  return {
    draw1: combattant1,
    draw2: combattant2
  };
}

module.exports = {
  numericDecision,
  numericDestruction
}
