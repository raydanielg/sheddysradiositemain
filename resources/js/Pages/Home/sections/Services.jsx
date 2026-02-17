import { useEffect, useMemo, useRef, useState } from 'react';

function useInView(ref, options = {}) {
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                observer.disconnect();
            }
        }, options);

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [ref, options]);

    return isInView;
}

export default function Services() {
    const items = useMemo(
        () => [
            {
                title: 'Muziki Bora',
                description: 'Tunacheza muziki bora wa kitanzania na kimataifa kwa ajili ya burudani yako.',
                icon: (
                    <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3V4a1 1 0 00-1-1z"></path></svg>
                )
            },
            {
                title: 'Vipindi Mubashara',
                description: 'Vipindi vyetu vinapeperushwa mubashara na watangazaji wenye uzoefu kila siku.',
                icon: (
                    <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                )
            },
            {
                title: 'Sikiliza Popote',
                description: 'Sikiliza redio yetu popote ulipo kupitia mtandao na programu zetu za simu.',
                icon: (
                    <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path><path d="M10 14a2 2 0 100-4 2 2 0 000 4z"></path></svg>
                )
            },
            {
                title: 'Mahojiano na Wasanii',
                description: 'Tunawahoji wasanii maarufu wa kitanzania na kimataifa kwenye studio zetu za kisasa.',
                icon: (
                    <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0 5 5 0 01-10 0 1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H9a1 1 0 100 2h6a1 1 0 100-2h-2v-2.07z" clip-rule="evenodd"></path></svg>
                )
            },
            {
                title: 'Matukio Maalum',
                description: 'Tunaandaa na kupeperusha matukio maalum ya burudani, elimu na habari za jamii.',
                icon: (
                    <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H9V3a1 1 0 00-1-1zm10 4H4v10h12V6z" clip-rule="evenodd"></path></svg>
                )
            },
            {
                title: 'Jamii ya Wasikilizaji',
                description: 'Jiunge na jamii yetu kubwa ya wasikilizaji na shiriki katika mijadala mbalimbali.',
                icon: (
                    <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>
                )
            },
        ],
        [],
    );

    const sectionRef = useRef(null);
    const inView = useInView(sectionRef, { threshold: 0.1 });

    return (
        <section ref={sectionRef} className="bg-white py-14 dark:bg-slate-950">
            <div className="mx-auto w-full px-6">
                <div className="mb-8 max-w-screen-md lg:mb-16">
                    <h2 className={`mb-4 text-4xl font-extrabold tracking-tight text-slate-900 transition-all duration-700 dark:text-white ${inView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                        Huduma Zetu
                    </h2>
                    <p className={`text-slate-500 transition-all delay-100 duration-700 dark:text-slate-400 sm:text-xl ${inView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                        Sheddy's Radio inakupa huduma bora za burudani, habari na elimu kwa lugha ya Kiswahili kupitia studio zetu za kisasa na watangazaji wenye uzoefu.
                    </p>
                </div>

                <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                    {items.map((item, idx) => (
                        <div 
                            key={item.title} 
                            className={`group transition-all duration-700 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                            style={{ transitionDelay: `${idx * 100}ms` }}
                        >
                            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 transition-transform duration-300 group-hover:scale-110 dark:bg-primary-900 lg:h-12 lg:w-12">
                                {item.icon}
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
