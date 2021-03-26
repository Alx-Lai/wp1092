import React, { Component } from "react";
import Header from "../components/Header";

class TodoApp extends Component {
    constructor(props){
        super(props);
        this.state = {now_comment : 1,now_left : 1,lists:[], mode:'All'};
    }
    changeState = function(index){
        //console.log(document.getElementById(String(index+1)).checked);
        let arrlists = this.state.lists;
        let now_left_num = 0;
        console.log('index'+index);
        if(arrlists[index]['checked']===true){
            arrlists[index]['checked'] = false;
            document.getElementById('header'+(index+1)).style.textDecoration = 'none';
            document.getElementById('header'+(index+1)).style.opacity = '1';
            /*
            style="text-decoration: line-through; opacity: 0.5;”
            */
        }else{
            arrlists[index]['checked'] = true;
            document.getElementById('header'+(index+1)).style.textDecoration = 'line-through';
            document.getElementById('header'+(index+1)).style.opacity = '0.5';
        }
        for(var i =0;i<arrlists.length ;i++){
            if(arrlists[i]['checked'] === false){
                now_left_num++;
            }
        }
        console.log('nowleft'+now_left_num);
        this.setState((state)=>({now_left: now_left_num}));
        document.getElementsByClassName('todo-app__total')[0].textContent = now_left_num+" left";
        this.setState({lists:arrlists});
    }
    addEle = function(event){
        if(event.keyCode!==13)return;
        var string = document.getElementsByClassName('todo-app__input')[0].value;
        var processed_string = string.replace(/(^\s*)|(\s*$)/g, "");
        var processed_str = string.replace(/\s*/g,"");
        document.getElementsByClassName('todo-app__input')[0].value="";
        if(processed_str.length!==0){
            /*for(var i =0;i<this.state.lists.length ;i++){
                console.log(i+'state'+this.state.lists[i]);
                console.log(this.state.lists[i].checked);
            }*/
            let nowlists = this.state.lists;
            nowlists.push({id:nowlists.length+1,string:processed_string,checked:false});
            //console.log('nowlist:'+nowlists);
            this.setState((state)=>({now_comment: state.now_comment+1}));
            this.setState((state)=>({now_left: state.now_left+1}));
            this.setState((state)=>({lists:nowlists}));
            document.getElementsByClassName('todo-app__total')[0].textContent = this.state.now_left+" left";
        }
    };
    delEle = function(index){
        let arrlists = this.state.lists;
        let now_left_num = 0;
        arrlists = arrlists.slice(0,index).concat(arrlists.slice(index+1,arrlists.length));
        for(var i =0;i<arrlists.length ;i++){
            arrlists[i]['id']=i+1;
            console.log(arrlists[i]);
            console.log(arrlists[i]['checked']);
            if(arrlists[i]['checked'] === false){
                now_left_num++;
                document.getElementById('header'+(i+1)).style.textDecoration = 'none';
                document.getElementById('header'+(i+1)).style.opacity = '1';
                document.getElementById(''+(i+1)).checked = arrlists[i]['checked'];
            }else{
                document.getElementById('header'+(i+1)).style.textDecoration = 'line-through';
                document.getElementById('header'+(i+1)).style.opacity = '0.5';
            }
        }
        
        console.log('nowleft'+now_left_num);
        this.setState((state)=>({now_left: now_left_num}));
        document.getElementsByClassName('todo-app__total')[0].textContent = now_left_num+" left";
        this.setState({lists:arrlists});
    }
    chmodAll = function(){
        this.setState((state)=>({mode:'All'}));
    }
    chmodActive = function(){
        if(this.state.mode === 'Active'){
            this.setState((state)=>({mode:'All'}));
        }else{
            this.setState((state)=>({mode:'Active'}));
        }
    }
    chmodCompleted = function(){
        if(this.state.mode === 'Completed'){
            this.setState((state)=>({mode:'All'}));
        }else{
            this.setState((state)=>({mode:'Completed'}));
        }
    }
    clean = function(){
        let arrlists = this.state.lists;
        let newlists = [];
        let now_left_num = 0;
        for(var i =0;i<arrlists.length ;i++){
            if(arrlists[i]['checked']===false){
                newlists.push(arrlists[i]);
            }
        }
        for(var i =0;i<newlists.length ;i++){
            newlists[i]['id']=i+1;
            now_left_num++;
            document.getElementById('header'+(i+1)).style.textDecoration = 'none';
            document.getElementById('header'+(i+1)).style.opacity = '1';
            document.getElementById(''+(i+1)).checked = newlists[i]['checked'];
        }
        
        console.log('nowleft'+now_left_num);
        this.setState((state)=>({now_left: now_left_num}));
        document.getElementsByClassName('todo-app__total')[0].textContent = now_left_num+" left";
        this.setState({lists:newlists});
    }
    render() {
        let lists = [];
        var todo_list_show = 'todo-app__list hide';
        var todoapp__footer_show = 'todo-app__footer hide'
        var active_count =0;
        var completed_count = 0;
        var clean_show = 'todo-app__clean hide_with_space';
        if(this.state.mode=="All"){
            lists = this.state.lists.map((list,index)=>{
                if(list.checked===true){
                    completed_count++;                    
                }else{
                    active_count++;                         
                }
                return <li className='todo-app__item' key={index}>
                    <div className='todo-app__checkbox'>
                        <input id={list.id} type="checkbox" onChange={this.changeState.bind(this,index)}></input>
                        <label htmlFor={list.id}></label>
                    </div>
                    <h1 className='todo-app__item-detail' id={'header'+list.id}>{list.string}</h1>
                    <img src='img/x.png' className='todo-app__item-x' onClick={this.delEle.bind(this,index)}></img>
                </li>
            });
            if(lists?.length > 0){
                todo_list_show = 'todo-app__list';
                todoapp__footer_show = 'todo-app__footer';
            }
            try{
                document.getElementsByClassName('todo-app__total')[0].textContent = (active_count+completed_count)+" left";
            }catch{
               
            }
            }else if(this.state.mode==='Active'){
            lists = this.state.lists.map((list,index)=>{
               if(list.checked===false){
                    active_count++;
                    return <li className='todo-app__item' key={index}>
                        <div className='todo-app__checkbox'>
                            <input id={list.id} type="checkbox" onChange={this.changeState.bind(this,index)}></input>
                            <label htmlFor={list.id}></label>
                        </div>
                        <h1 className='todo-app__item-detail' id={'header'+list.id}>{list.string}</h1>
                        <img src='img/x.png' className='todo-app__item-x' onClick={this.delEle.bind(this,index)}></img>
                    </li>
               }else{
                return <li className='todo-app__item hide' key={index}>
                        <div className='todo-app__checkbox'>
                            <input id={list.id} type="checkbox" onChange={this.changeState.bind(this,index)}></input>
                            <label htmlFor={list.id}></label>
                        </div>
                        <h1 className='todo-app__item-detail' id={'header'+list.id}>{list.string}</h1>
                        <img src='img/x.png' className='todo-app__item-x' onClick={this.delEle.bind(this,index)}></img>
                    </li>
               }
            });
            if(active_count > 0){
                todo_list_show = 'todo-app__list';
            }
            todoapp__footer_show = 'todo-app__footer';
            document.getElementsByClassName('todo-app__total')[0].textContent = active_count+" left";
        }else if(this.state.mode==='Completed'){
            lists = this.state.lists.map((list,index)=>{
               if(list.checked==true){
                    completed_count++;
                    return <li className='todo-app__item' key={index}>
                        <div className='todo-app__checkbox'>
                            <input id={list.id} type="checkbox" onChange={this.changeState.bind(this,index)}></input>
                            <label htmlFor={list.id}></label>
                        </div>
                        <h1 className='todo-app__item-detail' id={'header'+list.id}>{list.string}</h1>
                        <img src='img/x.png' className='todo-app__item-x' onClick={this.delEle.bind(this,index)}></img>
                    </li>
               }else{
                return <li className='todo-app__item hide' key={index}>
                        <div className='todo-app__checkbox'>
                            <input id={list.id} type="checkbox" onChange={this.changeState.bind(this,index)}></input>
                            <label htmlFor={list.id}></label>
                        </div>
                        <h1 className='todo-app__item-detail' id={'header'+list.id}>{list.string}</h1>
                        <img src='img/x.png' className='todo-app__item-x' onClick={this.delEle.bind(this,index)}></img>
                    </li>
               }
            });
            if(completed_count > 0){
                todo_list_show = 'todo-app__list';
            }
            todoapp__footer_show = 'todo-app__footer';
            document.getElementsByClassName('todo-app__total')[0].textContent = completed_count+" left";
        }
        if(this.state.mode!=='Active' && completed_count > 0){
            clean_show = 'todo-app__clean';
        }
        return (
            <>
                <Header text="todos" />
                <section className="todo-app__main">
                    <input className="todo-app__input" placeholder="What needs to be done?" onKeyUp={this.addEle.bind(this)}></input>
                    <ul className={todo_list_show} id="todo-list" >
                        {lists}
                    </ul>
                </section>
                <footer className={todoapp__footer_show} id="todo-footer">
                    <div className="todo-app__total">0 left</div>
                    <ul className="todo-app__view-buttons">
                        <li>
                            <button id='show_all' onClick={this.chmodAll.bind(this)}>All</button>
                        </li>
                        <li>
                            <button id='show_active' onClick={this.chmodActive.bind(this)}>Active</button>
                        </li>
                        <li>
                            <button id='show_completed' onClick={this.chmodCompleted.bind(this)}>Completed</button>
                        </li>
                    </ul>
                    <div className={clean_show}>
                        <button onClick={this.clean.bind(this)}>Clear Completed</button>
                    </div>
                </footer>
            </>
        );
    }
}


export default TodoApp;
/*<input id="2"></input>
                                <label for="2"></label>*/
/*
<div class="todo-app__checkbox">
    <input id="2"></input>
    <label for="2"></label>
</div>
<h1 class="todo-app__item-detail">This is the third TODO.</h1>
<img src="img/x.png" class="todo-app__item-x"></img>
*/
