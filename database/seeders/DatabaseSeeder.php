<?php

namespace Database\Seeders;

use App\Models\SitePage;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::query()->updateOrCreate(
            ['email' => 'admin@sheddysradio.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('admin12345'),
                'is_admin' => true,
            ],
        );

        User::query()->updateOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => Hash::make('password'),
            ],
        );

        $this->call([
            HighlightSeeder::class,
            RadioProgramSeeder::class,
            PresenterSeeder::class,
            BlogSeeder::class,
        ]);

        SitePage::query()->updateOrCreate(
            ['slug' => 'about'],
            [
                'title' => "About Sheddy's Radio",
                'excerpt' => "Sheddy's Radio ni kituo cha redio kinachokuletea burudani, habari na vipindi vya jamii kwa Kiswahili.",
                'body' => "Sheddy's Radio ni kituo cha redio kinacholenga kuleta burudani na taarifa kwa wasikilizaji wetu.\n\nTuna vipindi vya muziki, mijadala, mahojiano, na matangazo mubashara kila siku.",
                'hero_image_url' => '/bredrum.jpg',
                'is_active' => true,
            ],
        );

        SitePage::query()->updateOrCreate(
            ['slug' => 'contact'],
            [
                'title' => 'Contact Us',
                'excerpt' => 'Tuma ujumbe wako kupitia fomu au tumia mawasiliano yetu.',
                'body' => "Kwa maswali, matangazo (ads), au ushirikiano, wasiliana nasi.\n\nTutakujibu haraka iwezekanavyo.",
                'hero_image_url' => '/bredrum.jpg',
                'is_active' => true,
            ],
        );
    }
}
