const expect = require('chai').expect;
const units = require('./../src/index').units;

describe('simulations', function() {
  describe('unit simple', function() {
    describe('shipClasses', function() {

      it('Fighters should elimnate themselves in 6 frames', done => {
        const ship1 = new units.classes.Fighter();
        const ship2 = new units.classes.Fighter();
        let winner = false;
        let counter = 0;
        while(!winner){
          counter++;
          units.combatFrame({ship1, ship2});
          if(!ship1.alive() || !ship2.alive()) winner = true;
        }
        expect(ship1.alive()).to.be.false;
        expect(ship2.alive()).to.be.false;
        expect(counter).to.eql(6);
        done();
      });
      it('Corvettes should elimnate themselves in 10 frames', done => {
        const ship1 = new units.classes.Corvette();
        const ship2 = new units.classes.Corvette();
        let winner = false;
        let counter = 0;
        while(!winner){
          counter++;
          units.combatFrame({ship1, ship2});
          if(!ship1.alive() || !ship2.alive()) winner = true;
        }
        expect(ship1.alive()).to.be.false;
        expect(ship2.alive()).to.be.false;
        expect(counter).to.eql(10);
        done();
      });
      it('Corvettes should elimnate fighters in 4 frames', done => {
        const ship1 = new units.classes.Corvette();
        const ship2 = new units.classes.Fighter();
        let winner = false;
        let counter = 0;
        while(!winner){
          counter++;
          units.combatFrame({ship1, ship2});
          if(!ship1.alive() || !ship2.alive()) winner = true;
        }
        expect(ship1.alive()).to.be.true;
        expect(ship2.alive()).to.be.false;
        expect(counter).to.eql(4);
        done();
      });

      it('Cruisers should elimnate themselves in 30 frames', done => {
        const ship1 = new units.classes.Cruiser();
        const ship2 = new units.classes.Cruiser();
        let winner = false;
        let counter = 0;
        while(!winner){
          counter++;
          units.combatFrame({ship1, ship2});
          if(!ship1.alive() || !ship2.alive()) winner = true;
        }
        expect(ship1.alive()).to.be.false;
        expect(ship2.alive()).to.be.false;
        expect(counter).to.eql(30);
        done();
      });

      it('Cruisers should elimnate corvettes in 4 frames', done => {
        const ship1 = new units.classes.Cruiser();
        const ship2 = new units.classes.Corvette();
        let winner = false;
        let counter = 0;
        while(!winner){
          counter++;
          units.combatFrame({ship1, ship2});
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
          units.combatFrame({ship1, ship2});
          if(!ship1.alive() || !ship2.alive()) winner = true;
        }
        expect(ship1.alive()).to.be.true;
        expect(ship2.alive()).to.be.false;
        expect(counter).to.eql(2);
        done();
      });

      it('Dreadnaughts should elimnate themselves in 60 frames', done => {
        const ship1 = new units.classes.Dreadnaught();
        const ship2 = new units.classes.Dreadnaught();
        let winner = false;
        let counter = 0;
        while(!winner){
          counter++;
          units.combatFrame({ship1, ship2});
          if(!ship1.alive() || !ship2.alive()) winner = true;
        }
        expect(ship1.alive()).to.be.false;
        expect(ship2.alive()).to.be.false;
        expect(counter).to.eql(60);
        done();
      });

      it('Dreadnaughts should elimnate cruisers in 24 frames', done => {
        const ship1 = new units.classes.Dreadnaught();
        const ship2 = new units.classes.Cruiser();
        let winner = false;
        let counter = 0;
        while(!winner){
          counter++;
          units.combatFrame({ship1, ship2});
          if(!ship1.alive() || !ship2.alive()) winner = true;
        }
        expect(ship1.alive()).to.be.true;
        expect(ship2.alive()).to.be.false;
        expect(counter).to.eql(24);
        done();
      });

      it('Dreadnaughts should elimnate corvettes in 2 frames', done => {
        const ship1 = new units.classes.Dreadnaught();
        const ship2 = new units.classes.Corvette();
        let winner = false;
        let counter = 0;
        while(!winner){
          counter++;
          units.combatFrame({ship1, ship2});
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
          units.combatFrame({ship1, ship2});
          if(!ship1.alive() || !ship2.alive()) winner = true;
        }
        expect(ship1.alive()).to.be.true;
        expect(ship2.alive()).to.be.false;
        expect(counter).to.eql(1);
        done();
      });

    });

    describe('game', function() {
      const game = require('./../src/index').units.clockEngine;

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
          units.combatFrame(state.combat);
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

        game.nextFrame(combatSimulation, gameState, finish);
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
  });
});
