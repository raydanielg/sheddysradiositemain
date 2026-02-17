import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { 
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { 
    Users, 
    BookOpen, 
    Mic, 
    Mail, 
    MessageSquare, 
    Zap, 
    Calendar, 
    Clock, 
    ShieldCheck, 
    TrendingUp
} from 'lucide-react';

function StatCard({ title, value, icon: Icon, color, description }) {
    return (
        <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-md dark:bg-slate-900 dark:ring-slate-800">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{title}</p>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white">{value}</h3>
                    {description && (
                        <p className="flex items-center gap-1 text-[10px] font-medium text-slate-400">
                            {description}
                        </p>
                    )}
                </div>
                <div className={`grid h-12 w-12 place-items-center rounded-xl shadow-sm ring-1 ring-white/10 ${color}`}>
                    <Icon size={24} className="text-white" />
                </div>
            </div>
        </div>
    );
}

const DAY_NAMES = {
    1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat', 7: 'Sun'
};

export default function Dashboard({ stats, chartData, logins, programs }) {
    return (
        <AuthenticatedLayout header="Dashboard Overview">
            <Head title="Dashboard" />

            <div className="mx-auto max-w-[1600px] space-y-6 pb-10">
                {/* Stat Grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                    <StatCard 
                        title="Visitors" 
                        value={stats.visitors} 
                        icon={Users} 
                        color="bg-blue-600" 
                        description="Total unique hits"
                    />
                    <StatCard 
                        title="Blogs" 
                        value={stats.blogs} 
                        icon={BookOpen} 
                        color="bg-green-600" 
                        description="Active posts"
                    />
                    <StatCard 
                        title="Presenters" 
                        value={stats.presenters} 
                        icon={Mic} 
                        color="bg-orange-600" 
                        description="Team members"
                    />
                    <StatCard 
                        title="Subscribers" 
                        value={stats.subscribers} 
                        icon={Mail} 
                        color="bg-pink-600" 
                        description="Email list"
                    />
                    <StatCard 
                        title="Messages" 
                        value={stats.messages} 
                        icon={MessageSquare} 
                        color="bg-indigo-600" 
                        description="Contact requests"
                    />
                    <StatCard 
                        title="Highlights" 
                        value={stats.highlights} 
                        icon={Zap} 
                        color="bg-purple-600" 
                        description="Hero slides"
                    />
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Visitor Chart */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                            <div className="flex items-center justify-between border-b border-slate-50 pb-4 dark:border-slate-800">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Visitor Activity</h3>
                                    <p className="text-xs text-slate-500">Weekly traffic trend</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-primary" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Unique Visits</span>
                                </div>
                            </div>
                            <div className="mt-6 h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData}>
                                        <defs>
                                            <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis 
                                            dataKey="name" 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fontSize: 11, fontWeight: 600, fill: '#94a3b8' }} 
                                            dy={10}
                                        />
                                        <YAxis 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fontSize: 11, fontWeight: 600, fill: '#94a3b8' }} 
                                        />
                                        <Tooltip 
                                            contentStyle={{ 
                                                borderRadius: '12px', 
                                                border: 'none', 
                                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                                padding: '10px'
                                            }} 
                                        />
                                        <Area 
                                            type="monotone" 
                                            dataKey="visitors" 
                                            stroke="#ef4444" 
                                            strokeWidth={3} 
                                            fillOpacity={1} 
                                            fill="url(#colorVis)" 
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Recent Logins */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                            <div className="flex items-center gap-3 border-b border-slate-50 pb-4 dark:border-slate-800">
                                <ShieldCheck size={18} className="text-slate-400" />
                                <div>
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Security Log</h3>
                                    <p className="text-xs text-slate-500">Recent admin activities</p>
                                </div>
                            </div>
                            <div className="mt-2 divide-y divide-slate-50 dark:divide-slate-800">
                                {logins.map((login) => (
                                    <div key={login.id} className="flex items-center justify-between py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 overflow-hidden rounded-full ring-1 ring-slate-200">
                                                <img src={`https://ui-avatars.com/api/?name=${login.user.name}&background=random&size=32`} alt="" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 dark:text-white">{login.user.name}</p>
                                                <p className="text-[10px] text-slate-400">{login.ip_address}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                                                {new Date(login.login_at).toLocaleDateString()}
                                            </p>
                                            <p className="text-[10px] text-slate-400">
                                                {new Date(login.login_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Program Calendar Side */}
                    <div className="space-y-6">
                        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                            <div className="flex items-center gap-3 border-b border-slate-50 pb-4 dark:border-slate-800">
                                <Calendar size={18} className="text-primary" />
                                <div>
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Program Rotation</h3>
                                    <p className="text-xs text-slate-500">Weekly broadcast schedule</p>
                                </div>
                            </div>
                            
                            <div className="mt-6 space-y-6">
                                {[1, 2, 3, 4, 5, 6, 7].map((day) => {
                                    const dayPrograms = programs[day] || [];
                                    if (dayPrograms.length === 0) return null;

                                    return (
                                        <div key={day} className="relative">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-black uppercase text-slate-400">{DAY_NAMES[day]}</span>
                                                <div className="h-px flex-1 bg-slate-50 dark:bg-slate-800" />
                                            </div>
                                            <div className="mt-3 space-y-3">
                                                {dayPrograms.map((prog) => (
                                                    <div key={prog.id} className="flex gap-3 items-center">
                                                        <div className="h-8 w-8 overflow-hidden rounded-lg bg-slate-100 ring-1 ring-slate-200">
                                                            {prog.image_url ? (
                                                                <img src={prog.image_url} alt="" className="h-full w-full object-cover" />
                                                            ) : (
                                                                <div className="grid h-full w-full place-items-center text-slate-300">
                                                                    <Mic size={14} />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{prog.title}</p>
                                                            <p className="text-[10px] text-slate-400">
                                                                {prog.start_time} - {prog.end_time}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
