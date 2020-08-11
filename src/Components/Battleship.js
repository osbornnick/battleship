import React, { useState } from 'react';
import { MyBoard, EnemyBoard } from './Gameboard.js';
import { newInitializedGame, playTurn } from '../gameAPI.js';

const initialGame = newInitializedGame();

export default function Battleship(props) {

    const [game, setGame] = useState(initialGame);

    const myBoard = game.player.board;
    const enemyBoard = game.enemy.board;
    const onPlayerMove = (move) => {
        // make player and AI move
        const playerMoved = playTurn(game, move)
        const aiMoved = playTurn(playerMoved);
        setGame(aiMoved);
    };
    return (
        <div className="flex justify-around">
            <MyBoard board={myBoard}/>
            <EnemyBoard board={enemyBoard} onPlayerMove={onPlayerMove}/>
        </div>
    )
}