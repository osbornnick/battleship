import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {ItemTypes} from '../constants';


export function MyCell(props) {
    const {ship, indexInShip} = props.ship;
    let hit = ship ? ship.hits[indexInShip] : false
    let miss = props.missed;

    if (hit) {
        return <Hit />
    } else if (miss) {
        return <Miss />
    } else if (ship) {
        return <Ship id={props.id}/>
    }
    return <Empty handleMoveShip={props.handleMoveShip} canMoveShip={props.canMoveShip} id={props.id}/> 
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

function Ship(props) {
    const [{ isDragging }, drag] = useDrag({
        item: { id: props.id, type: ItemTypes.SHIP },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      })

    return (<div 
    ref={drag} 
    style={{opacity: isDragging? 0.5: 1, cursor: 'move'}}
    className="bg-indigo-300"></div>)
}

function Empty(props) {
    const {handleMoveShip, canMoveShip} = props;
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: ItemTypes.SHIP,
        drop: (item) => handleMoveShip(item.id, props.id),
        canDrop: (item) => canMoveShip(item.id, props.id),
        collect: (mon) => ({
            isOver: !!mon.isOver(),
            canDrop: !!mon.canDrop()
        })
    })

    return <div ref={drop} className="bg-white"></div>
}