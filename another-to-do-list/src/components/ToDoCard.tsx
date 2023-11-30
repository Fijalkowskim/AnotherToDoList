import React, { useState } from "react";
import { ToDo } from "../model/model";
import { MdDoneOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { useToDoList } from "../context/ToDoListContext";
import { AnimatePresence, motion } from "framer-motion";
import { toDoAnimation } from "../model/toDoAnimation";

interface Props {
  toDo: ToDo;
}

function ToDoCard({ toDo }: Props) {
  const { removeToDo, toggleIsDone, editToDo } = useToDoList();
  return (
    <AnimatePresence mode="popLayout">
      <motion.li
        key={toDo.id}
        variants={toDoAnimation}
        transition={toDoAnimation.transition}
        layout
        initial="none"
        animate="visible"
        exit="exit"
        className={`w-5/6 ${
          toDo.isDone ? "bg-primary-400" : "bg-primary-300"
        } border-primary-500 border-2 shadow-sm p-4 flex items-center gap-4 text-xl 
          }`}
      >
        <p
          className={`mr-auto overflow-hidden overflow-ellipsis ${
            toDo.isDone ? "line-through" : ""
          }`}
        >
          {toDo.content}
        </p>
        <p className=" w-36 text-right">
          {new Date(toDo.date).toLocaleDateString()}
        </p>
        <button
          onClick={() => toggleIsDone(toDo.id)}
          className="hover:bg-primary-500 aspect-square h-8 grid place-items-center rounded-full transition-colors"
        >
          <MdDoneOutline />
        </button>
        <button
          onClick={() => editToDo(toDo.id)}
          className="hover:bg-primary-500 aspect-square h-8 grid place-items-center rounded-full transition-colors"
        >
          <FiEdit />
        </button>
        <button
          onClick={() => removeToDo(toDo.id)}
          className="hover:bg-primary-500 aspect-square h-8 grid place-items-center rounded-full transition-colors"
        >
          <AiOutlineDelete />
        </button>
      </motion.li>
    </AnimatePresence>
  );
}

export default ToDoCard;
