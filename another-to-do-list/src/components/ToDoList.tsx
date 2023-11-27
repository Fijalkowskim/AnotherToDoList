import React from "react";
import { ToDo } from "../model";
import ToDoCard from "./ToDoCard";
import { useToDoList } from "../context/ToDoListContext";
import { AnimatePresence } from "framer-motion";

function ToDoList() {
  const { toDoList } = useToDoList();
  return (
    <div className="w-5/6 mt-10 mx-auto flex flex-col items-center gap-2">
      <AnimatePresence>
        {toDoList.map((toDo) => (
          <ToDoCard key={toDo.id} toDo={toDo} />
        ))}
      </AnimatePresence>
    </div>
  );
}

export default ToDoList;
