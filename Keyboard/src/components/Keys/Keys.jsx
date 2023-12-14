import React, { useState } from "react"
import './Keys.css'
import EmojiPicker from "emoji-picker-react";
import HebrewKeys from "../HebrewKeys/HebrewKeys";
import EnglishKeys from "../EnglishKeys/EnglishKeys";
import SpecialKeys from "../SpecialKeys/SpcialKeys";

export default function Keys(props) {
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Backspace"];
       
    
    const activeButtons = [{ act: "Shift", func: props.handleFunctions.handleUpperKey }, 
    { act: "🌐", func: props.handleFunctions.handleLanguageChange },
    { act: props.specialLabel, func: props.handleFunctions.handleSpecialChars },
    { act: " ", func: props.handleFunctions.handleRegularKey },  
    { act: "↩️", func: props.handleFunctions.handleUndo },
    { act: "clear all", func: props.handleFunctions.handleClearAllKey},
    { act: "🙂", func: props.setEmojiesShown },
    { act: "UPPER ALL", func: props.handleFunctions.handleUpperAllKey}
    ];

    
    //The next two consts are declarations of the top and button rows of the keyboard, which are constantly displayed
    const keysOfNumbers = numbers.map(key => (
        <button key={key}  onClick={() => key == "Backspace" ? props.handleFunctions.handleDeleteCharacter() : props.handleFunctions.handleRegularKey(key)}>
            {key}
        </button>
    ));

    const keysOfActiveButtons = activeButtons.map(key => (
        <button key={key.act} className={key.act == " " ? "space" : 'active-btn'} onClick={() => { key.act != "🙂" ? key.func(key.act) : key.func(!props.isEmojiesShown) }} style={{backgroundColor : (key.act === "Shift" && props.currIsUpper) ? 'LightSteelBlue' : '#fff' }}>
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