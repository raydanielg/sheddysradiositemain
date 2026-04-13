import { useState } from 'react';

import Sidebar from './Sidebar';
import Header from './Header';

export default function AuthenticatedLayout({ header, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
            <div className="mx-auto grid min-h-screen w-full grid-cols-1 lg:grid-cols-[280px_1fr]">
                <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                <div className="min-w-0">
                    <Header
                        onMenuClick={() => setSidebarOpen(true)}
                        header={typeof header === 'string' ? header : 'Dashboard'}
                    />

                    {header && typeof header !== 'string' ? (
                        <div className="px-6 pt-6">{header}</div>
                    ) : null}

                    <main className="px-6 py-8">{children}</main>
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
                p, span, div, a, button, input, textarea, label, li, td, th {
                    font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
                }
                button, .btn, .font-semibold, .font-bold {
                    font-weight: 600 !important;
                    letter-spacing: 0.3px !important;
                }
            `}</style>
        </div>
    );
}
