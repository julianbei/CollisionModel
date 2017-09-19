const expect = require('chai').expect;
const run = require('./../src/run');
const game = require('./../src/');

describe('screen game run.js', function() {
  it('should draw a simple fight', done => {
    const ship1 = new game.units.classes.Dreadnaught();
    const ship2 = new game.units.classes.Dreadnaught();

    const gameState = {
      combat: {
        ship1,
        ship2,
      },
      final: false
    };

    function finish(result){
      expect(result.combat.ship1.alive()).to.be.false;
      expect(result.combat.ship2.alive()).to.be.false;
      done();
    }

    run(gameState, finish);
  }).timeout(20000);
});
