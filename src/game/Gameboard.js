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
            } else {
                this.misses.push([x, y])
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
            shipOOB(length, pos, orientation);
            shipOverlap(length, pos, orientation, this.grid);
            const ship = shipFactory(length);
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

        }
    }
}

function shipOOB(length, pos, orientation) {
    const [x, y] = pos;
    if (orientation === "v") {
        if (length + y > 10) {
            throw new Error(`Placement vertically OOB: ${length+y} > 10`)
        }
    } else if (orientation === "h") {
       if (length + x > 10) {
           throw new Error(`Placement horizontally OOB: ${length+x} > 10`)
       }
    }
}

function shipOverlap(length, pos, orientation, grid) {
    const [x, y] = pos;
    for (let i = 0; i < length; i++) {
        if (orientation === "v") {
            if (grid[y+i][x].ship) {
                const printer = JSON.stringify(this.grid[y+i][x]);
                throw new Error(`Cannot place on coordinate (${x}, ${y+i}), occupied by ${printer}`)
            };
        } else if (orientation === "h") {
            if (grid[y][x+i].ship) {
                const printer = JSON.stringify(this.grid[y][x+i]);
                throw new Error(`Cannot place on coordinate (${x+i}, ${y}), occupied by ${printer}`)
            };
        }
    };
}

module.exports = { gameboardFactory }