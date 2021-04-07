import React from "react";
export default (props) => (
	<input className="todo-app__input" type="text" placeholder="what need to be done?" value={props.text} onChange={props.update} onKeyPress={props.keyp}/>
)