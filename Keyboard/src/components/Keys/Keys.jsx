import React, { useState} from "react"
import './Keys.css'

export default function Keys(props)
{
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Backspace"];
    const alphaBetEnglishOrderedByKeyboard = ["q", "w", "r", "t", "y", "u", "i", "o", "p",
                                            "a", "s", "d", "f", "g", "h", "j", "k", "l", "Enter",
                                            "z", "x", "c", "v", "b", "n", "m", ".", ","];
    const alphaBetHebrewOrderedByKeyboard = [".", ",", "ק", "ר", "א", "ט", "ו", "ן", "ם", "פ",
                                            "ש", "ד", "ג", "כ", "ע", "י", "ח", "ל", "ך", "ף", "Enter",
                                            "ז", "ס", "ב", "ה", "נ", "מ", "צ", "ת", "ץ"];    
    const specialCharacters = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")",
                                "~", "[", "]", "{", "}", "-", "+", "=", "/", ";", "Enter",
                                "?", ">", "<", ",", ".", '"', "'", ":"
                                ];
    const activeButtons = [{act: " ", func: props.handleFunctions.handleRegularKey}, {act: "UPPER", func: props.handleFunctions.handleUpperKey}, {act: "changeLanguage", func: props.handleFunctions.handleLanguageChange},
                            {act: props.specialLabel, func: props.handleFunctions.handleSpecialChars}, { act: 'undo', func: props.handleFunctions.handleUndo }];

    const keysOfSpecialChars = specialCharacters.map(key => (
        <button key={key} onClick={() => key == "Enter" ? props.handleFunctions.handleRegularKey("\n") : props.handleFunctions.handleRegularKey(key)}>
            {key}
        </button>
    ));    
    const keysOfAlphabetEnglishButtons = alphaBetEnglishOrderedByKeyboard.map(key => (
    <button key={key} onClick={() => key == "Enter" ? props.handleFunctions.handleRegularKey("\n") : props.handleFunctions.handleRegularKey(key)}>
        {key}
    </button>
    ));

    const keysOfAlphabetEnglishButtonsUpper = alphaBetEnglishOrderedByKeyboard.map(key => (
        <button key={key.toUpperCase()} onClick={() => key == "Enter" ? props.handleFunctions.handleRegularKey("\n") : props.handleFunctions.handleRegularKey(key.toUpperCase())}>
            {key.toUpperCase()}
        </button>
        ));

    const keysOfAlphabetHebrewButtons = alphaBetHebrewOrderedByKeyboard.map(key => (
        <button key={key} onClick={() => key == "Enter" ? props.handleFunctions.handleRegularKey("\n") : props.handleFunctions.handleRegularKey(key)}>
            {key}
        </button>
    ));
    
    const keysOfNumbers = numbers.map(key => (
        <button key={key} onClick={() => key == "Backspace" ? props.handleFunctions.handleDeleteCharacter() : props.handleFunctions.handleRegularKey(key)}>
            {key}
        </button>
    ));
    
    const keysOfActiveButtons = activeButtons.map(key => (
        <button key={key.act} onClick={() => {key.func(key.act)}}>
            {key.act}
        </button>
    ));

    return (
        <>
        <div className="keyboard">
        <div className="numbers">
                {keysOfNumbers}
            </div>
            <div className="charcters">
                {props.currState == "hebrew" ? keysOfAlphabetHebrewButtons:
                 props.currState == "special"? keysOfSpecialChars:
                 props.currIsUpper ? keysOfAlphabetEnglishButtonsUpper : keysOfAlphabetEnglishButtons}                
            </div>
            <div className="activeButtons">
                {keysOfActiveButtons}
            </div>            
        </div>
        </>
    )
}