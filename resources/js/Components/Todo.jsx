import { useForm } from '@inertiajs/react';

const Todo = ({ todo }) => {
    const { delete: destroy } = useForm();

    const handleCheckboxChange = async () => {
        try {
            await destroy(`/todos/${todo.id}`, {
                method: 'put',
                data: { is_done: !todo.is_done }
            });
        } catch (error) {
            console.error('Failed to update todo:', error);
        }
    };

    const handleDeleteClick = async () => {
        // Delete the todo
        try {
            await destroy(`/todos/${todo.id}`);
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

export default Todo;
