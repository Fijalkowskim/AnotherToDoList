import React from "react";
import { ToDo } from "../model/model";
import ToDoCard from "./ToDoCard";
import { useToDoList } from "../context/ToDoListContext";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { toDoAnimation } from "../model/toDoAnimation";
import EditWindow from "./EditWindow";

function ToDoList() {
  const { toDoList, clearList, isEditing } = useToDoList();
  return (
    <ul className="w-5/6 my-6 mx-auto flex flex-col items-center gap-2">
      {isEditing && <EditWindow />}
      {toDoList.length > 0 && (
        <motion.button
          className="bg-primary-600 text-xl py-2 px-4 rounded-r-full rounded-l-full shadow-md font-normal mb-2"
          onClick={clearList}
          variants={toDoAnimation}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.1 },
          }}
          whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
          initial="none"
          animate="visible"
          exit="exit"
          transition={toDoAnimation.transition}
        >
          {" "}
          Clear all
        </motion.button>
      )}
      {toDoList.map((toDo) => (
        <ToDoCard key={toDo.id} toDo={toDo} />
      ))}
    </ul>
  );
}

export default ToDoList;
