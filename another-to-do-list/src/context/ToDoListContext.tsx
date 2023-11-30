import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { ToDo } from "../model/model";
import { withCookies, Cookies } from "react-cookie";
import { useCookies } from "react-cookie";

interface ToDoListProviderProps {
  children: ReactNode;
}
interface ToDoListContext {
  addToDo: (newToDoContent: string) => boolean;
  removeToDo: (id: number) => void;
  toggleIsDone: (id: number) => void;
  clearList: () => void;
  toDoList: ToDo[];
  isEditing: boolean;
  editToDo: (id: number) => void;
  editedToDo: ToDo | undefined;
  setEditedToDo: React.Dispatch<React.SetStateAction<ToDo | undefined>>;
  updateToDo: (toDo: ToDo | undefined) => void;
}
const ToDoListContext = createContext({} as ToDoListContext);

export function useToDoList() {
  return useContext(ToDoListContext);
}
export function ToDoListProvider({ children }: ToDoListProviderProps) {
  const [toDoList, setToDoList] = useState<ToDo[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedToDo, setEditedToDo] = useState<ToDo>();
  const [cookies, setCookie] = useCookies(["todoList"]);

  const saveToDoListToCookies = () => {
    setCookie("todoList", JSON.stringify(toDoList), { path: "/" });
  };
  const loadToDoListFromCookies = () => {
    const todoListFromCookies = cookies.todoList;
    if (todoListFromCookies) {
      setToDoList(todoListFromCookies);
    }
  };
  useEffect(() => {
    loadToDoListFromCookies();
  }, []);
  useEffect(() => {
    saveToDoListToCookies();
  }, [toDoList]);

  //ToDoListContext functions
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
      if (toDo === undefined) {
        return updatedToDoList;
      } else if (toDo.isDone) {
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
  const editToDo = (id: number) => {
    setIsEditing(true);
    setEditedToDo(toDoList.find((toDo) => toDo.id === id));
  };
  const updateToDo = (toDo: ToDo | undefined) => {
    setToDoList(toDoList.map((item) => (item.id === toDo?.id ? toDo : item)));
    setIsEditing(false);
    setEditedToDo(undefined);
  };
  //------ToDoListContext functions

  return (
    <ToDoListContext.Provider
      value={{
        addToDo,
        removeToDo,
        toggleIsDone,
        clearList,
        toDoList,
        isEditing,
        editToDo,
        editedToDo,
        setEditedToDo,
        updateToDo,
      }}
    >
      {children}
    </ToDoListContext.Provider>
  );
}
