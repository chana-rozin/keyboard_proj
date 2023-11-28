import React, { useState} from 'react'
import './EnglishKeys.css'

export default function EnglishKeys(props) {    
    const firstRow = ["q", "w", "r", "t", "y", "u", "i", "o", "p"];
    const secondRow = ["a", "s", "d", "f", "g", "h", "j", "k", "l", "Enter"];
    const thirdRow = ["z", "x", "c", "v", "b", "n", "m", ".", ","];
    const keysOfFirstRow = firstRow.map(key => (
        <button key={key} onClick={() => props.handleFunction(key)}>
            {key}
        </button>
    ));
    const keysOfSecondRow = secondRow.map(key => (
        <button key={key} onClick={() => key == "Enter" ? props.handleFunction("\n") : props.handleFunctions.handleRegularKey(key)}>
            {key}
        </button>
    ));
    const keysOfThirdRow = thirdRow.map(key => (
        <button key={key} onClick={() => props.handleFunction(key)}>
            {key}
        </button>
    ));

    const keysOfFirstRowUpper = firstRow.map(key => (
        <button key={key.toUpperCase()} onClick={() => props.handleFunction(key.toUpperCase())}>
            {key.toUpperCase()}
        </button>
    ));
    const keysOfSecondRowUpper = secondRow.map(key => (
        <button key={key.toUpperCase()} onClick={() => key == "Enter" ? props.handleFunction("\n") : props.handleFunction(key.toUpperCase())}>
            {key.toUpperCase()}
        </button>
    ));
    const keysOfThirdRowUpper = thirdRow.map(key => (
        <button key={key.toUpperCase()} onClick={() => props.handleFunction(key.toUpperCase())}>
            {key.toUpperCase()}
        </button>
    ));

    return (
        props.isUpper ? (<>
            <div className='row-of-chars' id='first-row'>{keysOfFirstRowUpper}</div>
            <div className='row-of-chars' id='second-row'>{keysOfSecondRowUpper}</div>
            <div className='row-of-chars' id='third-row'>{keysOfThirdRowUpper}</div>
        </>) : (<>
            <div className='row-of-chars' id='first-row'>{keysOfFirstRow}</div>
            <div className='row-of-chars' id='second-row'>{keysOfSecondRow}</div>
            <div className='row-of-chars' id='third-row'>{keysOfThirdRow}</div>
        </>)
    )
    
    
}