import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { removeTodo, editTodo, completedTodo } from "../../redux/todoSlice";
import styles from "./TodoItem.module.css";
import { AiFillEdit } from "react-icons/ai";
import { IoCheckmarkDoneSharp, IoTrashSharp } from "react-icons/io5";
import { motion } from "framer-motion";

const TodoItem = ({ id, title, completed }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(true);

  const handleDelete = () => {
    dispatch(removeTodo({ id: id }));
  };
  const update = (id, value, e) => {
    if (e.which === 13) {
      dispatch(editTodo({ id, title: value }));
      inputRef.current.disabled = true;
    }
  };
  const handleCompleted = () => {
    dispatch(completedTodo({ id }));
  };

  const changeFocus = () => {
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };

  return (
    <motion.li
      initial={{ x: "150vw", transition: { type: "spring", duration: 2 } }}
      animate={{ x: 0, transition: { type: "spring", duration: 2 } }}
      whileHover={{
        scale: 0.9,
        transition: { type: "spring", duration: 0.1 },
      }}
      exit={{
        x: "-60vw",
        scale: [1, 0],
        transition: { duration: 0.5 },
        backgroundColor: "rgba(255,0,0,1)",
      }}
      key={id}
      className={styles.card}
    >
      <textarea
        ref={inputRef}
        disabled={inputRef}
        defaultValue={title}
        onKeyPress={(e) => update(id, inputRef.current.value, e)}
      />
      <div className={styles.btns}>
        <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          onClick={changeFocus}
        >
          <AiFillEdit />
        </motion.button>
        {completed === false && (
          <motion.button
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.9 }}
            style={{ color: "green" }}
            onClick={handleCompleted}
          >
            <IoCheckmarkDoneSharp />
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          style={{ color: "red" }}
          onClick={handleDelete}
        >
          <IoTrashSharp />
        </motion.button>
      </div>
      {completed && <span className={styles.completed}>Done</span>}
    </motion.li>
  );
};

export default TodoItem;
