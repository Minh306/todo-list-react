import TodoList from "./components/TodoList";
import Button from "@atlaskit/button";
import Textfield from "@atlaskit/textfield";
import { useCallback, useEffect, useState } from "react";
import { v4 } from "uuid";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [textInput, setTextInput] = useState("");

  const handleTextInput = useCallback((e) => {
    setTextInput(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      // Đảo thứ tự các value
      setTodoList([
        { id: v4(), name: textInput, isCompleted: false },
        ...todoList,
      ]);
      setTextInput("");
    },
    [textInput, todoList]
  );

  const handleCheckBtnClick = useCallback((id) => {
    setTodoList((prevState) =>
      prevState.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todo
      )
    );
  }, []);

  const TODO_APP_STORAGE_KEY = "TODO_APP";

  useEffect(() => {
    const storageTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if (storageTodoList) {
      setTodoList(JSON.parse(storageTodoList))
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList]);

  return (
    <>
      <h3>TodoList Today</h3>
      <Textfield
        elemAfterInput={
          <Button
            isDisabled={!textInput}
            appearance="primary"
            onClick={handleSubmit}
          >
            Add
          </Button>
        }
        css={{ padding: "2px 4px 2px" }}
        name="add-todo"
        placeholder="Your work ..."
        value={textInput}
        onChange={handleTextInput}
      ></Textfield>
      <TodoList todoList={todoList} handleCheckBtnClick={handleCheckBtnClick} />
    </>
  );
}

export default App;
