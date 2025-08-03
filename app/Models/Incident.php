<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Incident
 *
 * @property int $id
 * @property int $reported_by
 * @property string $incident_number
 * @property string $title
 * @property string $description
 * @property string $type
 * @property string $priority
 * @property string $status
 * @property string $location
 * @property float|null $latitude
 * @property float|null $longitude
 * @property \Illuminate\Support\Carbon $occurred_at
 * @property array|null $involved_parties
 * @property array|null $witnesses
 * @property string|null $actions_taken
 * @property string|null $follow_up_required
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Guard $reportedBy
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\IncidentMedia> $media
 * @property-read int|null $media_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Notification> $notifications
 * @property-read int|null $notifications_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Incident newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Incident newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Incident query()
 * @method static \Illuminate\Database\Eloquent\Builder|Incident whereActionsTaken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Incident whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Incident whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Incident whereFollowUpRequired($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Incident whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Incident whereIncidentNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Incident whereInvolvedParties($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Incident whereLatitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Incident whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Incident whereLongitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Incident whereOccurredAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Incident wherePriority($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Incident whereReportedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Incident whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Incident whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Incident whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Incident whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Incident whereWitnesses($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Incident highPriority()
 * @method static \Illuminate\Database\Eloquent\Builder|Incident open()
 * @method static \Database\Factories\IncidentFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Incident extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'reported_by',
        'incident_number',
        'title',
        'description',
        'type',
        'priority',
        'status',
        'location',
        'latitude',
        'longitude',
        'occurred_at',
        'involved_parties',
        'witnesses',
        'actions_taken',
        'follow_up_required',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'occurred_at' => 'datetime',
        'involved_parties' => 'array',
        'witnesses' => 'array',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the guard who reported this incident.
     */
    public function reportedBy(): BelongsTo
    {
        return $this->belongsTo(Guard::class, 'reported_by');
    }

    /**
     * Get the media files for this incident.
     */
    public function media(): HasMany
    {
        return $this->hasMany(IncidentMedia::class);
    }

    /**
     * Get the notifications for this incident.
     */
    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class);
    }

    /**
     * Scope a query to only include high priority incidents.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeHighPriority($query)
    {
        return $query->whereIn('priority', ['high', 'critical']);
    }

    /**
     * Scope a query to only include open incidents.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOpen($query)
    {
        return $query->where('status', 'open');
    }
}