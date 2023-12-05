import React, { useState } from 'react';
import './Keyboard.css'
import Keys from '../Keys/Keys';
import StyleButtons from '../StyleButtons/StyleButtons';
import { ColorPicker, useColor } from "react-color-palette";
//import "react-color-palette/lib/css/styles.css";
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

    const handleRegularKey = (key) => {
        actionHistory.push({ type: 'add', key: key, style: { color: textColor, fontSize: fontSize, fontFamily: fontFamily } });
        setInputText((prevText) => [...prevText, { key: key, style: { color: textColor, fontSize: fontSize, fontFamily: fontFamily } }]);
    }

    const handleDeleteCharacter = () => {
        if (inputText.length === 0) {
            return;
        }
        const deletedChar = inputText[inputText.length - 1];
        const newContent = inputText.slice(0, -1);
        actionHistory.push({ type: 'delete', deletedChar });
        setInputText(newContent);
    }


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
        actionHistory.push({ type: 'toUpper', isUpperNow: isUpper })
        setIsUpper(!isUpper)
    }

    const handleUpperAllKey = () => {
        actionHistory.push({type: 'upperAll', prevText: inputText})
        
        //const temp = inputText.map(charSpan => {...charSpan , key: key.toUpperCase()});
        // console.log(temp)   
        // setInputText(temp);
    }

    const handleClearAllKey = () =>{
        actionHistory.push({type: 'clearAll', prevText: inputText});
        setInputText([]);
    }

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

    const handleFontSizeEnlargement = () => {
        actionHistory.push({ type: 'fontSizeEnlargement', prevSize: fontSize })
        const newSize = parseInt(fontSize) + 10;
        setFontSize(`${newSize}px`);
    }

    const handleFontSizeReduction = () => {
        actionHistory.push({ type: 'fontSizeReduction', prevSize: fontSize })
        const newSize = parseInt(fontSize) - 10;
        setFontSize(`${newSize}px`);
    }



    const handleTxtColorChange = ()=> {        
        setColorPalette(!colorPalette);
               
    }

    const handleFontChange = (key) => {
        setFontFamily(key);
    }
    
    const handleFontKey = () => {
        setFontsArrayShow(!fontsArrayShow)
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