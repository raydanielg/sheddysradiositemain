import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Tab } from '@headlessui/react';
import { useEffect, useMemo, useState, Fragment } from 'react';
import { getRadioPlayer } from '@/utils/radioPlayer';

function GIcon({ name, className = 'text-[18px]' }) {
    return (
        <span className={`material-symbols-outlined ${className} leading-none`} aria-hidden="true">
            {name}
        </span>
    );
}

function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Settings({ settings, timezones }) {
    const { flash } = usePage().props;
    const player = useMemo(() => getRadioPlayer(), []);
    const [playerState, setPlayerState] = useState(() => player.getState());

    useEffect(() => player.subscribe(setPlayerState), [player]);
    const { data, setData, put, post, processing, errors } = useForm({
        site_name: settings?.site_name ?? "Sheddy's New Look Radio",
        site_description: settings?.site_description ?? '',
        contact_email: settings?.contact_email ?? '',
        contact_phone: settings?.contact_phone ?? '',
        seo_title: settings?.seo_title ?? '',
        seo_keywords: settings?.seo_keywords ?? '',
        seo_description: settings?.seo_description ?? '',
        og_image_url: settings?.og_image_url ?? '',
        stream_url: settings?.stream_url ?? '',
        fm_frequency: settings?.fm_frequency ?? '',
        timezone: settings?.timezone ?? 'Africa/Dar_es_Salaam',
        date_format: settings?.date_format ?? 'd/m/Y',
        time_format: settings?.time_format ?? 'H:i',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.settings.update'), {
            preserveScroll: true,
        });
    };

    const generateSitemap = () => {
        post(route('admin.settings.sitemap'), {
            preserveScroll: true,
        });
    };

    const tabs = [
        { name: 'General', icon: 'settings' },
        { name: 'SEO', icon: 'search' },
        { name: 'Radio', icon: 'radio' },
        { name: 'Localization', icon: 'language' },
    ];

    return (
        <AuthenticatedLayout header="Site Settings">
            <Head title="Site Settings" />

            <div className="mx-auto max-w-6xl">
                {flash?.success && (
                    <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-bold text-green-800 shadow-sm dark:border-green-900/50 dark:bg-green-900/20 dark:text-green-200">
                        {flash.success}
                    </div>
                )}

                <Tab.Group>
                    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
                        {/* Internal Sidebar */}
                        <div className="space-y-6">
                            <Tab.List className="flex flex-col gap-2 rounded-3xl bg-white p-3 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                                {tabs.map((tab) => (
                                    <Tab key={tab.name} as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={cn(
                                                    'flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-bold transition-all duration-200 focus:outline-none',
                                                    selected
                                                        ? 'bg-primary text-white shadow-lg shadow-primary-500/30'
                                                        : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50'
                                                )}
                                            >
                                                <GIcon name={tab.icon} className={selected ? 'text-white' : 'text-slate-400'} />
                                                {tab.name}
                                            </button>
                                        )}
                                    </Tab>
                                ))}
                            </Tab.List>

                            {/* Sitemap Section in Sidebar */}
                            <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-800">
                                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
                                    <GIcon name="lan" className="text-[16px]" />
                                    SEO Tools
                                </div>
                                <div className="mt-4">
                                    <button
                                        type="button"
                                        onClick={generateSitemap}
                                        disabled={processing}
                                        className="group flex w-full items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 transition-all hover:bg-primary hover:text-white hover:ring-primary dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-800 dark:hover:bg-primary"
                                    >
                                        <GIcon name="xml_converter" className="group-hover:text-white" />
                                        Update Sitemap
                                    </button>
                                    <p className="mt-3 px-1 text-[11px] leading-relaxed text-slate-500">
                                        Rebuild your sitemap.xml to help search engines find new blogs.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Content Area */}
                        <Tab.Panels as={Fragment}>
                            <form onSubmit={submit} className="space-y-6">
                                <Tab.Panel className="animate-in fade-in slide-in-from-right-4 duration-300 focus:outline-none">
                                    <div className="rounded-[2.5rem] bg-white p-10 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                                        <div className="flex items-center gap-4 border-b border-slate-100 pb-6 dark:border-slate-800">
                                            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-50 text-primary dark:bg-primary-900/20">
                                                <GIcon name="settings" className="text-[24px]" />
                                            </div>
                                            <h3 className="text-2xl font-black text-slate-900 dark:text-white">General Settings</h3>
                                        </div>
                                        
                                        <div className="mt-8 grid gap-8">
                                            <div>
                                                <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Site Name</label>
                                                <input
                                                    value={data.site_name}
                                                    onChange={e => setData('site_name', e.target.value)}
                                                    className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 text-sm font-semibold text-slate-900 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                                />
                                                {errors.site_name && <div className="mt-1 text-xs text-red-600">{errors.site_name}</div>}
                                            </div>
                                            <div>
                                                <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Site Description</label>
                                                <textarea
                                                    value={data.site_description}
                                                    onChange={e => setData('site_description', e.target.value)}
                                                    rows={3}
                                                    className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 text-sm font-semibold text-slate-900 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                                />
                                            </div>
                                            <div className="grid gap-8 sm:grid-cols-2">
                                                <div>
                                                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Contact Email</label>
                                                    <input
                                                        type="email"
                                                        value={data.contact_email}
                                                        onChange={e => setData('contact_email', e.target.value)}
                                                        className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 text-sm font-semibold text-slate-900 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Contact Phone</label>
                                                    <input
                                                        value={data.contact_phone}
                                                        onChange={e => setData('contact_phone', e.target.value)}
                                                        className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 text-sm font-semibold text-slate-900 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab.Panel>

                                <Tab.Panel className="animate-in fade-in slide-in-from-right-4 duration-300 focus:outline-none">
                                    <div className="rounded-[2.5rem] bg-white p-10 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                                        <div className="flex items-center gap-4 border-b border-slate-100 pb-6 dark:border-slate-800">
                                            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-50 text-primary dark:bg-primary-900/20">
                                                <GIcon name="search" className="text-[24px]" />
                                            </div>
                                            <h3 className="text-2xl font-black text-slate-900 dark:text-white">SEO & Social Meta</h3>
                                        </div>
                                        <div className="mt-8 grid gap-8">
                                            <div>
                                                <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">SEO Meta Title</label>
                                                <input
                                                    value={data.seo_title}
                                                    onChange={e => setData('seo_title', e.target.value)}
                                                    className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 text-sm font-semibold text-slate-900 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">SEO Meta Keywords</label>
                                                <input
                                                    value={data.seo_keywords}
                                                    onChange={e => setData('seo_keywords', e.target.value)}
                                                    placeholder="radio, live, music, tanzania"
                                                    className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 text-sm font-semibold text-slate-900 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">SEO Meta Description</label>
                                                <textarea
                                                    value={data.seo_description}
                                                    onChange={e => setData('seo_description', e.target.value)}
                                                    rows={3}
                                                    className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 text-sm font-semibold text-slate-900 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">OG Share Image URL</label>
                                                <input
                                                    value={data.og_image_url}
                                                    onChange={e => setData('og_image_url', e.target.value)}
                                                    className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 text-sm font-semibold text-slate-900 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Tab.Panel>

                                <Tab.Panel className="animate-in fade-in slide-in-from-right-4 duration-300 focus:outline-none">
                                    <div className="rounded-[2.5rem] bg-white p-10 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                                        <div className="flex items-center gap-4 border-b border-slate-100 pb-6 dark:border-slate-800">
                                            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-50 text-primary dark:bg-primary-900/20">
                                                <GIcon name="radio" className="text-[24px]" />
                                            </div>
                                            <h3 className="text-2xl font-black text-slate-900 dark:text-white">Radio Settings</h3>
                                        </div>
                                        <div className="mt-8 grid gap-8">
                                            <div>
                                                <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Streaming URL</label>
                                                <input
                                                    value={data.stream_url}
                                                    onChange={e => setData('stream_url', e.target.value)}
                                                    className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 text-sm font-semibold text-slate-900 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                                />
                                                <div className="mt-3 flex flex-wrap items-center gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => player.toggle(data.stream_url, { title: "Sheddy's New Look Radio", subtitle: 'Zeno FM Stream' })}
                                                        className={cn(
                                                            'inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-black text-white shadow-sm transition active:scale-95',
                                                            playerState.isPlaying ? 'bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200' : 'bg-primary hover:bg-primary-700'
                                                        )}
                                                    >
                                                        <GIcon name={playerState.isPlaying ? 'pause_circle' : 'play_circle'} className="text-[22px]" />
                                                        <span className="ml-2">{playerState.isPlaying ? 'Stop Test' : 'Test Play'}</span>
                                                    </button>

                                                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 ring-1 ring-slate-200 dark:bg-slate-950 dark:text-slate-200 dark:ring-slate-800">
                                                        <span
                                                            className={cn(
                                                                'h-2 w-2 rounded-full',
                                                                playerState.isPlaying ? 'bg-green-500' : 'bg-slate-400'
                                                            )}
                                                        />
                                                        {playerState.isBuffering ? 'Loading…' : playerState.isPlaying ? 'Playing' : 'Idle'}
                                                    </div>
                                                </div>

                                                {errors.stream_url ? (
                                                    <div className="mt-2 text-xs font-bold text-red-600">{errors.stream_url}</div>
                                                ) : null}

                                                {playerState.error ? (
                                                    <div className="mt-2 text-xs font-bold text-red-600">{playerState.error}</div>
                                                ) : (
                                                    <div className="mt-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                                                        Tip: Zeno FM links often end with <span className="font-black">.m3u8</span> or a direct audio stream URL.
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">FM Frequency</label>
                                                <input
                                                    value={data.fm_frequency}
                                                    onChange={e => setData('fm_frequency', e.target.value)}
                                                    placeholder="e.g. 98.5 FM"
                                                    className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 text-sm font-semibold text-slate-900 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Tab.Panel>

                                <Tab.Panel className="animate-in fade-in slide-in-from-right-4 duration-300 focus:outline-none">
                                    <div className="rounded-[2.5rem] bg-white p-10 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                                        <div className="flex items-center gap-4 border-b border-slate-100 pb-6 dark:border-slate-800">
                                            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-50 text-primary dark:bg-primary-900/20">
                                                <GIcon name="language" className="text-[24px]" />
                                            </div>
                                            <h3 className="text-2xl font-black text-slate-900 dark:text-white">Localization</h3>
                                        </div>
                                        <div className="mt-8 grid gap-8">
                                            <div>
                                                <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Timezone Setup</label>
                                                <select
                                                    value={data.timezone}
                                                    onChange={e => setData('timezone', e.target.value)}
                                                    className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 text-sm font-bold text-slate-900 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                                >
                                                    {timezones.map(tz => (
                                                        <option key={tz} value={tz}>{tz}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="grid gap-8 sm:grid-cols-2">
                                                <div>
                                                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Date Format</label>
                                                    <input
                                                        value={data.date_format}
                                                        onChange={e => setData('date_format', e.target.value)}
                                                        className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 text-sm font-bold text-slate-900 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Time Format</label>
                                                    <input
                                                        value={data.time_format}
                                                        onChange={e => setData('time_format', e.target.value)}
                                                        className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 text-sm font-bold text-slate-900 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab.Panel>

                                <div className="mt-8 flex items-center justify-end gap-4 p-2">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="group relative inline-flex items-center justify-center overflow-hidden rounded-[2rem] bg-primary px-12 py-5 text-lg font-black text-white shadow-2xl shadow-primary-500/40 transition-all hover:bg-primary-700 active:scale-95 disabled:opacity-70"
                                    >
                                        <span className="relative z-10 flex items-center gap-3">
                                            <GIcon name="save" className="text-white" />
                                            Save All Settings
                                        </span>
                                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 transition-transform duration-1000 group-hover:translate-x-full" />
                                    </button>
                                </div>
                            </form>
                        </Tab.Panels>
                    </div>
                </Tab.Group>
            </div>
        </AuthenticatedLayout>
    );
}
