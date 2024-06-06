?<?php

use App\Models\Todo;
use Inertia\Testing\AssertableInertia;
use function Pest\Laravel\get;
use function Pest\Laravel\assertInertia;
use function Pest\Laravel\assertInertiaHas;
use function Pest\Laravel\delete;
use function Pest\Laravel\put;

it('can complete todo', function () {
    $todo = Todo::factory()->create([
        'is_done' => false,
    ]);

    $response = put(route('todos.update', $todo), [
        'is_done' => true,
    ]);

    $response->assertRedirect('/');
    expect(Todo::find($todo->id))->toHaveProperty('is_done', true);
});

it('can delete todo', function () {
    $todo = Todo::factory()->create();

    $response = delete(route('todos.destroy', $todo));

    $response->assertRedirect('/');
    expect(Todo::find($todo->id))->toBeNull();
});