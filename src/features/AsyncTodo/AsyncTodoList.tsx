import TodoItem from "components/TodoItem";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux-hook";
import { Todo } from "types";

import { useEffect } from "react";
import { selectAsyncTodos } from "./asyncTodoSelectors";
import { fetchAllTodos } from "./todoAsyncActions";

const AsyncTodoList = () => {
  const { list } = useSelector(selectAsyncTodos);
  const dispatch = useAppDispatch();

  const handleRemoveTodo = (id: Todo["id"]) => {
    //   dispatch(removeTodo(id));
  };

  const handleToggleTodo = (id: Todo["id"]) => {
    //   dispatch(toggleTodo(id));
  };

  useEffect(() => {
    dispatch(fetchAllTodos());
    // eslint-disable-next-line
  }, []);

  return (
    <ul>
      {list.map((todo) => (
        <TodoItem
          key={todo.id}
          removeTodo={handleRemoveTodo}
          toggleTodo={handleToggleTodo}
          {...todo}
        />
      ))}
    </ul>
  );
};

export default AsyncTodoList;
