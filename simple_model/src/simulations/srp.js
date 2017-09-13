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

// How many will be killed by one
const balancingSheet = {
  fighter: {
    fighter: 0.1,
    corvette: 0.02,
    cruiser: 0.04,
    dreadnought: 0.05
  },
  corvette: {
    fighter: 1,
    corvette: 0.2,
    cruiser: 0.2,
    dreadnought: 0.04
  },
  cruiser: {
    fighter: 0.5,
    corvette: 0.5,
    cruiser: 0.1,
    dreadnought: 0.2
  },
  dreadnought: {
    fighter: 0.10,
    corvette: 0.10,
    cruiser: 0.30,
    dreadnought: 0.5
  }
};



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
// How many will be killed by one
function dealDamage(atacker, target, ratio){
  let dealt = 0;
  if (atacker * ratio >= 1 && target !== 0) {
    dealt = Math.floor(atacker * ratio);
    atacker = atacker - (dealt/ratio);
  }
  return {atacker, dealt};
}

function fighterDamage(atacker){
  return function(ships){
    let result = {};
    let fight = {atacker, target: 0};
    fight = dealDamage(fight.atacker, ships.fighter, balancingSheet.fighter.fighter);
    result.fighter = fight.dealt;
    fight = dealDamage(fight.atacker, ships.dreadnought, balancingSheet.fighter.dreadnought);
    result.dreadnought = fight.dealt;
    fight = dealDamage(fight.atacker, ships.cruiser, balancingSheet.fighter.cruiser);
    result.cruiser = fight.dealt;
    fight = dealDamage(fight.atacker, ships.corvette, balancingSheet.fighter.corvette);
    result.corvette = fight.dealt;
    return result;
  };
}
function corvetteDamage(atacker){
  return function(ships){
    let result = {};
    let fight = {atacker, target: 0};
    fight = dealDamage(fight.atacker, ships.fighter, balancingSheet.corvette.fighter);
    result.fighter = fight.dealt;
    fight = dealDamage(fight.atacker, ships.corvette, balancingSheet.corvette.corvette);
    result.corvette = fight.dealt;
    fight = dealDamage(fight.atacker, ships.cruiser, balancingSheet.corvette.cruiser);
    result.cruiser = fight.dealt;
    fight = dealDamage(fight.atacker, ships.dreadnought, balancingSheet.corvette.dreadnought);
    result.dreadnought = fight.dealt;
    return result;
  };
}
function cruiserDamage(atacker){
  return function(ships){
    let result = {};
    let fight = {atacker, target: 0};
    fight = dealDamage(fight.atacker, ships.corvette, balancingSheet.cruiser.corvette);
    result.corvette = fight.dealt;
    fight = dealDamage(fight.atacker, ships.cruiser, balancingSheet.cruiser.cruiser);
    result.cruiser = fight.dealt;
    fight = dealDamage(fight.atacker, ships.dreadnought, balancingSheet.cruiser.dreadnought);
    result.dreadnought = fight.dealt;
    fight = dealDamage(fight.atacker, ships.fighter, balancingSheet.cruiser.fighter);
    result.fighter = fight.dealt;
    return result;
  };
}
function dreadnoughtDamage(atacker){
  return function(ships){
    let result = {};
    let fight = {atacker, target: 0};
    fight = dealDamage(fight.atacker, ships.cruiser, balancingSheet.dreadnought.cruiser);
    result.cruiser = fight.dealt;
    fight = dealDamage(fight.atacker, ships.dreadnought, balancingSheet.dreadnought.dreadnought);
    result.dreadnought = fight.dealt;
    fight = dealDamage(fight.atacker, ships.corvette, balancingSheet.dreadnought.corvette);
    result.corvette = fight.dealt;
    fight = dealDamage(fight.atacker, ships.fighter, balancingSheet.dreadnought.fighter);
    result.fighter = fight.dealt;
    return result;
  };
}

function dealFleetDamage(atacker){
  const fighter = fighterDamage(atacker.ships.fighter);
  const corvette = corvetteDamage(atacker.ships.corvette);
  const cruiser = cruiserDamage(atacker.ships.cruiser);
  const dreadnought = dreadnoughtDamage(atacker.ships.dreadnought);
  return function(fleet){
    const result = [
      fighter(fleet.ships),
      corvette(fleet.ships),
      cruiser(fleet.ships),
      dreadnought(fleet.ships)
    ];
    return result.reduce((p, c) => {
      return {
        fighter: Math.max(p.fighter - c.fighter, 0),
        corvette: Math.max(p.corvette - c.corvette, 0),
        cruiser: Math.max(p.cruiser - c.cruiser, 0),
        dreadnought: Math.max(p.dreadnought - c.dreadnought, 0)
      };
    }, fleet.ships);
  };
}

function fightFrame(pfleet1, pfleet2){
  let dfleet1 = dealFleetDamage(copyFleet(pfleet1));
  let dfleet2 = dealFleetDamage(copyFleet(pfleet2));

  return {
    fleet1: {name: pfleet1.name, ships:dfleet2(copyFleet(pfleet1))},
    fleet2: {name: pfleet2.name, ships:dfleet1(copyFleet(pfleet2))}
  };
}

module.exports = {
  fightFrame
};
