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

const hasle = {
  name: 'commonwealth',
  ships: 300
}

console.log('simulateNumericDecision fight: 1\nwinner:', simulateNumericDecision(orion, commonwealth));
console.log('simulateNumericDecision fight: 2\nwinner:', simulateNumericDecision(commonwealth, orion));
console.log('simulateNumericDecision fight: 3\nwinner:', simulateNumericDecision(hasle, commonwealth));
