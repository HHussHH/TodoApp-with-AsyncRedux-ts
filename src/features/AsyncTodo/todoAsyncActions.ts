import { createAsyncThunk } from "@reduxjs/toolkit";
import { Todo } from "types";
import { TodoSlice } from "./asyncTodoSlice";

export const fetchAllTodos = createAsyncThunk<
  Todo[],
  undefined,
  { state: { asyncTodos: TodoSlice } }
>(
  "todos/fetchTodos",
  async () => {
    console.log(1);
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=10"
    );
    return (await response.json()) as Todo[];
  },
  {
    condition: (_, { getState }) => {
      const { status } = getState().asyncTodos;
      if (status === "loading") {
        return false;
      }
    },
  }
);

export const createTodo = createAsyncThunk(
  "todo/createTodo",
  async (text: string) => {
    const newTodo: Required<Omit<Todo, "id">> = {
      title: text,
      userId: 1,
      completed: false,
    };

    const responce = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=10",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      }
    );
    return (await responce.json()) as Todo;
  }
);
