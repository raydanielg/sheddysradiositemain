<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\ContactMessage;
use App\Models\Highlight;
use App\Models\Presenter;
use App\Models\RadioProgram;
use App\Models\SitePage;
use App\Models\Subscriber;
use App\Mail\NewBlogNotification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AdminContentController extends Controller
{
    public function highlights(): Response
    {
        $items = Highlight::query()->orderBy('sort_order')->get();

        return Inertia::render('Admin/Highlights', [
            'items' => $items,
        ]);
    }

    public function storeProgram(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'day_of_week' => ['required', 'integer', 'min:1', 'max:7'],
            'title' => ['required', 'string', 'max:140'],
            'host' => ['nullable', 'string', 'max:140'],
            'start_time' => ['nullable', 'string', 'max:20'],
            'end_time' => ['nullable', 'string', 'max:20'],
            'description' => ['nullable', 'string', 'max:2000'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:1000000'],
            'is_active' => ['nullable', 'boolean'],
            'image' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:51200'],
        ]);

        $imageUrl = null;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('programs', 'public');
            $imageUrl = Storage::url($path);
        }

        RadioProgram::query()->create([
            'day_of_week' => (int) $validated['day_of_week'],
            'title' => $validated['title'],
            'host' => $validated['host'] ?? null,
            'start_time' => $validated['start_time'] ?? null,
            'end_time' => $validated['end_time'] ?? null,
            'description' => $validated['description'] ?? null,
            'image_url' => $imageUrl,
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_active' => (bool) ($validated['is_active'] ?? true),
        ]);

        return redirect()->back()->with('success', 'Program created.');
    }

    public function updateProgram(Request $request, RadioProgram $radioProgram): RedirectResponse
    {
        $validated = $request->validate([
            'day_of_week' => ['required', 'integer', 'min:1', 'max:7'],
            'title' => ['required', 'string', 'max:140'],
            'host' => ['nullable', 'string', 'max:140'],
            'start_time' => ['nullable', 'string', 'max:20'],
            'end_time' => ['nullable', 'string', 'max:20'],
            'description' => ['nullable', 'string', 'max:2000'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:1000000'],
            'is_active' => ['nullable', 'boolean'],
            'image' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:51200'],
        ]);

        $imageUrl = $radioProgram->image_url;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('programs', 'public');
            $imageUrl = Storage::url($path);
        }

        $radioProgram->update([
            'day_of_week' => (int) $validated['day_of_week'],
            'title' => $validated['title'],
            'host' => $validated['host'] ?? null,
            'start_time' => $validated['start_time'] ?? null,
            'end_time' => $validated['end_time'] ?? null,
            'description' => $validated['description'] ?? null,
            'image_url' => $imageUrl,
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_active' => (bool) ($validated['is_active'] ?? false),
        ]);

        return redirect()->back()->with('success', 'Program updated.');
    }

    public function destroyProgram(RadioProgram $radioProgram): RedirectResponse
    {
        $radioProgram->delete();

        return redirect()->back()->with('success', 'Program deleted.');
    }

    public function storeHighlight(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:140'],
            'description' => ['nullable', 'string', 'max:2000'],
            'cta_text' => ['nullable', 'string', 'max:80'],
            'cta_url' => ['nullable', 'string', 'max:2048'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:1000000'],
            'is_active' => ['nullable', 'boolean'],
            'image' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:51200'],
        ]);

        $imageUrl = null;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('highlights', 'public');
            $imageUrl = Storage::url($path);
        }

        Highlight::query()->create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'cta_text' => $validated['cta_text'] ?? null,
            'cta_url' => $validated['cta_url'] ?? null,
            'image_url' => $imageUrl,
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_active' => (bool) ($validated['is_active'] ?? true),
        ]);

        return redirect()->back()->with('success', 'Highlight created.');
    }

    public function updateHighlight(Request $request, Highlight $highlight): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:140'],
            'description' => ['nullable', 'string', 'max:2000'],
            'cta_text' => ['nullable', 'string', 'max:80'],
            'cta_url' => ['nullable', 'string', 'max:2048'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:1000000'],
            'is_active' => ['nullable', 'boolean'],
            'image' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:51200'],
        ]);

        $imageUrl = $highlight->image_url;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('highlights', 'public');
            $imageUrl = Storage::url($path);
        }

        $highlight->update([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'cta_text' => $validated['cta_text'] ?? null,
            'cta_url' => $validated['cta_url'] ?? null,
            'image_url' => $imageUrl,
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_active' => (bool) ($validated['is_active'] ?? false),
        ]);

        return redirect()->back()->with('success', 'Highlight updated.');
    }

    public function destroyHighlight(Highlight $highlight): RedirectResponse
    {
        $highlight->delete();

        return redirect()->back()->with('success', 'Highlight deleted.');
    }

    public function programs(): Response
    {
        $items = RadioProgram::query()->orderBy('day_of_week')->orderBy('sort_order')->get();

        return Inertia::render('Admin/Programs', [
            'items' => $items,
        ]);
    }

    public function presenters(): Response
    {
        $items = Presenter::query()->orderBy('sort_order')->get();

        return Inertia::render('Admin/Presenters', [
            'items' => $items,
        ]);
    }

    public function storePresenter(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:140'],
            'title' => ['nullable', 'string', 'max:140'],
            'bio' => ['nullable', 'string', 'max:2000'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:1000000'],
            'is_active' => ['nullable', 'boolean'],
            'image' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:51200'],
        ]);

        $imageUrl = null;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('presenters', 'public');
            $imageUrl = Storage::url($path);
        }

        Presenter::query()->create([
            'name' => $validated['name'],
            'title' => $validated['title'] ?? null,
            'bio' => $validated['bio'] ?? null,
            'image_url' => $imageUrl,
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_active' => (bool) ($validated['is_active'] ?? true),
        ]);

        return redirect()->back()->with('success', 'Presenter created.');
    }

    public function updatePresenter(Request $request, Presenter $presenter): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:140'],
            'title' => ['nullable', 'string', 'max:140'],
            'bio' => ['nullable', 'string', 'max:2000'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:1000000'],
            'is_active' => ['nullable', 'boolean'],
            'image' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:51200'],
        ]);

        $imageUrl = $presenter->image_url;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('presenters', 'public');
            $imageUrl = Storage::url($path);
        }

        $presenter->update([
            'name' => $validated['name'],
            'title' => $validated['title'] ?? null,
            'bio' => $validated['bio'] ?? null,
            'image_url' => $imageUrl,
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_active' => (bool) ($validated['is_active'] ?? false),
        ]);

        return redirect()->back()->with('success', 'Presenter updated.');
    }

    public function destroyPresenter(Presenter $presenter): RedirectResponse
    {
        $presenter->delete();

        return redirect()->back()->with('success', 'Presenter deleted.');
    }

    public function blogs(): Response
    {
        $items = Blog::query()->orderByDesc('published_at')->orderBy('sort_order')->get();

        return Inertia::render('Admin/Blogs', [
            'items' => $items,
        ]);
    }

    public function storeBlog(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:140'],
            'excerpt' => ['nullable', 'string', 'max:500'],
            'body' => ['required', 'string'],
            'author_name' => ['nullable', 'string', 'max:100'],
            'published_at' => ['nullable', 'date'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
            'image' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:51200'],
        ]);

        $imageUrl = null;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('blogs', 'public');
            $imageUrl = Storage::url($path);
        }

        $blog = Blog::query()->create([
            'title' => $validated['title'],
            'slug' => \Illuminate\Support\Str::slug($validated['title']) . '-' . rand(1000, 9999),
            'excerpt' => $validated['excerpt'] ?? null,
            'body' => $validated['body'],
            'author_name' => $validated['author_name'] ?? null,
            'published_at' => $validated['published_at'] ?? now(),
            'image_url' => $imageUrl,
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_active' => (bool) ($validated['is_active'] ?? true),
        ]);

        if ($blog->is_active) {
            $subscribers = Subscriber::all();
            foreach ($subscribers as $subscriber) {
                Mail::to($subscriber->email)->queue(new NewBlogNotification($blog));
            }
        }

        return redirect()->back()->with('success', 'Blog created and subscribers notified.');
    }

    public function updateBlog(Request $request, Blog $blog): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:140'],
            'excerpt' => ['nullable', 'string', 'max:500'],
            'body' => ['required', 'string'],
            'author_name' => ['nullable', 'string', 'max:100'],
            'published_at' => ['nullable', 'date'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
            'image' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:51200'],
        ]);

        $imageUrl = $blog->image_url;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('blogs', 'public');
            $imageUrl = Storage::url($path);
        }

        $blog->update([
            'title' => $validated['title'],
            'excerpt' => $validated['excerpt'] ?? null,
            'body' => $validated['body'],
            'author_name' => $validated['author_name'] ?? null,
            'published_at' => $validated['published_at'] ?? $blog->published_at,
            'image_url' => $imageUrl,
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_active' => (bool) ($validated['is_active'] ?? false),
        ]);

        return redirect()->back()->with('success', 'Blog updated.');
    }

    public function destroyBlog(Blog $blog): RedirectResponse
    {
        $blog->delete();

        return redirect()->back()->with('success', 'Blog deleted.');
    }

    public function pages(): Response
    {
        $items = SitePage::query()->orderBy('slug')->get();

        return Inertia::render('Admin/Pages', [
            'items' => $items,
        ]);
    }

    public function storePage(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:140'],
            'slug' => ['required', 'string', 'max:100', 'unique:site_pages,slug'],
            'excerpt' => ['nullable', 'string', 'max:500'],
            'body' => ['required', 'string'],
            'is_active' => ['nullable', 'boolean'],
            'image' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:51200'],
        ]);

        $imageUrl = null;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('pages', 'public');
            $imageUrl = Storage::url($path);
        }

        SitePage::query()->create([
            'title' => $validated['title'],
            'slug' => $validated['slug'],
            'excerpt' => $validated['excerpt'] ?? null,
            'body' => $validated['body'],
            'hero_image_url' => $imageUrl,
            'is_active' => (bool) ($validated['is_active'] ?? true),
        ]);

        return redirect()->back()->with('success', 'Page created successfully.');
    }

    public function updatePage(Request $request, SitePage $page): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:140'],
            'slug' => ['required', 'string', 'max:100', 'unique:site_pages,slug,' . $page->id],
            'excerpt' => ['nullable', 'string', 'max:500'],
            'body' => ['required', 'string'],
            'is_active' => ['nullable', 'boolean'],
            'image' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:51200'],
        ]);

        $imageUrl = $page->hero_image_url;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('pages', 'public');
            $imageUrl = Storage::url($path);
        }

        $page->update([
            'title' => $validated['title'],
            'slug' => $validated['slug'],
            'excerpt' => $validated['excerpt'] ?? null,
            'body' => $validated['body'],
            'hero_image_url' => $imageUrl,
            'is_active' => (bool) ($validated['is_active'] ?? false),
        ]);

        return redirect()->back()->with('success', 'Page updated successfully.');
    }

    public function destroyPage(SitePage $page): RedirectResponse
    {
        $page->delete();

        return redirect()->back()->with('success', 'Page deleted successfully.');
    }

    public function subscribers(): Response
    {
        $items = Subscriber::query()->orderByDesc('created_at')->get();

        return Inertia::render('Admin/Subscribers', [
            'items' => $items,
        ]);
    }

    public function storeSubscriber(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email', 'unique:subscribers,email', 'max:190'],
        ]);

        Subscriber::query()->create($validated);

        return redirect()->back()->with('success', 'Subscriber added successfully.');
    }

    public function updateSubscriber(Request $request, Subscriber $subscriber): RedirectResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email', 'unique:subscribers,email,' . $subscriber->id, 'max:190'],
        ]);

        $subscriber->update($validated);

        return redirect()->back()->with('success', 'Subscriber updated successfully.');
    }

    public function destroySubscriber(Subscriber $subscriber): RedirectResponse
    {
        $subscriber->delete();

        return redirect()->back()->with('success', 'Subscriber removed successfully.');
    }

    public function contactMessages(): Response
    {
        $items = ContactMessage::query()->orderByDesc('created_at')->get();

        return Inertia::render('Admin/ContactMessages', [
            'items' => $items,
        ]);
    }

    public function destroyContactMessage(ContactMessage $contactMessage): RedirectResponse
    {
        $contactMessage->delete();

        return redirect()->back()->with('success', 'Message deleted successfully.');
    }
}
