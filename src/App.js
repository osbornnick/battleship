import React from 'react';
import Board from './Components/gameboard';
import Console from './Components/Console';
import Header from './Components/Header';
import Game from './game/Game.js';

export default function App() {
    const setup = () => {
        const game = new Game();
        game.players.forEach(player => {
            game.initializeBoard(player.gameboard);
        })
    }
    setup();
    // TEMP SETUP
    

    return (
        <div className="container mx-auto flex flex-col">
            <Header />
            <Board />
            <Console />
        </div>
    )
}