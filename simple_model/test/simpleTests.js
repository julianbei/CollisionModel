const expect = require('chai').expect;
const simulate = require('./../src/index').simulate;
const fixtures = require('./fixtures/simple');

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

  describe('Stone, Rock and Paper (srp)', function() {
    it('should destroy primary small ships in the first frame', done => {
      let fleets = fixtures.srp.fleets;
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
      const result = simulate.srp.fightFrame(fixtures.srp.balancingSheet, fleets.fleet1, fleets.fleet2);
      expect(result).to.eql(expected);
      done();
    });

    it('should have destroyed all small ships after 5 frames', done => {
      let fleets = fixtures.srp.fleets;
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
        fleets = simulate.srp.fightFrame(fixtures.srp.balancingSheet, fleets.fleet1, fleets.fleet2);
      }
      expect(fleets).to.eql(expected);
      done();
    });
  });
});
