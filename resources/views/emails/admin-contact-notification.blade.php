<x-mail::message>
# Ujumbe Mpya wa Mawasiliano

Umepokea ujumbe mpya kutoka kwenye tovuti ya Sheddy's New Look Radio.

**Maelezo ya Mtumaji:**
- **Jina:** {{ $contactMessage->name }}
- **Email:** {{ $contactMessage->email }}
- **Simu:** {{ $contactMessage->phone ?? 'Haikutolewa' }}
- **Mada:** {{ $contactMessage->subject ?? 'Haikutolewa' }}

**Ujumbe:**
{{ $contactMessage->message }}

<x-mail::button :url="config('app.url') . '/admin/contact-messages'">
Angalia Kwenye Dashboard
</x-mail::button>

Asante,<br>
{{ config('app.name') }}
</x-mail::message>
