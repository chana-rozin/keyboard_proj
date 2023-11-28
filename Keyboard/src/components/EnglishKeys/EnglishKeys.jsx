import React, { useState} from 'react'
import './EnglishKeys.css'

export default function EnglishKeys(props) {    
    const firstRow = ["q", "w", "r", "t", "y", "u", "i", "o", "p"];
    const secondRow = ["a", "s", "d", "f", "g", "h", "j", "k", "l", "Enter"];
    const thirdRow = ["z", "x", "c", "v", "b", "n", "m", ".", ","];
    const KeysOfFirstRow = firstRow.map(key => (
        <button key={key} onClick={() => props.handleFunction(key)}>
            {key}
        </button>
    ));
    const KeysOfSecondRow = secondRow.map(key => (
        <button key={key} onClick={() => key == "Enter" ? props.handleFunction("\n") : props.handleFunction(key)}>
            {key}
        </button>
    ));
    const KeysOfThirdRow = thirdRow.map(key => (
        <button key={key} onClick={() => props.handleFunction(key)}>
            {key}
        </button>
    ));

    const KeysOfFirstRowUpper = firstRow.map(key => (
        <button key={key.toUpperCase()} onClick={() => props.handleFunction(key.toUpperCase())}>
            {key.toUpperCase()}
        </button>
    ));
    const KeysOfSecondRowUpper = secondRow.map(key => (
        <button key={key.toUpperCase()} onClick={() => key == "Enter" ? props.handleFunction("\n") : props.handleFunction(key.toUpperCase())}>
            {key.toUpperCase()}
        </button>
    ));
    const KeysOfThirdRowUpper = thirdRow.map(key => (
        <button key={key.toUpperCase()} onClick={() => props.handleFunction(key.toUpperCase())}>
            {key.toUpperCase()}
        </button>
    ));

    return (
        props.isUpper ? (<>
            <div className='row-of-chars' id='first-row'>{KeysOfFirstRowUpper}</div>
            <div className='row-of-chars' id='second-row'>{KeysOfSecondRowUpper}</div>
            <div className='row-of-chars' id='third-row'>{KeysOfThirdRowUpper}</div>
        </>) : (<>
            <div className='row-of-chars' id='first-row'>{KeysOfFirstRow}</div>
            <div className='row-of-chars' id='second-row'>{KeysOfSecondRow}</div>
            <div className='row-of-chars' id='third-row'>{KeysOfThirdRow}</div>
        </>)
    )
    
    
}