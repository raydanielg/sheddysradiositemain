import { useMemo, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { getRadioPlayer } from '@/utils/radioPlayer';

function ClockIcon(props) {
    return (
        <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16Zm1-12a1 1 0 10-2 0v4c0 .265.105.52.293.707l2 2a1 1 0 101.414-1.414L11 9.586V6Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

export default function Schedule({ programs }) {
    const streamUrl = usePage().props.site_settings?.stream_url;
    const normalizeImageUrl = (url) => {
        if (!url) return '';
        if (typeof url === 'string' && url.startsWith('http')) {
            const idx = url.indexOf('/storage/');
            if (idx !== -1) return url.slice(idx);
        }
        return url;
    };

    const days = useMemo(
        () => [
            { key: 1, label: 'Jumatatu' },
            { key: 2, label: 'Jumanne' },
            { key: 3, label: 'Jumatano' },
            { key: 4, label: 'Alhamisi' },
            { key: 5, label: 'Ijumaa' },
            { key: 6, label: 'Jumamosi' },
            { key: 7, label: 'Jumapili' },
        ],
        [],
    );

    const programsByDay = useMemo(() => {
        const grouped = {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
        };

        (programs ?? []).forEach((p) => {
            const day = Number(p.day_of_week);
            if (!grouped[day]) grouped[day] = [];
            grouped[day].push(p);
        });

        return grouped;
    }, [programs]);

    const [activeDay, setActiveDay] = useState(days[0].key);
    const dayPrograms = programsByDay[activeDay] ?? [];

    const formatTimeRange = (p) => {
        if (p.start_time && p.end_time) return `${p.start_time} - ${p.end_time}`;
        if (p.start_time) return p.start_time;
        return '';
    };

    return (
        <section className="mt-14">
            <div className="w-full px-6">
                <div className="flex flex-col gap-2">
                    <div className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Ratiba ya Vipindi
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                        Angalia ratiba ya vipindi vyetu vya kila siku
                    </div>
                </div>

                <div className="mt-6 rounded-xl bg-primary-50 p-2 ring-1 ring-primary-100 dark:bg-primary-900/10 dark:ring-primary-900/30">
                    <div className="grid grid-cols-7 gap-2 overflow-x-auto no-scrollbar">
                        {days.map((d) => {
                            const active = d.key === activeDay;
                            return (
                                <button
                                    key={d.key}
                                    type="button"
                                    onClick={() => setActiveDay(d.key)}
                                    className={
                                        'rounded-lg px-2 py-2 text-xs font-semibold transition whitespace-nowrap ' +
                                        (active
                                            ? 'bg-primary text-white shadow-sm'
                                            : 'text-slate-700 hover:bg-white/70 dark:text-slate-200 dark:hover:bg-slate-900/40')
                                    }
                                >
                                    {d.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                    {dayPrograms.map((p) => (
                        <div
                            key={p.id ?? `${activeDay}-${p.title}-${p.start_time}-${p.end_time}`}
                            className="group cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                            role="button"
                            tabIndex={0}
                            onClick={() => getRadioPlayer().play(streamUrl, { title: "Sheddy's New Look Radio", subtitle: p?.title ? `Live • ${p.title}` : 'Live Stream' })}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    getRadioPlayer().play(streamUrl, { title: "Sheddy's New Look Radio", subtitle: p?.title ? `Live • ${p.title}` : 'Live Stream' });
                                }
                            }}
                        >
                            <div className="grid grid-cols-[96px_1fr] gap-4 p-4">
                                <div className="h-20 w-24 overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-800">
                                    <img
                                        src={normalizeImageUrl(p.image_url) || '/logo1.jpeg'}
                                        alt={p.title}
                                        className="h-full w-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                                        {p.title}
                                    </div>
                                    <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                                        Mtangazaji: {p.host}
                                    </div>
                                    <div className="mt-1 inline-flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                                        <ClockIcon className="h-4 w-4 text-primary" />
                                        {formatTimeRange(p)}
                                    </div>
                                    <div className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                                        {p.description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {dayPrograms.length === 0 && (
                        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                            Hakuna ratiba iliyowekwa kwa siku hii.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
