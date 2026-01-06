import { use, useState } from "react";

export default function App() {
  const [addTodos, setAddtodos] = useState([]);

  function todo(newtodo) {
    setAddtodos((prevtodos) => [
      ...prevtodos,
      { text: newtodo, checked: false },
    ]);
  }

  function deleteTask(id) {
    setAddtodos((prevtask) => prevtask.filter((_, i) => i !== id));
  }

  function handleToglle(id) {
    setAddtodos((prevtask) =>
      prevtask.map((task, i) =>
        i === id ? { ...task, checked: !task.checked } : task
      )
    );
  }

  return (
    <div className="app">
      <Header />
      <AddTask onAdd={todo} />
      <TaskList
        Ontoggle={handleToglle}
        onDelete={deleteTask}
        tasks={addTodos}
      />
    </div>
  );
}

function Header() {
  return <h1>My task List</h1>;
}

function AddTask({ onAdd }) {
  const [inputvalue, setInputValue] = useState("");
  return (
    <div className="input">
      <input
        value={inputvalue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter Task"
      ></input>
      <button
        onClick={() => {
          if (inputvalue === "") return;
          onAdd(inputvalue);
          setInputValue("");
        }}
      >
        +
      </button>
    </div>
  );
}

function Task({ task, id, onDelete, Ontoggle }) {
  return (
    <div className="fix">
      <li className="list">
        <input onClick={() => Ontoggle(id)} type="checkbox"></input>
        <span className={task.checked ? "line" : "hight"}>{task.text}</span>
        <button onClick={() => onDelete(id)}>delete</button>
      </li>
    </div>
  );
}

function TaskList({ tasks, onDelete, Ontoggle }) {
  return (
    <ul>
      {tasks.map((t, i) => (
        <Task Ontoggle={Ontoggle} key={i} task={t} id={i} onDelete={onDelete} />
      ))}
    </ul>
  );
}
