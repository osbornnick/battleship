const { gameboardFactory } = require('./Gameboard');
const { arrayInArray } = require('./arrayUtilities');

class Player {
    constructor(order = 1) {
        this.gameboard = gameboardFactory();
        this.moves = [];
        this.order = order;
        this.isAI = false;
    }

    move(x, y, enemyGameboard) {
        this.moves.push([x, y]);
        enemyGameboard.receiveHit(x, y);
    }
}

class AI {
    constructor(order = 2) {
        this.gameboard = gameboardFactory();
        this.moves = [];
        this.order = order;
        this.isAI = true;
    }

    generatePossibleMoves() {
        let possibleMoves = []
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (!arrayInArray(this.moves, [i, j])) {
                    possibleMoves.push([i, j]);
                }
            }
        }
        return possibleMoves;
    }

    move(enemyGameboard) {
        const possibleMoves = this.generatePossibleMoves();
        const choice = randomChoice(possibleMoves);
        enemyGameboard.receiveHit(...choice);
        this.moves.push(choice);
    }

}

function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = {
    Player,
    AI
}