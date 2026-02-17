import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useRef, useState } from 'react';

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

export default function About({ page }) {
    const { auth } = usePage().props;
    const paragraphs = useMemo(() => splitParagraphs(page?.body), [page?.body]);
    const hero = page?.hero_image_url || '/bredrum.jpg';

    const sectionRef = useRef(null);
    const inView = useInView(sectionRef, { threshold: 0.12 });

    return (
        <>
            <Head title={page?.title ?? 'About'} />

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
                                <span className="text-white">About</span>
                            </nav>

                            <div className="mt-6 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                                <div className="h-14 w-14 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-white/30">
                                    <img
                                        src="/logo1.jpeg"
                                        alt="Sheddy's Radio logo"
                                        className="h-full w-full object-cover"
                                        loading="eager"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                                        {page?.title ?? 'About Us'}
                                    </h1>
                                    <p className="mt-2 max-w-2xl text-sm text-white/85 sm:text-base">
                                        {page?.excerpt ?? "Jifunze zaidi kuhusu Sheddy's Radio — redio ya burudani, habari na vipindi vya jamii."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                <main ref={sectionRef} className="mx-auto w-full max-w-7xl px-6 py-10">
                    <div
                        className={
                            'grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start transition-all duration-700 ' +
                            (inView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0')
                        }
                    >
                        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                            {paragraphs.length ? (
                                <div className="prose prose-slate max-w-none prose-p:leading-relaxed dark:prose-invert">
                                    {paragraphs.map((p, idx) => (
                                        <p key={idx}>{p}</p>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-sm text-slate-600 dark:text-slate-300">
                                    Sheddy's Radio ni kituo cha redio kinachokuletea burudani, habari, na vipindi vya jamii kwa lugha ya Kiswahili.
                                </div>
                            )}

                            <div className="mt-8 grid gap-4 sm:grid-cols-3">
                                <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-800">
                                    <div className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400">
                                        MISSION
                                    </div>
                                    <div className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
                                        Kuunganisha jamii kwa burudani na habari sahihi.
                                    </div>
                                </div>
                                <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-800">
                                    <div className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400">
                                        VISION
                                    </div>
                                    <div className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
                                        Kuwa redio inayoaminika zaidi kwa Waswahili duniani.
                                    </div>
                                </div>
                                <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-800">
                                    <div className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400">
                                        VALUES
                                    </div>
                                    <div className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
                                        Uaminifu, ubunifu, na huduma kwa wasikilizaji.
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                >
                                    Wasiliana Nasi
                                </Link>
                                <Link
                                    href="/blogs"
                                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900"
                                >
                                    Soma Blogs
                                </Link>
                            </div>
                        </div>

                        <aside className="space-y-4">
                            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                                <div className="flex items-center gap-3">
                                    <div className="h-11 w-11 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-800">
                                        <img src="/logo1.jpeg" alt="Sheddy's Radio logo" className="h-full w-full object-cover" loading="lazy" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                                            Sheddy's Radio
                                        </div>
                                        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                            Live • Local • Loud
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5 grid gap-3 text-sm text-slate-600 dark:text-slate-300">
                                    <div>
                                        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Simu</div>
                                        <div className="font-semibold">+255 718 573 384</div>
                                    </div>
                                    <div>
                                        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Email</div>
                                        <div className="grid gap-1">
                                            <a className="font-semibold text-primary hover:underline" href="mailto:info@sheddysnewlook.org">
                                                info@sheddysnewlook.org
                                            </a>
                                            <a className="font-semibold text-primary hover:underline" href="mailto:contact@sheddysnewlook.org">
                                                contact@sheddysnewlook.org
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                                <div className="text-sm font-extrabold text-slate-900 dark:text-white">Tunachofanya</div>
                                <div className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-300">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                                        <div>
                                            <div className="font-semibold text-slate-900 dark:text-white">Vipindi Mubashara</div>
                                            <div className="mt-0.5 text-sm">Habari, burudani, na mijadala ya jamii kila siku.</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                                        <div>
                                            <div className="font-semibold text-slate-900 dark:text-white">Muziki Bora</div>
                                            <div className="mt-0.5 text-sm">Kitanzania na kimataifa — kwa ladha tofauti tofauti.</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                                        <div>
                                            <div className="font-semibold text-slate-900 dark:text-white">Habari & Matukio</div>
                                            <div className="mt-0.5 text-sm">Updates za ndani na nje, plus matukio maalum.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
