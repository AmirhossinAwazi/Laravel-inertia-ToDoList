import { useForm } from '@inertiajs/react';
import Todo from './Todo';

const TodoApp = () => {
    const { get } = useForm();
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await get('/todos');
                setTodos(response.data.todos);
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };

        fetchTodos();
    }, [get]);

    const addTodo = (todo) => {
        setTodos([...todos, todo]);
    };

    const deleteTodo = async (id) => {
        try {
            await destroy(`/todos/${id}`);
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
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
