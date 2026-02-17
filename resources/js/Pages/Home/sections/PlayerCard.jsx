export default function PlayerCard() {
    return (
        <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary-50 via-white to-white"></div>
            <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-slate-900">Live Player</div>
                    <div className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary">On Air</div>
                </div>

                <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="text-xs font-semibold text-slate-500">NOW PLAYING</div>
                    <div className="mt-2 text-lg font-semibold text-slate-900">Artist Name - Track Title</div>
                    <div className="mt-1 text-sm text-slate-600">Show Name • DJ Name</div>

                    <div className="mt-5 flex items-center gap-3">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        >
                            Play
                        </button>
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        >
                            Pause
                        </button>
                        <div className="ml-auto text-xs text-slate-500">00:00</div>
                    </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                        <div className="text-xs font-semibold text-slate-500">NEXT</div>
                        <div className="mt-2 text-sm font-semibold text-slate-900">Upcoming Show</div>
                        <div className="mt-1 text-xs text-slate-500">Time • Host</div>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                        <div className="text-xs font-semibold text-slate-500">CONTACT</div>
                        <div className="mt-2 text-sm font-semibold text-slate-900">Request Line</div>
                        <div className="mt-1 text-xs text-slate-500">+255 XXX XXX XXX</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
