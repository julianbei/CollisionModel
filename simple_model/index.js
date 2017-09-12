const simulate = require('./simulations');

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
console.log('numericDecision fight: 1\nwinner:', simulate.numericDecision(orion, commonwealth));
console.log('numericDecision fight: 2\nwinner:', simulate.numericDecision(commonwealth, orion));
console.log('numericDecision fight: 3\nwinner:', simulate.numericDecision(hasle, commonwealth));

//simulateNumericDestruction
console.log('numericDestruction fight: 1\nwinner:', simulate.numericDestruction(orion, commonwealth));
console.log('numericDestruction fight: 2\nwinner:', simulate.numericDestruction(commonwealth, orion));
console.log('numericDestruction fight: 3\nwinner:', simulate.numericDestruction(hasle, commonwealth));
