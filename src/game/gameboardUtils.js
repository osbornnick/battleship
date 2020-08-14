function isValidPosition(ship, pos, grid) {
    try {
        shipOOB(ship, pos);
        shipOverlap(ship, pos, grid);
    } catch (error) {
        return false
    }
    return true
}

function shipOOB(ship, pos) {
    const [x, y] = pos;
    if (ship.orientation === "v") {
        if (ship.length + y > 10) {
            throw new Error(`Placement vertically OOB: ${ship.length+y} > 10`)
        }
    } else if (ship.orientation === "h") {
       if (ship.length + x > 10) {
           throw new Error(`Placement horizontally OOB: ${ship.length+x} > 10`)
       }
    }
    return true
}

function shipOverlap(ship, pos, grid) {
    const [x, y] = pos;
    for (let i = 0; i < ship.length; i++) {
        if (ship.orientation === "v") {
            if (grid[y+i][x].ship) {
                const printer = JSON.stringify(this.grid[y+i][x]);
                throw new Error(`Cannot place on coordinate (${x}, ${y+i}), occupied by ${printer}`)
            };
        } else if (ship.orientation === "h") {
            if (grid[y][x+i].ship) {
                const printer = JSON.stringify(this.grid[y][x+i]);
                throw new Error(`Cannot place on coordinate (${x+i}, ${y}), occupied by ${printer}`)
            };
        }
    };
}

module.exports = { isValidPosition };