import React from "react";
const Button = ({col,row,text_array,toggle_posx,toggle_posy,setCol,setRow,setText_array})=>{
    function click_row_plus(){
        setRow(row+1);
        //add row from posx
        var arr = Array.from(Array(row), () => new Array(col));
        for(var i=0;i<toggle_posy;i++){
            for(var j=0;j<col;j++){
                arr[i][j]=text_array[i][j];
            }
        }
        for(var i=toggle_posy;i<row;i++){
            for(var j=0;j<col;j++){
                arr[i+1][j]=text_array[i][j];
            }
        }
        setText_array(arr);
    }
    function click_row_minus(){
        setRow(row-1);
        var arr = Array.from(Array(row), () => new Array(col));
        for(var i=0;i<toggle_posy;i++){
            for(var j=0;j<col;j++){
                arr[i][j]=text_array[i][j];
            }
        }
        for(var i=toggle_posy+1;i<row;i++){
            for(var j=0;j<col;j++){
                arr[i-1][j]=text_array[i][j];
            }
        }
        setText_array(arr);
    }
    function click_col_plus(){
        setCol(col+1);
        var arr = Array.from(Array(row), () => new Array(col));
        for(var i=0;i<row;i++){
            for(var j=0;j<toggle_posx;j++){
                arr[i][j]=text_array[i][j];
            }
        }
        for(var i=0;i<row;i++){
            for(var j=toggle_posx;j<col;j++){
                arr[i][j+1]=text_array[i][j];
            }
        }
        setText_array(arr);
    }
    function click_col_minus(){
        setCol(col-1);
        var arr = Array.from(Array(row), () => new Array(col));
        for(var i=0;i<row;i++){
            for(var j=0;j<toggle_posx;j++){
                arr[i][j]=text_array[i][j];
            }
        }
        for(var i=0;i<row;i++){
            for(var j=toggle_posx+1;j<col;j++){
                arr[i][j-1]=text_array[i][j];
            }
        }
        setText_array(arr);
    }
    return(
        <>
        <div id='row_wrapper'>
            <button id='row_plus_button' onClick={click_row_plus}>+</button>
            <button id='row_minus_button' onClick={click_row_minus}>-</button>
        </div>
        <div id='col_wrapper'>
            <button id='col_plus_button' onClick={click_col_plus}>+</button>
            <button id='col_minus_button' onClick={click_col_minus}>-</button>
        </div>
        </>
    )
}
export default Button;
