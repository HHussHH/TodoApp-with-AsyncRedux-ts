import { configureStore, combineReducers } from "@reduxjs/toolkit";
import TodoReducer from "features/Todo/TodoSlice";
import AsyncTodoReducer from "features/AsyncTodo/asyncTodoSlice";
const rootReducer = combineReducers({
  todos: TodoReducer,
  asyncTodos: AsyncTodoReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// export type RootState = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
