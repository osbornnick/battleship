import React, {useState} from 'react';
import Battleship from './Components/Battleship.js';
import Console from './Components/Console';
import Header from './Components/Header';
import Run from './gameRunner.js';
import PubSub from 'PubSub';

const pubsub = new PubSub();
const game = Run(pubsub);
console.log("game created");

export default function App() {

    const [playing, setPlaying] = useState(false);

    return (
        <div className="container mx-auto flex flex-col">
            <Header />
            <Battleship playing={playing} game={game} pubsub={pubsub}/>
            <Console playing={playing} setPlaying={setPlaying}/>
        </div>
    )
}