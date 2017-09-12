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
});
