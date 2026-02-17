import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useMemo } from 'react';

import Header from './Home/components/Header';
import Footer from './Home/sections/Footer';
import FloatingRadioPlayer from '@/Components/FloatingRadioPlayer';

function splitParagraphs(text) {
    if (!text) return [];
    return String(text)
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean);
}

export default function Contact({ page }) {
    const { auth, flash } = usePage().props;
    const paragraphs = useMemo(() => splitParagraphs(page?.body), [page?.body]);
    const hero = page?.hero_image_url || '/bredrum.jpg';

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/contact', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <Head title={page?.title ?? 'Contact'} />

            <div className="min-h-screen bg-white pb-28 text-slate-900 dark:bg-slate-950 dark:text-white">
                <div className="mx-auto w-full max-w-7xl px-6">
                    <Header auth={auth} />
                </div>

                <section className="relative mt-4 overflow-hidden">
                    <div className="absolute inset-0 bg-slate-900">
                        <img src={hero} alt="" className="h-full w-full object-cover opacity-70" loading="eager" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />
                    </div>

                    <div className="relative">
                        <div className="mx-auto w-full max-w-7xl px-6 py-10 sm:py-12">
                            <nav className="text-xs font-semibold text-white/80">
                                <Link href="/" className="hover:text-white">
                                    Home
                                </Link>
                                <span className="px-2 text-white/60">/</span>
                                <span className="text-white">Contact</span>
                            </nav>

                            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                                {page?.title ?? 'Contact Us'}
                            </h1>
                            <p className="mt-2 max-w-2xl text-sm text-white/85 sm:text-base">
                                {page?.excerpt ?? 'Tupo hapa kukusaidia. Tuma ujumbe wako, tutakujibu haraka.'}
                            </p>
                        </div>
                    </div>
                </section>

                <main className="mx-auto w-full max-w-7xl px-6 py-10">
                    <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
                        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                            <div className="text-lg font-extrabold">Tuma Ujumbe</div>
                            <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                                Jaza fomu hii, tutakujibu kupitia email au simu.
                            </div>

                            {flash?.success ? (
                                <div className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-900/50 dark:bg-green-900/20 dark:text-green-200">
                                    {flash.success}
                                </div>
                            ) : null}

                            <form onSubmit={submit} className="mt-6 grid gap-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="text-sm font-semibold text-slate-900 dark:text-white">Jina</label>
                                        <input
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                            placeholder="Jina lako"
                                        />
                                        {errors.name ? <div className="mt-1 text-xs text-red-600">{errors.name}</div> : null}
                                    </div>

                                    <div>
                                        <label className="text-sm font-semibold text-slate-900 dark:text-white">Email</label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                            placeholder="mfano: jina@gmail.com"
                                        />
                                        {errors.email ? <div className="mt-1 text-xs text-red-600">{errors.email}</div> : null}
                                    </div>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="text-sm font-semibold text-slate-900 dark:text-white">Simu (hiari)</label>
                                        <input
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                            placeholder="+255..."
                                        />
                                        {errors.phone ? <div className="mt-1 text-xs text-red-600">{errors.phone}</div> : null}
                                    </div>

                                    <div>
                                        <label className="text-sm font-semibold text-slate-900 dark:text-white">Mada (hiari)</label>
                                        <input
                                            value={data.subject}
                                            onChange={(e) => setData('subject', e.target.value)}
                                            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                            placeholder="mfano: Ads / Ujumbe"
                                        />
                                        {errors.subject ? <div className="mt-1 text-xs text-red-600">{errors.subject}</div> : null}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-semibold text-slate-900 dark:text-white">Ujumbe</label>
                                    <textarea
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        rows={5}
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                        placeholder="Andika ujumbe wako..."
                                    />
                                    {errors.message ? <div className="mt-1 text-xs text-red-600">{errors.message}</div> : null}
                                </div>

                                <div className="flex items-center justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70"
                                    >
                                        Tuma Ujumbe
                                    </button>
                                </div>
                            </form>
                        </div>

                        <aside className="space-y-4">
                            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                                <div className="text-sm font-extrabold text-slate-900 dark:text-white">Mawasiliano</div>
                                <div className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-300">
                                    <div>
                                        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Simu</div>
                                        <div className="font-semibold">+255 718 573 384</div>
                                    </div>
                                    <div>
                                        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Email</div>
                                        <div className="grid gap-1">
                                            <a
                                                className="font-semibold text-primary hover:underline"
                                                href="mailto:info@sheddysnewlook.org"
                                            >
                                                info@sheddysnewlook.org
                                            </a>
                                            <a
                                                className="font-semibold text-primary hover:underline"
                                                href="mailto:contact@sheddysnewlook.org"
                                            >
                                                contact@sheddysnewlook.org
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {paragraphs.length ? (
                                <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                                    <div className="text-sm font-extrabold text-slate-900 dark:text-white">Maelezo</div>
                                    <div className="prose prose-slate mt-3 max-w-none text-sm dark:prose-invert">
                                        {paragraphs.map((p, idx) => (
                                            <p key={idx}>{p}</p>
                                        ))}
                                    </div>
                                </div>
                            ) : null}
                        </aside>
                    </div>
                </main>

                <div className="mx-auto w-full max-w-7xl px-6 pb-20">
                    <Footer laravelVersion={page?.laravelVersion} phpVersion={page?.phpVersion} />
                </div>

                <FloatingRadioPlayer />
            </div>
        </>
    );
}
