<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreIncidentRequest;
use App\Models\Guard;
use App\Models\Incident;
use App\Models\IncidentMedia;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class IncidentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Incident::with(['reportedBy.user', 'media'])
            ->latest();

        // Filter by status
        if ($request->has('status') && $request->status !== '') {
            $query->where('status', $request->status);
        }

        // Filter by priority
        if ($request->has('priority') && $request->priority !== '') {
            $query->where('priority', $request->priority);
        }

        // Filter by type
        if ($request->has('type') && $request->type !== '') {
            $query->where('type', $request->type);
        }

        $incidents = $query->paginate(10);

        return Inertia::render('incidents/index', [
            'incidents' => $incidents,
            'filters' => $request->only(['status', 'priority', 'type'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('incidents/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreIncidentRequest $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $guard = $user->guardProfile;
        
        if (!$guard) {
            return redirect()->back()->withErrors(['error' => 'You must be registered as a guard to report incidents.']);
        }

        // Generate unique incident number
        $incidentNumber = 'INC-' . date('Y') . '-' . str_pad((string)(Incident::count() + 1), 6, '0', STR_PAD_LEFT);

        $incident = Incident::create([
            'reported_by' => $guard->getKey(),
            'incident_number' => $incidentNumber,
            'title' => $request->title,
            'description' => $request->description,
            'type' => $request->type,
            'priority' => $request->priority,
            'location' => $request->location,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'occurred_at' => $request->occurred_at,
            'involved_parties' => $request->involved_parties,
            'witnesses' => $request->witnesses,
            'actions_taken' => $request->actions_taken,
            'follow_up_required' => $request->follow_up_required,
        ]);

        // Handle file uploads
        if ($request->hasFile('media')) {
            foreach ($request->file('media') as $file) {
                $filename = uniqid() . '.' . $file->getClientOriginalExtension();
                $filePath = $file->storeAs('incidents/' . $incident->id, $filename, 'public');
                
                // Determine file type
                $mimeType = $file->getMimeType();
                $type = 'document';
                if (str_starts_with($mimeType, 'image/')) {
                    $type = 'photo';
                } elseif (str_starts_with($mimeType, 'video/')) {
                    $type = 'video';
                }

                IncidentMedia::create([
                    'incident_id' => $incident->getKey(),
                    'filename' => $filename,
                    'original_name' => $file->getClientOriginalName(),
                    'mime_type' => $mimeType,
                    'type' => $type,
                    'file_size' => $file->getSize(),
                    'file_path' => $filePath,
                ]);
            }
        }

        // Create notifications for team members and supervisors
        $this->createIncidentNotifications($incident);

        return redirect()->route('incidents.show', $incident)
            ->with('success', 'Incident reported successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Incident $incident)
    {
        $incident->load(['reportedBy.user', 'reportedBy.team', 'media']);

        return Inertia::render('incidents/show', [
            'incident' => $incident
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Incident $incident)
    {
        $request->validate([
            'status' => 'required|in:open,investigating,resolved,closed',
            'actions_taken' => 'nullable|string',
            'follow_up_required' => 'nullable|string',
        ]);

        $incident->update($request->only(['status', 'actions_taken', 'follow_up_required']));

        // Create notification for status update
        if ($request->status !== $incident->getOriginal('status')) {
            /** @var \App\Models\Guard $reportedBy */
            $reportedBy = $incident->reportedBy;
            /** @var \App\Models\User $user */
            $user = $reportedBy->user;
            Notification::create([
                'user_id' => $user->id,
                'incident_id' => $incident->id,
                'title' => 'Incident Status Updated',
                'message' => "Incident #{$incident->incident_number} status changed to {$request->status}",
                'type' => 'incident_updated',
                'priority' => 'medium',
            ]);
        }

        return redirect()->route('incidents.show', $incident)
            ->with('success', 'Incident updated successfully.');
    }

    /**
     * Create notifications for new incidents.
     */
    protected function createIncidentNotifications(Incident $incident)
    {
        // Notify team members
        if ($incident->reportedBy->team) {
            $teamMembers = $incident->reportedBy->team->guards()
                ->where('id', '!=', $incident->reported_by)
                ->with('user')
                ->get();

            /** @var \App\Models\Guard $teamGuard */
            foreach ($teamMembers as $teamGuard) {
                $teamUser = $teamGuard->user;
                Notification::create([
                    'user_id' => $teamUser->getKey(),
                    'incident_id' => $incident->id,
                    'title' => 'New Incident Reported',
                    'message' => "New {$incident->priority} priority {$incident->type} incident reported by {$incident->reportedBy->user->name}",
                    'type' => 'incident_created',
                    'priority' => $incident->priority,
                ]);
            }
        }
    }
}