import React, { useState} from 'react';
import  './Keyboard.css'
import Keys from '../Keys/Keys';

export default function Keyboard()
{

    const [inputText, setInputText] = useState('');
    const [keyboardState, setKeyboardState] = useState("hebrew");    
    const [isUpper, setIsUpper] = useState(false);
    const [specialCharsLabel, setSpecialCharsLabel] = useState("&^@");
    const [actionHistory, setActionHistory] = useState([]);
    const [currentState, setCurrentState] = useState({
        hebrew: true,
        english: false,
        special: false
    });    
    
    const handleRegularKey = (key) => {
        actionHistory.push({type: 'add'})
        setInputText(inputText + key);
        
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
                setCurrentState(() => ({
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

    
    
    return (
        <>
        <div className="textArea">
            {inputText}
        </div>
        <Keys
        currState = {keyboardState}
        currIsUpper = {isUpper}
        specialLabel = {specialCharsLabel}
        handleFunctions = {{handleRegularKey, handleDeleteCharacter, handleSpecialChars, handleLanguageChange, handleUpperKey, handleUndo}}
        ctrlZ = {actionHistory}
        ></Keys>
        </>
    )
}