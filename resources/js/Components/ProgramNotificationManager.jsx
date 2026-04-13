import { useEffect, useState, useCallback } from 'react';
import { Bell, BellRing, X } from 'lucide-react';

export default function ProgramNotificationManager({ programs }) {
    const [permission, setPermission] = useState('default');
    const [notifications, setNotifications] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        if ('Notification' in window) {
            setPermission(Notification.permission);
        }

        // Load subscribed programs from localStorage
        const saved = localStorage.getItem('sheddys-notifications');
        if (saved) {
            setNotifications(JSON.parse(saved));
        }
    }, []);

    // Check for upcoming programs every minute
    useEffect(() => {
        const checkPrograms = () => {
            if (!programs || notifications.length === 0) return;

            const now = new Date();
            const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            const currentDay = now.getDay() || 7; // 1-7 (Monday-Sunday)

            programs.forEach((program) => {
                // Check if program is today
                if (program.day_of_week === currentDay) {
                    // Check if program starts in exactly 5 minutes
                    const programTime = program.start_time;
                    const [progHours, progMinutes] = programTime.split(':').map(Number);
                    const [currHours, currMinutes] = currentTime.split(':').map(Number);

                    const progTotalMinutes = progHours * 60 + progMinutes;
                    const currTotalMinutes = currHours * 60 + currMinutes;
                    const diff = progTotalMinutes - currTotalMinutes;

                    // Notify 5 minutes before program starts
                    if (diff === 5 && notifications.includes(program.id)) {
                        sendNotification(program);
                    }
                }
            });
        };

        const interval = setInterval(checkPrograms, 60000); // Check every minute
        checkPrograms(); // Initial check

        return () => clearInterval(interval);
    }, [programs, notifications]);

    const sendNotification = useCallback((program) => {
        if ('Notification' in window && Notification.permission === 'granted') {
            navigator.serviceWorker.ready.then((registration) => {
                registration.showNotification("Sheddy's Radio - Program Inakuja!", {
                    body: `${program.title} inaanza dakika 5 zijazo!`,
                    icon: '/logo1.jpeg',
                    badge: '/logo1.jpeg',
                    tag: `program-${program.id}`,
                    requireInteraction: true,
                    actions: [
                        {
                            action: 'listen',
                            title: 'Sikiliza Sasa',
                            icon: '/logo1.jpeg'
                        }
                    ],
                    data: {
                        programId: program.id,
                        url: '/?action=play'
                    }
                });
            });

            // Show in-app toast
            setToastMessage(`${program.title} inaanza dakika 5 zijazo!`);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 5000);
        }
    }, []);

    const requestPermission = async () => {
        if ('Notification' in window) {
            const result = await Notification.requestPermission();
            setPermission(result);
            return result === 'granted';
        }
        return false;
    };

    const toggleNotification = async (programId) => {
        if (permission !== 'granted') {
            const granted = await requestPermission();
            if (!granted) return;
        }

        setNotifications((prev) => {
            let updated;
            if (prev.includes(programId)) {
                updated = prev.filter((id) => id !== programId);
                setToastMessage('Arifa zimezimwa kwa kipindi hiki');
            } else {
                updated = [...prev, programId];
                setToastMessage('Utapata arifa 5 dakika kabla ya kipindi kuanza!');
            }
            localStorage.setItem('sheddys-notifications', JSON.stringify(updated));
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            return updated;
        });
    };

    const isSubscribed = (programId) => notifications.includes(programId);

    return (
        <>
            {/* Toast Notification */}
            {showToast && (
                <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
                    <div className="flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-3 shadow-xl ring-1 ring-slate-800">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20">
                            <BellRing size={16} className="text-green-500" />
                        </div>
                        <p className="text-sm font-medium text-white">{toastMessage}</p>
                        <button
                            onClick={() => setShowToast(false)}
                            className="rounded-full p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>
            )}

            {/* Bell Button for Program Card */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => toggleNotification(programs[0]?.id)}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                        isSubscribed(programs[0]?.id)
                            ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                    }`}
                    title={isSubscribed(programs[0]?.id) ? 'Zima arifa' : 'Washa arifa'}
                >
                    {isSubscribed(programs[0]?.id) ? (
                        <>
                            <BellRing size={16} />
                            <span className="hidden sm:inline">Arifa Zimashika</span>
                        </>
                    ) : (
                        <>
                            <Bell size={16} />
                            <span className="hidden sm:inline">Weka Arifa</span>
                        </>
                    )}
                </button>
            </div>
        </>
    );
}

// Hook to use notifications
export function useProgramNotifications() {
    const [permission, setPermission] = useState('default');

    useEffect(() => {
        if ('Notification' in window) {
            setPermission(Notification.permission);
        }
    }, []);

    const requestPermission = async () => {
        if ('Notification' in window) {
            const result = await Notification.requestPermission();
            setPermission(result);
            return result;
        }
        return 'denied';
    };

    return { permission, requestPermission };
}
