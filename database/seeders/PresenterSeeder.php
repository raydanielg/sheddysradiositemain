<?php

namespace Database\Seeders;

use App\Models\Presenter;
use Illuminate\Database\Seeder;

class PresenterSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            [
                'name' => 'DJ Malaika',
                'title' => 'Mtangazaji wa Asubuhi',
                'image_url' => 'https://images.unsplash.com/photo-1520975867597-0fadb39b94b7?auto=format&fit=crop&w=800&q=80',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Mwalimu John',
                'title' => 'Mtangazaji wa Habari',
                'image_url' => 'https://images.unsplash.com/photo-1520975958225-1968fceec739?auto=format&fit=crop&w=800&q=80',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Mama Faraja',
                'title' => 'Mtangazaji wa Jioni',
                'image_url' => 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'DJ Mkombozi',
                'title' => 'Mtangazaji wa Usiku',
                'image_url' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'Kaka Seif',
                'title' => 'Mtangazaji wa Wikendi',
                'image_url' => 'https://images.unsplash.com/photo-1520975940467-e3e2ab3b2c70?auto=format&fit=crop&w=800&q=80',
                'sort_order' => 5,
                'is_active' => true,
            ],
        ];

        foreach ($items as $item) {
            Presenter::query()->updateOrCreate(
                ['name' => $item['name']],
                $item,
            );
        }
    }
}
