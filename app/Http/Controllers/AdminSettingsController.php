<?php

namespace App\Http\Controllers;

use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Inertia\Inertia;
use Inertia\Response;

class AdminSettingsController extends Controller
{
    public function edit(): Response
    {
        $settings = SiteSetting::query()->firstOrCreate([]);

        return Inertia::render('Admin/Settings', [
            'settings' => $settings,
            'timezones' => \DateTimeZone::listIdentifiers(),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'site_name' => ['required', 'string', 'max:100'],
            'site_description' => ['nullable', 'string', 'max:500'],
            'contact_email' => ['nullable', 'email', 'max:100'],
            'contact_phone' => ['nullable', 'string', 'max:40'],
            'seo_title' => ['nullable', 'string', 'max:100'],
            'seo_keywords' => ['nullable', 'string', 'max:500'],
            'seo_description' => ['nullable', 'string', 'max:500'],
            'og_image_url' => ['nullable', 'url', 'max:2048'],
            'stream_url' => ['nullable', 'url', 'max:2048'],
            'fm_frequency' => ['nullable', 'string', 'max:20'],
            'timezone' => ['required', 'string', 'in:' . implode(',', \DateTimeZone::listIdentifiers())],
            'date_format' => ['required', 'string', 'max:20'],
            'time_format' => ['required', 'string', 'max:20'],
        ]);

        $settings = SiteSetting::query()->firstOrCreate([]);
        $settings->update($validated);

        return redirect()->back()->with('success', 'Settings updated successfully.');
    }

    public function generateSitemap(): RedirectResponse
    {
        // Placeholder for sitemap generation logic
        // In a real app, you might use a package like spatie/laravel-sitemap
        Artisan::call('radio:generate-sitemap');

        return redirect()->back()->with('success', 'Sitemap (XML) generated successfully.');
    }
}
