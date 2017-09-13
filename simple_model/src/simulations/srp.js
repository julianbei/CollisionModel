//SRP = Stone Rock Paper
// This is hard to solve numerically so we have to use a frame based iteration
// {
//   name: 'orion',
//   ships: {
//     fighter: 100,
//     corvette: 50,
//     cruiser: 25,
//     dreadnought: 1
//   }
// };
function crunchFleet(fleet){
  return Object.keys(fleet).reduce((p, c) => p+fleet[c], 0);
}

function copyFleet(fleet){
  return {
    name: fleet.name,
    ships: {
      fighter: fleet.ships.fighter,
      corvette: fleet.ships.corvette,
      cruiser: fleet.ships.cruiser,
      dreadnought: fleet.ships.dreadnought
    }
  };
}

function dealDamage(atacker, target, ratio){
  let dealt = 0;
  if (atacker * ratio >= 1 && target !== 0) {
    dealt = Math.floor(atacker * ratio);
    atacker = atacker - (dealt/ratio);
  }
  return {atacker, dealt};
}

function fightPriority(balancingSheet, atacker, shipClass){
  return function(ships){
    let result = {};
    let fight = {atacker, target: 0};
    balancingSheet[shipClass].priorities.forEach((targetClass) => {
      fight = dealDamage(fight.atacker, ships[targetClass], balancingSheet[shipClass][targetClass]);
      result[targetClass] = fight.dealt;
    });
    if(crunchFleet(result) === 0) result[shipClass] = 1;
    return result;
  };
}

function dealFleetDamage(balancingSheet, atacker, target){
  atacker = copyFleet(atacker);
  target = copyFleet(target);
  return balancingSheet.combatClasses
    .map(shipClass => fightPriority(balancingSheet, atacker.ships[shipClass], shipClass))
    .map(combat => combat(target.ships))
    .reduce((p, c) => {
      return {
        fighter: Math.max(p.fighter - c.fighter, 0),
        corvette: Math.max(p.corvette - c.corvette, 0),
        cruiser: Math.max(p.cruiser - c.cruiser, 0),
        dreadnought: Math.max(p.dreadnought - c.dreadnought, 0)
      };
    }, target.ships);
}

function fightFrame(balancingSheet, fleet1, fleet2){
  return {
    fleet1: {
      name: fleet1.name,
      ships: dealFleetDamage(balancingSheet, fleet2, fleet1)
    },
    fleet2: {
      name: fleet2.name,
      ships: dealFleetDamage(balancingSheet, fleet1, fleet2)
    }
  };
}

module.exports = {
  fightFrame,
  crunchFleet
};
