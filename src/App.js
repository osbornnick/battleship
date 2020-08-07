import React, {useState} from 'react';
import Battleship from './Components/Battleship.js';
import Console from './Components/Console';
import Header from './Components/Header';
import Run from './gameRunner.js';
import PubSub from 'PubSub';

export default function App() {
    const [playing, setPlaying] = useState(false);
    const pubsub = new PubSub();
    const game = Run(pubsub);
    

    return (
        <div className="container mx-auto flex flex-col">
            <Header />
            <Battleship game={game} playing={playing} pubsub={pubsub}/>
            <Console playing={playing} setPlaying={setPlaying}/>
        </div>
    )
}