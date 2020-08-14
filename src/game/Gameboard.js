const { shipFactory } = require('./Ship');
const { createBoard } = require('./util');
const { isValidPosition } = require('./gameboardUtils');

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
            if (!isValidPosition(ship, pos, this.grid)) {
                throw Error(`invalid position: ${pos} for ${ship}`)
            };
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
            if (isValidPosition(ship, newBase, this.grid)) {
                for (let i = 0; i < ship.length; i++) {
                    if (ship.orientation === "v") {
                        this.grid[newBaseY+i][newBaseX] = this.grid[oldBaseY+i][oldBaseX];
                        this.grid[oldBaseY+i][oldBaseX] = {ship: false, indexInShip: null};
                    } else if (ship.orientation === "h") {
                        this.grid[newBaseY][newBaseX+i] = this.grid[oldBaseY][oldBaseX+i];
                        this.grid[oldBaseY][oldBaseX+i] = {ship: false, indexInShip: null};
                    }
                }
                return true
            }
            return false
        }
    }
}

module.exports = { gameboardFactory }