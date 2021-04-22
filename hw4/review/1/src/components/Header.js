import React from "react";
export default ({text, click_out}) => (
    <header className="sheet__header" onClick={click_out}>
        <h1 className="sheet__title">{text}</h1>
    </header>
)
