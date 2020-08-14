import Game from './game/Game';
const { isValidPosition } = require('./game/gameboardUtils');

function newGame() {
    const game = new Game();
    return game.serialize();
}

export function newInitializedGame() {
    const game = new Game();
    game.players.forEach(player => {
        game.initializeBoard(player.gameboard);
    });
    return game.serialize();
}

export function playTurn(serializedGame, move) {
    const game = Game.deserialize(serializedGame);
    game.playTurn(move);
    return game.serialize();
}

export function canMoveShip(oldPos, newPos, serializedGame) {
    // console.log(`oldPos ${oldPos}`);
    // console.log(`newPos ${newPos}`);
    const grid = serializedGame.player.board.grid;
    const ship = grid[oldPos[1]][oldPos[0]];
    return isValidPosition(ship, newPos, serializedGame.player.board.grid);
}

export function moveShip(serializedGame, oldPos, newPos) {
    const game = Game.deserialize(serializedGame);
    game.players[0].gameboard.move(oldPos, newPos);
    return game.serialize();
}

// module.exports = { newGame, newInitializedGame, playTurn };