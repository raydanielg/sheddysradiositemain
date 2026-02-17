<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sheddy's Radio Installer</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .bg-grid {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40' fill='%2394a3b8' fill-opacity='0.05'/%3E%3C/svg%3E");
        }
    </style>
</head>
<body class="bg-slate-50 text-slate-900 bg-grid min-h-screen flex items-center justify-center p-6">
    <div class="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        <div class="bg-slate-900 px-8 py-10 text-center relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20"></div>
            <h1 class="text-3xl font-extrabold text-white relative z-10">Sheddy's Radio</h1>
            <p class="text-slate-400 mt-2 relative z-10">Application Installer & Setup</p>
        </div>

        <form id="installForm" class="p-8 space-y-6">
            @csrf
            <div class="space-y-4">
                <h2 class="text-lg font-bold flex items-center gap-2 text-slate-800">
                    <span class="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-xs font-black">1</span>
                    App Configuration
                </h2>
                <div>
                    <label class="block text-sm font-semibold text-slate-700 mb-1">App Name</label>
                    <input type="text" name="app_name" value="Sheddy's Radio" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition" placeholder="Enter App Name">
                </div>
            </div>

            <div class="space-y-4 pt-4">
                <h2 class="text-lg font-bold flex items-center gap-2 text-slate-800">
                    <span class="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-xs font-black">2</span>
                    Database Credentials
                </h2>
                <div class="grid grid-cols-2 gap-4">
                    <div class="col-span-2 sm:col-span-1">
                        <label class="block text-sm font-semibold text-slate-700 mb-1">DB Host</label>
                        <input type="text" name="db_host" value="127.0.0.1" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none">
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label class="block text-sm font-semibold text-slate-700 mb-1">DB Port</label>
                        <input type="text" name="db_port" value="3306" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none">
                    </div>
                    <div class="col-span-2">
                        <label class="block text-sm font-semibold text-slate-700 mb-1">Database Name</label>
                        <input type="text" name="db_database" placeholder="sheddys_radio" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none">
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label class="block text-sm font-semibold text-slate-700 mb-1">DB Username</label>
                        <input type="text" name="db_username" value="root" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none">
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label class="block text-sm font-semibold text-slate-700 mb-1">DB Password</label>
                        <input type="password" name="db_password" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none">
                    </div>
                </div>
            </div>

            <div id="statusMessage" class="hidden p-4 rounded-xl text-sm font-medium"></div>

            <button type="submit" id="submitBtn" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3">
                <span id="btnText">Start Installation</span>
                <svg id="loader" class="hidden animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            </button>
        </form>

        <div class="p-4 bg-slate-50 border-t border-slate-100 text-center">
            <p class="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Powered by Zerixa Technologies</p>
        </div>
    </div>

    <script>
        document.getElementById('installForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('submitBtn');
            const btnText = document.getElementById('btnText');
            const loader = document.getElementById('loader');
            const status = document.getElementById('statusMessage');
            
            btn.disabled = true;
            btnText.innerText = 'Installing...';
            loader.classList.remove('hidden');
            status.classList.add('hidden');

            const formData = new FormData(e.target);
            try {
                const response = await fetch('/install', {
                    method: 'POST',
                    body: formData,
                    headers: { 'X-Requested-With': 'XMLHttpRequest' }
                });
                const result = await response.json();
                
                status.classList.remove('hidden');
                if (result.success) {
                    status.className = 'p-4 rounded-xl text-sm font-medium bg-green-50 text-green-700 border border-green-100';
                    status.innerText = 'Success! Application installed. Redirecting...';
                    setTimeout(() => window.location.href = '/', 3000);
                } else {
                    throw new Error(result.message);
                }
            } catch (err) {
                status.classList.remove('hidden');
                status.className = 'p-4 rounded-xl text-sm font-medium bg-red-50 text-red-700 border border-red-100';
                status.innerText = 'Error: ' + err.message;
                btn.disabled = false;
                btnText.innerText = 'Retry Installation';
                loader.classList.add('hidden');
            }
        });
    </script>
</body>
</html>
