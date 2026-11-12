import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
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
import CollaborateScene from '../components/CollaborateScene';

const Home = () => {
    const location = useLocation();
    const { currentUser } = useAuth();
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

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
        <div className="min-h-screen bg-primary text-bone">
            {/* Reading progress */}
            <motion.div
                aria-hidden="true"
                style={{ scaleX: progress }}
                className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-blush"
            />

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

                {/* 3D Collaborate Scene - Only visible when NOT logged in */}
                {!currentUser && <CollaborateScene />}
            </main>

            <Footer />
        </div>
    );
};

export default Home;
