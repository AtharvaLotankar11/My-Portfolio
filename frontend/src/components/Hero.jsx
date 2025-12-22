import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import myPhoto from '../assets/myPhoto.png';

const Hero = () => {
    const [particles, setParticles] = useState([]);
    const imageRef = useRef(null);
    const [tiltStyle, setTiltStyle] = useState({});

    // Generate particles on mount
    useEffect(() => {
        const newParticles = Array.from({ length: 30 }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            animationDuration: `${15 + Math.random() * 20}s`,
            animationDelay: `${Math.random() * 5}s`,
            size: Math.random() * 4 + 2
        }));
        setParticles(newParticles);
    }, []);

    // 3D Tilt effect on mouse move
    const handleMouseMove = (e) => {
        if (!imageRef.current) return;
        const rect = imageRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        setTiltStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
        });
    };

    const handleMouseLeave = () => {
        setTiltStyle({
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        });
    };

    return (
        <section id="home" className="min-h-screen flex flex-col justify-center items-center pt-20 relative overflow-hidden">
            {/* Particle Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        className="particle"
                        style={{
                            left: particle.left,
                            bottom: '-10px',
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            animationDuration: particle.animationDuration,
                            animationDelay: particle.animationDelay,
                        }}
                    />
                ))}
            </div>

            {/* Animated Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-purple-600/30 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-accent/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-[40%] left-[50%] w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 flex flex-col items-center text-center z-10">
                {/* Profile Image with 3D Tilt */}
                <motion.div
                    ref={imageRef}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="mb-8 sm:mb-10 relative"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        ...tiltStyle,
                        transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
                    }}
                >
                    <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full p-1 bg-gradient-to-r from-accent via-purple-500 to-pink-500 animate-gradient-shift animate-pulse-glow">
                        <img
                            src={myPhoto}
                            alt="Atharva Lotankar"
                            className="w-full h-full object-cover rounded-full border-4 border-primary"
                        />
                        {/* Shimmer overlay */}
                        <div className="absolute inset-0 rounded-full overflow-hidden">
                            <div className="absolute inset-0 animate-shimmer"></div>
                        </div>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent via-purple-500 to-pink-500 blur-2xl -z-10 opacity-60 animate-pulse"></div>
                </motion.div>

                {/* Name with Magnetic Hover and Neon Effect */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-accent to-purple-500 animate-gradient-shift magnetic-hover neon-text cursor-pointer px-4"
                >
                    Atharva Lotankar
                </motion.h1>

                {/* Subtitle with Fade Scale Animation */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-base sm:text-lg md:text-xl lg:text-2xl text-accent mb-8 sm:mb-10 relative px-4 mt-4"
                >
                    <span className="inline-block animate-fade-scale" style={{ animationDelay: '0s' }}>F</span>
                    <span className="inline-block animate-fade-scale" style={{ animationDelay: '0.05s' }}>u</span>
                    <span className="inline-block animate-fade-scale" style={{ animationDelay: '0.1s' }}>l</span>
                    <span className="inline-block animate-fade-scale" style={{ animationDelay: '0.15s' }}>l</span>
                    <span className="inline-block animate-fade-scale" style={{ animationDelay: '0.2s' }}>&nbsp;</span>
                    <span className="inline-block animate-fade-scale" style={{ animationDelay: '0.25s' }}>S</span>
                    <span className="inline-block animate-fade-scale" style={{ animationDelay: '0.3s' }}>t</span>
                    <span className="inline-block animate-fade-scale" style={{ animationDelay: '0.35s' }}>a</span>
                    <span className="inline-block animate-fade-scale" style={{ animationDelay: '0.4s' }}>c</span>
                    <span className="inline-block animate-fade-scale" style={{ animationDelay: '0.45s' }}>k</span>
                    <span className="inline-block animate-fade-scale" style={{ animationDelay: '0.5s' }}>&nbsp;</span>
                    <span className="inline-block animate-fade-scale" style={{ animationDelay: '0.55s' }}>D</span>
                    <span className="inline-block animate-fade-scale" style={{ animationDelay: '0.6s' }}>e</span>
                    <span className="inline-block animate-fade-scale" style={{ animationDelay: '0.65s' }}>v</span>
                    <span className="inline-block animate-fade-scale" style={{ animationDelay: '0.7s' }}>e</span>
                    <span className="inline-block animate-fade-scale" style={{ animationDelay: '0.75s' }}>l</span>
                    <span className="inline-block animate-fade-scale" style={{ animationDelay: '0.8s' }}>o</span>
                    <span className="inline-block animate-fade-scale" style={{ animationDelay: '0.85s' }}>p</span>
                    <span className="inline-block animate-fade-scale" style={{ animationDelay: '0.9s' }}>e</span>
                    <span className="inline-block animate-fade-scale" style={{ animationDelay: '0.95s' }}>r</span>
                    <span className="inline-block animate-fade-scale" style={{ animationDelay: '1.0s' }}>&nbsp;</span>
                    <span className="inline-block animate-fade-scale" style={{ animationDelay: '1.05s' }}>&</span>
                    <span className="inline-block animate-fade-scale" style={{ animationDelay: '1.1s' }}>&nbsp;</span>
                    <span className="inline-block animate-fade-scale" style={{ animationDelay: '1.15s' }}>A</span>
                    <span className="inline-block animate-fade-scale" style={{ animationDelay: '1.2s' }}>I</span>
                    <span className="inline-block animate-fade-scale" style={{ animationDelay: '1.25s' }}>&nbsp;</span>
                    <span className="inline-block animate-fade-scale" style={{ animationDelay: '1.3s' }}>E</span>
                    <span className="inline-block animate-fade-scale" style={{ animationDelay: '1.35s' }}>n</span>
                    <span className="inline-block animate-fade-scale" style={{ animationDelay: '1.4s' }}>t</span>
                    <span className="inline-block animate-fade-scale" style={{ animationDelay: '1.45s' }}>h</span>
                    <span className="inline-block animate-fade-scale" style={{ animationDelay: '1.5s' }}>u</span>
                    <span className="inline-block animate-fade-scale" style={{ animationDelay: '1.55s' }}>s</span>
                    <span className="inline-block animate-fade-scale" style={{ animationDelay: '1.6s' }}>i</span>
                    <span className="inline-block animate-fade-scale" style={{ animationDelay: '1.65s' }}>a</span>
                    <span className="inline-block animate-fade-scale" style={{ animationDelay: '1.7s' }}>s</span>
                    <span className="inline-block animate-fade-scale" style={{ animationDelay: '1.75s' }}>t</span>
                </motion.p>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-6 sm:bottom-10 animate-bounce"
                >
                    <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-accent rounded-full flex justify-center">
                        <div className="w-1 h-2 sm:h-3 bg-accent rounded-full mt-2 animate-pulse"></div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
