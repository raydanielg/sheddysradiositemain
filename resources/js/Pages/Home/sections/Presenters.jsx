import { useMemo, useRef } from 'react';

export default function Presenters({ presenters }) {
    const normalizeImageUrl = (url) => {
        if (!url) return '';
        if (typeof url === 'string' && url.startsWith('http')) {
            const idx = url.indexOf('/storage/');
            if (idx !== -1) return url.slice(idx);
        }
        return url;
    };

    const list = useMemo(() => presenters ?? [], [presenters]);
    const scrollerRef = useRef(null);

    const scrollByAmount = (delta) => {
        if (!scrollerRef.current) return;
        scrollerRef.current.scrollBy({ left: delta, behavior: 'smooth' });
    };

    const many = list.length > 5;

    return (
        <section className="mt-14 overflow-hidden rounded-2xl bg-gradient-to-b from-slate-50 to-white py-10 dark:from-slate-900 dark:to-slate-900">
            <div className="w-full px-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Watangazaji Wetu
                    </div>

                    {many && (
                        <div className="hidden items-center gap-2 sm:flex">
                            <button
                                type="button"
                                onClick={() => scrollByAmount(-360)}
                                className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white/70 text-slate-700 shadow-sm backdrop-blur transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:bg-slate-800"
                                aria-label="Scroll left"
                            >
                                <svg
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L8.414 10l4.293 4.293a1 1 0 010 1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                            <button
                                type="button"
                                onClick={() => scrollByAmount(360)}
                                className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white/70 text-slate-700 shadow-sm backdrop-blur transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:bg-slate-800"
                                aria-label="Scroll right"
                            >
                                <svg
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L11.586 10 7.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>

                <div className="mt-6">
                    {list.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                            Hakuna watangazaji waliowekwa.
                        </div>
                    ) : many ? (
                        <div
                            ref={scrollerRef}
                            className="flex gap-4 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        >
                            {list.map((p) => (
                                <div
                                    key={p.id ?? p.name}
                                    className="min-w-[220px] max-w-[220px] overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800"
                                >
                                    <div className="h-40 w-full bg-slate-200 dark:bg-slate-800">
                                        {p.image_url ? (
                                            <img
                                                src={normalizeImageUrl(p.image_url)}
                                                alt={p.name}
                                                className="h-full w-full object-cover"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="grid h-full w-full place-items-center bg-primary-50 text-primary-600">
                                                <span className="material-symbols-outlined text-[48px]">person</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="bg-slate-50 px-4 py-3 text-center dark:bg-slate-800/60">
                                        <div className="text-sm font-bold text-slate-900 dark:text-white">
                                            {p.name}
                                        </div>
                                        {p.title ? (
                                            <div className="mt-1 text-xs text-slate-500 dark:text-slate-300">
                                                {p.title}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                            {list.map((p) => (
                                <div
                                    key={p.id ?? p.name}
                                    className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800"
                                >
                                    <div className="h-40 w-full bg-slate-200 dark:bg-slate-800">
                                        {p.image_url ? (
                                            <img
                                                src={normalizeImageUrl(p.image_url)}
                                                alt={p.name}
                                                className="h-full w-full object-cover"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="grid h-full w-full place-items-center bg-primary-50 text-primary-600">
                                                <span className="material-symbols-outlined text-[48px]">person</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="bg-slate-50 px-4 py-3 text-center dark:bg-slate-800/60">
                                        <div className="text-sm font-bold text-slate-900 dark:text-white">
                                            {p.name}
                                        </div>
                                        {p.title ? (
                                            <div className="mt-1 text-xs text-slate-500 dark:text-slate-300">
                                                {p.title}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
