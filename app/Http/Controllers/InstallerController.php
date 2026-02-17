<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class InstallerController extends Controller
{
    public function index()
    {
        if (config('app.installed')) {
            return redirect('/')->with('error', 'Application is already installed.');
        }
        return view('installer.index');
    }

    public function install(Request $request)
    {
        $request->validate([
            'app_name' => 'required|string|max:255',
            'db_host' => 'required|string',
            'db_port' => 'required|numeric',
            'db_database' => 'required|string',
            'db_username' => 'required|string',
            'db_password' => 'nullable|string',
        ]);

        try {
            // 1. Update .env file
            $this->updateEnv([
                'APP_NAME' => '"' . $request->app_name . '"',
                'DB_HOST' => $request->db_host,
                'DB_PORT' => $request->db_port,
                'DB_DATABASE' => $request->db_database,
                'DB_USERNAME' => $request->db_username,
                'DB_PASSWORD' => $request->db_password ?? '',
                'APP_INSTALLED' => 'true',
            ]);

            // 2. Clear config cache to use new env
            Artisan::call('config:clear');

            // 3. Run Migrations & Seeders
            Artisan::call('migrate:fresh', ['--force' => true, '--seed' => true]);

            // 4. Link Storage
            Artisan::call('storage:link');

            return response()->json(['success' => true, 'message' => 'Installation successful!']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    private function updateEnv(array $data)
    {
        $envPath = base_path('.env');
        if (!File::exists($envPath)) {
            File::copy(base_path('.env.example'), $envPath);
        }

        $content = File::get($envPath);

        foreach ($data as $key => $value) {
            $pattern = "/^{$key}=.*/m";
            if (preg_match($pattern, $content)) {
                $content = preg_replace($pattern, "{$key}={$value}", $content);
            } else {
                $content .= "\n{$key}={$value}";
            }
        }

        File::put($envPath, $content);
    }
}
