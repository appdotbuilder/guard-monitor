<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\IncidentMedia
 *
 * @property int $id
 * @property int $incident_id
 * @property string $filename
 * @property string $original_name
 * @property string $mime_type
 * @property string $type
 * @property int $file_size
 * @property string $file_path
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Incident $incident
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|IncidentMedia newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|IncidentMedia newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|IncidentMedia query()
 * @method static \Illuminate\Database\Eloquent\Builder|IncidentMedia whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IncidentMedia whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IncidentMedia whereFilename($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IncidentMedia whereFileSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IncidentMedia whereFilePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IncidentMedia whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IncidentMedia whereIncidentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IncidentMedia whereMimeType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IncidentMedia whereOriginalName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IncidentMedia whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IncidentMedia whereUpdatedAt($value)

 * 
 * @mixin \Eloquent
 */
class IncidentMedia extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'incident_id',
        'filename',
        'original_name',
        'mime_type',
        'type',
        'file_size',
        'file_path',
        'description',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'file_size' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the incident that owns this media.
     */
    public function incident(): BelongsTo
    {
        return $this->belongsTo(Incident::class);
    }
}