<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Guard
 *
 * @property int $id
 * @property int $user_id
 * @property int|null $team_id
 * @property string $badge_number
 * @property string $rank
 * @property string|null $phone
 * @property string|null $emergency_contact
 * @property string $status
 * @property \Illuminate\Support\Carbon $hire_date
 * @property array|null $certifications
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @property-read \App\Models\Team|null $team
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Incident> $incidents
 * @property-read int|null $incidents_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Guard newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Guard newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Guard query()
 * @method static \Illuminate\Database\Eloquent\Builder|Guard whereBadgeNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Guard whereCertifications($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Guard whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Guard whereEmergencyContact($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Guard whereHireDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Guard whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Guard wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Guard whereRank($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Guard whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Guard whereTeamId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Guard whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Guard whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Guard active()
 * @method static \Database\Factories\GuardFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Guard extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'team_id',
        'badge_number',
        'rank',
        'phone',
        'emergency_contact',
        'status',
        'hire_date',
        'certifications',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'hire_date' => 'date',
        'certifications' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns this guard profile.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the team this guard belongs to.
     */
    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    /**
     * Get the incidents reported by this guard.
     */
    public function incidents(): HasMany
    {
        return $this->hasMany(Incident::class, 'reported_by');
    }

    /**
     * Scope a query to only include active guards.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
}