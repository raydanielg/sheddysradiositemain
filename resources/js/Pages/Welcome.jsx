import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Play, Pause, Radio, Music, Mic, Phone, Calendar, Download } from 'lucide-react';

export default function Welcome({ auth }) {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <>
            <Head title="Welcome - Sheddy's Radio" />
            {/* Bootstrap CSS */}
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
                rel="stylesheet"
            />
            {/* Bootstrap Icons */}
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
                rel="stylesheet"
            />

            <div className="min-vh-100 bg-light">
                {/* Navbar */}
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
                    <div className="container">
                        <Link href="/" className="navbar-brand d-flex align-items-center gap-2">
                            <div
                                className="bg-danger rounded d-flex align-items-center justify-content-center"
                                style={{ width: '40px', height: '40px' }}
                            >
                                <Radio size={20} className="text-white" />
                            </div>
                            <div>
                                <span className="fw-bold">Sheddy's Radio</span>
                                <small className="d-block text-white-50" style={{ fontSize: '11px' }}>
                                    Live. Local. Loud.
                                </small>
                            </div>
                        </Link>

                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto align-items-center gap-2">
                                <li className="nav-item">
                                    <Link href="/" className="nav-link active">
                                        <i className="bi bi-house-door me-1"></i> Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/blogs" className="nav-link">
                                        <i className="bi bi-journal-text me-1"></i> Blogs
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/about" className="nav-link">
                                        <i className="bi bi-info-circle me-1"></i> About
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/contact" className="nav-link">
                                        <i className="bi bi-envelope me-1"></i> Contact
                                    </Link>
                                </li>
                                {auth.user ? (
                                    <li className="nav-item ms-lg-3">
                                        <Link
                                            href={route('dashboard')}
                                            className="btn btn-danger btn-sm"
                                        >
                                            <i className="bi bi-speedometer2 me-1"></i> Dashboard
                                        </Link>
                                    </li>
                                ) : (
                                    <>
                                        <li className="nav-item ms-lg-3">
                                            <Link href={route('login')} className="btn btn-outline-light btn-sm">
                                                <i className="bi bi-box-arrow-in-right me-1"></i> Log in
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link href={route('register')} className="btn btn-danger btn-sm">
                                                <i className="bi bi-person-plus me-1"></i> Register
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="py-5" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
                    <div className="container">
                        <div className="row align-items-center min-vh-75">
                            {/* Left Content */}
                            <div className="col-lg-6 mb-5 mb-lg-0">
                                <div className="d-inline-flex align-items-center gap-2 bg-white bg-opacity-10 rounded-pill px-3 py-2 mb-4">
                                    <span className="bg-danger rounded-circle" style={{ width: '8px', height: '8px', animation: 'pulse 1.5s infinite' }}></span>
                                    <span className="text-white small fw-semibold">LIVE STREAMING</span>
                                </div>

                                <h1 className="display-4 fw-bold text-white mb-4">
                                    Sikiliza Muziki na Vipindi Vyako kwa Urahisi
                                </h1>
                                <p className="lead text-white-50 mb-4">
                                    Karibu Sheddy's Radio. Tume-design experience iwe safi, ya haraka, 
                                    na yenye quality nzuri. Vipindi vya moto 24/7.
                                </p>

                                <div className="d-flex flex-wrap gap-3 mb-5">
                                    <button
                                        className="btn btn-danger btn-lg d-flex align-items-center gap-2"
                                        onClick={() => setIsPlaying(!isPlaying)}
                                    >
                                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                                        {isPlaying ? 'Pause Stream' : 'Play Live Radio'}
                                    </button>
                                    <Link href="/blogs" className="btn btn-outline-light btn-lg">
                                        <i className="bi bi-collection-play me-2"></i>
                                        Read Blogs
                                    </Link>
                                </div>

                                {/* Stats Row */}
                                <div className="row g-3">
                                    <div className="col-4">
                                        <div className="bg-white bg-opacity-10 rounded-3 p-3 text-center">
                                            <Music className="text-danger mb-2" size={24} />
                                            <div className="text-white fw-bold">24/7</div>
                                            <small className="text-white-50">Non-Stop</small>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="bg-white bg-opacity-10 rounded-3 p-3 text-center">
                                            <Mic className="text-danger mb-2" size={24} />
                                            <div className="text-white fw-bold">Top DJs</div>
                                            <small className="text-white-50">Best Shows</small>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="bg-white bg-opacity-10 rounded-3 p-3 text-center">
                                            <Phone className="text-danger mb-2" size={24} />
                                            <div className="text-white fw-bold">Requests</div>
                                            <small className="text-white-50">Call In</small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right - Live Player Card */}
                            <div className="col-lg-6">
                                <div className="card border-0 shadow-lg" style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)' }}>
                                    <div className="card-header bg-transparent border-bottom-0 pt-4 px-4">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h5 className="mb-0 fw-bold text-dark">
                                                <i className="bi bi-broadcast me-2 text-danger"></i>
                                                Live Player
                                            </h5>
                                            <span className="badge bg-danger">
                                                <i className="bi bi-circle-fill me-1" style={{ fontSize: '8px' }}></i>
                                                ON AIR
                                            </span>
                                        </div>
                                    </div>
                                    <div className="card-body px-4 pb-4">
                                        {/* Now Playing */}
                                        <div className="bg-light rounded-3 p-4 mb-3">
                                            <small className="text-muted fw-semibold text-uppercase" style={{ fontSize: '11px', letterSpacing: '1px' }}>
                                                NOW PLAYING
                                            </small>
                                            <h4 className="fw-bold text-dark mt-2 mb-1">Bongo Flava Mix</h4>
                                            <p className="text-muted mb-3">Morning Drive Show • DJ Sheddy</p>

                                            {/* Audio Visualizer Bars */}
                                            <div className="d-flex align-items-end gap-1 mb-3" style={{ height: '30px' }}>
                                                {[...Array(20)].map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className="bg-danger rounded"
                                                        style={{
                                                            width: '4px',
                                                            height: isPlaying ? `${Math.random() * 25 + 5}px` : '4px',
                                                            transition: 'height 0.3s ease',
                                                            opacity: isPlaying ? 1 : 0.3,
                                                        }}
                                                    ></div>
                                                ))}
                                            </div>

                                            <div className="d-flex gap-2">
                                                <button
                                                    className={`btn ${isPlaying ? 'btn-danger' : 'btn-outline-danger'} flex-fill`}
                                                    onClick={() => setIsPlaying(!isPlaying)}
                                                >
                                                    {isPlaying ? (
                                                        <><i className="bi bi-pause-fill me-1"></i> Pause</>
                                                    ) : (
                                                        <><i className="bi bi-play-fill me-1"></i> Play</>
                                                    )}
                                                </button>
                                                <button className="btn btn-outline-secondary">
                                                    <i className="bi bi-volume-up"></i>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Up Next & Contact */}
        <div className="row g-2">
            <div className="col-6">
                <div className="border rounded-3 p-3 h-100">
                    <small className="text-muted fw-semibold text-uppercase" style={{ fontSize: '10px' }}>UP NEXT</small>
                    <p className="fw-semibold text-dark mb-0 mt-1" style={{ fontSize: '14px' }}>Midday Jam</p>
                    <small className="text-muted">12:00 PM • Sarah</small>
                </div>
            </div>
            <div className="col-6">
                <div className="border rounded-3 p-3 h-100">
                    <small className="text-muted fw-semibold text-uppercase" style={{ fontSize: '10px' }}>REQUEST</small>
                    <p className="fw-semibold text-dark mb-0 mt-1" style={{ fontSize: '14px' }}>Call Studio</p>
                    <small className="text-muted">+255 712 345 678</small>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</div>
</div>
</section>

{/* Features Section */}
<section className="py-5 bg-white">
    <div className="container">
        <div className="row g-4">
            <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm hover-shadow transition-all">
                    <div className="card-body p-4">
                        <div className="d-flex align-items-center gap-3 mb-3">
                            <div className="bg-danger bg-opacity-10 rounded-3 p-3">
                                <Calendar className="text-danger" size={24} />
                            </div>
                            <h5 className="card-title fw-bold mb-0">Latest Shows</h5>
                        </div>
                        <p className="card-text text-muted">
                            Orodha ya vipindi vipya kila siku. Usikose kutazama show zetu za live.
                        </p>
                        <Link href="/blogs" className="btn btn-outline-danger btn-sm">
                            View Schedule <i className="bi bi-arrow-right ms-1"></i>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm hover-shadow transition-all">
                    <div className="card-body p-4">
                        <div className="d-flex align-items-center gap-3 mb-3">
                            <div className="bg-primary bg-opacity-10 rounded-3 p-3">
                                <Music className="text-primary" size={24} />
                            </div>
                            <h5 className="card-title fw-bold mb-0">Top Requests</h5>
                        </div>
                        <p className="card-text text-muted">
                            Nyimbo zinazopendwa zaidi kwa sasa. Tuma request yako sasa.
                        </p>
                        <Link href="/contact" className="btn btn-outline-primary btn-sm">
                            Request Song <i className="bi bi-arrow-right ms-1"></i>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm hover-shadow transition-all">
                    <div className="card-body p-4">
                        <div className="d-flex align-items-center gap-3 mb-3">
                            <div className="bg-success bg-opacity-10 rounded-3 p-3">
                                <Download className="text-success" size={24} />
                            </div>
                            <h5 className="card-title fw-bold mb-0">Download App</h5>
                        </div>
                        <p className="card-text text-muted">
                            Pakua app yetu kwa Android na iOS. Sikiliza popote ulipo.
                        </p>
                        <button className="btn btn-outline-success btn-sm" disabled>
                            Coming Soon <i className="bi bi-phone ms-1"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

{/* Live Shows Banner */}
<section className="py-4 bg-dark">
    <div className="container">
        <div className="row align-items-center">
            <div className="col-md-8">
                <h3 className="text-white fw-bold mb-2">
                    <i className="bi bi-mic-fill text-danger me-2"></i>
                    Vipindi vya Live Kila Wiki
                </h3>
                <p className="text-white-50 mb-0">
                    Jumatatu hadi Jumamosi. Matangazo ya moja kwa moja kutoka studio zetu.
                </p>
            </div>
            <div className="col-md-4 text-md-end mt-3 mt-md-0">
                <Link href="/about" className="btn btn-danger">
                    Learn More <i className="bi bi-arrow-right ms-2"></i>
                </Link>
            </div>
        </div>
    </div>
</section>

{/* Footer */}
<footer className="bg-dark text-white py-4 border-top border-secondary">
    <div className="container">
        <div className="row align-items-center">
            <div className="col-md-6">
                <p className="mb-0 text-white-50">
                    <i className="bi bi-broadcast me-2"></i>
                    &copy; {new Date().getFullYear()} Sheddy's Radio. All rights reserved.
                </p>
            </div>
            <div className="col-md-6 text-md-end">
                <div className="d-flex gap-3 justify-content-md-end">
                    <a href="#" className="text-white-50 hover-text-white"><i className="bi bi-facebook fs-5"></i></a>
                    <a href="#" className="text-white-50 hover-text-white"><i className="bi bi-twitter-x fs-5"></i></a>
                    <a href="#" className="text-white-50 hover-text-white"><i className="bi bi-instagram fs-5"></i></a>
                    <a href="#" className="text-white-50 hover-text-white"><i className="bi bi-youtube fs-5"></i></a>
                </div>
            </div>
        </div>
    </div>
</footer>

{/* Bootstrap JS */}
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

{/* Custom Styles */}
<style>{`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

    * {
        font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
    }

    h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
        font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
        font-weight: 700 !important;
        letter-spacing: -0.02em !important;
    }

    p, span, div, a, button, input, textarea, label, .btn, .navbar-brand, .nav-link {
        font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
    }

    .btn {
        font-weight: 600 !important;
        letter-spacing: 0.5px !important;
    }

    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
    .hover-shadow:hover {
        box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15) !important;
        transform: translateY(-2px);
        transition: all 0.3s ease;
    }
    .min-vh-75 {
        min-height: 75vh;
    }

    body, html {
        font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
    }

    .display-4, .display-5, .display-6 {
        font-weight: 800 !important;
        letter-spacing: -0.03em !important;
    }
`}</style>
</div>
</>
);
}
