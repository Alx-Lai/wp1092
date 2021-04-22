import React from "react";
import Cell from "./Cell";
import Row from "./Row";

const MAX_ROW_COUNT = 100;
const MAX_COL_COUNT = 26;

export default () => {
    const rows = [];
    const headerRow = [];
    headerRow.push(<Cell key={-1} title={""} />);
    for (let col = 0; col < MAX_COL_COUNT; col++) {
        const title = String.fromCharCode(65 + col);
        headerRow.push(<Cell key={col} title={title} />);
    }
    rows.push(headerRow);

    const activateEditable = (e) => {
        e.preventDefault();
        console.log("The link was clicked.");
    };

    for (let row = 0; row < MAX_ROW_COUNT; row++) {
        const cells = [];
        for (let col = 0; col < MAX_COL_COUNT; col++) {
            const key = row * MAX_ROW_COUNT + col;
            cells.push(<Cell key={key} onClick={activateEditable} />);
        }

        rows.push(
            <div>
                <Row key={row} rowCount={row + 1} cells={cells} />
            </div>
        );
    }

    return <div>{rows}</div>;
};
