const { Gameboard } = require('./Gameboard');

class Player {
    constructor(order = 1) {
        this.gameboard = new Gameboard();
        this.moves = [];
        this.order = order;
        this.isAI = false;
    }

    move(x, y, enemyGameboard) {
        this.moves.push([x, y])
        enemyGameboard.receiveHit(x, y);
    }
}

class AI {
    constructor(order = 2) {
        this.gameboard = new Gameboard();
        this.possibleMoves = [];
        this.generatePossibleMoves();
        this.moves = [];
        this.order = order;
        this.isAI = true;
    }

    generatePossibleMoves() {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                this.possibleMoves.push([i, j]);
            }
        }
    }

    move(enemyGameboard) {
        const choice = randomChoice(this.possibleMoves);
        enemyGameboard.receiveHit(...choice);
        this.moves.push(choice);
        this.possibleMoves = removeFromArray(this.possibleMoves, choice);
    }

}

function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function removeFromArray(arr, ele) {
    const i = arr.indexOf(ele);
    if (i > -1) {
        arr.splice(i, 1);
    }
    return arr
}

module.exports = {
    Player,
    AI
}