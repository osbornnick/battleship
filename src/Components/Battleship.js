import React, { useState } from 'react';
import { MyBoard, EnemyBoard } from './Gameboard.js';

export default function Battleship(props) {
    const game = props.game;

    const myBoard = game.players[0].gameboard;
    const enemyBoard = game.players[1].gameboard;

    return (
        <div className="flex justify-around">
            <MyBoard board={myBoard}/>
            <EnemyBoard board={enemyBoard} whoseTurn={game.whoseTurn} pubsub={props.pubsub} />
        </div>
    )
}