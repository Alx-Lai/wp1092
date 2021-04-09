import React,{useState} from "react";

const Table = ({col, text_array, toggle, toggle_posx, 
                toggle_posy, setToggle_posx, setToggle_posy, setToggle, setText_array})=>{
    var head_title = [];
    var alphabets= [];
    const [new_text,setNew_text]=useState('');
    alphabets.push('');
    for(var i=65;i<65+26;i++){
        alphabets.push(String.fromCharCode(i));
    }
    head_title.push("");
    for(var i=0;i<col;i++){
        head_title[i+1]=num_to_index(i+1);
    }
    /*
    [
    0,0,0,0
    0,0,1,0
    0,0,0,0
    x=2 y=1 arr[y][x]
    countx=2 county=1
    ]
    */
    function num_to_index(num){
        var str='',temp_arr=[];
        console.log(num);
        while(num>26){
            temp_arr.push(num%26);
            num=Math.floor(num/26);
        }
        temp_arr.push(num);
        console.log(temp_arr);
        for(var j=temp_arr.length-1;j>=0;j--){
            str+=alphabets[temp_arr[j]];
        }
        return str;
    }
    function makeTableHTML(arr,col,toggle_posx,toggle_posy,toggle){
        var county=0,countx=0;
        //console.log(arr);
        return arr.map((column) =>{
            return(
                <tr>
                    {countx==toggle_posx?<td id='focused_row' className='row_front'>{countx+1}</td>:<td className='row_front'>{countx+1}</td>}
                    {column.map((key)=>{
                        county++;
                        if(county==col){
                            county-=col;
                            countx++;
                        }
                        if(toggle_posx==countx&&toggle_posy==county&&toggle>0){
                            return (<td id='focused'><textarea id='textbox' onClick={return_oneclick_function(countx,county)}
                            onKeyPress={Key_pressed}
                            />{arr[county][countx]}</td>)
                        }else{
                            return (<td><span onClick={return_oneclick_function(countx,county)}>{arr[county][countx]}</span></td>)            
                        }
                        
                    })}
                </tr>
            )
        });
    }
    function Key_pressed(e){
        if(e.key=='Enter'){
            var temp_text_arr = text_array;
            temp_text_arr[toggle_posy][toggle_posx]= e.target.value;
            setText_array(temp_text_arr);
            if(toggle_posx<text_array.length-1){
                setToggle_posx(toggle_posx+1);
            }
        }else{
            
        }
    }
    function return_oneclick_function(x,y){
        return (
            function(){
                console.log(x,y);
                if(toggle_posx==x&&toggle_posy==y){
                    setToggle(toggle+1);
                }else{
                    setToggle_posx(x);
                    setToggle_posy(y);
                    setToggle(1);
                }
            }
        )
    }
    var head_count=0;
    return (
        
        <>  
            <div className='container'>
            <table>
                <thead>
                <tr>
                {console.log(head_title)}
                {head_title.map((head)=>{
                    head_count++;
                    if(head_count-1==toggle_posy){
                        return (
                        <th id="focused_th" key={head}>{head}</th>
                        )
                    }else{
                        return (
                        <th key={head}>{head}</th>
                        )
                    }
                })}
                </tr>
                </thead>
                <tbody>
                    {makeTableHTML(text_array,col,toggle_posx,toggle_posy,toggle)}
                </tbody>
            </table>
            </div>
        </>
    );
}
export default Table; 
