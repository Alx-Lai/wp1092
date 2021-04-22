import React, { Component } from "react";
import Cell from "./Cell";

export default function Row({click, x, value, on_x, on_y, row, press,
                            changeClick, changeIdx,click_out,changeValue}){
    return(
        <tr className="row">{
            value.map((e,y)=><Cell 
                                click={click}
                                x={x} 
                                y={y}
                                value={e}
                                on_x={on_x}
                                on_y={on_y}
                                row={row}
                                column={value.length}
                                press={press}
                                changeIdx={changeIdx}
                                changeClick={changeClick}
                                click_out={click_out}
                                changeValue={changeValue}
                                ></Cell>)
        }</tr>
    );
};