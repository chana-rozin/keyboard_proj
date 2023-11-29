import React, {useState} from 'react'
import './HebrewKeys.css'

export default function HebrewKeys(props) {
    
    const firstRow = [".", ",", "ק", "ר", "א", "ט", "ו", "ן", "ם", "פ"];
    const secondRow = ["ש", "ד", "ג", "כ", "ע", "י", "ח", "ל", "ך", "ף", "Enter"];
    const thirdRow = ["ז", "ס", "ב", "ה", "נ", "מ", "צ", "ת", "ץ"]
    const KeysOfFirstRow = firstRow.map(key => (
        <button key={key} onClick={() => props.handleFunction(key)}>
            {key}
        </button>
    ));
    const keysOfSecondRow = secondRow.map(key => (
        <button key={key} onClick={() => key == "Enter" ? props.handleFunction("\n") : props.handleFunction(key)}>
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
        <pre className='row-of-chars' id='first-row'>{KeysOfFirstRow}</pre>
        <pre className='row-of-chars' id='second-row'>{keysOfSecondRow}</pre>
        <pre className='row-of-chars' id='third-row'>{keysOfThirdRow}</pre>
        </>
    )
}