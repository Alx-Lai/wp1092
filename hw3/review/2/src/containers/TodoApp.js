import React, { Component } from "react";
import Header from "../components/Header";
import ReactDOM from "react-dom";

var todoItems = [];
var show = false;
var todoCount = 0;

class TodoList extends React.Component {
    render() {
        var items = this.props.items.map((item, index) => {
            return (
                <TodoListItem key={index} item={item} index={index} removeItem={this.props.removeItem} markTodoDone={this.props.markTodoDone} />
            );
        });
        return (
            <ul className="todo-app__list" id="todo-list"> {items} </ul>
        );
    }
}

class TodoListItem extends React.Component {
    constructor(props) {
        super(props);
        this.onClickClose = this.onClickClose.bind(this);
        this.onClickDone = this.onClickDone.bind(this);
    }
    onClickClose() {
        var index = parseInt(this.props.index);
        this.props.removeItem(index);
    }
    onClickDone() {
        var index = parseInt(this.props.index);
        this.props.markTodoDone(index);

    }

    render() {
        var todoClass = this.props.item.done ?
            "done" : "undone";
        var todoClass2 = this.props.item.done ?
            "checkboxDone" : "checkboxUndone";
        return (
            <li className="todo-app__item">

                <div className={todoClass2}>
                    <input id="2" type="checkbox" ></input>
                    <label for="2" onClick={this.onClickDone}></label>
                </div>
                <div className={todoClass}>
                    <h1>{this.props.item.value}</h1>
                </div>

                <img src="./img/x.png" className="todo-app__item-x" onClick={this.onClickClose}></img>

            </li>

        );
    }
}

class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        this.refs.itemName.focus();
    }
    onSubmit(event) {
        event.preventDefault();
        var newItemValue = this.refs.itemName.value;

        if (newItemValue) {
            this.props.addItem({ newItemValue });
            this.refs.form.reset();
        }
        show = true;
        todoCount = todoCount + 1;

    }
    render() {
        return (
            <form ref="form" onSubmit={this.onSubmit} className="form-inline">
                <input type="text" ref="itemName" className="todo-app__input" placeholder="What needs to be done?" />

            </form>
        );
    }
}


class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.markTodoDone = this.markTodoDone.bind(this);
        this.state = { todoItems: todoItems };
    }
    addItem(todoItem) {
        todoItems.splice(todoItems.length + 1, 0, {
            index: todoItems.length + 1,
            value: todoItem.newItemValue,
            done: false
        });
        this.setState({ todoItems: todoItems });
    }
    removeItem(itemIndex) {
        var todo = todoItems[itemIndex];
        todoItems.splice(itemIndex, 1);
        todo.done ? todoCount = todoCount = todoCount : todoCount = todoCount - 1;
        this.setState({ todoItems: todoItems });
    }
    markTodoDone(itemIndex) {
        var todo = todoItems[itemIndex];
        todoItems.splice(itemIndex, 1);
        todo.done = !todo.done;
        todo.done ? todoCount = todoCount - 1 : todoCount = todoCount + 1;
        todoItems.splice(itemIndex, 0, todo);
        this.setState({ todoItems: todoItems });
    }
    render() {
        var dis = todoItems.length == 0 ?
            "todo-app__footer" : "todo-app__footer_display";
        return (
            <>
                <Header text="todos" />
                <section className="todo-app__main">
                    <TodoForm addItem={this.addItem} />
                    <TodoList items={this.props.initItems} removeItem={this.removeItem} markTodoDone={this.markTodoDone} />

                </section>
                <footer className={dis} id="todo__footer" >
                    <div className="todo-app__total">
                        <span >{todoCount} left</span>
                    </div>
                    <ul className="todo-app__view-buttons">
                        <button type="button" className="btn toggle-btn" aria-pressed="true">
                            <span className="visually-hidden">All </span>
                        </button>
                        <button type="button" className="btn toggle-btn" aria-pressed="true">
                            <span className="visually-hidden">Active </span>
                        </button>
                        <button type="button" className="btn toggle-btn" aria-pressed="true">
                            <span className="visually-hidden">Complete </span>
                        </button>
                    </ul>
                    <div className="todo-app__clean">
                        <button type="button" className="btn toggle-btn" aria-pressed="true">
                            <span className="visually-hidden">Clean complete </span>
                        </button>
                    </div>

                </footer>
            </>
        );
    }
}

ReactDOM.render(<TodoApp initItems={todoItems} />, document.getElementById('root'));





/*
class TodoApp extends Component {

    render() {
        return (
            <>
                <Header text="todos" />
                <section className="todo-app__main">
                    <input type="text" className="todo-app__input" placeholder="What needs to be done?" onClick="this.placeholder=''" value={this.state.inputValue} onKeyPress={this.handleKeyPress}>
                    </input>
                    <ul
                        role="list"
                        className="todo-app__input"
                        id="todo-list"
                    >

                    </ul>
                </section>
                <footer className="todo-app__footer" id="todo__footer">
                    <div className="todo-app__total">
                        <span >2 left </span>
                    </div>
                    <ul className="todo-app__view-buttons">
                        <button type="button" className="btn toggle-btn" aria-pressed="true">
                            <span className="visually-hidden">All </span>
                        </button>
                        <button type="button" className="btn toggle-btn" aria-pressed="true">
                            <span className="visually-hidden">Active </span>
                        </button>
                        <button type="button" className="btn toggle-btn" aria-pressed="true">
                            <span className="visually-hidden">Complete </span>
                        </button>
                    </ul>
                    <div className="todo-app__clean">
                        <button type="button" className="btn toggle-btn" aria-pressed="true">
                            <span className="visually-hidden">Clean complete </span>
                        </button>
                    </div>

                </footer>
            </>

        );
    }
}
*/
export default TodoApp;
