import { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

export default function PWAInstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        // Check if already installed
        if (window.matchMedia('(display-mode: standalone)').matches || 
            window.navigator.standalone === true) {
            setIsInstalled(true);
            return;
        }

        // Check if user previously dismissed
        const dismissed = localStorage.getItem('pwa-prompt-dismissed');
        if (dismissed) {
            const dismissedTime = parseInt(dismissed);
            const oneWeek = 7 * 24 * 60 * 60 * 1000;
            if (Date.now() - dismissedTime < oneWeek) {
                return;
            }
        }

        // Listen for beforeinstallprompt event
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            // Show prompt after 3 seconds
            setTimeout(() => setIsVisible(true), 3000);
        };

        // Listen for app installed event
        const handleAppInstalled = () => {
            setIsInstalled(true);
            setIsVisible(false);
            setDeferredPrompt(null);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('appinstalled', handleAppInstalled);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            console.log('PWA installed');
            setIsInstalled(true);
        }

        setDeferredPrompt(null);
        setIsVisible(false);
    };

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem('pwa-prompt-dismissed', Date.now().toString());
    };

    if (isInstalled || !isVisible) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-[380px]">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-5 shadow-2xl ring-1 ring-slate-700">
                {/* Background decoration */}
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-red-500/20 blur-3xl" />
                <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl" />

                <div className="relative">
                    {/* Close button */}
                    <button
                        onClick={handleDismiss}
                        className="absolute -right-1 -top-1 rounded-full p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                        aria-label="Dismiss"
                    >
                        <X size={18} />
                    </button>

                    <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/30">
                            <Smartphone size={28} className="text-white" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-white">
                                Install Sheddy's Radio
                            </h3>
                            <p className="mt-1 text-sm text-slate-400">
                                Weka app kwenye simu yako upate uzoefu bora zaidi na arifa za moja kwa moja.
                            </p>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-4 flex gap-3">
                        <button
                            onClick={handleDismiss}
                            className="flex-1 rounded-xl border border-slate-700 bg-transparent px-4 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white"
                        >
                            Baadaye
                        </button>
                        <button
                            onClick={handleInstall}
                            className="flex-1 rounded-xl bg-gradient-to-r from-red-500 to-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-500/30 transition hover:from-red-600 hover:to-red-700 hover:shadow-red-500/40"
                        >
                            <span className="flex items-center justify-center gap-2">
                                <Download size={18} />
                                Install
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
