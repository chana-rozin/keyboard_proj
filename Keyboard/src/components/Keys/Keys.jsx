import React, { useState } from "react"
import './Keys.css'
import EmojiPicker from "emoji-picker-react";
import HebrewKeys from "../HebrewKeys/HebrewKeys";
import EnglishKeys from "../EnglishKeys/EnglishKeys";
import SpecialKeys from "../SpecialKeys/SpcialKeys";

export default function Keys(props) {
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Backspace"];
       
    
    const activeButtons = [{ act: "UPPER", func: props.handleFunctions.handleUpperKey }, { act: "changeLanguage", func: props.handleFunctions.handleLanguageChange },
    { act: props.specialLabel, func: props.handleFunctions.handleSpecialChars },
    { act: " ", func: props.handleFunctions.handleRegularKey },  
    { act: 'undo', func: props.handleFunctions.handleUndo },
    {act: "clear all", func: props.handleFunctions.handleClearAllKey}
    , { act: "🙂", func: props.setEmojiesShown }
    ];

    
    const keysOfNumbers = numbers.map(key => (
        <button key={key} onClick={() => key == "Backspace" ? props.handleFunctions.handleDeleteCharacter() : props.handleFunctions.handleRegularKey(key)}>
            {key}
        </button>
    ));

    const keysOfActiveButtons = activeButtons.map(key => (
        <button key={key.act} onClick={() => { key.act != "🙂" ? key.func(key.act) : key.func(!props.isEmojiesShown) }} style={{backgroundColor : (key.act === "UPPER" && props.currIsUpper) ? 'red' : 'whitesmoke' }}>
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
                    {props.currState == "hebrew" ? <HebrewKeys handleFunction = {props.handleFunctions.handleRegularKey} /> :
                        props.currState == "special" ? <SpecialKeys handleFunction = {props.handleFunctions.handleRegularKey}/> :
                        <EnglishKeys handleFunction = {props.handleFunctions.handleRegularKey} isUpper = {props.currIsUpper}/>}
                </div>
                <div className="active-buttons">
                    {keysOfActiveButtons}
                    {props.isEmojiesShown && <span className="emoji-picker-container">
                        <EmojiPicker onEmojiClick={(emoj)=>props.handleFunctions.handleRegularKey(emoj.emoji)}></EmojiPicker>
                        </span>}
                </div>
            </div>
        </>
    )
}