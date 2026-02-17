import { Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Header({ auth }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [subscribeOpen, setSubscribeOpen] = useState(false);
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        email: '',
    });

    const openSubscribe = () => {
        setSubscribeOpen(true);
        clearErrors();
    };

    const closeSubscribe = () => {
        setSubscribeOpen(false);
        reset();
        clearErrors();
    };

    const submitSubscribe = (e) => {
        e.preventDefault();

        post(route('subscribe.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setSubscribeOpen(false);
            },
        });
    };

    return (
        <header>
            <nav className="bg-white border-b border-slate-200 px-4 lg:px-6 py-2.5 dark:bg-slate-900 dark:border-slate-800">
                <div className="flex flex-wrap justify-between items-center w-full">
                    <Link href="/" className="flex items-center">
                        <div className="mr-3 h-10 w-10 overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-slate-200">
                            <img
                                src="/logo1.jpeg"
                                alt="Sheddy's Radio logo"
                                className="h-full w-full object-cover"
                                loading="eager"
                            />
                        </div>
                        <span className="self-center text-xl font-semibold whitespace-nowrap text-slate-900 dark:text-white">
                            Sheddy's New Look Radio
                        </span>
                    </Link>

                    <div className="flex items-center lg:order-2">
                        {auth?.user ? (
                            <Link
                                href={route('dashboard')}
                                className="text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:ring-primary-100 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:focus:ring-primary-900"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <button
                                type="button"
                                onClick={openSubscribe}
                                className="text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:ring-primary-100 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:focus:ring-primary-900"
                            >
                                Subscribe
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen((v) => !v)}
                            className="inline-flex items-center p-2 ml-1 text-sm text-slate-500 rounded-lg lg:hidden hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:text-slate-400 dark:hover:bg-slate-800 dark:focus:ring-slate-700"
                            aria-controls="mobile-menu-2"
                            aria-expanded={mobileMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className={(mobileMenuOpen ? 'hidden ' : '') + 'w-6 h-6'}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <svg
                                className={(mobileMenuOpen ? '' : 'hidden ') + 'w-6 h-6'}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>

                    <div
                        className={(mobileMenuOpen ? '' : 'hidden ') + 'justify-between items-center w-full lg:flex lg:w-auto lg:order-1'}
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <Link
                                    href="/"
                                    className="block py-2 pr-4 pl-3 text-white rounded bg-primary lg:bg-transparent lg:text-primary lg:p-0 dark:text-white"
                                    aria-current="page"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="/blogs"
                                    className="block py-2 pr-4 pl-3 text-slate-700 border-b border-slate-100 hover:bg-slate-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary lg:p-0 dark:text-slate-300 lg:dark:hover:text-white dark:hover:bg-slate-800 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-slate-700"
                                >
                                    Blogs
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/about"
                                    className="block py-2 pr-4 pl-3 text-slate-700 border-b border-slate-100 hover:bg-slate-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary lg:p-0 dark:text-slate-300 lg:dark:hover:text-white dark:hover:bg-slate-800 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-slate-700"
                                >
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/contact"
                                    className="block py-2 pr-4 pl-3 text-slate-700 border-b border-slate-100 hover:bg-slate-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary lg:p-0 dark:text-slate-300 lg:dark:hover:text-white dark:hover:bg-slate-800 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-slate-700"
                                >
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {subscribeOpen ? (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center px-4"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Subscribe"
                >
                    <button
                        type="button"
                        className="absolute inset-0 bg-black/50"
                        onClick={closeSubscribe}
                        aria-label="Close"
                    />

                    <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-4 dark:border-slate-800">
                            <div>
                                <div className="text-lg font-extrabold text-slate-900 dark:text-white">
                                    Subscribe
                                </div>
                                <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                                    Weka email yako upate updates za Sheddy's Radio.
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={closeSubscribe}
                                className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
                                aria-label="Close"
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

                        <form onSubmit={submitSubscribe} className="px-6 py-5">
                            {flash?.success ? (
                                <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-900/50 dark:bg-green-900/20 dark:text-green-200">
                                    {flash.success}
                                </div>
                            ) : null}

                            <div>
                                <label className="text-sm font-semibold text-slate-900 dark:text-white">
                                    Email
                                </label>
                                <input
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    type="email"
                                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                    placeholder="mfano: jina@gmail.com"
                                    autoFocus
                                />
                                {errors.email ? (
                                    <div className="mt-1 text-xs text-red-600">{errors.email}</div>
                                ) : null}
                            </div>

                            <div className="mt-5 flex items-center justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={closeSubscribe}
                                    className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-800"
                                >
                                    Ghairi
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    Tuma
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </header>
    );
}
