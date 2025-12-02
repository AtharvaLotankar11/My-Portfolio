import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaUser } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isConnectOpen, setIsConnectOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { currentUser, signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    const scrollToSection = (sectionId) => {
        const element = document.querySelector(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-primary/80 backdrop-blur-md border-b border-white/10 shadow-lg">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo / Name */}
                <Link to="/">
                    <motion.h1
                        className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500 cursor-pointer"
                        whileHover={{
                            scale: 1.1,
                            textShadow: "0px 0px 8px rgb(56, 189, 248)",
                            rotate: [0, -5, 5, -5, 0]
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        Atharva Lotankar
                    </motion.h1>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
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
                            className="relative text-gray-300 hover:text-accent transition-colors duration-300 text-sm font-medium tracking-wider uppercase group"
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
                            className="relative text-gray-300 hover:text-accent transition-colors duration-300 text-sm font-medium tracking-wider uppercase group"
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
                                className="flex items-center space-x-1 text-gray-300 hover:text-accent transition-colors duration-300 text-sm font-medium focus:outline-none tracking-wider uppercase"
                                whileHover={{ scale: 1.1, y: -2 }}
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
            </div>
        </nav>
    );
};

export default Navbar;

