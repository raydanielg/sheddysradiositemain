<?php

namespace Database\Seeders;

use App\Models\Blog;
use App\Models\BlogComment;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BlogSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        $posts = [
            [
                'title' => 'Muziki Mpya wa Bongo Flava',
                'author_name' => 'Sub Admin',
                'image_url' => 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1600&q=80',
                'excerpt' => 'Leo tunazungumzia muziki mpya wa Bongo Flava unaotamba sasa.',
                'body' => "Leo tunazungumzia muziki mpya wa Bongo Flava unaotamba sasa. Wasanii wengi wamekuja na mtindo mpya na nyimbo zinazovutia masikio ya wasikilizaji.\n\nKwanza, tunaangalia namna wasanii wanavyochanganya sauti za asili na beats za kisasa. Pia, tunazungumza kuhusu trend za mashabiki kwenye mitandao ya kijamii na jinsi zinavyoathiri releases.\n\nEndelea kusikiliza Sheddys FM kwa updates za nyimbo mpya na mahojiano na wasanii wako unaowapenda.",
                'published_at' => $now->copy()->subDays(2),
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Matukio ya Wiki Hii',
                'author_name' => 'Sub Admin',
                'image_url' => 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80',
                'excerpt' => 'Wiki hii kumekuwa na matukio mengi ya kuvutia katika tasnia ya muziki na burudani.',
                'body' => "Wiki hii kumekuwa na matukio mengi ya kuvutia katika tasnia ya muziki na burudani. Tunapenda kukupa muhtasari wa matukio hayo.\n\nKwanza, tulikuwa na tamasha kubwa la muziki jijini Dar es Salaam ambalo lilihudhuriwa na maelfu ya watu. Wasanii mbalimbali walipata nafasi ya kuonyesha vipaji vyao na mashabiki walifurahia.\n\nPili, kulikuwa na uzinduzi wa albamu mpya wa msanii maarufu ambaye amekuwa akiongoza kwa bendi mbalimbali.\n\nEndelea kutembelea blog yetu kwa updates za kila wiki.",
                'published_at' => $now->copy()->subDays(1),
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Mahojiano na Msanii Maarufu',
                'author_name' => 'Sub Admin',
                'image_url' => 'https://images.unsplash.com/photo-1520975958225-1968fceec739?auto=format&fit=crop&w=1600&q=80',
                'excerpt' => 'Leo tulikuwa na fursa ya kumhoji msanii maarufu ambaye amekuwa akitamba kwa miaka kadhaa.',
                'body' => "Leo tulikuwa na fursa ya kumhoji msanii maarufu ambaye amekuwa akitamba katika tasnia ya muziki kwa miaka kadhaa. Katika mahojiano haya, ameelezea safari yake, changamoto alizopitia, na ndoto zake za baadaye.\n\nPia ametoa ushauri kwa vijana wanaoanza: kuweka nidhamu, kujifunza kila siku, na kuheshimu kazi.\n\nSoma hadi mwisho ili upate nukuu (quotes) zake muhimu na ujumbe kwa mashabiki.",
                'published_at' => $now->copy()->subHours(6),
                'sort_order' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($posts as $data) {
            $slug = Str::slug($data['title']);
            $blog = Blog::query()->updateOrCreate(
                ['slug' => $slug],
                array_merge($data, ['slug' => $slug]),
            );

            BlogComment::query()->updateOrCreate(
                ['blog_id' => $blog->id, 'name' => 'Asha', 'message' => 'Nimeipenda hii makala, endeleeni kutuletea zaidi!'],
                ['blog_id' => $blog->id, 'name' => 'Asha', 'message' => 'Nimeipenda hii makala, endeleeni kutuletea zaidi!'],
            );

            BlogComment::query()->updateOrCreate(
                ['blog_id' => $blog->id, 'name' => 'Juma', 'message' => 'Hii ni kali sana. Mnaweza pia kucover new releases kila Ijumaa?'],
                ['blog_id' => $blog->id, 'name' => 'Juma', 'message' => 'Hii ni kali sana. Mnaweza pia kucover new releases kila Ijumaa?'],
            );
        }
    }
}
