function simulateNumericDecision(fleet1, fleet2){
  if (fleet1.ships > fleet2.ships) return fleet1;
  if (fleet1.ships < fleet2.ships) return fleet2;
  return null;
}

function simulateNumericDestruction(fleet1, fleet2){
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

// Initialize test fleets
const orion = {
  name: 'orion',
  ships: 295
}

const commonwealth = {
  name: 'commonwealth',
  ships: 300
}

const hasle = {
  name: 'commonwealth',
  ships: 300
}

// Simulations:

//simulateNumericDecision
console.log('simulateNumericDecision fight: 1\nwinner:', simulateNumericDecision(orion, commonwealth));
console.log('simulateNumericDecision fight: 2\nwinner:', simulateNumericDecision(commonwealth, orion));
console.log('simulateNumericDecision fight: 3\nwinner:', simulateNumericDecision(hasle, commonwealth));

//simulateNumericDestruction
console.log('simulateNumericDestruction fight: 1\nwinner:', simulateNumericDestruction(orion, commonwealth));
console.log('simulateNumericDestruction fight: 2\nwinner:', simulateNumericDestruction(commonwealth, orion));
console.log('simulateNumericDestruction fight: 3\nwinner:', simulateNumericDestruction(hasle, commonwealth));
