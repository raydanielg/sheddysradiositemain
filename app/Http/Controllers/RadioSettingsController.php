<?php

namespace App\Http\Controllers;

use App\Models\RadioSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RadioSettingsController extends Controller
{
    public function edit()
    {
        $settings = RadioSetting::query()->first();

        return Inertia::render('Admin/RadioSettings', [
            'streamUrl' => $settings?->stream_url,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'stream_url' => ['nullable', 'string', 'max:2048'],
        ]);

        $settings = RadioSetting::query()->firstOrCreate([]);
        $settings->update([
            'stream_url' => $validated['stream_url'] ?? null,
        ]);

        return redirect()->back();
    }
}
