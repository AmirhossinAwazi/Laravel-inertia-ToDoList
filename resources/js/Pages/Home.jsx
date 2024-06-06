import React from 'react';
import PropTypes from 'prop-types';
import Todo from '../Components/Todo';
import AddTodoForm from '../Components/TodoForm';

const TodoList = ({ todos }) => {
    return (
        <div className="mx-auto max-w-3xl mt-10 px-4">
            <h1 className="font-light text-3xl">My Todo List</h1>

            <div className="flex flex-col space-y-4 mt-5">
                <AddTodoForm />
                {todos.map(todo => (
                    <Todo key={todo.id} todo={todo} />
                ))}
            </div>
        </div>
    );
};

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
