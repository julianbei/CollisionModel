const expect = require('chai').expect;
const navigation = require('./../src/index');

describe('description', function() {
  it('should create a 2D tile map', done => {
    const map = new navigation.Map(20,13);
    expect(map.system.length).to.eq(20);
    expect(map.system[0].length).to.eq(13);
    expect(map.system[0][12].constructor.name).to.eq('Tile');
    done();
  });
});
