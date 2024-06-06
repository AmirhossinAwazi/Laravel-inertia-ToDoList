import { useForm } from '@inertiajs/react';

const TodoList = ({ todos, addTodo }) => {
    const { post, delete: destroy, processing, errors } = useForm();

    const handleDelete = async (id) => {
        try {
            await destroy(`/todos/${id}`);
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    return (
        <div className="mx-auto max-w-3xl mt-10 px-4">
            <h1 className="font-light text-3xl">My Todo List</h1>

            <div className="flex flex-col space-y-4 mt-5">
                <TodoForm addTodo={addTodo} />
                {todos.map(todo => (
                    <div key={todo.id} className="flex items-center space-x-2">
                        <Todo todo={todo} />
                        <button
                            onClick={() => handleDelete(todo.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded"
                            disabled={processing}
                        >
                            {processing ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                ))}
                {errors.delete && <div className="text-red-500">{errors.delete}</div>}
            </div>
        </div>
    );
};

export default TodoList;
