<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Blog extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'author_name',
        'image_url',
        'excerpt',
        'body',
        'published_at',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function comments(): HasMany
    {
        return $this->hasMany(BlogComment::class);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
