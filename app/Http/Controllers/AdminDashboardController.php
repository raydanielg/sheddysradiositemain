<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Highlight;
use App\Models\Presenter;
use App\Models\RadioProgram;
use App\Models\Subscriber;
use App\Models\ContactMessage;
use App\Models\VisitorStat;
use App\Models\LoginActivity;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

class AdminDashboardController extends Controller
{
    public function index(): Response
    {
        // Basic Stats
        $stats = [
            'visitors' => (int) VisitorStat::sum('count'),
            'highlights' => Highlight::count(),
            'blogs' => Blog::count(),
            'presenters' => Presenter::count(),
            'subscribers' => Subscriber::count(),
            'messages' => ContactMessage::count(),
        ];

        // Chart Data (Last 7 days)
        $chartData = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::today()->subDays($i)->toDateString();
            $stat = VisitorStat::where('date', $date)->first();
            $chartData[] = [
                'name' => Carbon::parse($date)->format('D'),
                'visitors' => $stat ? $stat->count : 0,
            ];
        }

        // Recent Login Activities
        $logins = LoginActivity::with('user')
            ->orderByDesc('login_at')
            ->limit(5)
            ->get();

        // Programs for Calendar (Simple daily map)
        $programs = RadioProgram::where('is_active', true)
            ->orderBy('start_time')
            ->get()
            ->groupBy('day_of_week');

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'chartData' => $chartData,
            'logins' => $logins,
            'programs' => $programs,
        ]);
    }
}
