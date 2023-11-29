import React, { useState} from "react";
import './SpecialKeys.css'

export default function SpecialKeys (props) {
    
    const firstRow = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];
    const secondRow = ["~", "[", "]", "{", "}", "-", "+", "=", "/", ";", "Enter"];
    const thirdRow = ["?", ">", "<", ",", ".", '"', "'", ":", "="];

    const KeysOfFirstRow = firstRow.map(key => (
        <button key={key} onClick={() => props.handleFunction(key)}>
            {key}
        </button>
    ));
    const keysOfSecondRow = secondRow.map(key => (
        <button key={key} onClick={() => key == "Enter" ? props.handleFunction('\n') : props.handleFunction(key)}>
            {key}
        </button>
    ));
    const keysOfThirdRow = thirdRow.map(key => (
        <button key={key} onClick={() => props.handleFunction(key)}>
            {key}
        </button>
    ));

    return (
        <>
        <div id='first-row-special'>{KeysOfFirstRow}</div>
        <div id='second-row-special'>{keysOfSecondRow}</div>
        <div id='third-row-special'>{keysOfThirdRow}</div>
        </>
    )
}