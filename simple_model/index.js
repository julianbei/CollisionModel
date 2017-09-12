function simulateNumericDecision(fleet1, fleet2){
  if (fleet1.ships > fleet2.ships) return fleet1;
  if (fleet1.ships < fleet2.ships) return fleet2;
  return null;
}

const orion = {
  name: 'orion',
  ships: 295
}

const commonwealth = {
  name: 'commonwealth',
  ships: 300
}

console.log('simulateNumericDecision \nwinner:', simulateNumericDecision(orion, commonwealth));
