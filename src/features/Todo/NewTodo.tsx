import AddNewItem from "components/NewItem";

import { useAppDispatch } from "redux-hook";
import { addTodo } from "./TodoSlice";

export const NewTodo = () => {
  const dispatch = useAppDispatch();

  const handleNewTodo = (title: string) => {
    dispatch(addTodo(title));
  };

  return <AddNewItem placeholder="add new todo" handleClick={handleNewTodo} />;
};
