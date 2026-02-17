import { Head } from '@inertiajs/react';

import Header from './components/Header';
import Hero from './sections/Hero';
import Highlights from './sections/Highlights';
import Schedule from './sections/Schedule';
import Presenters from './sections/Presenters';
import Services from './sections/Services';
import BlogList from './sections/BlogList';
import Footer from './sections/Footer';
import FloatingRadioPlayer from '@/Components/FloatingRadioPlayer';

export default function Index({
    auth,
    laravelVersion,
    phpVersion,
    streamUrl,
    highlights,
    programs,
    presenters,
    latestBlogs,
}) {
    return (
        <>
            <Head title="Welcome" />

            <div className="min-h-screen w-full bg-white pb-28 text-slate-900">
                <Header auth={auth} />

                <main className="flex flex-1 flex-col justify-center py-10">
                    <Hero streamUrl={streamUrl} />
                    <Highlights highlights={highlights} />
                    <Schedule programs={programs} />
                    <Presenters presenters={presenters} />
                    <Services />
                    <BlogList blogs={latestBlogs} />
                </main>

                <Footer laravelVersion={laravelVersion} phpVersion={phpVersion} />
            </div>

            <FloatingRadioPlayer streamUrl={streamUrl} />
        </>
    );
}
