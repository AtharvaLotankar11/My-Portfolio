import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaUser, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const LINKS = [
    { name: 'Home', id: 'home', path: '/' },
    { name: 'About', id: 'about', path: '/#about' },
    { name: 'Skills', id: 'skills', path: '/#skills' },
    { name: 'Education', id: 'education', path: '/#education' },
    { name: 'Experience', id: 'experience', path: '/#experience' },
    { name: 'Projects', id: 'projects', path: '/#projects' },
    { name: 'Certifications', id: 'certifications', path: '/#certifications' },
];

const Navbar = () => {
    const [isConnectOpen, setIsConnectOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeId, setActiveId] = useState('home');
    const { currentUser, signOut } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // condensed bar after the hero starts to leave
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // which section is in view -> highlight in the nav
    useEffect(() => {
        if (location.pathname !== '/') return;
        const els = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id); });
            },
            { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, [location.pathname]);

    useEffect(() => {
        const handleResize = () => { if (window.innerWidth >= 768) setIsMobileMenuOpen(false); };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMobileMenuOpen]);

    const handleSignOut = async () => {
        await signOut();
        setIsMobileMenuOpen(false);
        navigate('/');
    };

    const scrollToSection = (selector) => {
        const element = document.querySelector(selector);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
    };

    // On the home page, scroll directly (also works when the hash is already in the URL)
    const handleNavClick = (e, link) => {
        setIsMobileMenuOpen(false);
        if (location.pathname !== '/') return;      // let the router navigate; Home scrolls on hash change
        e.preventDefault();
        const el = document.getElementById(link.id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            window.history.replaceState(null, '', link.path);
        }
    };

    return (
        <>
            <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5">
                <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
                    {/* Monogram */}
                    <Link
                        to="/"
                        onClick={(e) => handleNavClick(e, LINKS[0])}
                        aria-label="Atharva Lotankar - home"
                        className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-primary/85 font-display text-lg tracking-wide text-bone backdrop-blur-md transition-colors duration-300 hover:border-blush hover:bg-blush hover:text-primary"
                    >
                        AL
                    </Link>

                    {/* Desktop links */}
                    <nav
                        aria-label="Primary"
                        className={`hidden items-center gap-1 rounded-full border px-2 py-1.5 backdrop-blur-xl transition-all duration-500 md:flex ${
                            scrolled ? 'border-white/15 bg-primary/70 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]' : 'border-white/10 bg-white/[0.04]'
                        }`}
                    >
                        {LINKS.map((link) => {
                            const isActive = activeId === link.id && location.pathname === '/';
                            return (
                                <Link
                                    key={link.id}
                                    to={link.path}
                                    onClick={(e) => handleNavClick(e, link)}
                                    aria-current={isActive ? 'true' : undefined}
                                    className={`relative whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-normal transition-colors duration-300 lg:px-4 ${
                                        isActive ? 'text-primary' : 'text-bone/75 hover:text-bone'
                                    }`}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="nav-pill"
                                            className="absolute inset-0 rounded-full bg-blush"
                                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.name}</span>
                                </Link>
                            );
                        })}
                        {currentUser && (
                            <button
                                onClick={() => scrollToSection('#message-me')}
                                className="relative whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-normal text-bone/75 transition-colors hover:text-bone lg:px-4"
                            >
                                Message
                            </button>
                        )}
                    </nav>

                    {/* Right: account / connect */}
                    <div className="hidden md:block">
                        {currentUser ? (
                            <div
                                className="relative"
                                onMouseEnter={() => setIsUserMenuOpen(true)}
                                onMouseLeave={() => setIsUserMenuOpen(false)}
                            >
                                <button
                                    className="flex items-center gap-2 rounded-full border border-white/15 bg-primary/85 py-1.5 pl-1.5 pr-4 text-[13px] text-bone backdrop-blur-md transition-colors hover:border-blush"
                                    aria-haspopup="menu"
                                    aria-expanded={isUserMenuOpen}
                                    onFocus={() => setIsUserMenuOpen(true)}
                                >
                                    <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-blush text-primary">
                                        {currentUser.photoURL ? (
                                            <img src={currentUser.photoURL} alt="" className="h-full w-full object-cover" />
                                        ) : (
                                            <FaUser size={13} />
                                        )}
                                    </span>
                                    <span className="max-w-[110px] truncate">{currentUser.displayName || currentUser.email}</span>
                                    <FaChevronDown size={10} className={`transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {isUserMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.18 }}
                                            className="absolute right-0 top-full w-56 pt-2"
                                        >
                                            <div className="overflow-hidden rounded-2xl border border-white/10 bg-secondary/95 shadow-2xl backdrop-blur-xl">
                                                <div className="border-b border-white/10 px-4 py-3">
                                                    <p className="text-xs text-bone/50">Signed in as</p>
                                                    <p className="truncate text-sm text-bone">{currentUser.email}</p>
                                                </div>
                                                <button
                                                    onClick={handleSignOut}
                                                    className="w-full px-4 py-2.5 text-left text-sm text-bone/80 transition-colors hover:bg-white/5 hover:text-blush"
                                                >
                                                    Sign out
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div
                                className="relative"
                                onMouseEnter={() => setIsConnectOpen(true)}
                                onMouseLeave={() => setIsConnectOpen(false)}
                            >
                                <button
                                    className="flex items-center gap-2 rounded-full border border-white/15 bg-primary/85 px-5 py-2.5 text-[13px] font-normal text-bone backdrop-blur-md transition-colors duration-300 hover:border-blush hover:bg-blush hover:text-primary"
                                    aria-haspopup="menu"
                                    aria-expanded={isConnectOpen}
                                    onFocus={() => setIsConnectOpen(true)}
                                >
                                    Connect
                                    <FaChevronDown size={10} className={`transition-transform duration-300 ${isConnectOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {isConnectOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.18 }}
                                            className="absolute right-0 top-full w-44 pt-2"
                                        >
                                            <div className="overflow-hidden rounded-2xl border border-white/10 bg-secondary/95 shadow-2xl backdrop-blur-xl">
                                                <Link to="/login" className="block px-4 py-3 text-sm text-bone/80 transition-colors hover:bg-white/5 hover:text-blush">
                                                    Login
                                                </Link>
                                                <Link to="/register" className="block border-t border-white/5 px-4 py-3 text-sm text-bone/80 transition-colors hover:bg-white/5 hover:text-blush">
                                                    Register
                                                </Link>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-primary/85 backdrop-blur-md md:hidden"
                        aria-label="Open menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <span className="flex w-5 flex-col gap-[5px]">
                            <span className="h-px w-full bg-bone" />
                            <span className="h-px w-3/5 self-end bg-bone" />
                        </span>
                    </button>
                </div>
            </header>

            {/* Mobile menu: full-screen, giant type like the cover */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ clipPath: 'inset(0 0 100% 0)' }}
                        animate={{ clipPath: 'inset(0 0 0% 0)' }}
                        exit={{ clipPath: 'inset(0 0 100% 0)' }}
                        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 z-[60] flex flex-col bg-charcoal px-6 pb-8 pt-5 md:hidden"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Menu"
                    >
                        <div className="flex items-center justify-between">
                            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 font-display text-lg text-bone">AL</span>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-bone"
                                aria-label="Close menu"
                            >
                                <FaTimes size={16} />
                            </button>
                        </div>

                        <nav className="mt-8 flex flex-1 flex-col justify-center gap-1" aria-label="Mobile">
                            {LINKS.map((link, i) => (
                                <motion.div
                                    key={link.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.25 + i * 0.05, duration: 0.5 }}
                                >
                                    <Link
                                        to={link.path}
                                        onClick={(e) => handleNavClick(e, link)}
                                        className={`display-type block py-1 text-[13vw] transition-colors ${
                                            activeId === link.id ? 'text-blush' : 'text-bone hover:text-blush'
                                        }`}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            {currentUser && (
                                <button
                                    onClick={() => scrollToSection('#message-me')}
                                    className="display-type py-1 text-left text-[13vw] text-bone hover:text-blush"
                                >
                                    Message
                                </button>
                            )}
                        </nav>

                        <div className="border-t border-white/10 pt-5">
                            {currentUser ? (
                                <div className="flex items-center justify-between gap-4">
                                    <div className="min-w-0">
                                        <p className="truncate text-sm text-bone">{currentUser.displayName || 'User'}</p>
                                        <p className="truncate text-xs text-bone/50">{currentUser.email}</p>
                                    </div>
                                    <button onClick={handleSignOut} className="rounded-full border border-white/15 px-5 py-2 text-sm text-bone">
                                        Sign out
                                    </button>
                                </div>
                            ) : (
                                <div className="flex gap-3">
                                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex-1 rounded-full bg-blush py-3 text-center text-sm font-medium text-primary">
                                        Login
                                    </Link>
                                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="flex-1 rounded-full border border-white/20 py-3 text-center text-sm text-bone">
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
