const { shipFactory } = require('./Ship');
const { createArray } = require('./util');

const gameboardFactory = () => {
    function createBoard() {
        let board = createArray(10, 10);
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                board[j][i] = {ship: false, indexInShip: null}
            }   
        }
        return board
    }

    return ({
        board: createBoard(),
        loc(x, y) {
            return this.board[y][x];
        },
        ships: [],
        place(length, pos, orientation="v") {
            const [x, y] = pos;
            // throw error if OOB
            if (orientation === "v") {
                if (length + y > 10) {
                    throw new Error(`Placement vertically OOB: ${length+y} > 10`)
                }
            } else if (orientation === "h") {
               if (length + x > 10) {
                   throw new Error(`Placement horizontally OOB: ${length+x} > 10`)
               }
            }
            // throw error if overlap
            for (let i = 0; i < length; i++) {
                if (orientation === "v") {
                    if (this.loc(x, y+i).ship) {
                        const printer = JSON.stringify(this.loc(x, y+i));
                        throw new Error(`Cannot place on coordinate (${x}, ${y+i}), occupied by ${printer}`)
                    };
                } else if (orientation === "h") {
                    if (this.loc(x+i, y).ship) {
                        const printer = JSON.stringify(this.loc(x+i, y));
                        throw new Error(`Cannot place on coordinate (${x+i}, ${y}), occupied by ${printer}`)
                    };
                }
            };

            const ship = shipFactory(length);
            this.ships.push(ship);
            for (let i = 0; i < length; i++) {
                if (orientation === "v") {
                    this.loc(x, y+i).ship = ship;
                    this.loc(x, y+i).indexInShip = i;
                } else if (orientation === "h") {
                    this.loc(x+i, y).ship = ship;
                    this.loc(x+i, y).indexInShip = i;
                }
            };
        },
        misses: [],
        receiveHit(x, y) {
            const { ship, indexInShip } = this.loc(x, y);
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
        }
    })
}

module.exports = { gameboardFactory }