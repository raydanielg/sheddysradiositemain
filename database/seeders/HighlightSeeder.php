<?php

namespace Database\Seeders;

use App\Models\Highlight;
use Illuminate\Database\Seeder;

class HighlightSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            [
                'title' => 'Tamasha la Muziki Jijini Dar es Salaam',
                'description' => 'Tamasha kubwa la muziki litafanyika jijini Dar es Salaam wikendi hii. Wasanii mbalimbali watashiriki.',
                'cta_text' => 'Soma Zaidi',
                'cta_url' => '#',
                'image_url' => 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1600&q=80',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Kipindi Kipya: Asubuhi Na Sheddys',
                'description' => 'Anza siku yako na habari, burudani, na taarifa muhimu—moja kwa moja hewani kila asubuhi.',
                'cta_text' => 'Soma Zaidi',
                'cta_url' => '#',
                'image_url' => 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Breaking News: Updates Kila Saa',
                'description' => 'Pata taarifa za haraka na sahihi. Sheddys News inakuletea vichwa vya habari muda wote.',
                'cta_text' => 'Soma Zaidi',
                'cta_url' => '#',
                'image_url' => 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=80',
                'sort_order' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($items as $item) {
            Highlight::query()->updateOrCreate(
                ['title' => $item['title']],
                $item,
            );
        }
    }
}
