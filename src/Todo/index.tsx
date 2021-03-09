import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react';
import React, { createContext, useContext, useState } from 'react';
import './Todo.css';

class TodoList {
    todos = [
        {
            text: 'Make a todo list',
            completed: false,
        },
        {
            text: 'Switch useState to mobX',
            completed: false,
        },
        {
            text: 'Make it look good',
            completed: false,
        },
    ];

    constructor() {
        makeAutoObservable(this);
    };

    addTodo = (text: string) => {
        if (text) {
            this.todos = [...this.todos, { text: text, completed: false }];
        };
    };

    toggleComplete = (index: number) => {
        this.todos = this.todos.map((todo, idx) => (
            idx === index ?
                { ...todo, completed: !todo.completed } : todo
        ));
    };

    removeTodo = (index: number) => {
        this.todos = this.todos.filter((todo, idx) => (
            idx !== index
        ));
    }
};

const TodoListContext = createContext<TodoList | undefined>(undefined);

interface TodoModel {
    text: string;
    completed: boolean;
}

interface TodoMakerPropsModel {
    todo: TodoModel;
    index: number;
    toggleComplete: (inputValue: number) => void;
    removeTodo: (inputValue: number) => void;
}

const TodoMaker = ({ todo, index, toggleComplete, removeTodo }: TodoMakerPropsModel) => {
    return (
        <div className="todo">
            <div className="todo-text"
                style={{ textDecoration: todo.completed ? 'line-through' : '' }}>
                {todo.text}
            </div>
            <div className="formButtonContainer">
                <div className="formButton"
                    onClick={() => toggleComplete(index)}>Complete</div>
                <div className="formButton"
                    onClick={() => removeTodo(index)}>Delete</div>
            </div>
        </div>
    );
};

interface TodoAdderPropsModel {
    addTodo: (text: string) => void;
}

const TodoAdder = ({ addTodo }: TodoAdderPropsModel) => {
    const [inputValue, setInputValue] = useState("");
    return (
        <div className="todo">
            <input
                type="text"
                className="input"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)} />
            <div className="formButtonContainer">
                <div
                    className="formButton"
                    onClick={() => {
                        addTodo(inputValue)
                        setInputValue('')
                    }}>Submit</div>
            </div>
        </div>
    )
}

const TodoContainer = observer(() => {
    const useTodoList = useContext(TodoListContext);
    return (
        <div className="container">
            <div className="todo-list">
                {useTodoList?.todos.map((todo, index) => (
                    < TodoMaker
                        key={index}
                        index={index}
                        todo={todo}
                        toggleComplete={useTodoList!.toggleComplete}
                        removeTodo={useTodoList!.removeTodo}
                    />
                ))}
                <TodoAdder addTodo={useTodoList!.addTodo} />
            </div>
        </div>
    );
});

const Todo = () => {
    const myTodo = new TodoList();
    return (
        <TodoListContext.Provider value={myTodo}>
            <TodoContainer />
        </TodoListContext.Provider>
    );
}

export default Todo;
