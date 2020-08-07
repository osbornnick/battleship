const { Player, AI } = require('./Player');

class Game {

    constructor(players = [new Player(1), new AI(2)]) {
        this.players = players;
        this.whoseTurn = 1;

        this.playAITurn = this.playAITurn.bind(this);
        this.toggleWhoseTurn = this.toggleWhoseTurn.bind(this);
        this.playerReceiving = this.playerReceiving.bind(this);
        this.playerShooting = this.playerShooting.bind(this);
    }

    playAITurn() {
        this.playerShooting().move(this.playerReceiving().gameboard)
    }

    toggleWhoseTurn() {
        this.whoseTurn = this.whoseTurn === 1 ? 2 : 1;
    }

    playerReceiving() {
        return this.players.find(player => player.order !== this.whoseTurn)
    }

    playerShooting() {
        return this.players.find(player => player.order === this.whoseTurn)
    }

    initializeBoard(gameboard) {
        const shipStartingPositions = [
            [4, [5, 9], "h"],
            [3, [2, 6], "v"],
            [3, [6, 1], "v"],
            [2, [9, 0], "v"],
            [2, [4, 3], "v"],
            [2, [8, 6], "h"],
            [1, [0, 3]],
            [1, [2, 1]],
            [1, [6, 6]],
            [1, [9, 3]],
        ]

        shipStartingPositions.forEach(ship => {
            gameboard.place(...ship);
        })
    }
}

module.exports = Game;