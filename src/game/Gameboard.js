const { shipFactory } = require('./Ship');

const gameboardFactory = () => {
    function createBoard() {
        board = new Array(10).fill(new Array(10))
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                board[i][j] = {ship: null, indexInShip: null}
            }   
        }
        return board
    }
    return ({
        board: createBoard(),
        ships: [],
        place(length, pos, orientation="v") {
            let [x, y] = pos;
            // throw error if OOB
            if (orientation === "v") {
                if (length + y > 9) {
                    throw new Error(`Placement vertcally OOB: ${length+y} > 9`)
                }
            } else if (orientation === "h") {
               if (length + x > 9) {
                throw new Error(`Placement horizontally OOB: ${length+x} > 9`)
               }
            }

            for (let i = 0; i < length; i++) {
                let X = x;
                let Y = y;
                if (board[X][Y].ship) {
                    throw new Error(`Cannot place on coordinate (${x}, ${y}), occupied by ${board[x][y].ship}`)
                };
                if (orientation === "v") {
                    X++;
                } else if (orientation === "h") {
                    Y++;
                }
            };

            const ship = shipFactory(length);
            for (let i = 0; i < length; i++) {
                board[x][y].ship = ship;
                this.ships.push(ship);
                board[x][y].indexInShip = i;
                if (orientation === "v") {
                    y++;
                } else if (orientation === "h") {
                    x++;
                }
            }
        },
        misses: new Array(),
        receiveHit(x, y) {
            const { ship, indexInShip } = board[x][y];
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