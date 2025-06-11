const TodoData = (props) => {
    const { todoList, deleteTodo } = props;

    return (
        <div className='todo-data'>
            {todoList.map((item, index) => {
                return (
                    <div key={item.id} className="todo-item">
                        {index + 1}. {item.name}
                        <button
                            onClick={() => deleteTodo(item.id)}
                            style={{ cursor: 'pointer' }}
                        >Delete</button>
                    </div>
                );
            })}
        </div>
    );
}

export default TodoData;