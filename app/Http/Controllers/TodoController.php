<?php

namespace App\Http\Controllers;

use App\Http\Requests\TodoStoreRequest;
use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class TodoController extends Controller
{
    public function index()
    {
        return Inertia::render('Home', [
            'todos' => Todo::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Todo/Create');
    }

    public function store(TodoStoreRequest $request)
    {
        Todo::create([
            'task' => $request->input('task'),
        ]);
    
        return Redirect::route('todos.index');
    }

    public function update(Request $request, Todo $todo)
    {
        $todo->update([
            'is_done' => $request->boolean('is_done'),
        ]);

        return redirect()->route('todos.index');
    }

    public function destroy(Todo $todo)
    {
        $todo->delete();
    
        return redirect()->route('todos.index');
    }
}
