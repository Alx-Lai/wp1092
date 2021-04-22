import React, { Component } from "react";

class Cell extends Component{
    constructor(props){
        super(props)
    }

    clicked = (e) => {
        var oldIdx = this.props.on_x+","+this.props.on_y;
        console.log("oldIdx "+oldIdx);
        console.log("newIdx "+e.target.id);
        this.props.changeIdx(e.target.id);

        if(oldIdx === "-1,-1"){
            this.props.changeClick(1);
        }
        else if(oldIdx !== e.target.id) {
            document.getElementById(oldIdx).readOnly = false;
            e.target.readOnly = true;
            // e.target.blur();
            // this.changeIdx(idx);
            let value = document.getElementById(oldIdx).value
            // console.log("value" + value)
            this.props.changeValue(this.props.on_x,this.props.on_y, value)
            this.props.changeClick(1);
        }
        else{
            e.target.readOnly = false;
            this.props.changeClick(0);
        }
    }
   

    // press = (e) => {
    //     var oldIdx = this.props.on_x+","+this.props.on_y;
    //     if (e.key === "Enter"){
    //         e.preventDefault();
    //         e.target.readOnly = true;
    //         if (e.target.id.split(",")[0] !== parseInt(this.props.row-1)){
    //             var x = this.props.x+1;
    //             this.props.changeIdx(x+","+this.props.y);
    //         }
    //         this.props.changeClick(1);
    //         // console.log("oldIdx "+oldIdx);
    //         // console.log("newIdx "+x+","+this.props.y);
    //         console.log("Press Enter. Input: " + e.target.value);
    //     }
    //     else{
    //         console.log("click" + this.props.click)
    //         if(this.props.click === 1) {
    //             e.target.readOnly = false;
    //             console.log("e.target.value " + e.target.value);
    //             console.log("e.key " + e.key);

    //             e.target.value = "";
    //             this.props.changeIdx(e.target.id)
    //             this.props.changeClick(0);
    //         }
    //         else if (this.props.click === 0){
    //             let value = this.props.value + String.fromCharCode(e.keyCode)
    //             console.log("value" + value)
    //             this.props.changeValue(this.props.x, this.props.y, value)
    //         }
    //     }
    // }


    render(){
        if(this.props.x === 0 || this.props.y === 0){
            // console.log(this.props.e)
            return(
                <div className="cell-title"
                        disabled="disabled"
                        id={this.props.x+","+this.props.y} 
                        onClick={()=>this.props.click_out()}>
                    {this.props.value}
                </div>
            )
        }
        else{
            return(
                <div key={this.props.value}>
                    <input
                        // contentEditable="false"
                        // disabled="disabled"
                        readOnly="true"
                        className="cell" 
                        type='text'
                        defaultValue={this.props.value}
                        id={this.props.x+","+this.props.y}
                        onKeyDown={(e)=>this.props.press(e)}
                        onMouseDown={this.clicked}
                    />
                </div>
                )
        } 
          
    }
}

export default Cell;