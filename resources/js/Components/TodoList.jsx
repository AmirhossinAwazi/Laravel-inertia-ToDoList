import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';
import TodoForm from './TodoForm';

const TodoList = ({ todos, addTodo, deleteTodo }) => {
    return (
        <div className="mx-auto max-w-3xl mt-10 px-4">
            <h1 className="font-light text-3xl">My Todo List</h1>

            <div className="flex flex-col space-y-4 mt-5">
                <TodoForm addTodo={addTodo} />
                {todos.map(todo => (
                    <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} />
                ))}
            </div>
        </div>
    );
};

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    addTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
};

export default TodoList;
