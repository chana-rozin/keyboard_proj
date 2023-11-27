import React, { useState} from 'react';
import  './Keyboard.css'

export default function Keyboard()
{

    const [inputText, setInputText] = useState('');
    const [keyboardState, setKeyboardState] = useState("hebrew");    
    const [isUpper, setIsUpper] = useState(false);
    const [specialCharsLabel, setSpecialCharsLabel] = useState("&^@"); 
    const [currentState, setCurrentState] = useState({
        hebrew: true,
        english: false,
        special: false
    });
    const actionHistory = [];
    
    const handleRegularKey = (key) => {
        setInputText(inputText + key);
        actionHistory.push({type: 'add'})
    }

    const handleDeleteCharacter = () => {
        if (inputText.length === 0) { 
            return; 
        } 
        const deletedChar = inputText.slice(-1);
        const newContent = inputText.slice(0, inputText.length - 1); 
        actionHistory.push({type: 'delete', deletedChar});
        setInputText(newContent);         
    }
    
    
    const handleSpecialChars = () => {
        if (!currentState.special) {
            actionHistory.push({type: 'handleSpecial', label: specialCharsLabel});
            setSpecialCharsLabel(currentState.hebrew ? "אבג" : "abc");
            setCurrentState(prevState => ({ ...prevState, special: true }));
            setKeyboardState("special");            
        } else {
            actionHistory.push({type: 'handleSpecial', label: specialCharsLabel, prevState: currentState.hebrew ? 'hebrew' : 'english'});
            currentState.hebrew ? setKeyboardState("hebrew") : setKeyboardState("english");
            setSpecialCharsLabel("&^@");
            setCurrentState(prevState => ({ ...prevState, special: false }));            
        }
    };    

    const handleLanguageChange = () => {
        if (currentState.hebrew) {            
            setCurrentState(prevState => ({ ...prevState, hebrew: false, english: true }));
            setSpecialCharsLabel("&^@");
            setKeyboardState("english");
            actionHistory.push({ type: 'changeLanguage', language: 'hebrew' });
        } else {
            setCurrentState(prevState => ({ ...prevState, hebrew: true, english: false }));
            setSpecialCharsLabel("&^@");
            setKeyboardState("hebrew");
            actionHistory.push({ type: 'changeLanguage', language: 'english' });
        }
    }

    const handleUpperKey = () => {
        actionHistory.push({type: 'toUpper', isUpperNow: isUpper})
        setIsUpper(!isUpper)        
    }

    const handleUndo = () => {
        const lastAction = actionHistory.pop();

        if (!lastAction) {
            return;
        }
        switch(lastAction.type) {
            case 'add': 
                setInputText((prevInputText) => prevInputText.slice(0, -1));
                break;
            case 'delete':
                setInputText((prevInputText) => prevInputText + lastAction.deletedChar);
                break;
            case 'changeLanguage':                
                setCurrentState((prev) => ({
                    ...prev,
                    hebrew: lastAction.language === 'hebrew',
                    english: lastAction.language === 'english',
                }));
                setKeyboardState(lastAction.language);
                break;
            case 'handleSpecial':
                setCurrentState((prev) => ({
                    special: !lastAction.label === "&^@",
                    hebrew: lastAction.prevState === 'hebrew',
                    english: lastAction.prevState === 'english',
                }));
                if (lastAction.label == "&^@") {
                    setSpecialCharsLabel("&^@");                    
                    setKeyboardState(lastAction.prevState);
                }
                else {
                    setKeyboardState("special");
                    setSpecialCharsLabel(lastAction.label);
                }
                break;
            case 'toUpper':
                setIsUpper(lastAction.isUpperNow);
                break;
            default:
                break;

        }
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
    const activeButtons = [{act: " ", func: handleRegularKey}, {act: "UPPER", func: handleUpperKey}, {act: "changeLanguage", func: handleLanguageChange},
                            {act: specialCharsLabel, func: handleSpecialChars}, { act: 'undo', func: handleUndo }];

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

    const keysOfAlphabetEnglishButtonsUpper = alphaBetEnglishOrderedByKeyboard.map(key => (
        <button key={key} onClick={() => key == "Enter" ? handleRegularKey("\n") : handleRegularKey(key.toUpperCase())}>
            {key.toUpperCase()}
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
    
    const keysOfActiveButtons = activeButtons.map(key => (
        <button key={key} onClick={() => {key.func(key.act)}}>
            {key.act}
        </button>
    ));
    

    
    
    
    
    
    
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
                {keyboardState == "hebrew" ? keysOfAlphabetHebrewButtons:
                 keyboardState == "special"? keysOfSpecialChars:
                 isUpper ? keysOfAlphabetEnglishButtonsUpper : keysOfAlphabetEnglishButtons}                
            </div>
            <div className="activeButtons">
                {keysOfActiveButtons}
            </div>            
        </div>
        </>
    )
}