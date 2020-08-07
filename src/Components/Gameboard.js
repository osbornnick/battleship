import React, {useState} from 'react';
const PubSub = require('PubSub');

let pubsub = new PubSub();

export function MyBoard(props) {
    const board = props.player.gameboard;
    let cells = [];
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            cells.push(<Cell id={[j, i]} key={[j,i]} ship={board.loc(j, i)}/>)
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
    const ship = props.ship.ship
    const [hit, setHit] = useState(false);
    if (ship) {
        return (
            <div className="hover:bg-gray-400 bg-indigo-300"></div>
            )
        }
    return (
        <div className="hover:bg-gray-400 bg-white"></div>
        )   
    }

export function EnemyBoard(props) {
    const board = props.player.gameboard;
    let cells = []
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            cells.push(<EnemyCell id={[j, i]} key={[j, i]} ship={board.loc(j, i)} game={props.game} pubsub={props.pubsub}/>)
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
    const [hit, setHit] = useState(0);
    const ship = props.ship.ship;
    const handleClick = (e) => {
        if (props.game.whoseTurn === 1) {
            const [x, y] = props.id;
            if (ship) {
                setHit(1);
            } else {
                setHit(-1)
            }
            props.pubsub.publish('user_move');
            props.game.toggleWhoseTurn();
        }
    }
    if (hit === 1) {
        return <Hit />
    } else if (hit === -1) {
        return <Miss />
    } else {
        return <div className="hover:bg-gray-400 bg-white" onClick={handleClick}></div>;

    }
}

function Hit() {
    return (
        <div className="hover:bg-red-300 bg-red-400"></div>
    )
}

function Miss() {
    return (
        <div className="hover:bg-gray-300 bg-gray-400"></div>
    )
}