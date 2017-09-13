module.exports = {
  'numeric': {
    'orion': {
      name: 'orion',
      ships: 295
    },
    'commonwealth': {
      name: 'commonwealth',
      ships: 300
    },
    'hasle': {
      name: 'hasle',
      ships: 300
    }
  },
  'srp':{
    'balancingSheet': {
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
    },
    fleets: {
      'ohio': {
        name: 'ohio',
        ships:{
          fighter: 100,
          corvette: 50,
          cruiser: 25,
          dreadnought: 5
        }
      },
      'texas': {
        name: 'texas',
        ships:{
          fighter: 100,
          corvette: 50,
          cruiser: 25,
          dreadnought: 5
        }
      },
      'michigan': {
        name: 'michigan',
        ships:{
          fighter: 30,
          corvette: 65,
          cruiser: 2,
          dreadnought: 1
        }
      }
    }
  }
};
