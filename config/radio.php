<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Radio Stream Configuration
    |--------------------------------------------------------------------------
    |
    | These settings control the default radio stream behavior.
    | The stream URL can be overridden from the admin panel.
    |
    */

    'stream' => [
        'url' => env('RADIO_STREAM_URL', 'https://stream.zeno.fm/yn65fsarcm0uv'),
        'default_volume' => env('RADIO_DEFAULT_VOLUME', 0.8),
        'fm_frequency' => env('RADIO_FM_FREQUENCY', '99.5'),
        'autoplay' => false,
    ],

    /*
    |--------------------------------------------------------------------------
    | Player Settings
    |--------------------------------------------------------------------------
    |
    | Visual and behavior settings for the radio player.
    |
    */

    'player' => [
        'show_fm_frequency' => true,
        'show_live_indicator' => true,
        'visualizer_enabled' => true,
        'mini_player_position' => 'bottom-right',
    ],

    /*
    |--------------------------------------------------------------------------
    | Schedule Settings
    |--------------------------------------------------------------------------
    |
    | Default settings for radio program schedules.
    |
    */

    'schedule' => [
        'time_format' => '12h',
        'show_presenter_images' => true,
        'default_program_duration' => 60,
    ],

    /*
    |--------------------------------------------------------------------------
    | Social Media Links (Default)
    |--------------------------------------------------------------------------
    |
    | Default social media URLs. These can be overridden from admin panel.
    |
    */

    'social' => [
        'facebook' => env('SOCIAL_FACEBOOK', ''),
        'twitter' => env('SOCIAL_TWITTER', ''),
        'instagram' => env('SOCIAL_INSTAGRAM', ''),
        'youtube' => env('SOCIAL_YOUTUBE', ''),
        'whatsapp' => env('SOCIAL_WHATSAPP', ''),
    ],

];
