import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-white text-slate-900">
                <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6">
                    <header className="flex items-center justify-between py-6">
                        <div className="flex items-center gap-3">
                            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-white shadow-sm">
                                <span className="text-sm font-bold tracking-wide">SR</span>
                            </div>
                            <div className="leading-tight">
                                <div className="text-base font-semibold text-slate-900">Sheddy's Radio</div>
                                <div className="text-xs text-slate-500">Live. Local. Loud.</div>
                            </div>
                        </div>

                        <nav className="flex items-center gap-2">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </nav>
                    </header>

                    <main className="flex flex-1 flex-col justify-center py-10">
                        <div className="grid items-center gap-10 lg:grid-cols-2">
                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-primary-100">
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                                    Now streaming
                                </div>

                                <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                                    Sikiliza muziki na vipindi vyako kwa urahisi
                                </h1>
                                <p className="mt-4 text-base leading-relaxed text-slate-600">
                                    Karibu Sheddy's Radio. Tume-design experience iwe safi, ya haraka, na yenye rangi za mfumo: nyekundu na nyeupe.
                                </p>

                                <div className="mt-7 flex flex-wrap items-center gap-3">
                                    <button
                                        type="button"
                                        className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                    >
                                        Play Live
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                    >
                                        See Schedule
                                    </button>
                                </div>

                                <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                                        <div className="text-sm font-semibold text-slate-900">24/7 Stream</div>
                                        <div className="mt-1 text-xs text-slate-500">Sikiliza muda wote</div>
                                    </div>
                                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                                        <div className="text-sm font-semibold text-slate-900">Top DJs</div>
                                        <div className="mt-1 text-xs text-slate-500">Vipindi vya moto</div>
                                    </div>
                                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                                        <div className="text-sm font-semibold text-slate-900">Request Songs</div>
                                        <div className="mt-1 text-xs text-slate-500">Tuma ombi lako</div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary-50 via-white to-white"></div>
                                <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm font-semibold text-slate-900">Live Player</div>
                                        <div className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary">
                                            On Air
                                        </div>
                                    </div>
                                    <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                        <div className="text-xs font-semibold text-slate-500">NOW PLAYING</div>
                                        <div className="mt-2 text-lg font-semibold text-slate-900">
                                            Artist Name - Track Title
                                        </div>
                                        <div className="mt-1 text-sm text-slate-600">Show Name • DJ Name</div>

                                        <div className="mt-5 flex items-center gap-3">
                                            <button
                                                type="button"
                                                className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                            >
                                                Play
                                            </button>
                                            <button
                                                type="button"
                                                className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                            >
                                                Pause
                                            </button>
                                            <div className="ml-auto text-xs text-slate-500">00:00</div>
                                        </div>
                                    </div>

                                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                        <div className="rounded-2xl border border-slate-200 bg-white p-4">
                                            <div className="text-xs font-semibold text-slate-500">NEXT</div>
                                            <div className="mt-2 text-sm font-semibold text-slate-900">Upcoming Show</div>
                                            <div className="mt-1 text-xs text-slate-500">Time • Host</div>
                                        </div>
                                        <div className="rounded-2xl border border-slate-200 bg-white p-4">
                                            <div className="text-xs font-semibold text-slate-500">CONTACT</div>
                                            <div className="mt-2 text-sm font-semibold text-slate-900">Request Line</div>
                                            <div className="mt-1 text-xs text-slate-500">+255 XXX XXX XXX</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <section className="mt-12 grid gap-6 lg:grid-cols-3">
                            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                <div className="text-sm font-semibold text-slate-900">Latest Shows</div>
                                <p className="mt-2 text-sm text-slate-600">
                                    Orodha ya vipindi vipya itaonekana hapa.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                <div className="text-sm font-semibold text-slate-900">Top Requests</div>
                                <p className="mt-2 text-sm text-slate-600">
                                    Nyimbo zinazopendwa zaidi kwa sasa.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                <div className="text-sm font-semibold text-slate-900">Download App</div>
                                <p className="mt-2 text-sm text-slate-600">
                                    Link za Android/iOS zitawekwa hapa.
                                </p>
                            </div>
                        </section>
                    </main>

                    <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-500">
                        Powered by Sheddy's Radio
                    </footer>
                </div>
            </div>
        </>
    );
}
