import React, { Component } from "react";
import Header from "./Header";
import Row from "./Row";

class Section extends Component {
    constructor(props){
        super(props)
        this.state = {
            click: 0,
            on_x: -1,
            on_y: -1,
            rows: this.initialRows()
        }
    }
    initialRows = () =>{
        let rows = []
        var i,j;
        for (i = 0; i < 101; i++){
            rows[i] = []
            for (j = 0; j < 27; j++){
               rows[i][j] = null;
            }
        }
        return rows;
    }

    changeIdx = (idx) => {
        document.getElementById(idx).focus()
        // document.getElementById(idx).disable=true

        var arrayOfIdx = idx.split(",");
        // console.log("array " + arrayOfIdx[0]+ arrayOfIdx[1]);
        this.setState({on_x: arrayOfIdx[0]},()=>console.log()); // 
        this.setState({on_y: arrayOfIdx[1]},()=>console.log()); // ()=>console.log("change on_y"
        // this.setState(state => ({click: 0}), ()=>console.log("change click"));
    }

    changeClick = (num) => {
        this.setState({click: num}, ()=>console.log("click "+ this.state.click));
    }

    click_out = () => {
        this.setState({on_x: -1},()=>console.log()); 
        this.setState({on_y: -1},()=>console.log());
        // console.log("hey "+this.state.on_x+","+this.state.on_y)
    }

    changeValue = (x,y,value) => {
        let rows = this.state.rows
        rows[x][y] = value;
        this.setState({rows: rows})
    }

    press = (e) => {
        // var oldIdx = this.state.on_x+","+this.props.on_y;
        var idx = e.target.id.split(",");
        if (e.key === "Enter"){
            e.preventDefault();
            e.target.readOnly = true;
            if (idx[0] !== parseInt(this.state.rows.length-1)){
                var x = parseInt(idx[0])+1;
                this.changeIdx(x+","+idx[1]);
            }
            this.changeClick(1);
            console.log("Press Enter. Input: " + e.target.value);
            this.changeValue(idx[0], idx[1], e.target.value)
        }
        else{
            e.target.readOnly = false;
            if(this.state.click === 1) {
                e.target.value = ""
                this.changeValue(idx[0], idx[1], null)
                // console.log("e.target.value " + e.target.value);
                // console.log("e.key " + e.key);
                this.changeIdx(e.target.id)
                this.changeClick(0);
            }
            else if (this.state.click === 0){
                // let value = String.fromCharCode(e.keyCode)
                // let value = String(e.target.value) +String(e.keyCode)
            }
        }
    }

    addCol = () => {
        var idx = this.state.on_x+","+this.state.on_y;
        console.log("idx " + idx)
        var rows = this.state.rows
        if(idx === "-1,-1"){
            for(var i = 0; i < this.state.rows.length; i++){
                rows[i].push(null)
            }
        }
        else{
            for(var i = 0; i < this.state.rows.length; i++){
                rows[i].splice(this.state.on_y, 0, "")
            }
        }
        this.setState({rows: rows},()=>console.log("hey"))
    }

    delCol = () => {
        var idx = this.state.on_x+","+this.state.on_y;
        console.log("idx " + idx)
        var rows = this.state.rows
        if(idx === "-1,-1"){
            for(var i = 0; i < this.state.rows.length; i++){
                rows[i].pop()
            }
        }
        else{
            for(var i = 0; i < this.state.rows.length; i++){
                rows[i].splice(this.state.on_y,1)
            }
        }
        this.setState({rows: rows},()=>console.log("hey"))
    }

    addRow = () => {
        var idx = this.state.on_x+","+this.state.on_y;
        console.log("idx " + idx)
        var n_row = new Array(this.state.rows[0].length).fill(null)
        var rows = this.state.rows

        if(idx === "-1,-1"){
            rows.push(n_row);
        }
        else{
            // console.log(rows[this.state.on_x][1])
            rows.splice(this.state.on_x, 0, n_row)

            // document.getElementById(idx).value = null
        }
        this.setState({rows: rows},()=>console.log("hey"))

    }

    delRow = () => {
        var idx = this.state.on_x+","+this.state.on_y;
        console.log("idx " + idx)
        var rows = this.state.rows
        if(idx === "-1,-1"){
            rows.pop()
        }
        else{
            rows.splice(this.state.on_x, 1)

        }
        this.setState({rows: rows},()=>console.log("hey"))
    }



    render() {
        const rows = this.state.rows;
        var i;
        for (i = 0; i < this.state.rows[0].length; i++){
            var baseChar = ("A").charCodeAt(0);
            var letters  = "";
            var number = i;
            if(number !== 0){
                do {
                    number -= 1;
                    letters = String.fromCharCode(baseChar + (number % 26)) + letters;
                    number = (number / 26) >> 0; // quick `floor`
                } while(number > 0);
            }
            else{
                letters = " ";
            }
            rows[0][i] = letters;
        }
        for (i = 1; i < this.state.rows.length; i++){
            rows[i][0] = i;
        }

        setTimeout(()=>this.setState({rows: rows}),1);
        var idx = this.state.on_x+","+this.state.on_y;
        if(idx !== "-1,-1" && this.state.click === 1){
            document.getElementById(idx).focus();
        }

        return(
            <>
                <Header text="Spreadsheet" 
                        click_out={this.click_out}/>
                <div className="column_button">
                    <button onClick={this.addCol}>+</button>
                    <button onClick={this.delCol}>-</button>
                </div>
                <div className="sheet_container">
                    <div className="row_button">
                        <button onClick={this.addRow}>+</button>
                        <button onClick={this.delRow}>-</button>
                    </div>  
                    <div>
                        <table className="sheet_table">{
                            this.state.rows.map((e, x) => <Row
                                                click={this.state.click}
                                                x={x} 
                                                value={e}
                                                on_x={this.state.on_x}
                                                on_y={this.state.on_y}
                                                row={this.state.rows.length}
                                                press={this.press}
                                                changeIdx={this.changeIdx}
                                                changeClick={this.changeClick}
                                                click_out={this.click_out}
                                                changeValue={this.changeValue}
                                                ></Row>)  
                        }</table>
                    </div>  
                </div>
            </>
        );
    }
};

export default Section;