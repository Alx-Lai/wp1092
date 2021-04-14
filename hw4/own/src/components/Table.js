import React,{useState} from "react";
import Thead from './Thead';
import Tbody from './Tbody';

const Table = ({Text_array,toggle,setText_array,setToggle})=>{
    return(
        <table>
            <Thead Text_array={Text_array} toggle={toggle} setToggle={setToggle}/>
            <tbody>
                <Tbody Text_array={Text_array} toggle={toggle} setText_array={setText_array} setToggle={setToggle}/>
            </tbody>
        </table>
    )
    
}

export default Table;