import { Head, Link, usePage } from '@inertiajs/react';

import Header from '../Home/components/Header';
import Footer from '../Home/sections/Footer';
import FloatingRadioPlayer from '@/Components/FloatingRadioPlayer';

function formatDate(value) {
    if (!value) return '';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
}

function formatTimeAgo(value) {
    if (!value) return '';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return '';

    const diffMs = Date.now() - d.getTime();
    const diffSec = Math.max(0, Math.floor(diffMs / 1000));

    if (diffSec < 60) return 'Just now';

    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? '' : 's'} ago`;

    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr} hour${diffHr === 1 ? '' : 's'} ago`;

    const diffDay = Math.floor(diffHr / 24);
    if (diffDay < 7) return `${diffDay} day${diffDay === 1 ? '' : 's'} ago`;

    return formatDate(value);
}

export default function Index({ blogs, laravelVersion, phpVersion }) {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Blogs" />

            <div className="min-h-screen bg-white pb-28 text-slate-900 dark:bg-slate-950 dark:text-white">
                <div className="mx-auto w-full max-w-7xl px-6">
                    <Header auth={auth} />
                </div>

                <section className="relative mt-4 overflow-hidden">
                    <div className="absolute inset-0 bg-slate-900">
                        <img
                            src="/bredrum.jpg"
                            alt=""
                            className="h-full w-full object-cover opacity-70"
                            loading="eager"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/10" />
                    </div>

                    <div className="relative">
                        <div className="mx-auto w-full max-w-7xl px-6 py-10 sm:py-12">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <nav className="text-xs font-semibold text-white/80">
                                        <Link href="/" className="hover:text-white">
                                            Home
                                        </Link>
                                        <span className="px-2 text-white/60">/</span>
                                        <span className="text-white">Blogs</span>
                                    </nav>

                                    <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                                        Blogs
                                    </h1>
                                    <p className="mt-2 max-w-2xl text-sm text-white/85 sm:text-base">
                                        Makala zote za Sheddy's FM — habari, burudani na matukio.
                                    </p>
                                </div>

                                <Link
                                    href="/"
                                    className="inline-flex items-center justify-center rounded-xl bg-white/10 px-5 py-3 text-sm font-bold text-white ring-1 ring-white/25 backdrop-blur transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                                >
                                    Rudi Nyumbani
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <main className="mx-auto w-full max-w-7xl px-6 py-10">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {(blogs ?? []).map((b) => (
                            <Link
                                key={b.id ?? b.slug}
                                href={`/blogs/${b.slug}`}
                                className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-lg dark:bg-slate-900 dark:ring-slate-800"
                            >
                                <div className="relative h-48 w-full bg-slate-200 dark:bg-slate-800">
                                    <img
                                        src={b.image_url || '/logo1.jpeg'}
                                        alt={b.title}
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent" />
                                </div>

                                <div className="p-6">
                                    <div className="text-lg font-extrabold leading-snug text-slate-900 dark:text-white">
                                        {b.title}
                                    </div>

                                    <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                                        <span>{formatTimeAgo(b.published_at)}</span>
                                        {b.author_name ? (
                                            <>
                                                <span className="text-slate-300 dark:text-slate-700">•</span>
                                                <span>Imeandikwa na {b.author_name}</span>
                                            </>
                                        ) : null}
                                    </div>

                                    <div className="mt-4 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                                        {b.excerpt}
                                    </div>

                                    <div className="mt-6 inline-flex w-full items-center justify-between gap-3">
                                        <div className="inline-flex items-center gap-2 text-sm font-bold text-primary">
                                            Soma makala
                                            <span className="transition group-hover:translate-x-0.5">→</span>
                                        </div>

                                        <span className="rounded-full bg-primary-50 px-3 py-1 text-[11px] font-bold text-primary ring-1 ring-primary-100 dark:bg-primary-900/10 dark:ring-primary-900/30">
                                            Read
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}

                        {(blogs ?? []).length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 md:col-span-2 lg:col-span-3">
                                Hakuna blogs zilizowekwa.
                            </div>
                        ) : null}
                    </div>
                </main>

                <div className="mx-auto w-full max-w-7xl px-6 pb-20">
                    <Footer laravelVersion={laravelVersion} phpVersion={phpVersion} />
                </div>

                <FloatingRadioPlayer />
            </div>
        </>
    );
}
