const expect = require('chai').expect;
const simulate = require('./../src/index').simulate;

const orion = {
    name: 'orion',
    ships: 295
};

const commonwealth = {
    name: 'commonwealth',
    ships: 300
};

const hasle = {
    name: 'hasle',
    ships: 300
};

describe('simulations', function() {
    describe('numericDecision', function() {
        it('should find the winner of two unequal fleets', () => {
            expect(simulate.numericDecision(orion, commonwealth)).to.eql(commonwealth);
            expect(simulate.numericDecision(commonwealth, orion)).to.eql(commonwealth);
        });
        it('should identify equal fleets as a draw', () => {
            expect(simulate.numericDecision(hasle, commonwealth)).to.be.null;
        });
    });
    describe('NumericDestruction', function() {
        it('should find the winner of two unequal fleets', () => {
            const result = {
                winner: {name: 'orion', ships:0},
                looser: {name: 'commonwealth', ships:5}
            };
            expect(simulate.numericDestruction(orion, commonwealth)).to.eql(result);
            expect(simulate.numericDestruction(commonwealth, orion)).to.eql(result);
        });
        it('should identify equal fleets as a draw', () => {
            const result = {
                draw1: {name: 'hasle', ships:0},
                draw2: {name: 'commonwealth', ships:0}
            };
            expect(simulate.numericDestruction(hasle, commonwealth)).to.eql(result);
        });
    });
});
