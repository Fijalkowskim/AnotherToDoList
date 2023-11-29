import React from "react";
import { useToDoList } from "../context/ToDoListContext";
import { ToDo } from "../model/model";

function EditWindow() {
  const { editedToDo, setEditedToDo, updateToDo } = useToDoList();

  const SubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className="fixed w-full h-full bg-black bg-opacity-60 top-0 left-0 grid place-items-center">
      <form
        onSubmit={(e) => SubmitEdit(e)}
        className="w-1/2 h-1/2 bg-primary-400 border-2 border-primary-600 rounded-lg flex flex-col items-center p-4 gap-4"
      >
        <p className="text-4xl">Edit task</p>
        <input
          type="text"
          value={editedToDo?.content}
          onChange={(e) =>
            setEditedToDo({ ...editedToDo, content: e.target.value } as ToDo)
          }
          className=" h-1/2 w-5/6 bg-primary-300 text-2xl rounded-sm shadow-md border-primary-600 
        focus:shadow-md  focus:outline-none focus:border-2 p-4 break-all"
        />
        <div className="flex gap-6 mt-auto">
          <button
            type="button"
            className="bg-primary-600 text-3xl font-bold shadow-md
        hover:scale-105 transition-transform"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primary-600 text-3xl font-bold shadow-md
        hover:scale-105 transition-transform"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditWindow;
