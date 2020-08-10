import Game from './game/Game.js';

export default function Run(pubsub) {
    const game = new Game();
    game.players.forEach(player => {
        game.initializeBoard(player.gameboard);
    });

    pubsub.subscribe('user_move', ({move}) => {
        // console.log("user move");
        game.playHumanTurn(move)
        pubsub.publish('enemyboard_update')
        game.playAITurn();
        // console.log("ai move")
        pubsub.publish("myboard_update");
    })

    return game
}