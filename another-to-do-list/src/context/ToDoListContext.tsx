import { ReactNode, createContext, useContext, useState } from "react";
import { ToDo } from "../model/model";

interface ToDoListProviderProps {
  children: ReactNode;
}
interface ToDoListContext {
  addToDo: (newToDoContent: string) => boolean;
  removeToDo: (id: number) => void;
  toggleIsDone: (id: number) => void;
  clearList: () => void;
  toDoList: ToDo[];
}
const ToDoListContext = createContext({} as ToDoListContext);

export function useToDoList() {
  return useContext(ToDoListContext);
}
export function ToDoListProvider({ children }: ToDoListProviderProps) {
  const [toDoList, setToDoList] = useState<ToDo[]>([]);

  const addToDo = (newToDoContent: string) => {
    if (newToDoContent === "") return false;
    const newToDo: ToDo = {
      id: Date.now(),
      content: newToDoContent,
      date: Date.now(),
      isDone: false,
    };
    setToDoList([...toDoList, newToDo]);
    return true;
  };
  const removeToDo = (id: number) => {
    setToDoList((toDoList) => toDoList.filter((toDo) => toDo.id !== id));
  };
  const toggleIsDone = (id: number) => {
    setToDoList((prevToDoList) => {
      var updatedToDoList = prevToDoList.map((toDo) =>
        toDo.id === id ? { ...toDo, isDone: !toDo.isDone } : toDo
      );
      const toDo = updatedToDoList.find((item) => item.id === id);
      if (toDo === undefined) return updatedToDoList;
      else if (toDo.isDone) {
        const indexOfItem = updatedToDoList.findIndex((toDo) => toDo.id === id);

        if (indexOfItem !== -1) {
          const movedItem = updatedToDoList.splice(indexOfItem, 1)[0];
          updatedToDoList.push(movedItem);
        }
      } else {
        const undoneTasks = updatedToDoList.filter((taks) => !taks.isDone);
        undoneTasks.sort((a, b) => a.date - b.date);
        const doneTasks = updatedToDoList.filter((taks) => taks.isDone);
        updatedToDoList = [...undoneTasks, ...doneTasks];
      }

      return updatedToDoList;
    });
  };
  const clearList = () => {
    setToDoList([]);
  };

  return (
    <ToDoListContext.Provider
      value={{ addToDo, removeToDo, toggleIsDone, clearList, toDoList }}
    >
      {children}
    </ToDoListContext.Provider>
  );
}
