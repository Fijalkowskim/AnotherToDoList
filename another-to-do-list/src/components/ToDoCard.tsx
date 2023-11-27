import React, { useState } from "react";
import { ToDo } from "../model";
import { MdDoneOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { useToDoList } from "../context/ToDoListContext";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  toDo: ToDo;
}
const toDoAnimation = {
  none: {
    scale: 0,
    opacity: 0,
  },
  visible: { scale: 1, opacity: 1 },
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      mass: 0.1,
    },
  },
  toggleIsDone: {
    scale: 1,
    duration: 0.2,
    opacity: 1,
  },
};

function ToDoCard({ toDo }: Props) {
  const { removeToDo, toggleIsDone } = useToDoList();
  const [isVisible, setIsVisible] = useState(true);
  const handleRemove = () => {
    setIsVisible(false);
  };
  const handleIsDoneToggle = () => {
    toggleIsDone(toDo.id);
    //tutaj uruchom animacje toogleIsDone
  };
  return (
    <AnimatePresence onExitComplete={() => removeToDo(toDo.id)}>
      {isVisible && (
        <motion.div
          key={toDo.id}
          variants={toDoAnimation}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 10,
            mass: 0.5,
          }}
          initial="none"
          animate={"visible"}
          exit="exit"
          className={`w-5/6 bg-primary-300 border-primary-500 border-2 shadow-sm p-4 flex items-center gap-4 text-xl 
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
            onClick={handleIsDoneToggle}
            className="hover:bg-primary-500 aspect-square h-8 grid place-items-center rounded-full transition-colors"
          >
            <MdDoneOutline />
          </button>
          <button className="hover:bg-primary-500 aspect-square h-8 grid place-items-center rounded-full transition-colors">
            <FiEdit />
          </button>
          <button
            onClick={handleRemove}
            className="hover:bg-primary-500 aspect-square h-8 grid place-items-center rounded-full transition-colors"
          >
            <AiOutlineDelete />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ToDoCard;
