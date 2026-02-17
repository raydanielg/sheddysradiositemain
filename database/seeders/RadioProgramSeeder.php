<?php

namespace Database\Seeders;

use App\Models\RadioProgram;
use Illuminate\Database\Seeder;

class RadioProgramSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            // Monday (1)
            [
                'day_of_week' => 1,
                'title' => 'Asubuhi Njema',
                'host' => 'Mwalimu John',
                'start_time' => '06:00',
                'end_time' => '10:00',
                'description' => 'Kipindi cha asubuhi kinachokuleta habari, burudani na mazungumzo ya kijamii',
                'image_url' => 'https://images.unsplash.com/photo-1520975958225-1968fceec739?auto=format&fit=crop&w=600&q=80',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'day_of_week' => 1,
                'title' => 'Maisha na Afya',
                'host' => 'Daktari Amina',
                'start_time' => '13:00',
                'end_time' => '15:00',
                'description' => 'Kipindi kinachojadili masuala ya afya na ustawi wa jamii',
                'image_url' => 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=600&q=80',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'day_of_week' => 1,
                'title' => 'Usiku wa Starehe',
                'host' => 'DJ Mkombozi',
                'start_time' => '20:00',
                'end_time' => '23:00',
                'description' => 'Kipindi cha usiku kinacholeta burudani na muziki wa dansi',
                'image_url' => 'https://images.unsplash.com/photo-1520697222860-7f7cd2f0b800?auto=format&fit=crop&w=600&q=80',
                'sort_order' => 3,
                'is_active' => true,
            ],

            // Tuesday (2)
            [
                'day_of_week' => 2,
                'title' => 'Asubuhi Njema',
                'host' => 'Mwalimu John',
                'start_time' => '06:00',
                'end_time' => '10:00',
                'description' => 'Habari, burudani, na mijadala ya kijamii — moja kwa moja asubuhi',
                'image_url' => 'https://images.unsplash.com/photo-1466027575040-12134f139d2d?auto=format&fit=crop&w=600&q=80',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'day_of_week' => 2,
                'title' => 'Muziki Wetu',
                'host' => 'DJ Malaika',
                'start_time' => '10:00',
                'end_time' => '13:00',
                'description' => 'Kipindi cha muziki wa kizazi kipya na mahojiano na wasanii',
                'image_url' => 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=600&q=80',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'day_of_week' => 2,
                'title' => 'Jioni Njema',
                'host' => 'Mama Faraja',
                'start_time' => '16:00',
                'end_time' => '19:00',
                'description' => 'Kipindi cha jioni kinachojadili masuala ya familia na jamii',
                'image_url' => 'https://images.unsplash.com/photo-1520975958225-1968fceec739?auto=format&fit=crop&w=600&q=80',
                'sort_order' => 3,
                'is_active' => true,
            ],

            // Wednesday (3)
            [
                'day_of_week' => 3,
                'title' => 'Muziki Wetu',
                'host' => 'DJ Malaika',
                'start_time' => '10:00',
                'end_time' => '13:00',
                'description' => 'Muziki wa bongo fleva, afrobeats na classics — non stop',
                'image_url' => 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=600&q=80',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'day_of_week' => 3,
                'title' => 'Sports Update',
                'host' => 'Coach Mussa',
                'start_time' => '15:00',
                'end_time' => '16:00',
                'description' => 'Taarifa na uchambuzi wa michezo ndani na nje ya nchi',
                'image_url' => 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'day_of_week' => 3,
                'title' => 'Usiku wa Starehe',
                'host' => 'DJ Mkombozi',
                'start_time' => '20:00',
                'end_time' => '23:00',
                'description' => 'Burudani ya usiku: requests, dedications na vibe ya wiki',
                'image_url' => 'https://images.unsplash.com/photo-1520697222860-7f7cd2f0b800?auto=format&fit=crop&w=600&q=80',
                'sort_order' => 3,
                'is_active' => true,
            ],

            // Thursday (4)
            [
                'day_of_week' => 4,
                'title' => 'Asubuhi Njema',
                'host' => 'Mwalimu John',
                'start_time' => '06:00',
                'end_time' => '10:00',
                'description' => 'Habari na burudani ya asubuhi — uanze siku vizuri',
                'image_url' => 'https://images.unsplash.com/photo-1466027575040-12134f139d2d?auto=format&fit=crop&w=600&q=80',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'day_of_week' => 4,
                'title' => 'Biashara & Ujasiriamali',
                'host' => 'Neema K.',
                'start_time' => '12:00',
                'end_time' => '13:00',
                'description' => 'Mikakati ya biashara, fursa na mahojiano na wajasiriamali',
                'image_url' => 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=600&q=80',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'day_of_week' => 4,
                'title' => 'Jioni Njema',
                'host' => 'Mama Faraja',
                'start_time' => '16:00',
                'end_time' => '19:00',
                'description' => 'Mambo ya familia, mahusiano, na maisha ya kila siku',
                'image_url' => 'https://images.unsplash.com/photo-1520975958225-1968fceec739?auto=format&fit=crop&w=600&q=80',
                'sort_order' => 3,
                'is_active' => true,
            ],

            // Friday (5)
            [
                'day_of_week' => 5,
                'title' => 'Drive Time',
                'host' => 'DJ Kito',
                'start_time' => '17:00',
                'end_time' => '20:00',
                'description' => 'Muziki mzuri na updates za barabarani — kuanzia kazi hadi home',
                'image_url' => 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=600&q=80',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'day_of_week' => 5,
                'title' => 'Weekend Kickoff',
                'host' => 'Team Sheddys',
                'start_time' => '20:00',
                'end_time' => '23:00',
                'description' => 'Kuanzisha wikendi: mix, interviews na shoutouts',
                'image_url' => 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80',
                'sort_order' => 2,
                'is_active' => true,
            ],

            // Saturday (6)
            [
                'day_of_week' => 6,
                'title' => 'Weekend Vibes',
                'host' => 'DJ Malaika',
                'start_time' => '11:00',
                'end_time' => '14:00',
                'description' => 'Burudani ya wikendi: mix kali na nyimbo unazozipenda',
                'image_url' => 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'day_of_week' => 6,
                'title' => 'Sheddys News',
                'host' => 'News Desk',
                'start_time' => '18:00',
                'end_time' => '19:00',
                'description' => 'Habari za siku na matukio muhimu — kwa ufupi na ufasaha',
                'image_url' => 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80',
                'sort_order' => 2,
                'is_active' => true,
            ],

            // Sunday (7)
            [
                'day_of_week' => 7,
                'title' => 'Gospel Hour',
                'host' => 'Pastor B.',
                'start_time' => '07:00',
                'end_time' => '09:00',
                'description' => 'Muziki wa injili na ujumbe wa matumaini',
                'image_url' => 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'day_of_week' => 7,
                'title' => 'Family Time',
                'host' => 'Mama Faraja',
                'start_time' => '16:00',
                'end_time' => '18:00',
                'description' => 'Maongezi ya familia, malezi, na maadili',
                'image_url' => 'https://images.unsplash.com/photo-1520975958225-1968fceec739?auto=format&fit=crop&w=600&q=80',
                'sort_order' => 2,
                'is_active' => true,
            ],
        ];

        foreach ($items as $item) {
            RadioProgram::query()->updateOrCreate(
                [
                    'day_of_week' => $item['day_of_week'],
                    'title' => $item['title'],
                    'start_time' => $item['start_time'],
                    'end_time' => $item['end_time'],
                ],
                $item,
            );
        }
    }
}
