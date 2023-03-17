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

    const responce = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
    return (await responce.json()) as Todo;
  }
);

export const removeTodo = createAsyncThunk<
  Todo["id"],
  Todo["id"],
  { rejectValue: string }
>("todo/removeTodo", async (id: Todo["id"], { rejectWithValue }) => {
  const responce = await fetch(
    "https://jsonplaceholder.typicode.com/todos/" + id,
    {
      method: "DELETE",
    }
  );
  if (!responce.ok) {
    return rejectWithValue("Failed delete todo with id" + id);
  }
  return id;
});

export const toggleTodo = createAsyncThunk<
  Todo,
  Todo["id"],
  { state: { asyncTodos: TodoSlice }; rejectValue: string }
>("todo/toggle", async (id, { getState, rejectWithValue }) => {
  const todo = getState().asyncTodos.list.find((el) => el.id === id);

  if (todo) {
    const responce = await fetch(
      "https://jsonplaceholder.typicode.com/todos/" + id,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      }
    );
    if (!responce.ok) {
      return rejectWithValue("Failed update todo with id" + id);
    }
    return await responce.json();
  }
  return rejectWithValue("No such todo with id" + id);
});
