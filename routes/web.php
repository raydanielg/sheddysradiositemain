<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\AdminContentController;
use App\Http\Controllers\AdminSettingsController;
use App\Http\Controllers\PublicPageController;
use App\Http\Controllers\RadioSettingsController;
use App\Http\Controllers\SubscriptionController;
use App\Models\Highlight;
use App\Models\Presenter;
use App\Models\RadioProgram;
use App\Models\SiteSetting;
use App\Models\Blog;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $settings = SiteSetting::query()->first();
    $highlights = Highlight::query()
        ->where('is_active', true)
        ->orderBy('sort_order')
        ->get([
            'id',
            'title',
            'description',
            'cta_text',
            'cta_url',
            'image_url',
        ]);

    $programs = RadioProgram::query()
        ->where('is_active', true)
        ->orderBy('day_of_week')
        ->orderBy('sort_order')
        ->get([
            'id',
            'day_of_week',
            'title',
            'host',
            'start_time',
            'end_time',
            'description',
            'image_url',
        ]);

    $presenters = Presenter::query()
        ->where('is_active', true)
        ->orderBy('sort_order')
        ->get([
            'id',
            'name',
            'title',
            'image_url',
        ]);

    $latestBlogs = Blog::query()
        ->where('is_active', true)
        ->orderByDesc('published_at')
        ->orderBy('sort_order')
        ->limit(3)
        ->get([
            'id',
            'title',
            'slug',
            'image_url',
            'excerpt',
            'published_at',
        ]);

    return Inertia::render('Home/Index', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'streamUrl' => $settings?->stream_url,
        'highlights' => $highlights,
        'programs' => $programs,
        'presenters' => $presenters,
        'latestBlogs' => $latestBlogs,
    ]);
});

Route::get('/blogs', [BlogController::class, 'index'])->name('blogs.index');
Route::get('/blogs/{blog:slug}', [BlogController::class, 'show'])->name('blogs.show');
Route::post('/blogs/{blog:slug}/comments', [BlogController::class, 'storeComment'])->name('blogs.comments.store');

Route::get('/about', [PublicPageController::class, 'about'])->name('about');
Route::get('/contact', [PublicPageController::class, 'contact'])->name('contact');
Route::post('/contact', [PublicPageController::class, 'storeContact'])->name('contact.store');

Route::post('/subscribe', [SubscriptionController::class, 'store'])->name('subscribe.store');

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AdminSearchController;

Route::get('/dashboard', [AdminDashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::get('/api/admin/search', [AdminSearchController::class, 'search'])
    ->middleware(['auth'])
    ->name('admin.search.api');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/admin/highlights', [AdminContentController::class, 'highlights'])->name('admin.highlights');
    Route::post('/admin/highlights', [AdminContentController::class, 'storeHighlight'])->name('admin.highlights.store');
    Route::put('/admin/highlights/{highlight}', [AdminContentController::class, 'updateHighlight'])->name('admin.highlights.update');
    Route::delete('/admin/highlights/{highlight}', [AdminContentController::class, 'destroyHighlight'])->name('admin.highlights.destroy');
    Route::get('/admin/programs', [AdminContentController::class, 'programs'])->name('admin.programs');
    Route::post('/admin/programs', [AdminContentController::class, 'storeProgram'])->name('admin.programs.store');
    Route::put('/admin/programs/{radioProgram}', [AdminContentController::class, 'updateProgram'])->name('admin.programs.update');
    Route::delete('/admin/programs/{radioProgram}', [AdminContentController::class, 'destroyProgram'])->name('admin.programs.destroy');
    Route::get('/admin/presenters', [AdminContentController::class, 'presenters'])->name('admin.presenters');
    Route::post('/admin/presenters', [AdminContentController::class, 'storePresenter'])->name('admin.presenters.store');
    Route::put('/admin/presenters/{presenter}', [AdminContentController::class, 'updatePresenter'])->name('admin.presenters.update');
    Route::delete('/admin/presenters/{presenter}', [AdminContentController::class, 'destroyPresenter'])->name('admin.presenters.destroy');
    Route::get('/admin/blogs', [AdminContentController::class, 'blogs'])->name('admin.blogs');
    Route::post('/admin/blogs', [AdminContentController::class, 'storeBlog'])->name('admin.blogs.store');
    Route::put('/admin/blogs/{blog}', [AdminContentController::class, 'updateBlog'])->name('admin.blogs.update');
    Route::delete('/admin/blogs/{blog}', [AdminContentController::class, 'destroyBlog'])->name('admin.blogs.destroy');
    Route::get('/admin/pages', [AdminContentController::class, 'pages'])->name('admin.pages');
    Route::post('/admin/pages', [AdminContentController::class, 'storePage'])->name('admin.pages.store');
    Route::put('/admin/pages/{page}', [AdminContentController::class, 'updatePage'])->name('admin.pages.update');
    Route::delete('/admin/pages/{page}', [AdminContentController::class, 'destroyPage'])->name('admin.pages.destroy');
    Route::get('/admin/subscribers', [AdminContentController::class, 'subscribers'])->name('admin.subscribers');
    Route::post('/admin/subscribers', [AdminContentController::class, 'storeSubscriber'])->name('admin.subscribers.store');
    Route::put('/admin/subscribers/{subscriber}', [AdminContentController::class, 'updateSubscriber'])->name('admin.subscribers.update');
    Route::delete('/admin/subscribers/{subscriber}', [AdminContentController::class, 'destroySubscriber'])->name('admin.subscribers.destroy');
    Route::get('/admin/contact-messages', [AdminContentController::class, 'contactMessages'])->name('admin.contact-messages');
    Route::delete('/admin/contact-messages/{contactMessage}', [AdminContentController::class, 'destroyContactMessage'])->name('admin.contact-messages.destroy');

    Route::get('/admin/settings', [AdminSettingsController::class, 'edit'])->name('admin.settings.edit');
    Route::put('/admin/settings', [AdminSettingsController::class, 'update'])->name('admin.settings.update');
    Route::post('/admin/settings/sitemap', [AdminSettingsController::class, 'generateSitemap'])->name('admin.settings.sitemap');

    Route::get('/admin/radio-settings', [RadioSettingsController::class, 'edit'])->name('admin.radio-settings.edit');
    Route::put('/admin/radio-settings', [RadioSettingsController::class, 'update'])->name('admin.radio-settings.update');
});

require __DIR__.'/auth.php';
