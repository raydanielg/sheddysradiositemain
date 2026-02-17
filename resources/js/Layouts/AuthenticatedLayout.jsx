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
        </div>
    );
}
