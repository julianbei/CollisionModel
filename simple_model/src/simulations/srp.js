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

const balancingSheet = {
  combatClasses: [
    'fighter',
    'corvette',
    'cruiser',
    'dreadnought'
  ],
  fighter: {
    priorities:[
      'fighter',
      'dreadnought',
      'cruiser',
      'corvette'
    ],
    fighter: 0.1,
    corvette: 0.02,
    cruiser: 0.04,
    dreadnought: 0.05
  },
  corvette: {
    priorities:[
      'fighter',
      'corvette',
      'cruiser',
      'dreadnought'
    ],
    fighter: 1,
    corvette: 0.2,
    cruiser: 0.2,
    dreadnought: 0.04
  },
  cruiser: {
    priorities:[
      'corvette',
      'cruiser',
      'dreadnought',
      'fighter'
    ],
    fighter: 0.5,
    corvette: 0.5,
    cruiser: 0.1,
    dreadnought: 0.2
  },
  dreadnought: {
    priorities:[
      'cruiser',
      'dreadnought',
      'corvette',
      'fighter'
    ],
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

function dealDamage(atacker, target, ratio){
  let dealt = 0;
  if (atacker * ratio >= 1 && target !== 0) {
    dealt = Math.floor(atacker * ratio);
    atacker = atacker - (dealt/ratio);
  }
  return {atacker, dealt};
}

function fightPriority(atacker, shipClass){
  return function(ships){
    let result = {};
    let fight = {atacker, target: 0};
    balancingSheet[shipClass].priorities.forEach((targetClass) => {
      fight = dealDamage(fight.atacker, ships[targetClass], balancingSheet[shipClass][targetClass]);
      result[targetClass] = fight.dealt;
    });
    return result;
  };
}

function dealFleetDamage(atacker, target){
  atacker = copyFleet(atacker);
  target = copyFleet(target);
  return balancingSheet.combatClasses
    .map(shipClass => fightPriority(atacker.ships[shipClass], shipClass))
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

function fightFrame(fleet1, fleet2){
  return {
    fleet1: {
      name: fleet1.name,
      ships: dealFleetDamage(fleet2, fleet1)
    },
    fleet2: {
      name: fleet2.name,
      ships: dealFleetDamage(fleet1, fleet2)
    }
  };
}

module.exports = {
  fightFrame
};
