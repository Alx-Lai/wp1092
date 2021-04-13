
const Button = ({Text_array,toggle,setText_array,setToggle})=>{
    var row = Text_array.length;
    var col = Text_array[0].length;
    function click_row_plus(){
        //row100 col 26
        //add row from posx
        var arr = Array.from(Array(row+1), () => new Array(col));
        //console.log(arr);
        for(var i=0;i<toggle.x;i++){
            for(var j=0;j<col;j++){
                arr[i][j]=Text_array[i][j];
            }
        }
        for(var j=0;j<col;j++){
            arr[toggle.x][j]='';
        }
        for(var i=toggle.x+1;i<row+1;i++){
            for(var j=0;j<col;j++){
                arr[i][j]=Text_array[i-1][j];
            }
        }
        var new_toggle = {x:toggle.x+1,y:toggle.y,count:toggle.count};
        setToggle(new_toggle);
        setText_array(arr);
        console.log(Text_array);
        console.log(arr);
    }
    function click_row_minus(){
        var arr = Array.from(Array(row-1), () => new Array(col));
        for(var i=0;i<toggle.x;i++){
            for(var j=0;j<col;j++){
                arr[i][j]=Text_array[i][j];
            }
        }
        for(var i=toggle.x;i<row-1;i++){
            for(var j=0;j<col;j++){
                arr[i][j]=Text_array[i+1][j];
            }
        }
        var new_toggle = {x:toggle.x-1,y:toggle.y,count:toggle.count};
        setToggle(new_toggle);
        setText_array(arr);
    }
    function click_col_plus(){
        var arr = Array.from(Array(row), () => new Array(col+1));
        for(var i=0;i<row;i++){
            for(var j=0;j<toggle.y;j++){
                arr[i][j]=Text_array[i][j];
            }
        }
        for(var i=0;i<row;i++){
            arr[i][toggle.y]='';
        }
        for(var i=0;i<row;i++){
            for(var j=toggle.y+1;j<col+1;j++){
                arr[i][j]=Text_array[i][j-1];
            }
        }
        var new_toggle = {x:toggle.x,y:toggle.y+1,count:toggle.count};
        setToggle(new_toggle);
        setText_array(arr);
    }
    function click_col_minus(){
        var arr = Array.from(Array(row), () => new Array(col-1));
        for(var i=0;i<row;i++){
            for(var j=0;j<toggle.y;j++){
                arr[i][j]=Text_array[i][j];
            }
        }
        for(var i=0;i<row;i++){
            for(var j=toggle.y;j<col-1;j++){
                arr[i][j]=Text_array[i][j+1];
            }
        }
        var new_toggle = {x:toggle.x,y:toggle.y-1,count:toggle.count};
        setToggle(new_toggle);
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