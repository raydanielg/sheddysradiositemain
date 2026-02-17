import { useMemo, useState, useEffect, useCallback } from 'react';
import { usePage } from '@inertiajs/react';
import { getRadioPlayer } from '@/utils/radioPlayer';

export default function Highlights({ highlights }) {
    const streamUrl = usePage().props.site_settings?.stream_url;
    const slides = useMemo(() => {
        const normalizeImageUrl = (url) => {
            if (!url) return '';
            if (typeof url === 'string' && url.startsWith('http')) {
                const idx = url.indexOf('/storage/');
                if (idx !== -1) return url.slice(idx);
            }
            return url;
        };

        return (highlights ?? []).map((h) => ({
            id: h.id,
            title: h.title,
            description: h.description,
            cta: h.cta_text || 'Soma Zaidi',
            href: h.cta_url || '#',
            imageUrl: normalizeImageUrl(h.image_url),
        }));
    }, [highlights]);

    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const goNext = useCallback(() => {
        if (slides.length === 0) return;
        setActiveIndex((i) => (i + 1) % slides.length);
    }, [slides.length]);

    const goPrev = useCallback(() => {
        if (slides.length === 0) return;
        setActiveIndex((i) => (i - 1 + slides.length) % slides.length);
    }, [slides.length]);

    useEffect(() => {
        if (slides.length <= 1 || isPaused) return;

        const interval = setInterval(() => {
            goNext();
        }, 5000);

        return () => clearInterval(interval);
    }, [slides.length, isPaused, goNext]);

    return (
        <section className="mt-10 overflow-hidden">
            <div className="w-full px-6">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <div className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                            Highlights
                        </div>
                        <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                            Vipande bora vya leo na matukio muhimu
                        </div>
                    </div>

                    <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary ring-1 ring-primary-100 dark:bg-primary-900/20 dark:text-primary-100 dark:ring-primary-900/30">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                        </span>
                        Trending sasa
                    </div>
                </div>

                <div 
                    className="group relative mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
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
                    <div className="relative h-[300px] w-full sm:h-[400px]">
                        {slides.length === 0 ? (
                            <div className="grid h-full place-items-center bg-slate-100 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                Hakuna highlights zilizowekwa kwa sasa.
                            </div>
                        ) : (
                            <>
                                {slides.map((slide, index) => (
                                    <div
                                        key={slide.id ?? index}
                                        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                                            index === activeIndex 
                                                ? 'scale-100 opacity-100' 
                                                : 'scale-110 opacity-0 pointer-events-none'
                                        }`}
                                    >
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-linear group-hover:scale-110"
                                            style={{ backgroundImage: `url(${slide.imageUrl})` }}
                                            aria-hidden="true"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                        
                                        <div className="absolute inset-0 flex flex-col justify-end p-6 pb-14 sm:p-10 sm:pb-16">
                                            <div className={`max-w-3xl transform transition-all duration-700 delay-300 ${
                                                index === activeIndex ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                            }`}>
                                                <h3 className="text-2xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                                                    {slide.title}
                                                </h3>
                                                <p className="mt-4 max-w-2xl text-base text-white/90 sm:text-lg">
                                                    {slide.description}
                                                </p>
                                                <div className="mt-8 flex flex-wrap gap-4">
                                                    <a
                                                        href={slide.href}
                                                        className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-primary-700 hover:shadow-primary-500/40 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black active:scale-95"
                                                    >
                                                        {slide.cta}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Controls */}
                                <button
                                    type="button"
                                    onClick={goPrev}
                                    className="absolute left-4 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/20 text-white opacity-0 shadow-lg backdrop-blur-md transition-all hover:bg-white hover:text-primary group-hover:opacity-100 focus:outline-none"
                                    aria-label="Previous"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                <button
                                    type="button"
                                    onClick={goNext}
                                    className="absolute right-4 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/20 text-white opacity-0 shadow-lg backdrop-blur-md transition-all hover:bg-white hover:text-primary group-hover:opacity-100 focus:outline-none"
                                    aria-label="Next"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>

                                {/* Indicators */}
                                <div className="absolute bottom-6 left-0 right-0 z-20 flex items-center justify-center gap-3">
                                    {slides.map((_, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => setActiveIndex(i)}
                                            className="group relative h-1 flex-1 max-w-[40px] overflow-hidden rounded-full bg-white/20"
                                            aria-label={`Go to slide ${i + 1}`}
                                        >
                                            <div 
                                                className={`absolute inset-0 bg-primary transition-all duration-500 ${
                                                    i === activeIndex ? 'w-full' : 'w-0'
                                                }`} 
                                            />
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
