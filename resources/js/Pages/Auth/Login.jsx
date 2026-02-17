import Checkbox from '@/Components/Checkbox';
import ApplicationLogo from '@/Components/ApplicationLogo';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const t = window.setTimeout(() => setMounted(true), 40);
        return () => window.clearTimeout(t);
    }, []);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in" />

            <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
                <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
                    <div className="flex items-center justify-center bg-slate-200/60 px-6 py-10 dark:bg-slate-950 sm:py-12">
                        <div className="w-full max-w-md">
                            <Link href="/" className="inline-flex items-center gap-3">
                                <div className="h-12 w-12 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                                    <img
                                        src="/logo1.jpeg"
                                        alt="Sheddy's Radio logo"
                                        className="h-full w-full object-cover"
                                        loading="eager"
                                    />
                                </div>
                                <div>
                                    <div className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
                                        Sheddy's Radio
                                    </div>
                                    <div className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">
                                        Admin Portal
                                    </div>
                                </div>
                            </Link>

                            <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                                <div className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                                    Welcome back
                                </div>
                                <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                                    Sign in to manage schedules, blogs, and streaming settings.
                                </div>

                                {status && (
                                    <div className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-900/40 dark:bg-green-900/20 dark:text-green-200">
                                        {status}
                                    </div>
                                )}

                                <form onSubmit={submit} className="mt-6">
                                    <div>
                                        <InputLabel htmlFor="email" value="Email" />

                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-2 block w-full"
                                            autoComplete="username"
                                            isFocused={true}
                                            onChange={(e) => setData('email', e.target.value)}
                                        />

                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="password" value="Password" />

                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-2 block w-full"
                                        autoComplete="current-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />

                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                    <label className="flex items-center">
                                        <Checkbox
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                        />
                                        <span className="ms-2 text-sm text-slate-600 dark:text-slate-300">
                                            Remember me
                                        </span>
                                    </label>

                                    {canResetPassword ? (
                                        <Link
                                            href={route('password.request')}
                                            className="text-sm font-semibold text-primary hover:text-primary-700"
                                        >
                                            Forgot password?
                                        </Link>
                                    ) : null}
                                </div>

                                <div className="mt-6">
                                    <PrimaryButton className="w-full justify-center" disabled={processing}>
                                        Log in
                                    </PrimaryButton>
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="relative order-last overflow-hidden lg:order-none lg:min-h-screen">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary to-rose-600" />
                        <div className="absolute inset-0 opacity-20 [background:radial-gradient(circle_at_top,white,transparent_55%)]" />

                        <div className="relative flex min-h-[260px] items-center px-6 py-12 lg:min-h-full lg:px-12">
                            <div className="max-w-lg text-white">
                                <div
                                    className={
                                        'text-xs font-bold tracking-widest text-white/80 transition-all duration-700 ' +
                                        (mounted ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0')
                                    }
                                >
                                    SHEDDY'S RADIO ADMIN
                                </div>
                                <div
                                    className={
                                        'mt-4 text-3xl font-extrabold leading-tight transition-all duration-700 sm:text-4xl ' +
                                        (mounted ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0')
                                    }
                                    style={{ transitionDelay: '90ms' }}
                                >
                                    Dhibiti vipindi, blogs,
                                    <br />
                                    na streaming settings.
                                </div>
                                <div
                                    className={
                                        'mt-5 text-sm leading-relaxed text-white/85 transition-all duration-700 ' +
                                        (mounted ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0')
                                    }
                                    style={{ transitionDelay: '160ms' }}
                                >
                                    Mfumo huu ni wa admin pekee. Hakikisha unatumia taarifa sahihi za kuingia.
                                </div>

                                <div
                                    className={
                                        'mt-8 grid gap-4 text-sm text-white/90 transition-all duration-700 ' +
                                        (mounted ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0')
                                    }
                                    style={{ transitionDelay: '240ms' }}
                                >
                                    <div className="rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/15 backdrop-blur">
                                        <div className="font-bold">Salama</div>
                                        <div className="mt-1 text-white/80">Access imewekewa ulinzi—admin tu.</div>
                                    </div>
                                    <div className="rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/15 backdrop-blur">
                                        <div className="font-bold">Haraka</div>
                                        <div className="mt-1 text-white/80">Sasisha content na ratiba kwa urahisi.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
