import React, { useState } from "react";
import TodoItem from "../todoItem/TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../../redux/todoSlice";
import styles from "./TodoList.module.css";
import { GoPlus } from "react-icons/go";
import { AnimatePresence, motion } from "framer-motion";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state);

  const [value, setValue] = useState("");
  const [sort, setSort] = useState("Active");

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleAddTodo = () => {
    if (value === "") {
      alert("Input is required");
    } else {
      dispatch(addTodo(value));
      setValue("");
    }
  };

  return (
    <motion.div
      initial={{ y: 1000 }}
      animate={{ y: 0 }}
      transtion={{ type: "spring", duration: 1 }}
      className={styles.todoList}
    >
      <h1>Todo App</h1>
      <div className={styles.addTodo}>
        {/* create todo */}
        <input
          type="text"
          onChange={handleChange}
          className={styles.todoInput}
          value={value}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={styles.addBtn}
          onClick={handleAddTodo}
        >
          <GoPlus />
        </motion.button>
      </div>
      <div className={styles.displaytodos}>
        <div className={styles.buttons}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSort("Active")}
          >
            Active
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSort("Completed")}
          >
            Completed
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSort("All")}
          >
            All
          </motion.button>
        </div>
      </div>

      <ul>
        <AnimatePresence>
          {todos.length > 0 && sort === "Active"
            ? todos.map((todo) => {
                return (
                  todo.completed === false && (
                    <TodoItem
                      id={todo.id}
                      title={todo.title}
                      completed={todo.completed}
                    />
                  )
                );
              })
            : null}
          {todos.length > 0 && sort === "Completed"
            ? todos.map((todo) => {
                return (
                  todo.completed === true && (
                    <TodoItem
                      id={todo.id}
                      title={todo.title}
                      completed={todo.completed}
                    />
                  )
                );
              })
            : null}
          {todos.length > 0 && sort === "All"
            ? todos.map((todo) => (
                <TodoItem
                  id={todo.id}
                  title={todo.title}
                  completed={todo.completed}
                />
              ))
            : null}
        </AnimatePresence>
      </ul>
    </motion.div>
  );
};

export default TodoList;
