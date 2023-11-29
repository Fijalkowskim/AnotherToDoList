import React, { useState } from "react";
import Navbar from "./components/Navbar";
import InputField from "./components/InputField";
import { ToDo } from "./model/model";
import ToDoList from "./components/ToDoList";
import { ToDoListProvider } from "./context/ToDoListContext";

function App() {
  return (
    <ToDoListProvider>
      <Navbar />
      <InputField />
      <ToDoList />
    </ToDoListProvider>
  );
}

export default App;
