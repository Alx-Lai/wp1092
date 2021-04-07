import React,{ Component } from "react";

export default (props) => (
    <>
	<li className="todo-app__item">
	<div className="todo-app__checkbox" >
	<input type="checkbox" onClick={props.check} id={props.bekey}/>:
	<label for={props.bekey} style={props.sty}/>
	</div>
	<h1 className="todo-app__item-detail" style={props.ssty} >{props.bekey}. {props.todo}</h1>
	<img src="./img/x.png" className="todo-app__item-x" onClick={props.delete} id={props.bekey} />
	</li>
	</>
)
