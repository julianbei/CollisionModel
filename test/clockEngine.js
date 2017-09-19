const expect = require('chai').expect;
const units = require('./../src/index').units;
const combat = require('./../src/index').combat;
const clockEngine = require('./../src/index').clockEngine;

describe('clockEngine', function() {

  it('should run a simple fight', done => {
    const ship1 = new units.classes.Dreadnaught();
    const ship2 = new units.classes.Dreadnaught();

    const gameState = {
      combat: {
        ship1,
        ship2,
      },
      frames: 0,
      final: false
    };

    function combatSimulation(state){
      state.frames++;
      combat.combatFrame(state.combat);
      if(!state.combat.ship1.alive() || !state.combat.ship2.alive()) {
        state.final = true;
      }
      return state;
    }

    function finish(result){
      expect(result.combat.ship1.alive()).to.be.false;
      expect(result.combat.ship2.alive()).to.be.false;
      expect(result.frames).to.eql(60);
      done();
    }

    clockEngine.nextFrame(combatSimulation, gameState, finish);
  }).timeout(20000);

  // it('should draw a simple fight', done => {
  // const baseGame = require('./../src/index');
  //   const ship1 = new units.classes.Dreadnaught();
  //   const ship2 = new units.classes.Dreadnaught();
  //
  //   const gameState = {
  //     combat: {
  //       ship1,
  //       ship2,
  //     },
  //     final: false
  //   };
  //
  //   function finish(result){
  //     expect(result.combat.ship1.alive()).to.be.false;
  //     expect(result.combat.ship2.alive()).to.be.false;
  //     done();
  //   }
  //
  //   baseGame.run(gameState, finish);
  // }).timeout(20000);
});