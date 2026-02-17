import { useEffect, useMemo, useRef, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { getRadioPlayer } from '@/utils/radioPlayer';

function useInView(ref, options = {}) {
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                observer.disconnect();
            }
        }, options);

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [ref, options]);

    return isInView;
}

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

function ShareIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M16 6a3 3 0 10-2.83-4H13a3 3 0 003 3ZM6 14a3 3 0 10.17-6H6a3 3 0 000 6Zm10 10a3 3 0 10-2.83-4H13a3 3 0 003 3Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8.59 11.51l6.83-3.96M8.59 12.49l6.83 3.96"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function ClockIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M12 8v4l2.5 2.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0Z"
                stroke="currentColor"
                strokeWidth="2"
            />
        </svg>
    );
}

export default function BlogList({ blogs }) {
    const streamUrl = usePage().props.site_settings?.stream_url;
    const posts = useMemo(() => blogs ?? [], [blogs]);

    const [justShared, setJustShared] = useState(null);

    const sectionRef = useRef(null);
    const inView = useInView(sectionRef, { threshold: 0.15 });

    async function handleShare(post) {
        const path = `/blogs/${post.slug}`;
        const url = typeof window !== 'undefined' ? `${window.location.origin}${path}` : path;
        const title = post.title ?? "Sheddy's Radio";

        try {
            if (typeof navigator !== 'undefined' && navigator.share) {
                await navigator.share({ title, url });
            } else if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(url);
                setJustShared(post.id ?? post.slug ?? post.title);
                window.setTimeout(() => setJustShared(null), 1400);
            }
        } catch (e) {
            // user cancelled share or clipboard failed
        }
    }

    return (
        <section ref={sectionRef} className="mt-14">
            <div className="rounded-2xl bg-gradient-to-b from-slate-50 to-white px-6 py-10 dark:from-slate-900 dark:to-slate-900">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <div className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                            Makala za Hivi Karibuni
                        </div>
                        <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                            Soma makala zetu za hivi karibuni
                        </div>
                    </div>

                    <a
                        href="/blogs"
                        className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
                    >
                        Tazama Zote
                    </a>
                </div>

                <div className="relative mt-8">
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-slate-50 to-transparent dark:from-slate-900" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-slate-50 to-transparent dark:from-slate-900" />

                    <div className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-2">
                        {posts.map((p, idx) => {
                            const key = p.id ?? p.slug ?? p.title;
                            const shared = justShared === key;

                            return (
                                <div
                                    key={key}
                                    className={
                                        'snap-start cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition duration-700 hover:shadow-lg dark:bg-slate-900 dark:ring-slate-800 ' +
                                        (inView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0')
                                    }
                                    style={{ transitionDelay: `${idx * 90}ms` }}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => getRadioPlayer().play(streamUrl, { title: "Sheddy's New Look Radio", subtitle: 'Live Stream' })}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            getRadioPlayer().play(streamUrl, { title: "Sheddy's New Look Radio", subtitle: 'Live Stream' });
                                        }
                                    }}
                                >
                                    <div className="min-w-[290px] sm:min-w-[360px] lg:min-w-[380px]">
                                        <div className="relative h-48 w-full bg-slate-200 dark:bg-slate-800">
                                            <img
                                                src={p.image_url || '/logo1.jpeg'}
                                                alt={p.title}
                                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-transparent" />

                                            <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm ring-1 ring-white/50 backdrop-blur dark:bg-slate-950/80 dark:text-white">
                                                <ClockIcon className="h-4 w-4 text-primary" />
                                                <span>{formatTimeAgo(p.published_at)}</span>
                                            </div>
                                        </div>

                                        <div className="flex h-[268px] flex-col p-6">
                                            <div className="text-lg font-extrabold leading-snug text-slate-900 dark:text-white">
                                                {p.title}
                                            </div>

                                            <div className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                                                {p.excerpt}
                                            </div>

                                            <div className="mt-auto pt-5">
                                                <div className="flex items-center justify-between gap-3">
                                                    <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                                        Latest
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleShare(p);
                                                        }}
                                                        className={
                                                            'inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900 ' +
                                                            (shared ? 'text-primary' : '')
                                                        }
                                                        aria-label="Share"
                                                    >
                                                        <span
                                                            className={
                                                                'material-symbols-outlined text-[18px] leading-none transition ' +
                                                                (shared ? 'scale-110' : '')
                                                            }
                                                            aria-hidden="true"
                                                        >
                                                            share
                                                        </span>
                                                        {shared ? 'Copied' : 'Share'}
                                                    </button>
                                                </div>

                                                <a
                                                    href={`/blogs/${p.slug}`}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                                >
                                                    Soma Makala
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
