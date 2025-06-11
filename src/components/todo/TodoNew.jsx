import { useState } from "react";

const TodoNew = (props) => {
    const [valueInput, setValueInput] = useState('');

    const { addNewTodo } = props;

    const handleClick = () => {
        addNewTodo(valueInput);
        setValueInput('');
    }

    const handleChange = (name) => {
        setValueInput(name);
    }

    return (
        <div className='todo-input'>
            <input
                type="text"
                onChange={(event) => handleChange(event.target.value)}
                value={valueInput}
            />
            <button
                style={{ cursor: 'pointer' }}
                onClick={handleClick}
            >Add</button>
        </div>
    );
}

export default TodoNew;