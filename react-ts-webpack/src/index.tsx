import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";

type formElem = React.FormEvent<HTMLFormElement>;

interface iTodo {
  text: string;
  complete: boolean;
}

export default function App(): JSX.Element {
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<iTodo[]>([]);

  const handleSubmit = (e: formElem): void => {
    e.preventDefault();
    addTodo(value);
    setValue("");
  };

  const addTodo = (text: string): void => {
    const newTodos: iTodo[] = [...todos, { text, complete: false }];
    setTodos(newTodos);
  };

  const completeTodo = (index: number): void => {
    const newTodos: iTodo[] = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };

  const removeTodo = (index: number): void => {
    const newTodos: iTodo[] = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
  return (
    <Fragment>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
        <button type="submit">Add Todo</button>
      </form>
      <section>
        {todos.map((todo: iTodo, index: number) => (
          <Fragment key={index}>
            <div
              style={{ textDecoration: todo.complete ? "line-through" : "" }}
            >
              {todo.text}
            </div>
            <button type="button" onClick={() => completeTodo(index)}>
              {" "}
              {todo.complete ? "Incomplete" : "Complete"}{" "}
            </button>
            <button type="button" onClick={()=>removeTodo(index) }>&times;</button>
          </Fragment>
        ))}
      </section>
    </Fragment>
  );
}

const root = document.getElementById("app-root");

ReactDOM.render(<App />, root);
