import Game from './game/Game';

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

// module.exports = { newGame, newInitializedGame, playTurn };