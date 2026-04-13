import { Link, usePage } from '@inertiajs/react';

// Lucide icons mapping for better reliability
const iconMap = {
    dashboard: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
    ),
    featured_play_list: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
    ),
    event: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
    ),
    mic: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
    ),
    article: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    ),
    description: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    ),
    mail: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    ),
    forum: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
    ),
    settings: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    ),
    person: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    ),
};

function GIcon({ name }) {
    return iconMap[name] || (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeWidth={2} />
        </svg>
    );
}

function Item({ href, label, icon, active, onClick }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={
                'group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ' +
                (active
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800')
            }
            style={{ touchAction: 'manipulation', minHeight: '48px' }}
        >
            <span
                className={
                    'grid h-10 w-10 place-items-center rounded-xl transition-all duration-200 ' +
                    (active
                        ? 'bg-white/20'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-white group-hover:shadow-sm dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-slate-700')
                }
                aria-hidden="true"
            >
                {icon}
            </span>
            <span className="truncate font-medium">{label}</span>
        </Link>
    );
}

export default function Sidebar({ open, onClose }) {
    const { url } = usePage();
    const pathname = url?.split('?')[0] ?? '';

    const items = [
        {
            section: 'Overview',
            items: [
                {
                    label: 'Dashboard',
                    href: route('dashboard'),
                    active: route().current('dashboard'),
                    icon: <GIcon name="dashboard" />,
                },
            ],
        },
        {
            section: 'Front Page',
            items: [
                {
                    label: 'Highlights',
                    href: route('admin.highlights'),
                    active: route().current('admin.highlights'),
                    icon: <GIcon name="featured_play_list" />,
                },
                {
                    label: 'Programs',
                    href: route('admin.programs'),
                    active: route().current('admin.programs'),
                    icon: <GIcon name="event" />,
                },
                {
                    label: 'Presenters',
                    href: route('admin.presenters'),
                    active: route().current('admin.presenters'),
                    icon: <GIcon name="mic" />,
                },
                {
                    label: 'Blogs',
                    href: route('admin.blogs'),
                    active: route().current('admin.blogs') || pathname.startsWith('/admin/blogs'),
                    icon: <GIcon name="article" />,
                },
                {
                    label: 'Pages',
                    href: route('admin.pages'),
                    active: route().current('admin.pages') || pathname.startsWith('/admin/pages'),
                    icon: <GIcon name="description" />,
                },
            ],
        },
        {
            section: 'Leads',
            items: [
                {
                    label: 'Subscribers',
                    href: route('admin.subscribers'),
                    active: route().current('admin.subscribers') || pathname.startsWith('/admin/subscribers'),
                    icon: <GIcon name="mail" />,
                },
                {
                    label: 'Contact Messages',
                    href: route('admin.contact-messages'),
                    active: route().current('admin.contact-messages') || pathname.startsWith('/admin/contact-messages'),
                    icon: <GIcon name="forum" />,
                },
            ],
        },
        {
            section: 'Settings',
            items: [
                {
                    label: 'Site Settings',
                    href: route('admin.settings.edit'),
                    active: route().current('admin.settings.edit'),
                    icon: <GIcon name="settings" />,
                },
                {
                    label: 'Profile',
                    href: route('profile.edit'),
                    active: route().current('profile.*'),
                    icon: <GIcon name="person" />,
                },
            ],
        },
    ];

    return (
        <>
            <div
                className={
                    'fixed inset-0 z-40 bg-black/50 transition lg:hidden ' +
                    (open ? 'opacity-100' : 'pointer-events-none opacity-0')
                }
                onClick={onClose}
                aria-hidden="true"
            />

            <aside
                className={
                    'fixed left-0 top-0 z-50 h-full w-[280px] -translate-x-full bg-white p-4 shadow-xl ring-1 ring-slate-200 transition dark:bg-slate-900 dark:ring-slate-800 lg:sticky lg:z-10 lg:translate-x-0 ' +
                    (open ? 'translate-x-0' : '')
                }
            >
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="h-10 w-10 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-800">
                            <img
                                src="/logo1.jpeg"
                                alt="Sheddy's Radio logo"
                                className="h-full w-full object-cover"
                                loading="eager"
                            />
                        </div>
                        <div>
                            <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                                Sheddy's New Look
                            </div>
                            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                Admin
                            </div>
                        </div>
                    </Link>

                    <button
                        type="button"
                        onClick={onClose}
                        className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800 lg:hidden"
                        aria-label="Close sidebar"
                    >
                        <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>

                <div className="mt-6 space-y-5">
                    {items.map((section) => (
                        <div key={section.section}>
                            <div className="px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500"
                                 style={{ fontFamily: 'Poppins, sans-serif' }}>
                                {section.section}
                            </div>
                            <div className="mt-2 grid gap-1">
                                {section.items.map((it) => (
                                    <Item
                                        key={it.label}
                                        href={it.href}
                                        label={it.label}
                                        icon={it.icon}
                                        active={it.active}
                                        onClick={onClose}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Poppins Font for Sidebar */}
                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

                    .sidebar-item {
                        font-family: "Poppins", sans-serif !important;
                    }
                `}</style>

                <div className="mt-6 border-t border-slate-200 pt-4 dark:border-slate-800">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-red-50 hover:text-red-600 dark:text-slate-300 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                        style={{ touchAction: 'manipulation', minHeight: '48px' }}
                    >
                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-slate-600 transition-all duration-200 group-hover:bg-red-100 group-hover:text-red-600 dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-red-900/30 dark:group-hover:text-red-400">
                            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10 7V5a2 2 0 012-2h7a2 2 0 012 2v14a2 2 0 01-2 2h-7a2 2 0 01-2-2v-2"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M15 12H3m0 0l3-3m-3 3l3 3"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                        <span className="font-medium">Log out</span>
                    </Link>
                </div>
            </aside>
        </>
    );
}
