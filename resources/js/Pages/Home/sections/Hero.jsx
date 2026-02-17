import { useEffect, useMemo, useState } from 'react';

import TrueFocus from '../../../Components/TrueFocus';
import { getRadioPlayer } from '@/utils/radioPlayer';

export default function Hero({ streamUrl }) {
    const player = useMemo(() => getRadioPlayer(), []);
    const [state, setState] = useState(() => player.getState());

    useEffect(() => player.subscribe(setState), [player]);

    const togglePlay = async () => {
        await player.toggle(streamUrl, { title: "Sheddy's New Look Radio", subtitle: 'Live Stream' });
    };

    return (
        <section
            className="relative overflow-hidden"
            style={{
                backgroundImage:
                    "url('/passionate-black-male-singer-performing-against-red-background-singing-into-microphone-wearing-party.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'right center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <style>{`
                @keyframes srFadeUp {
                    0% { opacity: 0; transform: translateY(14px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                @keyframes srGlowSweep {
                    0% { transform: translateX(-30%) rotate(10deg); opacity: 0; }
                    30% { opacity: 1; }
                    100% { transform: translateX(130%) rotate(10deg); opacity: 0; }
                }
                @keyframes srFloat {
                    0% { transform: translate3d(0, 0, 0) scale(1); }
                    50% { transform: translate3d(18px, -14px, 0) scale(1.05); }
                    100% { transform: translate3d(0, 0, 0) scale(1); }
                }
                @keyframes srHue {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(20deg); }
                }
            `}</style>

            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-black/30" />
            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_140px_rgba(0,0,0,0.75)]" />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10" />

            <div
                className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-primary/25 blur-3xl"
                style={{ animation: 'srFloat 10s ease-in-out infinite, srHue 14s linear infinite' }}
            />
            <div
                className="pointer-events-none absolute -bottom-40 right-[-120px] h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl"
                style={{ animation: 'srFloat 12s ease-in-out infinite' }}
            />
            <div
                className="pointer-events-none absolute inset-y-0 left-[-30%] w-[70%] bg-gradient-to-r from-white/0 via-white/10 to-white/0"
                style={{ animation: 'srGlowSweep 7.5s ease-in-out infinite' }}
            />

            <div className="relative w-full px-6 py-12 lg:px-14 lg:py-20">
                <div className="max-w-3xl">
                    <div
                        className="inline-flex items-center gap-2 rounded-full bg-primary-50/95 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-primary-100 backdrop-blur"
                        style={{ animation: 'srFadeUp 0.55s ease-out both' }}
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                        Live • 24/7
                    </div>

                    <h1
                        className="max-w-2xl mb-4 mt-5 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl xl:text-6xl"
                        style={{ animation: 'srFadeUp 0.65s ease-out both', animationDelay: '120ms' }}
                    >
                        <span className="text-primary">Sheddy's New Look</span> <span className="text-white">FM Radio</span>
                        <span className="text-white">.</span>
                        <span className="block text-white/95">
                            <TrueFocus
                                sentence="Burudani • Habari • Uhalisia"
                                manualMode={false}
                                blurAmount={3}
                                borderColor="#ef4444"
                                animationDuration={0.45}
                                pauseBetweenAnimations={0.8}
                            />
                        </span>
                    </h1>
                    <p
                        className="max-w-2xl mb-6 font-light text-white/85 md:text-lg lg:mb-8 lg:text-xl"
                        style={{ animation: 'srFadeUp 0.65s ease-out both', animationDelay: '220ms' }}
                    >
                        Ungana nasi mubashara na ufurahie{' '}
                        <span className="font-semibold text-white">muziki</span>,{' '}
                        <span className="font-semibold text-primary">update za habari</span>, na{' '}
                        <span className="font-semibold text-white">vipindi vya nguvu</span>.
                        Bonyeza Play uanze kusikiliza sasa.
                    </p>

                    <div
                        className="flex flex-wrap items-center gap-3"
                        style={{ animation: 'srFadeUp 0.65s ease-out both', animationDelay: '320ms' }}
                    >
                        <button
                            type="button"
                            onClick={togglePlay}
                            disabled={!streamUrl}
                            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-primary hover:bg-primary-700 focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {state.isPlaying ? 'Pause' : 'Play Live'}
                            {state.isPlaying ? (
                                <svg
                                    className="w-5 h-5 ml-2 -mr-1"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M6 6h8v8H6V6Z" />
                                </svg>
                            ) : (
                                <svg
                                    className="w-5 h-5 ml-2 -mr-1"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M7 5.5v9l8-4.5-8-4.5Z" />
                                </svg>
                            )}
                        </button>
                        <a
                            href="#schedule"
                            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white border border-white/30 rounded-lg hover:bg-white/10 focus:ring-4 focus:ring-white/20"
                        >
                            Ratiba ya Leo
                        </a>
                    </div>

                    {state.error && (
                        <div className="mt-3 max-w-2xl text-sm text-white/90">
                            {state.error}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
