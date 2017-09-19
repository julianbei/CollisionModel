const expect = require('chai').expect;
const navigation = require('./../src/index').navigation;

describe('tile navigation system', function() {
  it('should create a 2D tile map', done => {
    const map = new navigation.Map(20,13);
    expect(map.system.length).to.eq(20);
    expect(map.system[0].length).to.eq(13);
    expect(map.system[0][12].constructor.name).to.eq('Tile');
    done();
  });
  it('should create a Simple unit', done => {
    const unit = new navigation.Unit('test1');
    expect(unit.id).to.eq('test1');
    done();
  });

  it('should add a Simple unit to map', done => {
    const unit = new navigation.Unit('test1');
    const map = new navigation.Map(20,13);
    map.setContent(unit, {x:5,y:3});
    expect(unit.id).to.eq('test1');
    expect(unit.getPosition()).to.eql(map.system[5][3]);
    done();
  });

  it('should remove a Simple unit from map', done => {
    const unit = new navigation.Unit('test1');
    const map = new navigation.Map(20,13);
    map.setContent(unit, {x:5,y:3});
    map.system[5][3].removeContent(unit);
    expect(unit.id).to.eq('test1');
    expect(unit.getPosition()).to.eq(undefined);
    expect(map.getContent({x:5, y:3})).to.be.empty;
    done();
  });

  it('should change the position of a Simple unit', done => {
    const unit = new navigation.Unit('test1');
    const map = new navigation.Map(20,13);
    map.setContent(unit, {x:5,y:3});
    unit.changePosition({x:2,y:5});
    expect(unit.id).to.eq('test1');
    expect(unit.getPosition()).to.eq(map.system[2][5]);
    expect(map.getContent({x:5, y:3})).to.be.empty;
    done();
  });

  it('a unit should remove itself from map', done => {
    const unit = new navigation.Unit('test1');
    const map = new navigation.Map(20,13);
    map.setContent(unit, {x:5,y:3});
    unit.removeFromMap();
    expect(unit.id).to.eq('test1');
    expect(unit.getPosition()).to.eq(undefined);
    expect(map.getContent({x:5, y:3})).to.be.empty;
    done();
  });
  it('find near units', done => {
    const unit = new navigation.Unit('test1');
    const neighbor = new navigation.Unit('neighbor');
    const map = new navigation.Map(20,13);
    map.setContent(unit, {x:0,y:0});
    map.setContent(neighbor, {x:1,y:0});
    const neighbors = unit.findNearUnits(1);
    expect(neighbors).to.not.be.empty;
    expect(neighbors[0]).to.eql(neighbor);
    done();
  });
  it('find near units on a larger scale', done => {
    const unit = new navigation.Unit('test1');
    const neighbor1 = new navigation.Unit('neighbor1');
    const neighbor2 = new navigation.Unit('neighbor2');
    const map = new navigation.Map(20,13);
    map.setContent(unit, {x:3,y:3});
    map.setContent(neighbor1, {x:1,y:0});
    map.setContent(neighbor2, {x:2,y:2});
    const neighbors = unit.findNearUnits(2);
    expect(neighbors).to.not.be.empty;
    expect(neighbors[0]).to.eql(neighbor2);
    done();
  });
  it('find near units on an even larger scale', done => {
    const unit = new navigation.Unit('test1');
    const neighbor1 = new navigation.Unit('neighbor1');
    const neighbor2 = new navigation.Unit('neighbor2');
    const map = new navigation.Map(20,13);
    map.setContent(unit, {x:3,y:3});
    map.setContent(neighbor1, {x:1,y:0});
    map.setContent(neighbor2, {x:2,y:2});
    const neighbors = unit.findNearUnits(3);
    expect(neighbors).to.not.be.empty;
    expect(neighbors[0]).to.eql(neighbor1);
    expect(neighbors[1]).to.eql(neighbor2);
    done();
  });
});
