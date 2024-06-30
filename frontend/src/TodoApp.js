import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './TodoList';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('https://interview-practice-k9ho.onrender.com/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos', error);
    }
  };

  const addTodo = async () => {
    if (newTodo.trim() === '') return;
    try {
      const response = await axios.post('https://interview-practice-k9ho.onrender.com/api/todos', {
        title: newTodo,
      });
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo', error);
    }
  };

  const updateTodo = async (id, updatedFields) => {
    try {
      const response = await axios.put(`https://interview-practice-k9ho.onrender.com/api/todos/${id}`, updatedFields);
      setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
    } catch (error) {
      console.error('Error updating todo', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://interview-practice-k9ho.onrender.com/api/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo', error);
    }
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={addTodo}>Add</button>
      <TodoList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
    </div>
  );
};

export default TodoApp;
