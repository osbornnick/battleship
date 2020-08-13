import React from 'react';


export function MyCell(props) {
    const {ship, indexInShip} = props.ship;
    let hit = ship ? ship.hits[indexInShip] : false
    let miss = props.missed;

    if (hit) {
        return <Hit />
    } else if (miss) {
        return <Miss />
    } else if (ship) {
        return <div className="bg-indigo-300"></div>
    }
    return (
        <div className="bg-white"></div>
        )   
    }

export function EnemyCell(props) {
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