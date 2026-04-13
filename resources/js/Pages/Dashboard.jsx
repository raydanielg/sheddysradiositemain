import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { 
    Users, BookOpen, Mic, Mail, MessageSquare, Zap,
    TrendingUp, Radio, Clock, Calendar, ArrowUpRight,
    Activity, Eye, Headphones, Bell
} from 'lucide-react';

// Simple KPI Card Component
function KPICard({ title, value, icon: Icon, trend, color }) {
    const [animatedValue, setAnimatedValue] = useState(0);
    
    useEffect(() => {
        const duration = 1000;
        const steps = 30;
        const increment = value / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setAnimatedValue(value);
                clearInterval(timer);
            } else {
                setAnimatedValue(Math.floor(current));
            }
        }, duration / steps);
        
        return () => clearInterval(timer);
    }, [value]);

    const colors = {
        blue: 'from-blue-500 to-blue-600',
        green: 'from-emerald-500 to-emerald-600',
        orange: 'from-orange-500 to-orange-600',
        pink: 'from-pink-500 to-pink-600',
        purple: 'from-purple-500 to-purple-600',
        red: 'from-red-500 to-red-600'
    };

    return (
        <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] dark:bg-slate-900 dark:ring-slate-800">
            {/* Gradient background on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${colors[color]} opacity-0 transition-opacity duration-300 group-hover:opacity-5`} />
            
            <div className="relative">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            {title}
                        </p>
                        <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                            {animatedValue.toLocaleString()}
                        </h3>
                        {trend && (
                            <div className="mt-2 flex items-center gap-1 text-xs">
                                <ArrowUpRight size={14} className="text-emerald-500" />
                                <span className="font-medium text-emerald-500">{trend}</span>
                                <span className="text-slate-400">vs last week</span>
                            </div>
                        )}
                    </div>
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${colors[color]} shadow-lg`}>
                        <Icon size={24} className="text-white" />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Live Indicator Component
function LiveIndicator() {
    return (
        <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-red-500">Live</span>
        </div>
    );
}

// Quick Action Card
function QuickAction({ title, description, icon: Icon, href, color }) {
    return (
        <a 
            href={href}
            className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
        >
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
                <Icon size={22} className="text-white" />
            </div>
            <div className="flex-1">
                <h4 className="font-semibold text-slate-900 dark:text-white">{title}</h4>
                <p className="text-xs text-slate-500">{description}</p>
            </div>
            <ArrowUpRight size={18} className="text-slate-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
    );
}

export default function Dashboard({ stats, chartData, logins, programs }) {
    const [currentTime, setCurrentTime] = useState(new Date());

    // Update time every minute
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    // Get current program
    const getCurrentProgram = () => {
        const now = currentTime;
        const currentDay = now.getDay() || 7;
        const currentTimeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        
        const todayPrograms = programs?.[currentDay] || [];
        return todayPrograms.find(prog => {
            return currentTimeStr >= prog.start_time && currentTimeStr <= prog.end_time;
        });
    };

    const currentProgram = getCurrentProgram();

    return (
        <AuthenticatedLayout header="Dashboard">
            <Head title="Dashboard" />

            <div className="mx-auto max-w-[1600px] space-y-6 pb-10">
                {/* Header with Live Status */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Overview
                        </h1>
                        <p className="text-sm text-slate-500">
                            {currentTime.toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        {currentProgram && (
                            <div className="flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-2 text-white dark:bg-slate-800">
                                <Radio size={18} className="text-red-500" />
                                <div>
                                    <p className="text-[10px] uppercase tracking-wider text-slate-400">Now Playing</p>
                                    <p className="text-sm font-semibold">{currentProgram.title}</p>
                                </div>
                            </div>
                        )}
                        <LiveIndicator />
                    </div>
                </div>

                {/* KPI Grid - Simple & Clean */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                    <KPICard 
                        title="Total Visitors" 
                        value={stats.visitors || 0} 
                        icon={Users} 
                        trend="+12%"
                        color="blue"
                    />
                    <KPICard 
                        title="Blog Posts" 
                        value={stats.blogs || 0} 
                        icon={BookOpen} 
                        trend="+5%"
                        color="green"
                    />
                    <KPICard 
                        title="Presenters" 
                        value={stats.presenters || 0} 
                        icon={Mic} 
                        color="orange"
                    />
                    <KPICard 
                        title="Subscribers" 
                        value={stats.subscribers || 0} 
                        icon={Mail} 
                        trend="+8%"
                        color="pink"
                    />
                    <KPICard 
                        title="Messages" 
                        value={stats.messages || 0} 
                        icon={MessageSquare} 
                        color="purple"
                    />
                    <KPICard 
                        title="Highlights" 
                        value={stats.highlights || 0} 
                        icon={Zap} 
                        color="red"
                    />
                </div>

                {/* Main Content Grid */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Left Column - Quick Actions & Activity */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Quick Actions */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Quick Actions</h3>
                            <p className="text-xs text-slate-500">Frequently used tasks</p>
                            
                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                <QuickAction 
                                    title="Add Blog Post"
                                    description="Create new article"
                                    icon={BookOpen}
                                    href="/admin/blogs"
                                    color="bg-blue-500"
                                />
                                <QuickAction 
                                    title="Manage Programs"
                                    description="Edit schedule"
                                    icon={Calendar}
                                    href="/admin/programs"
                                    color="bg-orange-500"
                                />
                                <QuickAction 
                                    title="View Messages"
                                    description={`${stats.messages || 0} unread`}
                                    icon={MessageSquare}
                                    href="/admin/contact-messages"
                                    color="bg-purple-500"
                                />
                                <QuickAction 
                                    title="Site Settings"
                                    description="Configure radio"
                                    icon={Activity}
                                    href="/admin/settings"
                                    color="bg-emerald-500"
                                />
                            </div>
                        </div>

                        {/* Live Activity Chart */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Live Activity</h3>
                                    <p className="text-xs text-slate-500">Real-time visitor tracking</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-xs text-slate-400">Active now</span>
                                </div>
                            </div>
                            
                            {/* Simple Bar Chart */}
                            <div className="mt-6">
                                <div className="flex h-32 items-end gap-2">
                                    {(chartData || []).map((item, index) => (
                                        <div key={index} className="flex-1 group relative">
                                            <div 
                                                className="rounded-t-lg bg-gradient-to-t from-red-500 to-red-400 transition-all duration-300 hover:from-red-600 hover:to-red-500"
                                                style={{ height: `${(item.visitors / Math.max(...(chartData || []).map(d => d.visitors))) * 100}%` }}
                                            />
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-slate-900 px-2 py-1 text-[10px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                                                {item.visitors}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-2 flex justify-between text-[10px] text-slate-400">
                                    {(chartData || []).map((item, index) => (
                                        <span key={index}>{item.name}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Schedule & Status */}
                    <div className="space-y-6">
                        {/* Radio Status Card */}
                        <div className="rounded-2xl bg-gradient-to-br from-red-500 to-red-600 p-6 text-white shadow-lg shadow-red-500/30">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                                    <Headphones size={24} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wider text-white/80">Radio Status</p>
                                    <p className="text-lg font-bold">On Air</p>
                                </div>
                            </div>
                            <div className="mt-4 rounded-xl bg-white/10 p-3">
                                <div className="flex items-center gap-2">
                                    <Radio size={16} className="text-white" />
                                    <span className="text-sm font-medium">
                                        {currentProgram ? currentProgram.title : 'Auto DJ Playing'}
                                    </span>
                                </div>
                                {currentProgram && (
                                    <p className="mt-1 text-xs text-white/70">
                                        {currentProgram.start_time} - {currentProgram.end_time}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Today's Schedule */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                            <div className="flex items-center gap-2">
                                <Clock size={18} className="text-slate-400" />
                                <h3 className="font-bold text-slate-900 dark:text-white">Today's Schedule</h3>
                            </div>
                            
                            <div className="mt-4 space-y-3">
                                {(programs?.[currentTime.getDay() || 7] || []).slice(0, 4).map((prog) => (
                                    <div 
                                        key={prog.id} 
                                        className={`flex items-center gap-3 rounded-xl p-3 transition ${
                                            currentProgram?.id === prog.id 
                                                ? 'bg-red-50 ring-1 ring-red-200 dark:bg-red-900/20 dark:ring-red-800' 
                                                : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                                        }`}
                                    >
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                                            {prog.start_time?.slice(0, 5)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`truncate text-sm font-medium ${
                                                currentProgram?.id === prog.id ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-white'
                                            }`}>
                                                {prog.title}
                                            </p>
                                            <p className="text-[10px] text-slate-500">
                                                {prog.start_time?.slice(0, 5)} - {prog.end_time?.slice(0, 5)}
                                            </p>
                                        </div>
                                        {currentProgram?.id === prog.id && (
                                            <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                                                LIVE
                                            </span>
                                        )}
                                    </div>
                                ))}
                                
                                {(programs?.[currentTime.getDay() || 7] || []).length === 0 && (
                                    <p className="text-center text-sm text-slate-500 py-4">
                                        No programs scheduled for today
                                    </p>
                                )}
                            </div>
                            
                            <a 
                                href="/admin/programs" 
                                className="mt-4 block text-center text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400"
                            >
                                View Full Schedule →
                            </a>
                        </div>

                        {/* Recent Activity */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                            <h3 className="font-bold text-slate-900 dark:text-white">Recent Logins</h3>
                            <div className="mt-4 space-y-3">
                                {(logins || []).slice(0, 4).map((login) => (
                                    <div key={login.id} className="flex items-center gap-3">
                                        <img 
                                            src={`https://ui-avatars.com/api/?name=${login.user?.name}&background=random&size=32`}
                                            alt=""
                                            className="h-8 w-8 rounded-full ring-1 ring-slate-200"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                                                {login.user?.name}
                                            </p>
                                            <p className="text-[10px] text-slate-500">
                                                {new Date(login.login_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                
                                {(logins || []).length === 0 && (
                                    <p className="text-center text-sm text-slate-500 py-4">No recent activity</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Poppins Font for Dashboard */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
                
                * {
                    font-family: "Poppins", -apple-system, BlinkMacSystemFont, sans-serif !important;
                }
            `}</style>
        </AuthenticatedLayout>
    );
}
