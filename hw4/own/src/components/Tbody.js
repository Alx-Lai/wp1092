import {useState,useRef} from 'react';
const Tbody = ({Text_array,toggle,setText_array,setToggle})=>{    
    var row_length = Text_array[0].length;
    const textInput = useRef();
    function onClickHandle(e){
        var id = e.target.id.split('+');
        var x=id[0];
        var y=id[1];
        if(x==toggle.x && y==toggle.y){
            setToggle({x:toggle.x,y:toggle.y,count:toggle.count+1});
            textInput.current.focus();
        }else{
            setToggle({x:x,y:y,count:1});
        }
    }
    function FocusOutHandle(e){
        var arr = Text_array;
        var input = e.target.value;
        arr[toggle.x][toggle.y]= input;
        console.log(input);
        if(input.startsWith('=')){
            console.log('=');
            var process_input=input.replace(/\s*/g,"");
            process_input.toUpperCase();
            if(process_input.startsWith('=SUM')){
                console.log('=sum');
            }else if(process_input.charAt(0)){
                     
            }
        }
        setText_array(arr);
    }
    function Key_pressed(e){
        if(e.key=='Enter'){
            var arr = Text_array;
            arr[toggle.x][toggle.y]= e.target.value;
            setText_array(arr);
            if(toggle.x<Text_array.length-1){
                var new_toggle = {x:toggle.x+1,y:toggle.y,count:1};
                setToggle(new_toggle);
            }
            textInput.current.focus();
        }else{
            //console.log(e.key);
        }
    }
    function f_row_click_Handle(e){
        var id = e.target.id;
        //console.log(e.target.id);
        if(id =='focused_row'){
            setToggle({x:toggle.x,y:-2,count:0});
        }else{
            var id_p = id.slice(5);
            setToggle({x:id_p,y:-2,count:0});   
        } 
    }
    var count={x:-1,y:-1};
    return(
        <>
        {Text_array.map((row)=>{
         count.x++;
         return(
            <tr>
                {
                    (count.x == toggle.x)?
                    <td id='focused_row' className='row_front' onClick={f_row_click_Handle}>{count.x+1}</td>
                    :
                    <td id={'f_row'+count.x} className='row_front' onClick={f_row_click_Handle}>{count.x+1}</td>
                }
                {row.map((element)=>{
                    count.y++;
                    if(count.y==row_length){
                        count.y=0;
                    }
                    if(toggle.x==count.x && toggle.y==count.y && toggle.count > 0){
                        return (
                            <td id='focused'><textarea id='textbox' onBlur={FocusOutHandle}
                            onKeyPress={Key_pressed} ref={textInput}
                            />{element}</td>
                        )
                    }else{
                        return (<td><span id={count.x+'+'+count.y} onClick={onClickHandle}>{element}</span>
                                </td>)            
                    }
                })}
            </tr>
            
         )
        })}
        </>
    )
}
export default Tbody;