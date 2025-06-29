import './todo.css';
import TodoData from './TodoData';
import TodoNew from './TodoNew';
import ReactLogo from '../../assets/react.svg';
import { useState } from 'react';

const TodoApp = () => {

    const [todoList, setTodoList] = useState([]);

    const addNewTodo = (name) => {
        const newTodo = {
            id: randomIntFromInterval(1, 1000000),
            name: name
        };
        setTodoList([...todoList, newTodo]);
    }

    const randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const deleteTodo = (id) => {
        const updatedTodoList = todoList.filter(item => item.id !== id);
        setTodoList(updatedTodoList);
    }

    return (
        <div className="todo-container">
            <div className="todo-title">Todo List</div>
            <TodoNew
                addNewTodo={addNewTodo}
            />
            {todoList.length > 0 ?
                <TodoData
                    todoList={todoList}
                    deleteTodo={deleteTodo}
                />
                :
                <div className='react-logo'>
                    <img src={ReactLogo} alt="React Logo" className='logo' />
                </div>
            }
        </div>
    );
}

export default TodoApp;