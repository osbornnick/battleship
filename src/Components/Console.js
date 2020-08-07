import React from "react";

export default function Console(props) {

    const handleClick = (e) => {
        props.setPlaying(!props.playing)
    }
    return (
        <div className="flex justify-center">
            {props.playing ? <button className="btn cursor-not-allowed">Playing</button>
            : 
            <button className="btn"
                onClick = {handleClick}
            >
                {props.playing ? "Playing" : "Play"}
            </button>
            }
        </div>
    )
}