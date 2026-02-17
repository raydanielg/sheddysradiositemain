<?php

namespace App\Http\Middleware;

use App\Models\VisitorStat;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;

class TrackVisitorStat
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Only track GET requests and ignore admin/api routes for simplicity
        if ($request->isMethod('GET') && !$request->is('admin*') && !$request->is('api*') && !$request->is('up')) {
            $today = now()->toDateString();
            
            // Securely increment the count for today
            $stat = VisitorStat::firstOrCreate(
                ['date' => $today],
                ['count' => 0]
            );
            $stat->increment('count');
        }

        return $next($request);
    }
}
