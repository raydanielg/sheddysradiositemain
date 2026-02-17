<?php

namespace App\Http\Controllers;

use App\Models\Subscriber;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email:rfc,dns', 'max:255'],
        ]);

        Subscriber::query()->updateOrCreate(
            ['email' => $validated['email']],
            ['email' => $validated['email']],
        );

        return back()->with('success', 'Asante! Umesajiliwa kikamilifu.');
    }
}
