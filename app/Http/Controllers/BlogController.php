<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\BlogComment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Foundation\Application;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function index(): Response
    {
        $blogs = Blog::query()
            ->where('is_active', true)
            ->orderByDesc('published_at')
            ->orderBy('sort_order')
            ->get([
                'id',
                'title',
                'slug',
                'author_name',
                'image_url',
                'excerpt',
                'published_at',
            ]);

        return Inertia::render('Blogs/Index', [
            'blogs' => $blogs,
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }

    public function show(Blog $blog): Response
    {
        $blog->load(['comments' => function ($q) {
            $q->orderByDesc('created_at');
        }]);

        $moreBlogs = Blog::query()
            ->where('is_active', true)
            ->where('id', '!=', $blog->id)
            ->orderByDesc('published_at')
            ->orderBy('sort_order')
            ->limit(4)
            ->get([
                'id',
                'title',
                'slug',
                'image_url',
                'published_at',
            ]);

        return Inertia::render('Blogs/Show', [
            'blog' => [
                'id' => $blog->id,
                'title' => $blog->title,
                'slug' => $blog->slug,
                'author_name' => $blog->author_name,
                'image_url' => $blog->image_url,
                'excerpt' => $blog->excerpt,
                'body' => $blog->body,
                'published_at' => optional($blog->published_at)?->toISOString(),
            ],
            'comments' => $blog->comments->map(fn (BlogComment $c) => [
                'id' => $c->id,
                'name' => $c->name,
                'message' => $c->message,
                'created_at' => $c->created_at->toISOString(),
            ]),
            'moreBlogs' => $moreBlogs,
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }

    public function storeComment(Request $request, Blog $blog): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:80'],
            'message' => ['required', 'string', 'max:2000'],
        ]);

        BlogComment::query()->create([
            'blog_id' => $blog->id,
            'name' => $validated['name'],
            'message' => $validated['message'],
        ]);

        return redirect()->route('blogs.show', $blog->slug);
    }
}
