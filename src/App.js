import React, {useState} from 'react';
import Battleship from './Components/Battleship.js';
import Console from './Components/Console';
import Header from './Components/Header';

export default function App() {

    const [playing, setPlaying] = useState(false);

    return (
        <div className="container mx-auto flex flex-col">
            <Header />
            <Battleship playing={playing}/>
            <Console playing={playing} setPlaying={setPlaying}/>
        </div>
    )
}