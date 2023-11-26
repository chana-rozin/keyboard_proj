import React, { useState} from 'react';
import  './Keyboard.css'

export default function Keyboard()
{

    const handleRegularKey = (key) => {
        setInputText(inputText+key);
    }

    const handleDeleteCharacter = () => {
        if (inputText.length === 0) { 
            return; 
        } 
        const newContent = inputText.slice(0, inputText.length - 1); 
        setInputText(newContent); 
    }
    
    const handleSpecialChars = (event) => {
        if(!currentState.special) {
            event.target.value = currentState.hebrew ? "אבג": "abc";
            setKeyboardState(keysOfSpecialChars);
            currentState.special = true;
        }
        else {
            event.target.value = "&^@";
            currentState.hebrew ? setKeyboardState(keysOfAlphabetHebrewButtons) : setKeyboardState(keysOfAlphabetEnglishButtons);
            currentState.special = false;
        }
    }

    const handleSpaceKey = (key) => {
        if (key == "space") {
            setInputText(inputText + " ");
        }
        else {
            setInputText(inputText + "    ");
        }
    }

    const handleLanguageChange = () => {
        if (currentState.hebrew) {
            setKeyboardState(keysOfAlphabetEnglishButtons);
            currentState.hebrew = false;
            currentState.english = true;
        }
    }

    const handleShiftKey = () => {
        {alert("something about shift key")}
    }


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

    const keysOfSpecialChars = specialCharacters.map(key => (
        <button key={key} onClick={() => handleRegularKey(key)}>
            {key}
        </button>
    ));    
    const keysOfAlphabetEnglishButtons = alphaBetEnglishOrderedByKeyboard.map(key => (
    <button key={key} onClick={() => key == "Enter" ? handleRegularKey("\n") : handleRegularKey(key)}>
        {key}
    </button>
    ));
    const keysOfAlphabetHebrewButtons = alphaBetHebrewOrderedByKeyboard.map(key => (
        <button key={key} onClick={() => key == "Enter" ? handleRegularKey("\n") : handleRegularKey(key)}>
            {key}
        </button>
    ));
    
    const keysOfNumbers = numbers.map(key => (
        <button key={key} onClick={() => key == "Backspace" ? handleDeleteCharacter() : handleRegularKey(key)}>
            {key}
        </button>
    )); 
    

    const activeButtons = [{act: "space", func: handleSpaceKey}, {act: "shift", func: handleShiftKey}, {act: "changeLanguage", func: handleLanguageChange},
                            {act: "&^@", func: handleSpecialChars}]
    const spaceCharacters = [" ", "    "];
    
    const [inputText, setInputText] = useState('');
    const [keyboardState, setKeyboardState] = useState("hebrew");
    //const [isCaps, setIsCaps] = useState(false); 
    const [isShift, setIsShift] = useState(false); 
    //let currentState = {hebrew: true, english: false, special: false} 
    
    
    return (
        <>
        <div className="textArea">
            {inputText}
        </div>
        <div className="keyboard">
        <div className="numbers">
                {keysOfNumbers}
            </div>
            <div className="charcters">
                {keyboardState=="hebrew"?keysOfAlphabetHebrewButtons:
                keyboardState=="english"? keysOfAlphabetEnglishButtons: keysOfSpecialChars}                
            </div>            
        </div>
        </>
    )
}