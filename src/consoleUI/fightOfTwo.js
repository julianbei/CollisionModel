var CLI = require('clui'),
  clc = require('cli-color');

function getScreen(){
  const Line          = CLI.Line;
  const LineBuffer    = CLI.LineBuffer;
  const Progress      = CLI.Progress;

  function updateScreen(state){
    var outputBuffer = new LineBuffer({
      x: 0,
      y: 0,
      width: 'console',
      height: 'console'
    });

    new Line(outputBuffer)
      .column('Fight State', 20, [clc.green])
      .fill()
      .store();

    new Line(outputBuffer)
      .fill()
      .store();

    new Line(outputBuffer)
      .column('class', 20, [clc.cyan])
      .column('hullSize', 20, [clc.cyan])
      .column('health', 30, [clc.cyan])
      .column('shield', 30, [clc.cyan])
      .fill()
      .store();

    const ship1 = state.combat.ship1.getStateReport();
    const ship2 = state.combat.ship2.getStateReport();

    const pr1 = new Progress(20);
    const pr2 = new Progress(20);
    const pr3 = new Progress(20);
    const pr4 = new Progress(20);

    new Line(outputBuffer)
      .column(ship1.class+'', 20)
      .column(ship1.hullSize+'', 20)
      .column(pr1.update(ship1.health.current, ship1.health.max), 30)
      .column(pr2.update(ship1.shield.current, ship1.shield.max), 30, [clc.cyan])
      .fill()
      .store();

    new Line(outputBuffer)
      .column(ship2.class+'', 20)
      .column(ship2.hullSize+'', 20)
      .column(pr3.update(ship2.health.current, ship2.health.max), 30)
      .column(pr4.update(ship2.shield.current, ship2.shield.max), 30, [clc.cyan])
      .fill()
      .store();

    for(var l = 0; l < 17; l++)
    {
      new Line(outputBuffer)
        .fill()
        .store();
    }
    outputBuffer.output();
  }

  return {
    updateScreen
  };
}

module.exports = {
  getScreen
};
