<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Guard;
use App\Models\Incident;
use App\Models\Notification;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        $user = Auth::user();
        
        // Get statistics
        $stats = [
            'total_incidents' => Incident::count(),
            'open_incidents' => Incident::where('status', 'open')->count(),
            'high_priority_incidents' => Incident::whereIn('priority', ['high', 'critical'])->count(),
            'total_guards' => Guard::where('status', 'active')->count(),
            'total_teams' => Team::where('is_active', true)->count(),
        ];

        // Get recent incidents
        $recentIncidents = Incident::with(['reportedBy.user'])
            ->latest()
            ->take(5)
            ->get();

        // Get user's notifications
        $notifications = Notification::where('user_id', $user->id)
            ->unread()
            ->latest()
            ->take(5)
            ->get();

        // Get user's guard profile if exists
        $guardProfile = $user->guardProfile()->with('team')->first();

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentIncidents' => $recentIncidents,
            'notifications' => $notifications,
            'guardProfile' => $guardProfile,
        ]);
    }

    /**
     * Store a new notification read status.
     */
    public function store(Request $request)
    {
        $notification = Notification::where('user_id', Auth::id())
            ->where('id', $request->notification_id)
            ->first();

        if ($notification) {
            $notification->update([
                'is_read' => true,
                'read_at' => now(),
            ]);
        }

        return response()->json(['success' => true]);
    }
}