const { shipFactory } = require('./Ship');
const { createBoard } = require('./util');

const gameboardFactory = () => {
    return {
        grid: createBoard(),
        ships: [],
        misses: [],
        receiveHit(x, y) {
            const {ship, indexInShip} = this.grid[y][x];
            if (ship) {
                ship.hit(indexInShip);
                return true;
            } else {
                this.misses.push([x, y])
                return false;
            }
        },
        isGameOver() {
            for (let ship of this.ships) {
                if (!ship.isSunk()) {
                    return false
                }
            }
            return true
        },
        place(length, pos, orientation="v") {
            const [x, y] = pos;
            const ship = shipFactory(length, orientation);
            shipOOB(ship, pos);
            shipOverlap(ship, pos, this.grid);
            this.ships.push(ship);
            for (let i = 0; i < length; i++) {
                if (orientation === "v") {
                    this.grid[y+i][x].ship = ship;
                    this.grid[y+i][x].indexInShip = i;
                } else if (orientation === "h") {
                    this.grid[y][x+i].ship = ship;
                    this.grid[y][x+i].indexInShip = i;
                }
            };
        },
        move(oldPos, newPos) {
            const [oldX, oldY] = oldPos;
            const cellObject = this.grid[oldY][oldX];
            const {ship, indexInShip} = cellObject;
            if (!ship) {
                return false
            }
            const [oldBaseX, oldBaseY] = ship.orientation === "v" ? [oldX, oldY-indexInShip] : [oldX - indexInShip, oldY]

            const [newX, newY] = newPos;
            const newBase = ship.orientation === "v" ? [newX, newY-indexInShip] : [newX - indexInShip, newY];
            const [newBaseX, newBaseY] = newBase;
            if (validPosition(ship, newBase, this.grid)) {
                for (let i = 0; i < ship.length; i++) {
                    if (ship.orientation === "v") {
                        this.grid[oldBaseY+i][oldBaseX] = {ship: false, indexInShip: null};
                        this.grid[newBaseY+i][newBaseX] = cellObject;
                    } else if (ship.orientation === "h") {
                        this.grid[oldBaseY][oldBaseX+i] = {ship: false, indexInShip: null};
                        this.grid[newBaseY][newBaseX+i] = cellObject;
                    }
                }
                return true
            }
            return false
        }
    }
}

function validPosition(ship, pos, grid) {
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

module.exports = { gameboardFactory }