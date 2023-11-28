import React, { useState } from "react";
import './StyleButtons.css'
import { CompactPicker } from 'react-color';
import { FontPicker } from 'react-font-picker';

export default function StyleButtons(props) {
    const styleButtons = [{ act: "A", func: props.handleFunctions.handleFontSizeEnlargement }, { act: "a", func: props.handleFunctions.handleFontSizeReduction },
    { act: "Color", func: props.handleFunctions.handleTxtColorChange }, { act: "Font", func: props.handleFunctions.handleFontFamilyChange }
    ]
    const keysOfSizeButtons = styleButtons.map(key => (
        <button key={key.act} onClick={() => { key.func() }}>
            {key.act}
        </button>
    ));


    return (
        <>
            <div className="StyleButtons">
                {keysOfSizeButtons}
                {props.isColorPalleteShown && <span className="color-picker-container">
                    <CompactPicker onChange={(color) => props.setColor(color.hex)} />
                </span>}
                {/* {props.isFontPalleteShown &&
                    <span className="font-family-picker-container">
                        <FontPicker
                            apiKey="YOUR_GOOGLE_FONTS_API_KEY"
                            activeFontFamily={fontFamily}
                            onChange={(font) => props.setFont(font.family)}
                        />
                    </span>
                } */}
            </div>
        </>
    )
}