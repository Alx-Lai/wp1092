import React from "react";
export default (props) => (
    <footer className="todo-app__footer" id="todo-footer">
    <div className="todo-app__total">{props.left} left</div>
    <ul class="todo-app__view-buttons">
    <button className="footer" onClick={props.all}>All</button>
     <button className="footer" onClick={props.active}>Active</button>
      <button className="footer" onClick={props.completed}>completed</button>
    </ul>
    <button className="todo-app__clean" onClick={props.clear} style={props.disstyle}>Clear completed</button>
    </footer>
)
