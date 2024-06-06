import { useForm } from '@inertiajs/react';

const TodoForm = ({ setTodos }) => {
    const { data, setData, post, processing, errors } = useForm({
        task: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        createTodo();
    };

    const createTodo = async () => {
        if (!data.task.trim()) {
            setData('errors', { task: 'Task cannot be empty' });
            return;
        }

        try {
            const response = await post('/todos', data);
            if (response && response.todos) {
                setTodos(response.todos);
                setData('task', '');
                setData('errors', {});
            } else {
                setData('errors', { task: 'Unexpected response structure' });
            }
        } catch (error) {
            console.error('Error adding todo:', error);
            if (error.response) {
                setData('errors', { task: `Failed to add todo: ${error.response.data.message || 'Unknown error'}` });
            } else {
                setData('errors', { task: 'Failed to add todo: Network error' });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="border flex space-x-4 p-4 rounded">
            <div className="flex-1">
                <input
                    className="block px-2 py-1.5 bg-gray-100 rounded w-full"
                    placeholder="Enter your task..."
                    type="text"
                    value={data.task}
                    onChange={(e) => setData('task', e.target.value)}
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

export default TodoForm;
