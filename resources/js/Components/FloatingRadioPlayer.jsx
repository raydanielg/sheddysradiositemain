import { useEffect, useMemo, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { getRadioPlayer } from '@/utils/radioPlayer';

function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function FloatingRadioPlayer({ streamUrl: streamUrlProp }) {
    const siteStreamUrl = usePage().props.site_settings?.stream_url;
    const streamUrl = streamUrlProp || siteStreamUrl || null;

    const player = useMemo(() => getRadioPlayer(), []);
    const [state, setState] = useState(() => player.getState());

    useEffect(() => player.subscribe(setState), [player]);

    return (
        <>
            <style>{`
                @keyframes srBlink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.25; }
                }

                @keyframes srCardGlow {
                    0% { background-position: 0% 50%; filter: hue-rotate(0deg); }
                    50% { background-position: 100% 50%; filter: hue-rotate(15deg); }
                    100% { background-position: 0% 50%; filter: hue-rotate(0deg); }
                }

                @keyframes srFloating {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-4px); }
                }
            `}</style>

            <div 
                className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4"
                style={state.isPlaying ? { animation: 'srFloating 3s ease-in-out infinite' } : undefined}
            >
                <div className="mx-auto w-full max-w-3xl">
                    <div
                        className={cn(
                            'relative overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-2xl shadow-black/10 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80',
                            state.isPlaying ? 'shadow-primary/20 ring-1 ring-primary/20' : null
                        )}
                    >
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700"
                            style={
                                state.isPlaying
                                    ? {
                                          opacity: 0.4,
                                          background:
                                              'radial-gradient(800px circle at 20% 30%, rgba(99, 102, 241, 0.35), transparent 55%), radial-gradient(700px circle at 80% 70%, rgba(236, 72, 153, 0.22), transparent 55%), linear-gradient(120deg, rgba(59, 130, 246, 0.18), rgba(16, 185, 129, 0.12), rgba(168, 85, 247, 0.16))',
                                          backgroundSize: '200% 200%',
                                          animation: 'srCardGlow 8s ease-in-out infinite',
                                      }
                                    : undefined
                            }
                        />

                        <div className="flex items-center gap-3 px-4 py-3 sm:px-5">
                            <button
                                type="button"
                                onClick={() => player.toggle(streamUrl, { title: "Sheddy's New Look Radio", subtitle: 'Live Stream' })}
                                className={cn(
                                    'grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl text-white shadow-lg transition active:scale-95',
                                    state.isPlaying ? 'bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200' : 'bg-primary hover:bg-primary-700'
                                )}
                                aria-label={state.isPlaying ? 'Pause' : 'Play'}
                            >
                                {state.isPlaying ? (
                                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                                        <path d="M6 5h3v10H6V5Zm5 0h3v10h-3V5Z" />
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                                        <path d="M7 5.5v9l8-4.5-8-4.5Z" />
                                    </svg>
                                )}
                            </button>

                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                    <div
                                        className={cn(
                                            'h-2.5 w-2.5 rounded-full',
                                            state.isPlaying ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'
                                        )}
                                        style={state.isPlaying ? { animation: 'srBlink 1.1s ease-in-out infinite' } : undefined}
                                    />
                                    <div className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                                        Live Stream{state.isBuffering ? ' • Loading' : ''}
                                    </div>
                                </div>

                                {state.error ? (
                                    <div className="mt-1 text-xs font-semibold text-red-600">
                                        {state.error}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    <div className="h-[env(safe-area-inset-bottom)]" />
                </div>
            </div>
        </>
    );
}
