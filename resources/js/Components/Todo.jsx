// Todo.jsx
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Todo = ({ todo, setTodos }) => {
    const handleCheckboxChange = async () => {
        // Update the todo as done
        try {
            await axios.put(`/todos/${todo.id}`, { is_done: !todo.is_done });
            setTodos(prevTodos =>
                prevTodos.map(item => (item.id === todo.id ? { ...item, is_done: !item.is_done } : item))
            );
        } catch (error) {
            console.error('Failed to update todo:', error);
        }
    };

    const handleDeleteClick = async () => {
        // Delete the todo
        try {
            await axios.delete(`/todos/${todo.id}`);
            setTodos(prevTodos => prevTodos.filter(item => item.id !== todo.id));
        } catch (error) {
            console.error('Failed to delete todo:', error);
        }
    };

    return (
        <div className={`bg-gray-100 py-2 px-4 rounded flex flex-row space-x-4 ${todo.is_done ? 'line-through' : ''}`}>
            <input
                type="checkbox"
                checked={todo.is_done}
                onChange={handleCheckboxChange}
            />
            <p>{todo.task}</p>
            <button type="button" onClick={handleDeleteClick}>
                X
            </button>
        </div>
    );
};

Todo.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.number.isRequired,
        task: PropTypes.string.isRequired,
        is_done: PropTypes.bool.isRequired,
    }).isRequired,
    setTodos: PropTypes.func.isRequired,
};

export default Todo;
