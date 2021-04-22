import React from "react";
import Cell from "./Cell";

const Row = (props) => {
    return (
        <span>
            <Cell key={-1} title={props.rowCount} />
            {props.cells}
        </span>
    );
};

export default Row;
