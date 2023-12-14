import React, { useState } from 'react';
import './Keyboard.css'
import Keys from '../Keys/Keys';
import StyleButtons from '../StyleButtons/StyleButtons';
import { ColorPicker, useColor } from "react-color-palette";
import { CompactPicker } from 'react-color';


export default function Keyboard() {

    const [inputText, setInputText] = useState([]);
    const [keyboardState, setKeyboardState] = useState("hebrew");
    const [isUpper, setIsUpper] = useState(false);
    const [specialCharsLabel, setSpecialCharsLabel] = useState("&^@");
    const [actionHistory, setActionHistory] = useState([]);
    const [currentState, setCurrentState] = useState({
        hebrew: true,
        english: false,
        special: false
    });
    const [textColor, setTextColor] = useState('black');
    const [fontSize, setFontSize] = useState('16px');
    const [fontFamily, setFontFamily] = useState('Arial');
    const [fontsArrayShow, setFontsArrayShow] = useState(false);    
    const [colorPalette, setColorPalette] = useState(false); 
    const [emojiesPalette, setEmojiesPalette] = useState(false);   

    //Handling pressing on a key that is an alphabet, numerical, space or Enter key
    const handleRegularKey = (key) => {
        actionHistory.push({ type: 'add', key: key, style: { color: textColor, fontSize: fontSize, fontFamily: fontFamily } });
        setInputText((prevText) => [...prevText, { key: key, style: { color: textColor, fontSize: fontSize, fontFamily: fontFamily } }]);
    }

    //Handling pressing the Backspace button (deleting the last character written)
    const handleDeleteCharacter = () => {
        if (inputText.length === 0) {
            return;
        }
        const deletedChar = inputText[inputText.length - 1];
        const newContent = inputText.slice(0, -1);
        actionHistory.push({ type: 'delete', deletedChar });
        setInputText(newContent);
    }


    //Handling changing the keyboard mode to include a keyboard showing the special characters
    const handleSpecialChars = () => {
        if (!currentState.special) {
            actionHistory.push({ type: 'handleSpecial', label: specialCharsLabel });
            setSpecialCharsLabel(currentState.hebrew ? "אבג" : "abc");
            setCurrentState(prevState => ({ ...prevState, special: true }));
            setKeyboardState("special");
        } else {
            actionHistory.push({ type: 'handleSpecial', label: specialCharsLabel, prevState: currentState.hebrew ? 'hebrew' : 'english' });
            currentState.hebrew ? setKeyboardState("hebrew") : setKeyboardState("english");
            setSpecialCharsLabel("&^@");
            setCurrentState(prevState => ({ ...prevState, special: false }));
        }
    };

    //Dealing with changing the keyboard mode when switching from Hebrew to English or vice versa
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

    //Handling pressing on the Shift key by changing the keyboard to upper  mode or vice versa
    const handleUpperKey = () => {
        actionHistory.push({ type: 'toUpper', isUpperNow: isUpper })
        setIsUpper(!isUpper)
    }

    //Handling of pressing the upper all button by turning all the text that was until now into uppercase mode
    const handleUpperAllKey = () => {
        actionHistory.push({type: 'upperAll', prevText: inputText});      
        setInputText(prevInputText => prevInputText.map(charObj => ({...charObj, key: charObj.key.toUpperCase()})))      
    }

    //Handling deleting all the previous text 
    const handleClearAllKey = () =>{
        actionHistory.push({type: 'clearAll', prevText: inputText});
        setInputText([]);
    }

    //Handling increasing the font from now on
    const handleFontSizeEnlargement = () => {
        actionHistory.push({ type: 'fontSizeEnlargement', prevSize: fontSize })
        const newSize = parseInt(fontSize) + 10;
        setFontSize(`${newSize}px`);
    }

    //Handling decreasing the font from now on
    const handleFontSizeReduction = () => {
        actionHistory.push({ type: 'fontSizeReduction', prevSize: fontSize })
        const newSize = parseInt(fontSize) - 10;
        setFontSize(`${newSize}px`);
    }


    //Handling change of text color from now on
    const handleTxtColorChange = ()=> {        
        setColorPalette(!colorPalette);
               
    }

    //Handling change of the text font from now on
    const handleFontChange = (key) => {
        setFontFamily(key);
    }
    
    //Handling the display of the list of available fonts
    const handleFontKey = () => {
        setFontsArrayShow(!fontsArrayShow)
    }

    //Handling the undo button, which cancles the last action that has been done on the text.
    const handleUndo = () => {
        const lastAction = actionHistory.pop();

        if (!lastAction) {
            return;
        }
        switch (lastAction.type) {
            case 'add':
                setInputText((prevInputText) => prevInputText.slice(0, -1));
                break;
            case 'delete':
                setInputText((prevText) => [...prevText, lastAction.deletedChar]);
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
            case 'clearAll':
                setInputText(lastAction.prevText)
            case 'upperAll':
                setInputText(lastAction.prevText)            
            default:
                break;

        }
    }

    

    return (
        <div className="keyboard">
            <pre className="textArea">
                {inputText.map((item, index) => (
                    <span key={index} style={item.style}>
                        {item.key}
                    </span>
                ))}
            </pre>
            <Keys
                currState={keyboardState}
                currIsUpper={isUpper}
                specialLabel={specialCharsLabel}
                handleFunctions={{ handleRegularKey, handleDeleteCharacter, handleSpecialChars, handleLanguageChange, handleUpperKey, handleClearAllKey, handleUpperAllKey, handleUndo }}                
                isEmojiesShown = {emojiesPalette}
                setEmojiesShown ={setEmojiesPalette}
            ></Keys>
            <StyleButtons
                handleFunctions={{ handleFontSizeEnlargement, handleFontSizeReduction , handleTxtColorChange, handleFontKey, handleFontChange}}
                isColorPalleteShown = {colorPalette}
                setColor = {setTextColor}
                isFontsArrayShown = {fontsArrayShow}                               
            ></StyleButtons>            
        </div>
    )
} 