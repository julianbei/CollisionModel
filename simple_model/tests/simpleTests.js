const expect = require('chai').expect;
const simulate = require('./../src/index').simulate;
const fixtures = require('./fixtures/simple');

describe('simulations', function() {

    describe('numericDecision', function() {
        it('should find the winner of two unequal fleets', () => {
            expect(simulate.numericDecision(fixtures.orion, fixtures.commonwealth)).to.eql(fixtures.commonwealth);
            expect(simulate.numericDecision(fixtures.commonwealth, fixtures.orion)).to.eql(fixtures.commonwealth);
        });
        it('should identify equal fleets as a draw', () => {
            expect(simulate.numericDecision(fixtures.hasle, fixtures.commonwealth)).to.be.null;
        });
    });

    describe('NumericDestruction', function() {
        it('should find the winner of two unequal fleets', () => {
            const result = {
                winner: {name: 'orion', ships:0},
                looser: {name: 'commonwealth', ships:5}
            };
            expect(simulate.numericDestruction(fixtures.orion, fixtures.commonwealth)).to.eql(result);
            expect(simulate.numericDestruction(fixtures.commonwealth, fixtures.orion)).to.eql(result);
        });
        it('should identify equal fleets as a draw', () => {
            const result = {
                draw1: {name: 'hasle', ships:0},
                draw2: {name: 'commonwealth', ships:0}
            };
            expect(simulate.numericDestruction(fixtures.hasle, fixtures.commonwealth)).to.eql(result);
        });
    });

    describe('numericFightFrame', function() {
        it('should reduce shipcount by rounded 1/10 of competitor ships', () => {
            const result = {
                fleet1: {name: 'orion', ships:265},
                fleet2: {name: 'commonwealth', ships:270}
            };
            expect(simulate.numericFightFrame(fixtures.orion, fixtures.commonwealth)).to.eql(result);
        });
        it('should produce a bigger gap after 5 rounds', () => {
            const result = {
                fleet1: {name: 'orion', ships:154},
                fleet2: {name: 'commonwealth', ships:162}
            };

            let fleets = {
                fleet1:fixtures.orion,
                fleet2:fixtures.commonwealth
            };

            for (let i = 0; i < 6; i++) {
                fleets = simulate.numericFightFrame(fleets.fleet1, fleets.fleet2);
            }

            expect(fleets).to.eql(result);
        });
        it('should take 25 frames in a calculated setup', done => {
            let fleets = {
                fleet1:fixtures.orion,
                fleet2:fixtures.commonwealth
            };

            let counter = 0;
            let winner = false;

            while(!winner){
                counter++;
                fleets = simulate.numericFightFrame(fleets.fleet1, fleets.fleet2);
                if(fleets.fleet1.ships <= 0 || fleets.fleet2.ships <= 0) winner = true;
            }
            expect(counter).to.eql(25);
            expect(fleets.fleet1.ships).to.eql(0);
            expect(fleets.fleet2.ships).to.eql(43);
            done();
        });

        it('should properly clalculate a draw', done => {
            let fleets = {
                fleet1:fixtures.commonwealth,
                fleet2:fixtures.hasle
            };

            let winner = false;

            while(!winner){
                fleets = simulate.numericFightFrame(fleets.fleet1, fleets.fleet2);
                if(fleets.fleet1.ships <= 0 || fleets.fleet2.ships <= 0) winner = true;
            }
            expect(fleets.fleet1.ships).to.eql(0);
            expect(fleets.fleet2.ships).to.eql(0);
            done();
        });
    });
});
