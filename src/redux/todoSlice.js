import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const addTodoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Math.floor(Math.random() * 1000),
        title: action.payload,
        completed: false,
      };
      state.push(newTodo);
    },
    removeTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
    editTodo: (state, action) => {
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, title: action.payload.title };
        }
        return todo;
      });
    },
    completedTodo: (state, action) => {
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, completed: true };
        }
        return todo;
      });
    },
  },
});

export const { addTodo, removeTodo, editTodo, completedTodo } =
  addTodoSlice.actions;
export default addTodoSlice.reducer;
