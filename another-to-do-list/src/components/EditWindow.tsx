import React, { useState } from "react";
import { useToDoList } from "../context/ToDoListContext";
import { ToDo } from "../model/model";
import { AnimatePresence, motion } from "framer-motion";
import classNames from "classnames";

function EditWindow() {
  const { editedToDo, setEditedToDo, updateToDo } = useToDoList();
  const [sumbitedEmptyText, setSubmitedEmptyText] = useState(false);

  const SubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedToDo?.content !== "") updateToDo(editedToDo);
    else if (!sumbitedEmptyText) {
      setSubmitedEmptyText(true);
      setTimeout(() => {
        setSubmitedEmptyText(false);
      }, 500);
    }
  };
  return (
    <div className="fixed w-full h-full bg-black bg-opacity-60 top-0 left-0 grid place-items-center">
      <motion.form
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        onSubmit={(e) => SubmitEdit(e)}
        className="h-2/5 md:h-auto w-5/6 lg:w-3/4 xl:max-w-4xl bg-primary-400 border-2 border-primary-600 rounded-lg flex flex-col items-center p-4 gap-4"
      >
        <p className="text-4xl">Edit task</p>
        <textarea
          value={editedToDo?.content}
          onChange={(e) =>
            setEditedToDo({ ...editedToDo, content: e.target.value } as ToDo)
          }
          className={classNames(
            "h-5/6 md:h-1/2 w-5/6 bg-primary-300 text-xl md:text-2xl rounded-sm shadow-md border-primary-600 focus:shadow-md focus:outline-1 focus:outline-primary-600 p-4 break-all resize-none",
            {
              "border-2": sumbitedEmptyText,
              "border-red-400": sumbitedEmptyText,
            }
          )}
        />
        <div className="flex gap-6 mt-auto items-center justify-center">
          <button
            onClick={() => updateToDo(undefined)}
            type="button"
            className="bg-primary-600 text-xl md:text-3xl font-bold shadow-md
        hover:scale-105 transition-transform py-1 px-3 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primary-600 text-xl md:text-3xl font-bold shadow-md
        hover:scale-105 transition-transform py-1 px-3 rounded-md"
          >
            Save
          </button>
        </div>
      </motion.form>
    </div>
  );
}

export default EditWindow;
