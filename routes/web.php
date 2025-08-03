<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GuardController;
use App\Http\Controllers\IncidentController;
use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::post('notifications/mark-read', [DashboardController::class, 'store'])->name('notifications.mark-read');
    
    // Resource routes
    Route::resource('incidents', IncidentController::class);
    Route::resource('teams', TeamController::class);
    Route::resource('guards', GuardController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
