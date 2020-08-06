const { Player, AI } = require('./Player');

class Game {
    constructor(players = [new Player(), new AI()]) {
        this.players = players;
        this.whoseTurn = 1;
    }

    playTurn(move) {
        const enemy = this.playerReceiving();
        enemy.receiveHit(move);
        this.toggleWhoseTurn();
    }

    toggleWhoseTurn() {
        this.whoseTurn = this.whoseTurn === 1 ? 2 : 1;
    }

    playerReceiving() {
        return this.players.find(player => {
         player.order !== this.whoseTurn
        })    
    }

    initializeBoard(gameboard) {
        const shipStartingPositions = [
            [4, [5, 9], "h"],
            [3, [2, 6], "v"],
            [3, [0, 6], "v"],
            [2, [0, 9], "v"],
            [2, [4, 3], "v"],
            [2, [8, 6], "h"],
            [1, [0, 3]],
            [1, [2, 1]],
            [1, [6, 6]],
            [1, [8, 4]],
        ]
        
        shipStartingPositions.forEach(ship => {
            gameboard.place(...ship);
        })
    }
}

module.exports = Game;