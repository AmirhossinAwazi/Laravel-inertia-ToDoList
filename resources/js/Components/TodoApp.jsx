import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';
import Todo from './Todo';

const TodoApp = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            const response = await axios.get('/todos');
            setTodos(response.data.todos);
        };

        fetchTodos();
    }, []);

    const addTodo = (todo) => {
        setTodos([...todos, todo]);
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div>
            <TodoForm addTodo={addTodo} />
            {todos.map(todo => (
                <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} />
            ))}
        </div>
    );
};

export default TodoApp;
