<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RadioProgram extends Model
{
    protected $fillable = [
        'day_of_week',
        'title',
        'host',
        'start_time',
        'end_time',
        'description',
        'image_url',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'day_of_week' => 'integer',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];
}
