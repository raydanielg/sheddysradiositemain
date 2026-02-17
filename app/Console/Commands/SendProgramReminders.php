<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Models\RadioProgram;
use App\Models\Subscriber;
use App\Mail\ProgramReminder;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;

class SendProgramReminders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'radio:send-reminders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send email reminders to subscribers for upcoming radio programs';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $now = Carbon::now();
        $dayOfWeek = $now->dayOfWeek === 0 ? 7 : $now->dayOfWeek; // Map Sunday to 7
        $currentTime = $now->format('H:i');
        
        // Find programs starting in the next 30 minutes
        $upcomingTime = $now->copy()->addMinutes(30)->format('H:i');

        $programs = RadioProgram::query()
            ->where('day_of_week', $dayOfWeek)
            ->where('is_active', true)
            ->where('start_time', '>=', $currentTime)
            ->where('start_time', '<=', $upcomingTime)
            ->get();

        if ($programs->isEmpty()) {
            $this->info('No upcoming programs in the next 30 minutes.');
            return;
        }

        $subscribers = Subscriber::all();

        foreach ($programs as $program) {
            foreach ($subscribers as $subscriber) {
                Mail::to($subscriber->email)->queue(new ProgramReminder($program));
            }
            $this->info("Queued reminders for program: {$program->title}");
        }

        $this->info('Done.');
    }
}
