<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            
            // App General
            $table->string('site_name')->default("Sheddy's New Look Radio");
            $table->text('site_description')->nullable();
            $table->string('contact_email')->nullable();
            $table->string('contact_phone')->nullable();
            
            // SEO
            $table->string('seo_title')->nullable();
            $table->text('seo_keywords')->nullable();
            $table->text('seo_description')->nullable();
            $table->string('og_image_url')->nullable();
            
            // Radio
            $table->string('stream_url')->nullable();
            $table->string('fm_frequency')->nullable();
            
            // Localization
            $table->string('timezone')->default('Africa/Dar_es_Salaam');
            $table->string('date_format')->default('d/m/Y');
            $table->string('time_format')->default('H:i');
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('site_settings');
    }
};
