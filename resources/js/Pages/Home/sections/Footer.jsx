export default function Footer({ laravelVersion, phpVersion }) {
    return (
        <footer className="mt-14 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
            <div className="w-full px-6 py-12">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="h-10 w-10 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                                <img
                                    src="/logo1.jpeg"
                                    alt="Sheddy's Radio logo"
                                    className="h-full w-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                            <div className="text-lg font-extrabold text-slate-900 dark:text-white">
                                Sheddy's Radio
                            </div>
                        </div>
                        <div className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                            Burudani na habari kwa lugha ya Kiswahili. Sikiliza mubashara, fuatilia ratiba,
                            na soma makala zetu za hivi karibuni.
                        </div>
                    </div>

                    <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">Kurasa</div>
                        <div className="mt-4 grid gap-2 text-sm">
                            <a href="/" className="text-slate-600 hover:text-primary dark:text-slate-300">
                                Home
                            </a>
                            <a href="/blogs" className="text-slate-600 hover:text-primary dark:text-slate-300">
                                Blogs
                            </a>
                            <a href="/about" className="text-slate-600 hover:text-primary dark:text-slate-300">
                                About Us
                            </a>
                            <a href="/contact" className="text-slate-600 hover:text-primary dark:text-slate-300">
                                Contact Us
                            </a>
                        </div>
                    </div>

                    <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">Huduma</div>
                        <div className="mt-4 grid gap-2 text-sm">
                            <a href="#" className="text-slate-600 hover:text-primary dark:text-slate-300">
                                Vipindi Mubashara
                            </a>
                            <a href="#" className="text-slate-600 hover:text-primary dark:text-slate-300">
                                Ratiba ya Vipindi
                            </a>
                            <a href="#" className="text-slate-600 hover:text-primary dark:text-slate-300">
                                Matukio Maalum
                            </a>
                            <a href="#" className="text-slate-600 hover:text-primary dark:text-slate-300">
                                Jamii ya Wasikilizaji
                            </a>
                        </div>
                    </div>

                    <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">Wasiliana Nasi</div>
                        <div className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-300">
                            <div>
                                <div className="font-semibold text-slate-900 dark:text-white">Simu</div>
                                <div>+255 718 573 384</div>
                            </div>
                            <div>
                                <div className="font-semibold text-slate-900 dark:text-white">Barua Pepe</div>
                                <div className="grid gap-1">
                                    <a
                                        href="mailto:info@sheddysnewlook.org"
                                        className="font-semibold text-primary hover:underline"
                                    >
                                        info@sheddysnewlook.org
                                    </a>
                                    <a
                                        href="mailto:contact@sheddysnewlook.org"
                                        className="font-semibold text-primary hover:underline"
                                    >
                                        contact@sheddysnewlook.org
                                    </a>
                                </div>
                            </div>

                            <div className="mt-1 flex items-center gap-3">
                                <a
                                    href="https://www.facebook.com/profile.php?id=100089866472392"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900"
                                    aria-label="Facebook"
                                >
                                    <img src="/assets/icons/facebook.svg" alt="" className="h-5 w-5" />
                                </a>
                                <a
                                    href="https://www.instagram.com/sheddysnewlookradio?igsh=OG9vZTZ0b3R2ZWVk"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900"
                                    aria-label="Instagram"
                                >
                                    <img src="/assets/icons/instagram.svg" alt="" className="h-5 w-5" />
                                </a>
                                <a
                                    href="https://www.youtube.com/@sheddysnewlookfmradio"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900"
                                    aria-label="YouTube"
                                >
                                    <img src="/assets/icons/youtube.svg" alt="" className="h-5 w-5" />
                                </a>
                                <a
                                    href="https://tiktok.com/@sheddysnewlookradio"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900"
                                    aria-label="TikTok"
                                >
                                    <img src="/assets/icons/tiktok.svg" alt="" className="h-5 w-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-2 border-t border-slate-200 pt-6 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        © {new Date().getFullYear()} Sheddy's Radio. All rights reserved.
                    </div>
                    <div>
                        Powered by{' '}
                        <a href="#" className="font-semibold text-primary hover:underline">
                            Ray
                        </a>{' '}
                    </div>
                </div>
            </div>
        </footer>
    );
}
