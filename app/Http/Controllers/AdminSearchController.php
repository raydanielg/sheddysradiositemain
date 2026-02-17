<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Presenter;
use App\Models\RadioProgram;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AdminSearchController extends Controller
{
    public function search(Request $request): JsonResponse
    {
        $query = $request->get('q');
        if (empty($query)) {
            return response()->json(['results' => []]);
        }

        $results = [];

        // Search Blogs
        $blogs = Blog::where('title', 'like', "%{$query}%")
            ->limit(5)
            ->get(['id', 'title', 'slug']);
        foreach ($blogs as $blog) {
            $results[] = [
                'type' => 'Blog',
                'title' => $blog->title,
                'url' => route('admin.blogs'), // Or specific edit route if implemented
                'icon' => 'BookOpen'
            ];
        }

        // Search Presenters
        $presenters = Presenter::where('name', 'like', "%{$query}%")
            ->limit(5)
            ->get(['id', 'name']);
        foreach ($presenters as $presenter) {
            $results[] = [
                'type' => 'Presenter',
                'title' => $presenter->name,
                'url' => route('admin.presenters'),
                'icon' => 'Mic'
            ];
        }

        // Search Programs
        $programs = RadioProgram::where('title', 'like', "%{$query}%")
            ->limit(5)
            ->get(['id', 'title']);
        foreach ($programs as $program) {
            $results[] = [
                'type' => 'Program',
                'title' => $program->title,
                'url' => route('admin.programs'),
                'icon' => 'Calendar'
            ];
        }

        return response()->json(['results' => $results]);
    }
}
