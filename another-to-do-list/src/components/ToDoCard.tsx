import React from "react";
import { ToDo } from "../model";
import { MdDoneOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { useToDoList } from "../context/ToDoListContext";

interface Props {
  toDo: ToDo;
}

function ToDoCard({ toDo }: Props) {
  const { removeToDo } = useToDoList();
  return (
    <div className="w-5/6 bg-primary-300 border-primary-500 border-2 shadow-sm p-4 flex items-center gap-4 text-xl">
      <p className="mr-auto overflow-hidden overflow-ellipsis">
        {toDo.content}
      </p>
      <p className=" w-36 text-right">
        {new Date(toDo.date).toLocaleDateString()}
      </p>
      <button className="hover:bg-primary-500 aspect-square h-8 grid place-items-center rounded-full transition-colors">
        <MdDoneOutline />
      </button>
      <button className="hover:bg-primary-500 aspect-square h-8 grid place-items-center rounded-full transition-colors">
        <FiEdit />
      </button>
      <button
        onClick={() => removeToDo(toDo.id)}
        className="hover:bg-primary-500 aspect-square h-8 grid place-items-center rounded-full transition-colors"
      >
        <AiOutlineDelete />
      </button>
    </div>
  );
}

export default ToDoCard;
