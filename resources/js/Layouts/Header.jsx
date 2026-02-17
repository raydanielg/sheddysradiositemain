import { Link, usePage } from '@inertiajs/react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect, useRef } from 'react';
import { 
    Search, 
    User, 
    Star, 
    Settings as SettingsIcon, 
    LogOut, 
    ChevronDown,
    BookOpen,
    Mic,
    Calendar,
    Loader2
} from 'lucide-react';

function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

const ICON_MAP = {
    BookOpen: BookOpen,
    Mic: Mic,
    Calendar: Calendar,
};

export default function Header({ onMenuClick, header }) {
    const user = usePage().props.auth?.user;
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);
    const [searching, setSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef(null);

    // Close search results when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // AJAX Search logic
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery.length > 1) {
                setSearching(true);
                setShowResults(true);
                fetch(`/api/admin/search?q=${encodeURIComponent(searchQuery)}`)
                    .then(res => res.json())
                    .then(data => {
                        setResults(data.results || []);
                        setSearching(false);
                    })
                    .catch(() => setSearching(false));
            } else {
                setResults([]);
                setShowResults(false);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    return (
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
            <div className="flex items-center gap-3 px-6 py-4">
                <button
                    type="button"
                    onClick={onMenuClick}
                    className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800 lg:hidden"
                    aria-label="Open sidebar"
                >
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>

                <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Administration</div>
                    <div className="mt-0.5 truncate text-xl font-black tracking-tight text-slate-900 dark:text-white">
                        {header}
                    </div>
                </div>

                <div className="hidden w-[400px] lg:block" ref={searchRef}>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-3.5 grid place-items-center text-slate-400">
                            {searching ? (
                                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                            ) : (
                                <Search className="h-5 w-5" />
                            )}
                        </div>
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => searchQuery.length > 1 && setShowResults(true)}
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-11 py-2.5 text-sm font-semibold text-slate-900 shadow-sm focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                            placeholder="Search blogs, presenters, programs..."
                        />

                        {/* Search Results Dropdown */}
                        <Transition
                            show={showResults}
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="transform opacity-0 scale-95 translate-y-2"
                            enterTo="transform opacity-100 scale-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="transform opacity-100 scale-100 translate-y-0"
                            leaveTo="transform opacity-0 scale-95 translate-y-2"
                        >
                            <div className="absolute left-0 right-0 mt-3 max-h-[400px] overflow-y-auto rounded-3xl bg-white p-2 shadow-2xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                                {results.length > 0 ? (
                                    <div className="space-y-1">
                                        {results.map((res, idx) => {
                                            const ResultIcon = ICON_MAP[res.icon] || Search;
                                            return (
                                                <Link
                                                    key={idx}
                                                    href={res.url}
                                                    onClick={() => setShowResults(false)}
                                                    className="flex items-center gap-3 rounded-2xl p-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
                                                >
                                                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                                                        <ResultIcon size={20} />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{res.title}</p>
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{res.type}</p>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="p-10 text-center">
                                        <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-slate-50 text-slate-300 dark:bg-slate-800 dark:text-slate-600">
                                            <Search size={24} />
                                        </div>
                                        <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                                            {searching ? 'Searching...' : 'No results found'}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </Transition>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden text-right lg:block">
                        <div className="text-sm font-black text-slate-900 dark:text-white">{user?.name}</div>
                        <div className="text-[11px] font-bold text-slate-400">{user?.email}</div>
                    </div>

                    <Menu as="div" className="relative flex-shrink-0">
                        <Menu.Button className="group relative flex items-center gap-2 rounded-2xl p-1 transition-all hover:bg-slate-100 dark:hover:bg-slate-800">
                            <div className="h-10 w-10 overflow-hidden rounded-xl bg-primary text-white shadow-lg shadow-primary-500/20 ring-2 ring-white transition-transform group-hover:scale-95 dark:ring-slate-900">
                                <img 
                                    src={user?.avatar_url || `https://ui-avatars.com/api/?name=${user?.name}&background=ef4444&color=fff&bold=true&size=80`} 
                                    alt={user?.name} 
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="hidden lg:block">
                                <ChevronDown size={18} className="text-slate-400 transition-transform group-aria-expanded:rotate-180 group-hover:text-primary" />
                            </div>
                        </Menu.Button>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="transform opacity-0 scale-95 translate-y-2"
                            enterTo="transform opacity-100 scale-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="transform opacity-100 scale-100 translate-y-0"
                            leaveTo="transform opacity-0 scale-95 translate-y-2"
                        >
                            <Menu.Items className="absolute right-0 mt-3 w-64 origin-top-right divide-y divide-slate-100 overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200 focus:outline-none dark:divide-slate-800 dark:bg-slate-900 dark:ring-slate-800">
                                <div className="p-4">
                                    <div className="mb-3 px-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Quick Access</div>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link
                                                href={route('profile.edit')}
                                                className={cn(
                                                    'flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-bold transition-all',
                                                    active ? 'bg-primary text-white shadow-lg shadow-primary-500/20' : 'text-slate-700 dark:text-slate-300'
                                                )}
                                            >
                                                <User size={18} className={active ? 'text-white' : 'text-slate-400'} />
                                                My Profile
                                            </Link>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link
                                                href={route('admin.highlights')}
                                                className={cn(
                                                    'flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-bold transition-all',
                                                    active ? 'bg-primary text-white shadow-lg shadow-primary-500/20' : 'text-slate-700 dark:text-slate-300'
                                                )}
                                            >
                                                <Star size={18} className={active ? 'text-white' : 'text-slate-400'} />
                                                Hero Highlights
                                            </Link>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link
                                                href={route('admin.settings.edit')}
                                                className={cn(
                                                    'flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-bold transition-all',
                                                    active ? 'bg-primary text-white shadow-lg shadow-primary-500/20' : 'text-slate-700 dark:text-slate-300'
                                                )}
                                            >
                                                <SettingsIcon size={18} className={active ? 'text-white' : 'text-slate-400'} />
                                                Site Settings
                                            </Link>
                                        )}
                                    </Menu.Item>
                                </div>
                                <div className="p-2">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                                className={cn(
                                                    'flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-bold transition-all text-red-600',
                                                    active ? 'bg-red-50 dark:bg-red-900/10' : ''
                                                )}
                                            >
                                                <LogOut size={18} className="text-red-500" />
                                                Sign Out
                                            </Link>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </header>
    );
}
