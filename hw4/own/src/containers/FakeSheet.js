import React, { Component } from "react";
import Button from "../components/Button";
import Table from "../components/Table";

class FakeSheet extends Component {
    constructor(props){
        super(props);
        var arr = Array.from(Array(100), () => new Array(26));
        for(var i=0;i<100;i++){
            for(var j=0;j<26;j++){
                arr[i][j]='';
            }
        }
        this.state={row: 100,col:26, text_array: arr, toggle: 2, toggle_posx: 3, toggle_posy: 2};
    }
    
    render() {
        return (
            <>
                <Table col={this.state.col} text_array={this.state.text_array} toggle={this.state.toggle}
                toggle_posx={this.state.toggle_posx} toggle_posy = {this.state.toggle_posy} 
                setToggle_posx={(x)=>this.setState({toggle_posx:x})} setToggle_posy={(y)=>this.setState({toggle_posy:y})} setToggle={(tgle)=>this.setState({toggle:tgle})} setText_array={(new_arr)=>this.setState({text_array:new_arr})}
                />
                <Button col={this.state.col} row={this.state.row} text_array={this.state.text_array}
                toggle_posx={this.state.toggle_posx} toggle_posy={this.state.toggle_posy}
                setCol={(c)=>this.setState({col:c})} setRow={(r)=>this.setState({row:r})} setText_array={(new_arr)=>this.setState({text_array:new_arr})}
                />
            </>
        );
    }
}

export default FakeSheet;