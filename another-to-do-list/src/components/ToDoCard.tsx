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
        } border-primary-500 border-2 shadow-sm px-2 md:p-4 flex items-center gap-4 text-lg md:text-xl 
          }`}
      >
        <p
          className={`mr-auto overflow-hidden overflow-ellipsis ${
            toDo.isDone ? "line-through" : ""
          }`}
        >
          {toDo.content}
        </p>
        <div className="flex flex-col justify-center items-center md:gap-4 md:flex-row">
          <p className="text-center md:w-36 md:text-right">
            {new Date(toDo.date).toLocaleDateString()}
          </p>
          <div className="flex items-center md:gap-4">
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
          </div>
        </div>
      </motion.li>
    </AnimatePresence>
  );
}

export default ToDoCard;
