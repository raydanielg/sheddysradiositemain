<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use App\Models\SitePage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

use App\Mail\ContactAutoReply;
use App\Mail\AdminContactNotification;
use App\Models\Subscriber;
use Illuminate\Support\Facades\Mail;

class PublicPageController extends Controller
{
    public function about(): Response
    {
        $page = SitePage::query()
            ->where('slug', 'about')
            ->where('is_active', true)
            ->first();

        return Inertia::render('About', [
            'page' => $page ? [
                'title' => $page->title,
                'excerpt' => $page->excerpt,
                'body' => $page->body,
                'hero_image_url' => $page->hero_image_url,
            ] : null,
        ]);
    }

    public function contact(): Response
    {
        $page = SitePage::query()
            ->where('slug', 'contact')
            ->where('is_active', true)
            ->first();

        return Inertia::render('Contact', [
            'page' => $page ? [
                'title' => $page->title,
                'excerpt' => $page->excerpt,
                'body' => $page->body,
                'hero_image_url' => $page->hero_image_url,
            ] : null,
        ]);
    }

    public function storeContact(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:190'],
            'phone' => ['nullable', 'string', 'max:40'],
            'subject' => ['nullable', 'string', 'max:190'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        $contactMessage = ContactMessage::query()->create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'subject' => $validated['subject'] ?? null,
            'message' => $validated['message'],
            'ip_address' => $request->ip(),
            'user_agent' => substr((string) $request->userAgent(), 0, 500),
        ]);

        // Auto-subscribe the user for future notifications
        Subscriber::query()->firstOrCreate(['email' => $validated['email']]);

        // Send auto-reply to user
        Mail::to($validated['email'])->queue(new ContactAutoReply($contactMessage));

        // Notify Admin (using a fixed admin email or config)
        $adminEmail = config('mail.from.address', 'info@sheddysnewlook.org');
        Mail::to($adminEmail)->queue(new AdminContactNotification($contactMessage));

        return redirect()->back()->with('success', 'Ujumbe wako umetumwa na tumekutumia email ya uthibitisho. Asante!');
    }
}
