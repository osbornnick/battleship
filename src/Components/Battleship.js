import React, { useState } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { MyBoard, EnemyBoard } from './Gameboard.js';
import { newInitializedGame, playTurn, moveShip, canMoveShip } from '../gameAPI.js';

const initialGame = newInitializedGame();

export default function Battleship(props) {

    const [game, setGame] = useState(initialGame);

    const myBoard = game.player.board;
    const enemyBoard = game.enemy.board;
    const onPlayerMove = (move) => {
        // make player and AI move
        const playerMoved = playTurn(game, move);
        if (playerMoved.whoseTurn === 2) {
            const aiMoved = playTurn(playerMoved);
            setGame(aiMoved);
        } else {
            setGame(playerMoved);
        }
    };

    const handleMoveShip = (oldPos, newPos) => {
        const shipMoved = moveShip(game, oldPos, newPos);
        setGame(shipMoved);
    }

    const handleCanMoveShip = (oldPos, newPos) => {
        return canMoveShip(oldPos, newPos, game);
    }

    return (
        <div className="flex justify-around">
            <DndProvider backend={HTML5Backend}>
                <MyBoard board={myBoard} canMoveShip={handleCanMoveShip} handleMoveShip={handleMoveShip}/>
            </DndProvider>
            <EnemyBoard board={enemyBoard} onPlayerMove={onPlayerMove} />
        </div>
    )
}