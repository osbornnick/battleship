const { Player, AI } = require('./Player');

class Game {

    constructor(players = [new Player(1), new AI(2)]) {
        this.players = players;
        this.whoseTurn = 1;
    }

    Play() {
        while (this.players.every(player => !player.gameboard.isGameOver())) {
            let move = null;
            while (!move) {
                console.log("waiting for move")
                // move = getMove();
            }
            this.playTurn(move);
        }
    }

    playTurn(move) {
        const enemy = this.playerReceiving();
        enemy.gameboard.receiveHit(move);
        this.toggleWhoseTurn();
    }

    toggleWhoseTurn() {
        this.whoseTurn = this.whoseTurn === 1 ? 2 : 1;
    }

    playerReceiving() {
        return this.players.find(player => player.order !== this.whoseTurn)
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
            //console.log(ship)
            gameboard.place(...ship);
        })
    }
}

module.exports = Game;