export default function InfoGrid() {
    return (
        <section className="mt-12 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-sm font-semibold text-slate-900">Latest Shows</div>
                <p className="mt-2 text-sm text-slate-600">Orodha ya vipindi vipya itaonekana hapa.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-sm font-semibold text-slate-900">Top Requests</div>
                <p className="mt-2 text-sm text-slate-600">Nyimbo zinazopendwa zaidi kwa sasa.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-sm font-semibold text-slate-900">Download App</div>
                <p className="mt-2 text-sm text-slate-600">Link za Android/iOS zitawekwa hapa.</p>
            </div>
        </section>
    );
}
