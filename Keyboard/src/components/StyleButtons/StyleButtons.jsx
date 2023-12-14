import React, { useState } from "react";
import './StyleButtons.css'
import { CompactPicker } from 'react-color';

export default function StyleButtons(props) {
    //Array of buttons which take care of the text style
    const styleButtons = [{ act: "A", func: props.handleFunctions.handleFontSizeEnlargement }, { act: "a", func: props.handleFunctions.handleFontSizeReduction },
    { act: "Color", func: props.handleFunctions.handleTxtColorChange }, { act: "Font", func: props.handleFunctions.handleFontKey }]


    //Avilable fonts
    const fontFamilies = ["Times New Roman", "Georgia", "Garamond", "Arial", "Verdana", "Helvetica",
        "Courier New", "Lucida Console", "Monaco", "Brush Script MT", "Lucida Handwriting", "Copperplate"];

    //Buttons as mentioned
    const keysOfSizeButtons = styleButtons.map(key => (
        <button key={key.act} onClick={() => { key.func() }}>
            {key.act}
        </button>
    ));

    //The array of avilable fonts
    const KeysOfFontFamily = fontFamilies.map(key => (
        <button key={key} onClick={() => props.handleFunctions.handleFontChange(key)} style={{ fontFamily: key, width: 100 }}>
            {key}
        </button>
    ))


    return (
        <>
            <div className="StyleButtons">
                {keysOfSizeButtons}
                {props.isColorPalleteShown && <span className="color-picker-container">
                    <CompactPicker onChange={(color) => props.setColor(color.hex)} />
                </span>}
                {props.isFontsArrayShown && <span className="fonts-array">
                    {KeysOfFontFamily}
                </span>
                }
            </div>
        </>
    )
}