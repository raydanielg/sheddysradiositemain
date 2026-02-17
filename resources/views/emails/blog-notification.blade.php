<x-mail::message>
# {{ $blog->title }}

Habari! Sheddy's New Look Radio imepakia makala mpya inayoweza kukuvutia.

{{ $blog->excerpt }}

<x-mail::button :url="config('app.url') . '/blogs/' . $blog->slug">
Soma Makala Hapa
</x-mail::button>

Asante kwa kuwa sehemu ya Sheddy's New Look Radio family.

Kila la heri,<br>
{{ config('app.name') }}
</x-mail::message>
