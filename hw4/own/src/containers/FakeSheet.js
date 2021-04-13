import React, { Component } from "react";
import Table from "../components/Table";
import Button from "../components/Button";

class FakeSheet extends Component {
    constructor(props){
        super(props);
        var arr = Array.from(Array(100), () => new Array(26));
        for(var i=0;i<100;i++){
            for(var j=0;j<26;j++){
                arr[i][j]='';
            }
        }
        this.state={Text_array: arr, toggle:{x:3,y:2,count:1}};
    }
    
    render() {
        return (
            <>
                <Button Text_array={this.state.Text_array} toggle={this.state.toggle}
                setText_array={(arr)=>{this.setState({Text_array:arr})}} setToggle={(t)=>{this.setState({toggle:t})}}
                />
                <Table Text_array={this.state.Text_array} toggle={this.state.toggle}
                setText_array={(arr)=>{this.setState({Text_array:arr})}} setToggle={(t)=>{this.setState({toggle:t})}}
                />
            </>
        );
    }
}

export default FakeSheet;

