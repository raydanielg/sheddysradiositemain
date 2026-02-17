<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LoginActivity extends Model
{
    protected $fillable = ['user_id', 'ip_address', 'user_agent', 'login_at'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
