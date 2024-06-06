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
        return Inertia::render('Home');
    }

    public function store(TodoStoreRequest $request)
    {
        Todo::create([
            'task' => $request->input('task'),
        ]);
    
        return Redirect::route('todos.index');
    }

    public function show(string $id)
    {
        //
    }

    public function edit(string $id)
    {
        //
    }

    public function update(Request $request, Todo $todo)
    {
        $todo->update([
            'is_done' => $request->boolean('is_done'),
        ]);

        return redirect()->to('todos.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todo)
    {
        $todo->delete();
    
        return redirect()->to('todos.index');
    }
}
