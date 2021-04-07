import React, { Component } from "react";
import Header from "../components/Header";
import Input from "../components/Input";
import Item from "../components/Item";
import Footer from "../components/Footer";

class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' ,todos: [], show:[],left:0};
        this.id = 1;
        this.setText = this.setText.bind(this);
        this.onAddItem = this.onAddItem.bind(this);
        this.showall = this.showall.bind(this);
        this.showactive = this.showactive.bind(this);
        this.showcomplete = this.showcomplete.bind(this);
        this.clickchange = this.clickchange.bind(this);
        this.clear = this.clear.bind(this);
        this.deitem = this.deitem.bind(this);
    }
    onAddItem = (e) => {
        if(e.key ==='Enter'){
            const todolist=[this.id,this.state.value,false];
            const todolist2={id:this.id,value:this.state.value,isCom:false};
            this.setState(state => {
                // const todos = state.todos.concat(todolist);
                const todos = [...state.todos,todolist2];
                const show = todos;
                const left = this.state.left+1;
                return {todos,value:'',show,left};
            })
            this.id++;
        }
    }
    deitem(e){
        const todoList = [...this.state.todos];
        const index = e.target.id-1;
        // console.log('for delete',e.target.id)
        if(this.state.todos[index].isCom === false){
            this.setState({
                todos: todoList.splice(index,1),
                left: this.state.left-1,
                show : todoList,
            });
        }else{
            this.setState({
                todos: todoList.splice(index,1),
                show : todoList.splice(index,1),
            });
        }
    }
    clickchange(e){
        const todoList = [...this.state.todos];
        const index = e.target.id-1;
        // console.log('click',e.target.id)
        if(this.state.todos[index].isCom === false){
            this.setState({
                todos: todoList.map((item,key)=>key == index?{...item,isCom: true}:item),
                left: this.state.left-1,
                show : todoList.map((item,key)=>key == index?{...item,isCom: true}:item),
            });
        }else{
            this.setState({
                todos: todoList.map((item,key)=>key == index?{...item,isCom: false}:item),
                left: this.state.left+1,
                show : todoList.map((item,key)=>key == index?{...item,isCom: false}:item),
            });
        }
    }
    setText (e){
        this.setState({value: e.target.value})
    }
    showall(){
        this.setState({show: this.state.todos})
    }
    showactive(){
        const todolist =[];
        const todos = this.state.todos;
        for(let i = 0; i<todos.length;i++){
            if(todos[i].isCom===false){
                todolist.push(todos[i])
            }
        }
        this.setState({show: todolist})
    }
    showcomplete(){
        const todolist =[];
        const todos = this.state.todos;
        for(let i = 0; i<todos.length;i++){
            if(todos[i].isCom===true){
                todolist.push(todos[i])
            }
        }
        this.setState({show: todolist})
    }
    clear(){
        const todolist =[];
        const todos = this.state.todos;
        for(let i = 0; i<todos.length;i++){
            if(todos[i].isCom===false){
                todolist.push(todos[i])
            }
        }
        this.setState({todos: todolist,show: todolist,left:todolist.length})

    }
    render() {
        let todos = this.state.todos
        let show = this.state.show
        return (
            <>
                <Header text="todos" />
                <section className="todo-app__main">
                <Input text={this.state.value} update={this.setText} keyp={this.onAddItem}/>
                <div> {this.state.value}</div>
                {show.map(to => (<Item delete={this.deitem} check={this.clickchange} bekey={to.id} todo={to.value} sty={to.isCom?{background: '#26ca299b'}:{background: 'rgba(99, 99, 99, 0.698)'}} ssty={to.isCom ?{opacity: "0.5", textDecoration: "line-through"} :null}/>))}

                <Footer clear={this.clear} disstyle={this.id === this.state.left+1 ?{display: "none"}:{display: "block"}} left={this.state.left} all={this.showall} active={this.showactive} completed={this.showcomplete}/>
                </section>
            </>
        );
    }
}

export default TodoApp;
