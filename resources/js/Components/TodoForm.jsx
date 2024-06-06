import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const TodoForm = ({ setTodos }) => {
    const [task, setTask] = useState('');
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleTaskChange = (event) => {
        setTask(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        createTodo();
    };

    const createTodo = async () => {
        if (!task.trim()) {
            setErrors({ task: 'Task cannot be empty' });
            return;
        }

        setProcessing(true);

        try {
            const response = await axios.post('/todos', { task });
            if (response.data && response.data.todos) {
                setTodos(response.data.todos);
                setTask('');
                setErrors({});
            } else {
                setErrors({ task: 'Unexpected response structure' });
            }
        } catch (error) {
            console.error('Error adding todo:', error);
            if (error.response) {
                setErrors({ task: `Failed to add todo: ${error.response.data.message || 'Unknown error'}` });
            } else {
                setErrors({ task: 'Failed to add todo: Network error' });
            }
        } finally {
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="border flex space-x-4 p-4 rounded">
            <div className="flex-1">
                <input
                    className="block px-2 py-1.5 bg-gray-100 rounded w-full"
                    placeholder="Enter your task..."
                    type="text"
                    value={task}
                    onChange={handleTaskChange}
                />
                {errors.task && <small className="text-red-500 mt-2 block">{errors.task}</small>}
            </div>
            <div>
                <button
                    type="submit"
                    className={`px-6 py-1.5 bg-indigo-600 rounded text-white ${processing ? 'opacity-50 disabled:cursor-not-allowed' : ''}`}
                    disabled={processing}
                >
                    {processing ? 'Adding...' : 'Add'}
                </button>
            </div>
        </form>
    );
};

TodoForm.propTypes = {
    setTodos: PropTypes.func.isRequired,
};

export default TodoForm;
