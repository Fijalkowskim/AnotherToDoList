import React, { useState } from "react";
import Navbar from "./components/Navbar";

import { ToDo } from "./model/model";
import ToDoList from "./components/ToDoList";
import { ToDoListProvider, useToDoList } from "./context/ToDoListContext";
import EditWindow from "./components/EditWindow";

function App() {
  return (
    <ToDoListProvider>
      <Navbar />
      <ToDoList />
    </ToDoListProvider>
  );
}

export default App;
