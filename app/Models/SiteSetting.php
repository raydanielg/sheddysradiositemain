<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    protected $fillable = [
        'site_name',
        'site_description',
        'contact_email',
        'contact_phone',
        'seo_title',
        'seo_keywords',
        'seo_description',
        'og_image_url',
        'stream_url',
        'fm_frequency',
        'timezone',
        'date_format',
        'time_format',
    ];
}
