<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        @php
            $settings = \App\Models\SiteSetting::query()->first();
            $siteName = $settings->site_name ?? "Sheddy's New Look Radio";
            $seoTitle = $settings->seo_title ?? $siteName;
            $seoDesc = $settings->seo_description ?? $settings->site_description ?? "Sikiliza Sheddy's New Look Radio mubashara.";
            $seoKeywords = $settings->seo_keywords ?? "radio, sheddy's, live, music, tanzania";
            $ogImage = $settings->og_image_url ?? asset('logo1.jpeg');
        @endphp

        <title inertia>{{ config('app.name', "Sheddy's New Look Radio") }}</title>

        <!-- SEO Meta Tags -->
        <meta name="description" content="{{ $seoDesc }}">
        <meta name="keywords" content="{{ $seoKeywords }}">
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:title" content="{{ $seoTitle }}">
        <meta property="og:description" content="{{ $seoDesc }}">
        <meta property="og:image" content="{{ $ogImage }}">

        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:url" content="{{ url()->current() }}">
        <meta property="twitter:title" content="{{ $seoTitle }}">
        <meta property="twitter:description" content="{{ $seoDesc }}">
        <meta property="twitter:image" content="{{ $ogImage }}">

        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

        <style>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=SN+Pro:ital,wght@0,200..900;1,200..900&family=Sansita:ital,wght@0,400;0,700;0,800;0,900;1,400;1,700;1,800;1,900&display=swap');
        </style>

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
