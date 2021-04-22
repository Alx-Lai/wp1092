import React from "react";

const Cell = (props) => {
    return (
        <span className="cell" onClick={props.onClick} contentEditable={true}>
            {props.title || ""}
        </span>
    );
};

export default Cell;
