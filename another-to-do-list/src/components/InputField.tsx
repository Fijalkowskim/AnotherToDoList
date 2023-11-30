import React, { useRef, useState } from "react";
import { useToDoList } from "../context/ToDoListContext";

function InputField() {
  const { addToDo } = useToDoList();
  const inputRef = useRef<HTMLInputElement>(null);

  const [newToDoContent, setNewToDoContent] = useState<string>("");
  const SubmitAddToDo = (e: React.FormEvent) => {
    e.preventDefault();
    if (addToDo(newToDoContent)) setNewToDoContent("");
  };
  return (
    <form
      onSubmit={(e) => {
        SubmitAddToDo(e);
        //inputRef.current?.blur();
      }}
      className="w-5/6 sm:w-2/3 h-16 flex justify-center mx-auto relative "
    >
      <input
        type="input"
        ref={inputRef}
        placeholder="Enter a task"
        value={newToDoContent}
        onChange={(e) => setNewToDoContent(e.target.value)}
        className=" w-full h-full bg-primary-300 text-left text-2xl tracking-tight rounded-l-full rounded-r-full shadow-sm border-primary-600 
        pl-4 pr-20
        focus:shadow-md  focus:outline-none focus:border-2"
      />
      <button
        type="submit"
        className="bg-primary-600 h-full aspect-square rounded-full absolute right-0 text-lg font-bold shadow-md
        hover:scale-105 transition-transform"
      >
        Add
      </button>
    </form>
  );
}

export default InputField;
