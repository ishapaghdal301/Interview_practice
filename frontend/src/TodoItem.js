import React from 'react';

const TodoItem = ({ todo, updateTodo, deleteTodo }) => {
  const toggleComplete = () => {
    updateTodo(todo._id, { completed: !todo.completed });
  };

  const removeTodo = () => {
    deleteTodo(todo._id);
  };

  return (
    <li>
      <span
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        onClick={toggleComplete}
      >
        {todo.title}
      </span>
      <button onClick={removeTodo}>Delete</button>
    </li>
  );
};

export default TodoItem;
