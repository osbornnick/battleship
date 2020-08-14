import React from 'react';
import {arrayInArray} from '../game/arrayUtilities.js'
import {MyCell, EnemyCell} from './Cell';

export function MyBoard(props) {
    const board = props.board;
    let cells = [];
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let missed = arrayInArray(board.misses, [j, i]);
            cells.push(<MyCell id={[j, i]} key={[j,i]} ship={board.grid[i][j]} missed={missed} canMoveShip={props.canMoveShip} handleMoveShip={props.handleMoveShip}/>)
        }
    }
    return (
        <div className="flex justify-center">
            <div className="gameboard bg-indigo-200 gap-px border-solid border">
                {cells}
            </div>
        </div>
    )
}

export function EnemyBoard(props) {
    const board = props.board;
    let cells = []
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let missed = arrayInArray(board.misses, [j, i]);
            const newCell = <EnemyCell id={[j, i]} key={[j, i]} ship={board.grid[i][j]} missed={missed} onPlayerMove={props.onPlayerMove}/>
            cells.push(newCell);
        }
    }
    return (
        <div className="flex justify-center">
            <div className="gameboard bg-indigo-200 gap-px border-solid border">
                {cells}
            </div>
        </div>
    )
}