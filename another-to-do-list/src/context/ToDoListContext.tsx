import { ReactNode, createContext, useContext, useState } from "react";
import { ToDo } from "../model";

interface ToDoListProviderProps {
  children: ReactNode;
}
interface ToDoListContext {
  addToDo: (newToDoContent: string) => boolean;
  removeToDo: (id: number) => void;
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

  return (
    <ToDoListContext.Provider value={{ addToDo, removeToDo, toDoList }}>
      {children}
    </ToDoListContext.Provider>
  );
}
