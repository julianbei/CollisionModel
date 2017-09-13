function decision(fleet1, fleet2){
    if (fleet1.ships > fleet2.ships) return fleet1;
    if (fleet1.ships < fleet2.ships) return fleet2;
    return null;
}

function destruction(fleet1, fleet2){
    // simulate destruction of ships
    let ships = fleet1.ships - fleet2.ships;
    // clone parameter objects for immutability
    let combattant1 = {name: fleet1.name, ships};
    let combattant2 = {name: fleet2.name, ships: ships*-1};

    if (ships > 0) {
        combattant2.ships = 0;
        return {
            winner: combattant2,
            looser: combattant1
        };
    }
    if(ships < 0){
        combattant1.ships = 0;
        return {
            winner: combattant1,
            looser: combattant2
        };
    }
    combattant2.ships = 0;
    return {
        draw1: combattant1,
        draw2: combattant2
    };
}

function fightFrame(fleet1, fleet2){
    const power1 = Math.round(fleet1.ships / 10) || 1;
    const power2 = Math.round(fleet2.ships / 10) || 1;
    const result = {
        fleet1: {
            name: fleet1.name,
            ships: fleet1.ships - power2
        },
        fleet2: {
            name: fleet2.name,
            ships: fleet2.ships - power1
        }
    };
    if(result.fleet1.ships < 0) result.fleet1.ships = 0;
    if(result.fleet2.ships < 0) result.fleet2.ships = 0;
    return result;
}

module.exports = {
    decision,
    destruction,
    fightFrame
};
