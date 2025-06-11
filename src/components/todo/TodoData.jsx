const TodoData = (props) => {
    const { todoList } = props;

    return (
        <div className='todo-data'>
            {todoList.map((item, index) => {
                return (
                    <div key={item.id} className="todo-item">
                        {index + 1}. {item.name}
                        <button>Delete</button>
                    </div>
                );
            })}
        </div>
    );
}

export default TodoData;