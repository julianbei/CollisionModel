const expect = require('chai').expect;
const navigation = require('./../src/index');

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
    expect(unit.tile).to.eql(map.system[5][3]);
    done();
  });

  it('should remove a Simple unit from map', done => {
    const unit = new navigation.Unit('test1');
    const map = new navigation.Map(20,13);
    map.setContent(unit, {x:5,y:3});
    map.system[5][3].removeContent(unit);
    expect(unit.id).to.eq('test1');
    expect(unit.tile).to.eq(undefined);
    expect(map.getContent({x:5, y:3})).to.be.empty;
    done();
  });

  it('should change the position of a Simple unit', done => {
    const unit = new navigation.Unit('test1');
    const map = new navigation.Map(20,13);
    map.setContent(unit, {x:5,y:3});
    unit.changePosition({x:2,y:5});
    expect(unit.id).to.eq('test1');
    expect(unit.tile).to.eq(map.system[2][5]);
    expect(map.getContent({x:5, y:3})).to.be.empty;
    done();
  });

  it('a unit should remove itself from map', done => {
    const unit = new navigation.Unit('test1');
    const map = new navigation.Map(20,13);
    map.setContent(unit, {x:5,y:3});
    unit.removeFromMap();
    expect(unit.id).to.eq('test1');
    expect(unit.tile).to.eq(undefined);
    expect(map.getContent({x:5, y:3})).to.be.empty;
    done();
  });
});
