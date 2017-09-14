const expect = require('chai').expect;
const simulate = require('./../src/index').simulate;
const units = require('./../src/index').units;
const fixtures = require('./fixtures');

describe('simulations', function() {
  describe('numeric', function() {
    describe('decision', function() {
      it('should find the winner of two unequal fleets', () => {
        expect(simulate.numeric.decision(fixtures.numeric.orion, fixtures.numeric.commonwealth)).to.eql(fixtures.numeric.commonwealth);
        expect(simulate.numeric.decision(fixtures.numeric.commonwealth, fixtures.numeric.orion)).to.eql(fixtures.numeric.commonwealth);
      });
      it('should identify equal fleets as a draw', () => {
        expect(simulate.numeric.decision(fixtures.numeric.hasle, fixtures.numeric.commonwealth)).to.be.null;
      });
    });

    describe('destruction', function() {
      it('should find the winner of two unequal fleets', () => {
        const result = {
          winner: {name: 'orion', ships:0},
          looser: {name: 'commonwealth', ships:5}
        };
        expect(simulate.numeric.destruction(fixtures.numeric.orion, fixtures.numeric.commonwealth)).to.eql(result);
        expect(simulate.numeric.destruction(fixtures.numeric.commonwealth, fixtures.numeric.orion)).to.eql(result);
      });
      it('should identify equal fleets as a draw', () => {
        const result = {
          draw1: {name: 'hasle', ships:0},
          draw2: {name: 'commonwealth', ships:0}
        };
        expect(simulate.numeric.destruction(fixtures.numeric.hasle, fixtures.numeric.commonwealth)).to.eql(result);
      });
    });

    describe('fightFrame', function() {
      it('should reduce shipcount by rounded 1/10 of competitor ships', () => {
        const result = {
          fleet1: {name: 'orion', ships:265},
          fleet2: {name: 'commonwealth', ships:270}
        };
        expect(simulate.numeric.fightFrame(fixtures.numeric.orion, fixtures.numeric.commonwealth)).to.eql(result);
      });
      it('should produce a bigger gap after 5 rounds', () => {
        const result = {
          fleet1: {name: 'orion', ships:154},
          fleet2: {name: 'commonwealth', ships:162}
        };

        let fleets = {
          fleet1:fixtures.numeric.orion,
          fleet2:fixtures.numeric.commonwealth
        };

        for (let i = 0; i < 6; i++) {
          fleets = simulate.numeric.fightFrame(fleets.fleet1, fleets.fleet2);
        }

        expect(fleets).to.eql(result);
      });
      it('should take 25 frames in a calculated setup', done => {
        let fleets = {
          fleet1:fixtures.numeric.orion,
          fleet2:fixtures.numeric.commonwealth
        };

        let counter = 0;
        let winner = false;

        while(!winner){
          counter++;
          fleets = simulate.numeric.fightFrame(fleets.fleet1, fleets.fleet2);
          if(fleets.fleet1.ships <= 0 || fleets.fleet2.ships <= 0) winner = true;
        }
        expect(counter).to.eql(25);
        expect(fleets.fleet1.ships).to.eql(0);
        expect(fleets.fleet2.ships).to.eql(43);
        done();
      });

      it('should properly calculate a draw', done => {
        let fleets = {
          fleet1:fixtures.numeric.commonwealth,
          fleet2:fixtures.numeric.hasle
        };

        let winner = false;

        while(!winner){
          fleets = simulate.numeric.fightFrame(fleets.fleet1, fleets.fleet2);
          if(fleets.fleet1.ships <= 0 || fleets.fleet2.ships <= 0) winner = true;
        }
        expect(fleets.fleet1.ships).to.eql(0);
        expect(fleets.fleet2.ships).to.eql(0);
        done();
      });
    });
  });

  describe('Rock, paper and Scissors (rps)', function() {
    it('should destroy primary small ships in the first frame', done => {
      let fleets = {
        fleet1: fixtures.rps.fleets['ohio'],
        fleet2: fixtures.rps.fleets['texas']
      };
      const expected = {
        fleet1: {
          name: 'ohio',
          ships:{
            fighter: 40,
            corvette: 38,
            cruiser: 24,
            dreadnought: 5
          }
        },
        fleet2: {
          name: 'texas',
          ships:{
            fighter: 40,
            corvette: 38,
            cruiser: 24,
            dreadnought: 5
          }
        }
      };
      const result = simulate.rps.fightFrame(fixtures.rps.balancingSheet, fleets.fleet1, fleets.fleet2);
      expect(result).to.eql(expected);
      done();
    });

    it('should have destroyed all small ships after 5 frames', done => {
      let fleets = {
        fleet1: fixtures.rps.fleets['ohio'],
        fleet2: fixtures.rps.fleets['texas']
      };
      const expected = {
        fleet1: {
          name: 'ohio',
          ships:{
            fighter: 0,
            corvette: 0,
            cruiser: 16,
            dreadnought: 4
          }
        },
        fleet2: {
          name: 'texas',
          ships:{
            fighter: 0,
            corvette: 0,
            cruiser: 16,
            dreadnought: 4
          }
        }
      };
      for (let i = 0; i < 6; i++) {
        fleets = simulate.rps.fightFrame(fixtures.rps.balancingSheet, fleets.fleet1, fleets.fleet2);
      }
      expect(fleets).to.eql(expected);
      done();
    });
    it('should crush a significant smaller fleet after 3 frames', done => {
      let fleets = {
        fleet1: fixtures.rps.fleets['ohio'],
        fleet2: fixtures.rps.fleets['michigan']
      };
      const expected = {
        fleet1: {
          name: 'ohio',
          ships:{
            fighter: 0,
            corvette: 41,
            cruiser: 22,
            dreadnought: 1
          }
        },
        fleet2: {
          name: 'michigan',
          ships:{
            fighter: 0,
            corvette: 0,
            cruiser: 0,
            dreadnought: 0
          }
        }
      };
      for (let i = 0; i < 4; i++) {
        fleets = simulate.rps.fightFrame(fixtures.rps.balancingSheet, fleets.fleet1, fleets.fleet2);
      }
      expect(fleets).to.eql(expected);
      done();
    });
    it('should ensure a finite fight', done => {
      let fleets = {
        fleet1: fixtures.rps.fleets['ohio'],
        fleet2: fixtures.rps.fleets['texas']
      };
      const crunch = (obj) => Object.keys(obj).reduce((p, c) => p+obj[c], 0);
      let counter = 0;
      let winner = false;
      while(!winner){
        counter++;
        fleets = simulate.rps.fightFrame(fixtures.rps.balancingSheet, fleets.fleet1, fleets.fleet2);
        if(crunch(fleets.fleet1.ships) == 0 || crunch(fleets.fleet2.ships) == 0) winner = true;
      }
      expect(counter).to.eql(21);
      done();
    });
  });

  describe('unit simple', function() {
    it('Fighters should elimnate themselves in 6 frames', done => {
      const ship1 = new units.classes.Fighter();
      const ship2 = new units.classes.Fighter();
      let winner = false;
      let counter = 0;
      while(!winner){
        counter++;
        units.combatFrame(ship1, ship2);
        if(!ship1.alive() || !ship2.alive()) winner = true;
      }
      expect(ship1.alive()).to.be.false;
      expect(ship2.alive()).to.be.false;
      expect(counter).to.eql(6);
      done();
    });
    it('Corvettes should elimnate themselves in 7 frames', done => {
      const ship1 = new units.classes.Corvette();
      const ship2 = new units.classes.Corvette();
      let winner = false;
      let counter = 0;
      while(!winner){
        counter++;
        units.combatFrame(ship1, ship2);
        if(!ship1.alive() || !ship2.alive()) winner = true;
      }
      expect(ship1.alive()).to.be.false;
      expect(ship2.alive()).to.be.false;
      expect(counter).to.eql(7);
      done();
    });
    it('Corvettes should elimnate fighters in 4 frames', done => {
      const ship1 = new units.classes.Corvette();
      const ship2 = new units.classes.Fighter();
      let winner = false;
      let counter = 0;
      while(!winner){
        counter++;
        units.combatFrame(ship1, ship2);
        if(!ship1.alive() || !ship2.alive()) winner = true;
      }
      expect(ship1.alive()).to.be.true;
      expect(ship2.alive()).to.be.false;
      expect(counter).to.eql(4);
      done();
    });

    it('Cruisers should elimnate themselves in 12 frames', done => {
      const ship1 = new units.classes.Cruiser();
      const ship2 = new units.classes.Cruiser();
      let winner = false;
      let counter = 0;
      while(!winner){
        counter++;
        units.combatFrame(ship1, ship2);
        if(!ship1.alive() || !ship2.alive()) winner = true;
      }
      expect(ship1.alive()).to.be.false;
      expect(ship2.alive()).to.be.false;
      expect(counter).to.eql(12);
      done();
    });

    it('Cruisers should elimnate corvettes in 4 frames', done => {
      const ship1 = new units.classes.Cruiser();
      const ship2 = new units.classes.Corvette();
      let winner = false;
      let counter = 0;
      while(!winner){
        counter++;
        units.combatFrame(ship1, ship2);
        if(!ship1.alive() || !ship2.alive()) winner = true;
      }
      expect(ship1.alive()).to.be.true;
      expect(ship2.alive()).to.be.false;
      expect(counter).to.eql(4);
      done();
    });

    it('Cruisers should elimnate fighters in 2 frames', done => {
      const ship1 = new units.classes.Cruiser();
      const ship2 = new units.classes.Fighter();
      let winner = false;
      let counter = 0;
      while(!winner){
        counter++;
        units.combatFrame(ship1, ship2);
        if(!ship1.alive() || !ship2.alive()) winner = true;
      }
      expect(ship1.alive()).to.be.true;
      expect(ship2.alive()).to.be.false;
      expect(counter).to.eql(2);
      done();
    });

    it('Dreadnaughts should elimnate themselves in 25 frames', done => {
      const ship1 = new units.classes.Dreadnaught();
      const ship2 = new units.classes.Dreadnaught();
      let winner = false;
      let counter = 0;
      while(!winner){
        counter++;
        units.combatFrame(ship1, ship2);
        if(!ship1.alive() || !ship2.alive()) winner = true;
      }
      expect(ship1.alive()).to.be.false;
      expect(ship2.alive()).to.be.false;
      expect(counter).to.eql(25);
      done();
    });

    it('Dreadnaughts should elimnate cruisers in 6 frames', done => {
      const ship1 = new units.classes.Dreadnaught();
      const ship2 = new units.classes.Cruiser();
      let winner = false;
      let counter = 0;
      while(!winner){
        counter++;
        units.combatFrame(ship1, ship2);
        if(!ship1.alive() || !ship2.alive()) winner = true;
      }
      expect(ship1.alive()).to.be.true;
      expect(ship2.alive()).to.be.false;
      expect(counter).to.eql(6);
      done();
    });

    it('Dreadnaughts should elimnate corvettes in 2 frames', done => {
      const ship1 = new units.classes.Dreadnaught();
      const ship2 = new units.classes.Corvette();
      let winner = false;
      let counter = 0;
      while(!winner){
        counter++;
        units.combatFrame(ship1, ship2);
        if(!ship1.alive() || !ship2.alive()) winner = true;
      }
      expect(ship1.alive()).to.be.true;
      expect(ship2.alive()).to.be.false;
      expect(counter).to.eql(3);
      done();
    });

    it('Dreadnaughts should elimnate fighters in 1 frames', done => {
      const ship1 = new units.classes.Dreadnaught();
      const ship2 = new units.classes.Fighter();
      let winner = false;
      let counter = 0;
      while(!winner){
        counter++;
        units.combatFrame(ship1, ship2);
        if(!ship1.alive() || !ship2.alive()) winner = true;
      }
      expect(ship1.alive()).to.be.true;
      expect(ship2.alive()).to.be.false;
      expect(counter).to.eql(1);
      done();
    });
  });
});
