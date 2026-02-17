<x-mail::message>
# Muda wa {{ $program->title }}!

Habari! Kipindi chako unachokipenda **{{ $program->title }}** kinakaribia kuanza (au kimeanza) hewani.

**Mtangazaji:** {{ $program->host }}
**Muda:** {{ $program->start_time }} - {{ $program->end_time }}

Usipitwe na burudani, habari na mijadala motomoto. Bofya button hapa chini kusikiliza mubashara sasa hivi kupitia tovuti yetu.

<x-mail::button :url="config('app.url')">
Sikiliza Live Hapa
</x-mail::button>

Asante kwa kuendelea kuwa mwanafamilia wa Sheddy's New Look Radio.

Kila la heri,<br>
{{ config('app.name') }}
</x-mail::message>
