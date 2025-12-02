import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Education from '../components/Education';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Certifications from '../components/Certifications';
import MessageMe from '../components/MessageMe';

const Home = () => {
    const location = useLocation();
    const { currentUser } = useAuth();

    useEffect(() => {
        // Handle hash navigation when coming from other pages
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location]);

    return (
        <div className="min-h-screen bg-primary text-white selection:bg-accent selection:text-white">
            <Navbar />

            <main>
                <Hero />
                <About />
                <Skills />
                <Education />
                <Experience />
                <Projects />
                <Certifications />

                {/* Message Me Section - Only visible when logged in */}
                {currentUser && <MessageMe />}

                {/* Let's Connect Card - Only visible when NOT logged in */}
                {!currentUser && <section className="py-20 bg-secondary/30">
                    <div className="container mx-auto px-6 flex justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-r from-secondary to-primary p-8 md:p-12 rounded-2xl border border-white/10 text-center max-w-2xl w-full shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-purple-500"></div>

                            <h2 className="text-3xl font-bold mb-4 text-white">Ready to Collaborate?</h2>
                            <p className="text-gray-400 mb-8">
                                Join our community or sign in to connect with me directly.
                            </p>

                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link to="/register">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-3 bg-accent text-white font-semibold rounded-lg shadow-lg shadow-accent/20 hover:bg-accent-glow transition-colors w-full sm:w-auto"
                                    >
                                        Register
                                    </motion.button>
                                </Link>
                                <Link to="/login">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-3 bg-transparent border border-accent text-accent font-semibold rounded-lg hover:bg-accent/10 transition-colors w-full sm:w-auto"
                                    >
                                        Login
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>}
            </main>

            <Footer />
        </div>
    );
};

export default Home;
