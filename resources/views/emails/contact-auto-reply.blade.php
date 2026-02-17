<x-mail::message>
# Habari {{ $contactMessage->name }},

Asante kwa kuwasiliana na **Sheddy's New Look Radio**. Tumepokea ujumbe wako kuhusu "{{ $contactMessage->subject }}".

Timu yetu inaushughulikia na tutakujibu hivi karibuni kupitia barua pepe hii au namba yako ya simu uliyotoa.

**Ujumbe wako:**
> {{ $contactMessage->message }}

Endelea kusikiliza Sheddy's New Look Radio kwa burudani na habari bora zaidi!

<x-mail::button :url="config('app.url')">
Tembelea Tovuti Yetu
</x-mail::button>

Asante,<br>
{{ config('app.name') }}
</x-mail::message>
