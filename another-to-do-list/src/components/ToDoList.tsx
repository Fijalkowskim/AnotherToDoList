import React from "react";
import { ToDo } from "../model";
import ToDoCard from "./ToDoCard";

interface Props {
  toDoList: ToDo[];
}

function ToDoList({ toDoList }: Props) {
  return (
    <div className="w-5/6 mt-10 mx-auto flex flex-col items-center gap-2">
      {toDoList.map((toDo) => (
        <ToDoCard toDo={toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
