import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);
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
            <Head title="Admin Login" />
            <div className="min-h-screen flex">
                {/* Left Side - Branding Panel */}
                <div className="hidden lg:flex lg:w-1/2 xl:w-5/12 flex-col justify-center px-12 xl:px-16" 
                     style={{ backgroundColor: '#0c2340' }}>
                    <div className="max-w-sm">
                        {/* Logo */}
                        <div className="flex items-center justify-center mb-6">
                            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/20">
                                <img
                                    src="/logo1.jpeg"
                                    alt="Sheddy's Radio"
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                            </div>
                        </div>
                        
                        {/* Brand Name */}
                        <h1 className="text-white text-2xl font-bold text-center mb-2">
                            Sheddy's Radio
                        </h1>
                        <p className="text-white/60 text-sm text-center mb-8 uppercase tracking-wider">
                            Admin Portal
                        </p>
                        
                        {/* Divider */}
                        <div className="w-12 h-0.5 bg-white/30 mx-auto mb-8"></div>
                        
                        {/* Description */}
                        <p className="text-white/70 text-sm text-center leading-relaxed">
                            Sign in to continue managing your radio station content, schedules, and settings.
                        </p>
                        
                        {/* Copyright */}
                        <div className="mt-auto pt-16">
                            <p className="text-white/40 text-xs text-center">
                                © {new Date().getFullYear()} Sheddy's Radio
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-24 bg-gray-100">
                    <div className="w-full max-w-md mx-auto">
                        {/* Mobile Logo */}
                        <div className="lg:hidden flex flex-col items-center mb-8">
                            <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center mb-4">
                                <img
                                    src="/logo1.jpeg"
                                    alt="Sheddy's Radio"
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                            </div>
                            <h1 className="text-xl font-bold text-gray-800">Sheddy's Radio</h1>
                        </div>

                        {/* Form Card */}
                        <div className="bg-white rounded-lg shadow-md p-8">
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-gray-800">Welcome back</h2>
                                <p className="text-gray-500 text-sm mt-1">Sign in to your account</p>
                            </div>

                            {status && (
                                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md text-sm text-green-700">
                                    {status}
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-5">
                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                            placeholder="Enter your email"
                                            autoComplete="username"
                                            autoFocus
                                            onChange={(e) => setData('email', e.target.value)}
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                                    )}
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                        Password <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={data.password}
                                            className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                            placeholder="Enter your password"
                                            autoComplete="current-password"
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                                    )}
                                </div>

                                {/* Remember & Forgot */}
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                                    </label>
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            Forgot password?
                                        </Link>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {processing ? 'Signing in...' : 'Sign in'}
                                </button>
                            </form>

                            {/* Help Link */}
                            <div className="mt-6 text-center">
                                <p className="text-xs text-gray-500">
                                    Need help? Contact us at{' '}
                                    <a href="mailto:info@sheddysradio.com" className="text-blue-600 hover:text-blue-800">
                                        info@sheddysradio.com
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Poppins Font Styles */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

                * {
                    font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
                }
                h1, h2, h3, h4, h5, h6 {
                    font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
                    font-weight: 700 !important;
                    letter-spacing: -0.02em !important;
                }
                input, button, label, p, span, div, a {
                    font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
                }
                button {
                    font-weight: 600 !important;
                    letter-spacing: 0.5px !important;
                }
            `}</style>
        </>
    );
}
