# Sheddy's Radio — Website & Admin Panel

<p align="center">
  <img src="public/images/logo.png" width="140" alt="Sheddy's Radio Logo" />
</p>

<p align="center">
  <strong>Modern radio station website</strong> built with Laravel + Inertia (React) + Tailwind.
  Includes a persistent floating mini-player, blog pages, program schedule, contact forms, and an admin dashboard.
</p>

---

## Screenshots / Preview

Add screenshots to a folder like `docs/screenshots/` then update links below.

| Page | Preview |
| --- | --- |
| Home (Hero + Quick Play) | `docs/screenshots/home.png` |
| Floating Mini-Player | `docs/screenshots/player.png` |
| Admin Settings (Stream URL test) | `docs/screenshots/admin-settings.png` |
| Profile (Avatar Upload) | `docs/screenshots/profile.png` |

---

## Key Features

- **Floating Live Stream mini-player**
  - Persistent across public pages
  - Clean UI: play/pause + blinking live indicator
  - Subtle animated background on the player card while playing
- **Click any homepage card to play**
  - Hero / Highlights / Schedule / Blog cards start the radio instantly
- **Admin settings for stream URL**
  - Uses a single source of truth: `site_settings.stream_url`
  - Real-time test play button in admin
- **Profile avatar upload**
  - Upload + preview + save
  - Avatar also appears in admin header
- **Blog**
  - Index + show pages with sharing
- **Modern UI**
  - TailwindCSS, dark mode support

---

## Tech Stack

- **Backend**
  - Laravel (PHP)
  - Eloquent ORM
  - Form Request validation
- **Frontend**
  - Inertia.js + React
  - Tailwind CSS
  - Headless UI (where used)
- **Build**
  - Vite

---

## Requirements

- PHP (8.1+ recommended)
- Composer
- Node.js (18+ recommended)
- NPM
- A database (MySQL recommended)

---

## Local Setup (Windows / General)

### 1) Install dependencies

```bash
composer install
npm install
```

### 2) Configure environment

Copy `.env.example` to `.env` and set your DB settings.

```bash
php artisan key:generate
```

### 3) Database

```bash
php artisan migrate
```

If you have seeders, run:

```bash
php artisan db:seed
```

### 4) Run the app

Run Laravel:

```bash
php artisan serve
```

Run Vite:

```bash
npm run dev
```

---

## Production Build

```bash
npm run build
```

---

## Admin Login (Default)

Use these credentials (change them on first deploy):

- **Email**: `admin@sheddysradio.com`
- **Password**: `admin12345`

---

## Configuration Notes

### Stream URL

- The live stream URL is controlled by:
  - `site_settings.stream_url`
- Set it in the Admin Settings page.
- The floating mini-player and homepage “click-to-play” use the same stream URL.

### Storage (Avatars)

If you use public storage (recommended):

```bash
php artisan storage:link
```

---

## Common Troubleshooting

- **No audio / stream fails**
  - Confirm the stream URL is reachable
  - Try the Admin “Test Play” button
- **Images not showing after deploy**
  - Ensure `storage:link` is created
  - Confirm file permissions for `storage/` and `public/`
- **Vite assets missing**
  - Run `npm run build` on production

---

## Project Structure (Quick Map)

- `resources/js/Components/FloatingRadioPlayer.jsx`
  - Global floating player UI
- `resources/js/utils/radioPlayer.js`
  - Singleton audio player state manager
- `resources/js/Pages/Home/sections/*`
  - Homepage cards with click-to-play
- `resources/js/Pages/Admin/Settings.jsx`
  - Stream URL management + test play

---

## License

Private / internal project unless you decide otherwise.

