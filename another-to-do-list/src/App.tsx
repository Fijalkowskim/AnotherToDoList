import React, { useState } from "react";
import Navbar from "./components/Navbar";
import InputField from "./components/InputField";
import { ToDo } from "./model";
import ToDoList from "./components/ToDoList";

function App() {
  const [newToDoContent, setNewToDoContent] = useState<string>("");
  const [toDoList, setToDoList] = useState<ToDo[]>([]);

  const addToDo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newToDoContent === "") return;
    const newToDo: ToDo = {
      content: newToDoContent,
      date: Date.now(),
      isDone: false,
    };
    setToDoList([...toDoList, newToDo]);
    setNewToDoContent("");
  };
  return (
    <div>
      <Navbar />
      <InputField
        newToDoContent={newToDoContent}
        setToDoContent={setNewToDoContent}
        addToDo={addToDo}
      />
      <ToDoList toDoList={toDoList} />
    </div>
  );
}

export default App;
