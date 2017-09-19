const combat = require('./../src/index').combat;
const expect = require('chai').expect;
const units = require('./../src/index').units;

describe('combat and units', function() {
  describe('shipClasses', function() {

    it('Fighters should elimnate themselves in 6 frames', done => {
      const ship1 = new units.classes.Fighter();
      const ship2 = new units.classes.Fighter();
      let winner = false;
      let counter = 0;
      while(!winner){
        counter++;
        combat.combatFrame({ship1, ship2});
        if(!ship1.isAlive() || !ship2.isAlive()) winner = true;
      }
      expect(ship1.isAlive()).to.be.false;
      expect(ship2.isAlive()).to.be.false;
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
        combat.combatFrame({ship1, ship2});
        if(!ship1.isAlive() || !ship2.isAlive()) winner = true;
      }
      expect(ship1.isAlive()).to.be.false;
      expect(ship2.isAlive()).to.be.false;
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
        combat.combatFrame({ship1, ship2});
        if(!ship1.isAlive() || !ship2.isAlive()) winner = true;
      }
      expect(ship1.isAlive()).to.be.true;
      expect(ship2.isAlive()).to.be.false;
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
        combat.combatFrame({ship1, ship2});
        if(!ship1.isAlive() || !ship2.isAlive()) winner = true;
      }
      expect(ship1.isAlive()).to.be.false;
      expect(ship2.isAlive()).to.be.false;
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
        combat.combatFrame({ship1, ship2});
        if(!ship1.isAlive() || !ship2.isAlive()) winner = true;
      }
      expect(ship1.isAlive()).to.be.true;
      expect(ship2.isAlive()).to.be.false;
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
        combat.combatFrame({ship1, ship2});
        if(!ship1.isAlive() || !ship2.isAlive()) winner = true;
      }
      expect(ship1.isAlive()).to.be.true;
      expect(ship2.isAlive()).to.be.false;
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
        combat.combatFrame({ship1, ship2});
        if(!ship1.isAlive() || !ship2.isAlive()) winner = true;
      }
      expect(ship1.isAlive()).to.be.false;
      expect(ship2.isAlive()).to.be.false;
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
        combat.combatFrame({ship1, ship2});
        if(!ship1.isAlive() || !ship2.isAlive()) winner = true;
      }
      expect(ship1.isAlive()).to.be.true;
      expect(ship2.isAlive()).to.be.false;
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
        combat.combatFrame({ship1, ship2});
        if(!ship1.isAlive() || !ship2.isAlive()) winner = true;
      }
      expect(ship1.isAlive()).to.be.true;
      expect(ship2.isAlive()).to.be.false;
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
        combat.combatFrame({ship1, ship2});
        if(!ship1.isAlive() || !ship2.isAlive()) winner = true;
      }
      expect(ship1.isAlive()).to.be.true;
      expect(ship2.isAlive()).to.be.false;
      expect(counter).to.eql(1);
      done();
    });

  });
});
