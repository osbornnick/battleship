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

    static deserialize({player, enemy, whoseTurn}) {
        const game = new Game();
        game.players[0].moves = player.moves;
        game.players[0].gameboard.misses = player.board.misses;
        game.players[0].gameboard.ships = player.board.ships;
        game.players[0].gameboard.grid = player.board.grid;

        game.players[1].moves = enemy.moves;
        game.players[1].gameboard.misses = enemy.board.misses;
        game.players[1].gameboard.ships = enemy.board.ships
        game.players[1].gameboard.grid = enemy.board.grid;

        game.whoseTurn = whoseTurn;
        return game
    }

    serialize() {
        return {
            player: {
                board: {
                    misses: this.players[0].gameboard.misses,
                    ships: this.players[0].gameboard.ships,
                    grid: this.players[0].gameboard.grid,
                },
                moves: this.players[0].moves
            },
            enemy: {
                board: {
                    misses: this.players[1].gameboard.misses,
                    ships: this.players[1].gameboard.ships,
                    grid: this.players[1].gameboard.grid,
                },
                moves: this.players[1].moves
            },
            whoseTurn: this.whoseTurn,
        }
    }

    playTurn(move) {
        let hit;
        if (this.whoseTurn === 1) {
            hit = this.playHumanTurn(move);
        } else {
            hit = this.playAITurn();
        }
        if (!hit) {
            this.toggleWhoseTurn();
        }
    }

    playHumanTurn(pos) {
        return this.playerShooting().move(...pos, this.playerReceiving().gameboard);
    }

    playAITurn() {
        return this.playerShooting().move(this.playerReceiving().gameboard);
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

    isOver() {
        if (this.players[0].gameboard.isGameOver() || this.players[1].gamebaord.isGameOver()) {
            return true;
        }
        return false;
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