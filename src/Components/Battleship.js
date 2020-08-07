import React from 'react';
import { MyBoard, EnemyBoard } from './Gameboard.js';

export default function Battleship(props) {
    return (
        <div className="flex justify-around">
            <MyBoard player={props.game.players[0]} />
            <EnemyBoard player={props.game.players[1]} game={props.game} pubsub={props.pubsub} />
        </div>
    )
}