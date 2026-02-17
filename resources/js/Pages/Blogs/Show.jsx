import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';

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

    const diff = Math.max(0, Date.now() - d.getTime());
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Sasa hivi';
    if (mins < 60) return `${mins} dk zilizopita`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} saa zilizopita`;
    const days = Math.floor(hours / 24);
    return `${days} siku zilizopita`;
}

function splitParagraphs(text) {
    if (!text) return [];
    return String(text)
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean);
}

export default function Show({ blog, comments, moreBlogs, laravelVersion, phpVersion }) {
    const { auth } = usePage().props;
    const paragraphs = useMemo(() => splitParagraphs(blog?.body), [blog?.body]);

    const [justShared, setJustShared] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        message: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(`/blogs/${blog.slug}/comments`, {
            preserveScroll: true,
            onSuccess: () => reset('message'),
        });
    };

    async function handleShare() {
        const path = `/blogs/${blog.slug}`;
        const url = typeof window !== 'undefined' ? `${window.location.origin}${path}` : path;
        const title = blog?.title ?? "Sheddy's Radio";

        try {
            if (typeof navigator !== 'undefined' && navigator.share) {
                await navigator.share({ title, url });
            } else if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(url);
                setJustShared(true);
                window.setTimeout(() => setJustShared(false), 1400);
            }
        } catch (e) {
            // user cancelled share or clipboard failed
        }
    }

    return (
        <>
            <Head title={blog?.title ?? 'Blog'} />

            <div className="min-h-screen bg-white pb-28 text-slate-900 dark:bg-slate-950 dark:text-white">
                <div className="mx-auto w-full max-w-7xl px-6">
                    <Header auth={auth} />
                </div>

                <section className="relative mt-4 overflow-hidden">
                    <div className="absolute inset-0 bg-slate-900">
                        <img
                            src={blog?.image_url || '/bredrum.jpg'}
                            alt=""
                            className="h-full w-full object-cover opacity-70"
                            loading="eager"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />
                    </div>

                    <div className="relative">
                        <div className="mx-auto w-full max-w-7xl px-6 py-10 sm:py-12">
                            <nav className="text-xs font-semibold text-white/80">
                                <Link href="/" className="hover:text-white">
                                    Home
                                </Link>
                                <span className="px-2 text-white/60">/</span>
                                <Link href="/blogs" className="hover:text-white">
                                    Blogs
                                </Link>
                                <span className="px-2 text-white/60">/</span>
                                <span className="text-white">{blog?.title ?? 'Blog'}</span>
                            </nav>

                            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                                        {blog?.title}
                                    </h1>
                                    <div className="mt-2 text-sm text-white/85">
                                        {blog?.author_name ? `Imeandikwa na ${blog.author_name} • ` : ''}
                                        {formatTimeAgo(blog?.published_at)}
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-2">
                                    <Link
                                        href="/blogs"
                                        className="inline-flex items-center justify-center rounded-xl bg-white/10 px-5 py-3 text-sm font-bold text-white ring-1 ring-white/25 backdrop-blur transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                                    >
                                        ← Rudi Blogs
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={handleShare}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-bold text-white ring-1 ring-white/25 backdrop-blur transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                                    >
                                        <span className="material-symbols-outlined text-[18px] leading-none" aria-hidden="true">
                                            share
                                        </span>
                                        {justShared ? 'Copied' : 'Share'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="mx-auto w-full max-w-7xl px-6 py-10">
                    <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start">
                        <div>
                            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                                <div className="overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800">
                                    {blog.image_url ? (
                                        <img
                                            src={blog.image_url}
                                            alt={blog.title}
                                            className="h-[260px] w-full object-cover sm:h-[420px]"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="h-[260px] w-full sm:h-[420px]" />
                                    )}
                                </div>

                                <div className="prose prose-slate mt-6 max-w-none prose-p:leading-relaxed dark:prose-invert">
                                    {paragraphs.map((p, idx) => (
                                        <p key={idx}>{p}</p>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-10 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                                    <div className="text-lg font-extrabold">Maoni</div>
                                    <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                                        Acha maoni yako hapa chini
                                    </div>

                                    <form onSubmit={submit} className="mt-6 grid gap-4">
                                        <div>
                                            <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                                                Jina
                                            </label>
                                            <input
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                                placeholder="Andika jina lako"
                                            />
                                            {errors.name ? (
                                                <div className="mt-1 text-xs text-red-600">{errors.name}</div>
                                            ) : null}
                                        </div>

                                        <div>
                                            <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                                                Ujumbe
                                            </label>
                                            <textarea
                                                value={data.message}
                                                onChange={(e) => setData('message', e.target.value)}
                                                rows={4}
                                                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                                placeholder="Andika maoni yako"
                                            />
                                            {errors.message ? (
                                                <div className="mt-1 text-xs text-red-600">{errors.message}</div>
                                            ) : null}
                                        </div>

                                        <div className="flex items-center justify-end">
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70"
                                            >
                                                Tuma Maoni
                                            </button>
                                        </div>
                                    </form>

                                    <div className="mt-8 space-y-4">
                                        {(comments ?? []).map((c) => (
                                            <div
                                                key={c.id}
                                                className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
                                            >
                                                <div className="flex items-center justify-between gap-4">
                                                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                                                        {c.name}
                                                    </div>
                                                    <div className="text-xs text-slate-500 dark:text-slate-400">
                                                        {formatTimeAgo(c.created_at)}
                                                    </div>
                                                </div>
                                                <div className="mt-2 text-sm text-slate-700 dark:text-slate-200">
                                                    {c.message}
                                                </div>
                                            </div>
                                        ))}

                                        {(comments ?? []).length === 0 ? (
                                            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
                                                Hakuna maoni bado. Kuwa wa kwanza kuandika.
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>

                        <aside className="space-y-4">
                                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                                    <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                                        More Blogs
                                    </div>
                                    <div className="mt-4 grid gap-3">
                                        {(moreBlogs ?? []).map((b) => (
                                            <Link
                                                key={b.id ?? b.slug}
                                                href={`/blogs/${b.slug}`}
                                                className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800"
                                            >
                                                <div className="h-12 w-12 overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-800">
                                                    {b.image_url ? (
                                                        <img
                                                            src={b.image_url}
                                                            alt={b.title}
                                                            className="h-full w-full object-cover"
                                                            loading="lazy"
                                                        />
                                                    ) : null}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="truncate text-sm font-bold text-slate-900 dark:text-white">
                                                        {b.title}
                                                    </div>
                                                    <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                                                        {formatDate(b.published_at)}
                                                    </div>
                                                </div>
                                                <div className="ml-auto text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-primary">
                                                    →
                                                </div>
                                            </Link>
                                        ))}

                                        {(moreBlogs ?? []).length === 0 ? (
                                            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
                                                Hakuna blog nyingine.
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                        </aside>
                    </div>
                </div>

                <div className="mx-auto w-full max-w-7xl px-6 pb-20">
                    <Footer laravelVersion={laravelVersion} phpVersion={phpVersion} />
                </div>

                <FloatingRadioPlayer />
            </div>
        </>
    );
}
