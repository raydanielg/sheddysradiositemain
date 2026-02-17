<?php

use App\Http\Controllers\InstallerController;
use Illuminate\Support\Facades\Route;

Route::get('/install', [InstallerController::class, 'index'])->name('installer.index');
Route::post('/install', [InstallerController::class, 'install'])->name('installer.install');
