import Game from './game/Game.js';

export default function Run() {
    const game = new Game();
    game.players.forEach(player => {
        game.initializeBoard(player.gameboard);
    });
    
    return game
}