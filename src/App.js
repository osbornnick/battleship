import React, {useState} from 'react';
import Battleship from './Components/Battleship.js';
import Console from './Components/Console';
import Header from './Components/Header';
import Game from './game/Game.js';

export default function App() {
    const [playing, setPlaying] = useState(false);
    const setup = () => {
        const game = new Game();
        game.players.forEach(player => {
            game.initializeBoard(player.gameboard);
        })
        return game;
    }
    const game = setup();
    // TEMP SETUP
    

    return (
        <div className="container mx-auto flex flex-col">
            <Header />
            <Battleship game={game}/>
            <Console playing={playing} setPlaying={setPlaying}/>
        </div>
    )
}