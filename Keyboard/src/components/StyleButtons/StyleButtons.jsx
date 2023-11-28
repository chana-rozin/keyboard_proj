import React, { useState} from "react";
import './StyleButtons.css'

export default function StyleButtons(props) {
    const sizeButtons = [{act:"A", func: props.handleFunctions.handleFontSizeEnlargement}, {act: "a", func: props.handleFunctions.handleFontSizeReduction},
                        //{act: "Color", func: handleColorChange}, {act: "Font", func: handleFontFamilyChange}
                    ]
    const keysOfSizeButtons = sizeButtons.map(key => (
        <button key={key.act} onClick={() => {key.func()}}>
            {key.act}
        </button>
    ));
    return (
        <>
            <div className="SizeButtons">
                {keysOfSizeButtons}
            </div>
        </>
    )    
}