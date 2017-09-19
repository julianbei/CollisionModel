const expect = require('chai').expect;
const tileMap = require('./../src/index').tileMap;
const Unit = require('./../src/index').units.Unit;

describe('movement logic', function() {
  it('should calculate the distance to units', done => {
    const unit = new Unit('test1');
    const neighbor1 = new Unit('neighbor1');
    const neighbor2 = new Unit('neighbor2');
    const map = new tileMap.Map(20,13);
    map.setContent(unit, {x:3,y:3});
    map.setContent(neighbor1, {x:1,y:0});
    map.setContent(neighbor2, {x:2,y:2});
    const neighbors = unit.findNearUnits(3);
    expect(neighbors).to.not.be.empty;
    expect(unit.distanceTo(neighbors[0])).to.eq(5);
    expect(unit.distanceTo(neighbors[1])).to.eq(2);
    done();
  });
  it('should find near enemy units ordered by distances', done => {
    const unit = new Unit('test1');
    const neighbor1 = new Unit('neighbor1');
    const neighbor2 = new Unit('neighbor2');
    const map = new tileMap.Map(20,13);
    map.setContent(unit, {x:3,y:3});
    map.setContent(neighbor1, {x:1,y:0});
    map.setContent(neighbor2, {x:2,y:2});
    const distances = unit.distanceToNearUnits(3);
    expect(distances[0].distance).to.eq(2);
    expect(distances[1].distance).to.eq(5);
    expect(distances[0].unit).to.eql(neighbor2);
    expect(distances[1].unit).to.eql(neighbor1);
    done();
  });
});
