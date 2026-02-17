import { Link, usePage } from '@inertiajs/react';

function GIcon({ name }) {
    return (
        <span className="material-symbols-outlined text-[20px] leading-none" aria-hidden="true">
            {name}
        </span>
    );
}

function Item({ href, label, icon, active, onClick }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={
                'group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition ' +
                (active
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-800')
            }
        >
            <span
                className={
                    'grid h-9 w-9 place-items-center rounded-lg transition ' +
                    (active
                        ? 'bg-white/15'
                        : 'bg-slate-100 text-slate-700 group-hover:bg-white dark:bg-slate-800 dark:text-slate-200 dark:group-hover:bg-slate-700')
                }
                aria-hidden="true"
            >
                {icon}
            </span>
            <span className="truncate">{label}</span>
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

                <div className="mt-6 space-y-6">
                    {items.map((section) => (
                        <div key={section.section}>
                            <div className="px-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
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

                <div className="mt-6 border-t border-slate-200 pt-4 dark:border-slate-800">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                        <span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
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
                        Log out
                    </Link>
                </div>
            </aside>
        </>
    );
}
