import React, {useState} from 'react';
import {arrayInArray} from '../game/arrayUtilities.js'

export function MyBoard(props) {
    const board = props.board;
    let cells = [];
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let missed = arrayInArray(board.misses, [j, i]);
            cells.push(<MyCell id={[j, i]} key={[j,i]} ship={board.grid[i][j]} missed={missed}/>)
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

function MyCell(props) {
    const {ship, indexInShip} = props.ship;
    let hit = ship ? ship.hits[indexInShip] : false
    let miss = props.missed;

    if (hit) {
        return <Hit />
    } else if (miss) {
        return <Miss />
    } else if (ship) {
        return <div className="hover:bg-gray-400 bg-indigo-300"></div>
    }
    return (
        <div className="hover:bg-gray-400 bg-white"></div>
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

function EnemyCell(props) {
    const {ship, indexInShip}  = props.ship;
    let hit = ship ? ship.hits[indexInShip] : false
    let miss = props.missed;
    const handleClick = (e) => {
        props.onPlayerMove(props.id);
    }
    if (hit) {
        return <Hit />
    } else if (miss) {
        return <Miss />
    } else {
        return <div className="hover:bg-gray-400 bg-white cursor-pointer" onClick={handleClick}></div>;

    }
}

function Hit() {
    return (
        <div className="bg-red-400"></div>
    )
}

function Miss() {
    return (
        <div className="bg-gray-400"></div>
    )
}