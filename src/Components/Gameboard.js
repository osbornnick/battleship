import React, {useState} from 'react';
import {arrayInArray} from '../arrayUtilities.js'

export function MyBoard(props) {
    const board = props.board;
    let cells = [];
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let missed = arrayInArray(board.misses, [j, i]);
            cells.push(<Cell id={[j, i]} key={[j,i]} ship={board.loc(j, i)} missed={missed}/>)
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

function Cell(props) {
    const {ship, indexInShip} = props.ship;
    let hit = false;
    if (ship) {
        hit = ship.hits[indexInShip];
    }
    if (hit) {
        return <Hit />
    } else if (props.missed) {
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
            let missed = board.misses.includes([j, i]);
            cells.push(<EnemyCell id={[j, i]} key={[j, i]} ship={board.loc(j, i)} missed={missed} pubsub={props.pubsub} whoseTurn={props.whoseTurn}/>)
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
    const ship = props.ship.ship;
    const [hit, setHit] = useState(false);
    const [miss, setMiss] = useState(false);
    
    const handleClick = (e) => {
        if (props.whoseTurn === 1) {
            props.pubsub.publish('user_move', {move: props.id});
            if (ship) {
                setHit(true);
            } else {
                setMiss(true)
            }
        }
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