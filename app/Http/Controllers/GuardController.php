<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreGuardRequest;
use App\Models\Guard;
use App\Models\Team;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GuardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $guards = Guard::with(['user', 'team'])
            ->latest()
            ->paginate(10);

        return Inertia::render('guards/index', [
            'guards' => $guards
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::whereDoesntHave('guardProfile')->get();
        $teams = Team::active()->get();

        return Inertia::render('guards/create', [
            'users' => $users,
            'teams' => $teams
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGuardRequest $request)
    {
        $guard = Guard::create($request->validated());

        return redirect()->route('guards.show', $guard)
            ->with('success', 'Guard profile created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Guard $guard)
    {
        $guard->load(['user', 'team', 'incidents' => function ($query) {
            $query->latest()->take(5);
        }]);

        return Inertia::render('guards/show', [
            'guard' => $guard
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Guard $guard)
    {
        $teams = Team::active()->get();

        return Inertia::render('guards/edit', [
            'guard' => $guard,
            'teams' => $teams
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Guard $guard)
    {
        $request->validate([
            'team_id' => 'nullable|exists:teams,id',
            'rank' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'emergency_contact' => 'nullable|string',
            'status' => 'required|in:active,inactive,on_leave',
            'certifications' => 'nullable|array',
        ]);

        $guard->update($request->only([
            'team_id', 'rank', 'phone', 'emergency_contact', 'status', 'certifications'
        ]));

        return redirect()->route('guards.show', $guard)
            ->with('success', 'Guard profile updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Guard $guard)
    {
        $guard->delete();

        return redirect()->route('guards.index')
            ->with('success', 'Guard profile deleted successfully.');
    }
}