import './components/todo/todo.css';
import TodoData from './components/todo/TodoData';
import TodoNew from './components/todo/TodoNew';
import ReactLogo from './assets/react.svg';

const App = () => {

  const name = 'tien';

  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew />
      <TodoData
        name={name}
      />
      <div className='react-logo'>
        <img src={ReactLogo} alt="React Logo" className='logo' />
      </div>
    </div>
  );
}

export default App;