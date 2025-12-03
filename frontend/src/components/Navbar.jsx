import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaUser } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isConnectOpen, setIsConnectOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { currentUser, signOut } = useAuth();
    const navigate = useNavigate();

    // Close mobile menu on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    const handleSignOut = async () => {
        await signOut();
        setIsMobileMenuOpen(false);
        navigate('/');
    };

    const scrollToSection = (sectionId) => {
        const element = document.querySelector(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    const handleLinkClick = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-primary/95 backdrop-blur-md border-b border-white/10 shadow-lg">
            <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
                {/* Logo / Name */}
                <Link to="/" onClick={handleLinkClick}>
                    <motion.h1
                        className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-500 to-pink-500 cursor-pointer"
                        whileHover={{
                            scale: 1.05,
                            textShadow: "0px 0px 8px rgb(56, 189, 248)",
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        Atharva Lotankar
                    </motion.h1>
                </Link>

                {/* Hamburger Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center focus:outline-none group z-50"
                    aria-label="Toggle menu"
                >
                    <motion.span
                        animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                        className="w-6 h-0.5 bg-gradient-to-r from-accent to-purple-500 rounded-full mb-1.5 transition-all duration-300"
                    />
                    <motion.span
                        animate={isMobileMenuOpen ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
                        className="w-6 h-0.5 bg-gradient-to-r from-accent to-purple-500 rounded-full mb-1.5 transition-all duration-300"
                    />
                    <motion.span
                        animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                        className="w-6 h-0.5 bg-gradient-to-r from-accent to-purple-500 rounded-full transition-all duration-300"
                    />
                </button>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                    {[
                        { name: 'Home', path: '/' },
                        { name: 'About Me', path: '/#about' },
                        { name: 'Skills', path: '/#skills' },
                        { name: 'Education', path: '/#education' },
                        { name: 'Experience', path: '/#experience' },
                        { name: 'Projects', path: '/#projects' },
                        { name: 'Certifications', path: '/#certifications' },
                    ].map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="relative text-gray-300 hover:text-accent transition-colors duration-300 text-xs lg:text-sm font-medium tracking-wider uppercase group"
                        >
                            <motion.span
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="block"
                            >
                                {link.name}
                            </motion.span>
                            {/* Animated underline */}
                            <motion.span
                                className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-purple-500 group-hover:w-full transition-all duration-300"
                                initial={{ width: 0 }}
                                whileHover={{ width: "100%" }}
                            ></motion.span>
                        </Link>
                    ))}

                    {/* Message Me - Only show when logged in */}
                    {currentUser && (
                        <button
                            onClick={() => scrollToSection('#message-me')}
                            className="relative text-gray-300 hover:text-accent transition-colors duration-300 text-xs lg:text-sm font-medium tracking-wider uppercase group"
                        >
                            <motion.span
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="block"
                            >
                                Message Me
                            </motion.span>
                            <motion.span
                                className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-purple-500 group-hover:w-full transition-all duration-300"
                                initial={{ width: 0 }}
                                whileHover={{ width: "100%" }}
                            ></motion.span>
                        </button>
                    )}

                    {/* User Menu or Connect Dropdown */}
                    {currentUser ? (
                        <div
                            className="relative"
                            onMouseEnter={() => setIsUserMenuOpen(true)}
                            onMouseLeave={() => setIsUserMenuOpen(false)}
                        >
                            <motion.button
                                className="flex items-center space-x-2 text-gray-300 hover:text-accent transition-colors duration-300 text-sm font-medium focus:outline-none"
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent to-purple-500 flex items-center justify-center">
                                    {currentUser.photoURL ? (
                                        <img src={currentUser.photoURL} alt="User" className="w-full h-full rounded-full" />
                                    ) : (
                                        <FaUser size={14} />
                                    )}
                                </div>
                                <span className="max-w-[100px] truncate">{currentUser.displayName || currentUser.email}</span>
                                <motion.div
                                    animate={{ rotate: isUserMenuOpen ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <FaChevronDown size={12} />
                                </motion.div>
                            </motion.button>

                            <AnimatePresence>
                                {isUserMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 mt-2 w-48 glass-effect border border-white/10 rounded-lg shadow-xl overflow-hidden"
                                    >
                                        <div className="px-4 py-3 border-b border-white/10">
                                            <p className="text-xs text-gray-400">Signed in as</p>
                                            <p className="text-sm text-white truncate">{currentUser.email}</p>
                                        </div>
                                        <button
                                            onClick={handleSignOut}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-red-400 transition-colors relative group"
                                        >
                                            Sign Out
                                            <motion.span
                                                className="absolute left-0 top-0 w-1 h-0 bg-red-400 group-hover:h-full transition-all duration-300"
                                            ></motion.span>
                                        </button>
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
                            <motion.button
                                className="flex items-center space-x-1 text-gray-300 hover:text-accent transition-colors duration-300 text-xs lg:text-sm font-medium focus:outline-none tracking-wider uppercase"
                                whileHover={{ scale: 1.05, y: -2 }}
                            >
                                <span>Let's Connect</span>
                                <motion.div
                                    animate={{ rotate: isConnectOpen ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <FaChevronDown size={12} />
                                </motion.div>
                            </motion.button>

                            <AnimatePresence>
                                {isConnectOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 mt-2 w-40 glass-effect border border-white/10 rounded-lg shadow-xl overflow-hidden"
                                    >
                                        <Link
                                            to="/login"
                                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-accent transition-colors relative group"
                                        >
                                            Login
                                            <motion.span
                                                className="absolute left-0 top-0 w-1 h-0 bg-accent group-hover:h-full transition-all duration-300"
                                            ></motion.span>
                                        </Link>
                                        <Link
                                            to="/register"
                                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-accent transition-colors relative group"
                                        >
                                            Register
                                            <motion.span
                                                className="absolute left-0 top-0 w-1 h-0 bg-accent group-hover:h-full transition-all duration-300"
                                            ></motion.span>
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                            />

                            {/* Mobile Menu Panel */}
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-gradient-to-br from-primary via-secondary to-primary border-l border-white/10 shadow-2xl z-50 md:hidden overflow-y-auto"
                            >
                                {/* Abstract Gradient Decorations */}
                                <div className="absolute top-10 right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-pulse" />
                                <div className="absolute bottom-20 left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

                                <div className="relative z-10 p-8 pt-20">
                                    {/* User Info or Connect */}
                                    {currentUser ? (
                                        <div className="mb-8 p-4 glass-effect rounded-xl border border-white/10">
                                            <div className="flex items-center space-x-3 mb-3">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-accent to-purple-500 flex items-center justify-center">
                                                    {currentUser.photoURL ? (
                                                        <img src={currentUser.photoURL} alt="User" className="w-full h-full rounded-full" />
                                                    ) : (
                                                        <FaUser size={20} />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm text-white font-medium truncate">
                                                        {currentUser.displayName || 'User'}
                                                    </p>
                                                    <p className="text-xs text-gray-400 truncate">{currentUser.email}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={handleSignOut}
                                                className="w-full py-2 px-4 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors text-sm font-medium"
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="mb-8 space-y-3">
                                            <Link
                                                to="/login"
                                                onClick={handleLinkClick}
                                                className="block w-full py-3 px-4 bg-gradient-to-r from-accent to-purple-500 text-white rounded-lg text-center font-medium hover:shadow-lg hover:shadow-accent/50 transition-all"
                                            >
                                                Login
                                            </Link>
                                            <Link
                                                to="/register"
                                                onClick={handleLinkClick}
                                                className="block w-full py-3 px-4 border border-accent text-accent rounded-lg text-center font-medium hover:bg-accent/10 transition-all"
                                            >
                                                Register
                                            </Link>
                                        </div>
                                    )}

                                    {/* Navigation Links */}
                                    <nav className="space-y-2">
                                        {[
                                            { name: 'Home', path: '/' },
                                            { name: 'About Me', path: '/#about' },
                                            { name: 'Skills', path: '/#skills' },
                                            { name: 'Education', path: '/#education' },
                                            { name: 'Experience', path: '/#experience' },
                                            { name: 'Projects', path: '/#projects' },
                                            { name: 'Certifications', path: '/#certifications' },
                                        ].map((link, index) => (
                                            <motion.div
                                                key={link.name}
                                                initial={{ opacity: 0, x: 50 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                            >
                                                <Link
                                                    to={link.path}
                                                    onClick={handleLinkClick}
                                                    className="block py-3 px-4 text-gray-300 hover:text-accent hover:bg-white/5 rounded-lg transition-all font-medium group"
                                                >
                                                    <span className="flex items-center justify-between">
                                                        {link.name}
                                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                                    </span>
                                                </Link>
                                            </motion.div>
                                        ))}

                                        {currentUser && (
                                            <motion.div
                                                initial={{ opacity: 0, x: 50 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.35 }}
                                            >
                                                <button
                                                    onClick={() => scrollToSection('#message-me')}
                                                    className="block w-full text-left py-3 px-4 text-gray-300 hover:text-accent hover:bg-white/5 rounded-lg transition-all font-medium group"
                                                >
                                                    <span className="flex items-center justify-between">
                                                        Message Me
                                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                                    </span>
                                                </button>
                                            </motion.div>
                                        )}
                                    </nav>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;

