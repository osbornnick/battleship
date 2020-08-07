import Game from './game/Game.js';

export default function Run(pubsub) {
    const game = new Game();
        game.players.forEach(player => {
            game.initializeBoard(player.gameboard);
        })

    pubsub.subscribe('user_move', () => {
        console.log("user move");
        game.playAITurn();
        game.toggleWhoseTurn();
    })

    return game
}