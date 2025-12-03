import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaFileAlt } from 'react-icons/fa';

const Projects = () => {
    const [hoveredProject, setHoveredProject] = useState(null);
    const cardRefs = useRef([]);

    const projects = [
        {
            title: "Student Performance Predictor",
            desc: "Developed Python Decision Tree and Random Forest models improving accuracy 25%, Integrated GROQ API enabling 3x faster AI insight generation efficiency.",
            links: [
                { icon: <FaGithub />, url: "https://github.com/AtharvaLotankar11/Student-Performance-Predictor---Data-Mining-GROQ-API.git" },
                { icon: <FaExternalLinkAlt />, url: "https://student-performance-predictor-data.vercel.app/" }
            ]
        },
        {
            title: "OfficePulse",
            desc: "Built smart desk management system using Chart.js, boosting booking efficiency 50%, Integrated GROQ SDK for AI analytics, improving workspace optimization by 3x.",
            links: [
                { icon: <FaGithub />, url: "https://github.com/AtharvaLotankar11/OfficePulse_Project.git" },
                { icon: <FaExternalLinkAlt />, url: "https://officepulse-frontend.onrender.com/" }
            ]
        },
        {
            title: "PCB Design & Implementation",
            desc: "Designed and routed PCBs using KiCad 9.0 with advanced DRC verification, Developed Touch Piano and Buck Converter schematics with customized footprints.",
            links: [
                { icon: <FaGithub />, url: "https://github.com/AtharvaLotankar11/PCB-Designing-by-KiCad.git" }
            ]
        },
        {
            title: "GreenFork",
            desc: "Developed responsive GreenFork platform reducing food waste through surprise bags 40%, Integrated Firebase notifications enabling real-time donations.",
            links: [
                { icon: <FaGithub />, url: "https://github.com/Flappleton/Greenfork.git" },
                { icon: <FaExternalLinkAlt />, url: "https://greenfork-jade.vercel.app/index.html" },
                { icon: <FaFileAlt />, url: "https://drive.google.com/file/d/1tHJ5wZJ07ukBEksNFJkZSL7ioQGmYrgn/view" }
            ]
        },
        {
            title: "Railways & Customers",
            desc: "Developed Java OOP system for railway data, improving booking process 30%, Engineered GUI forms using Swing for efficient train, customer data handling.",
            links: [
                { icon: <FaGithub />, url: "https://github.com/AtharvaLotankar11/Railway-and-Customer-Java-Project.git" }
            ]
        }
    ];

    const handle3DTilt = (e, index) => {
        if (!cardRefs.current[index]) return;
        const card = cardRefs.current[index];
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * 5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const resetTilt = (index) => {
        if (!cardRefs.current[index]) return;
        cardRefs.current[index].style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    return (
        <section id="projects" className="py-12 sm:py-16 md:py-20 bg-secondary/30 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-[10%] left-[5%] w-60 sm:w-72 md:w-80 h-60 sm:h-72 md:h-80 bg-pink-500/20 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-[20%] right-[5%] sm:right-[10%] w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-purple-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-500 to-pink-500 neon-text"
                >
                    Projects
                </motion.h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            ref={(el) => (cardRefs.current[index] = el)}
                            initial={{ opacity: 0, rotate: -180, scale: 0 }}
                            whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: index * 0.15,
                                type: "spring",
                                stiffness: 100,
                                damping: 15
                            }}
                            onMouseMove={(e) => handle3DTilt(e, index)}
                            onMouseLeave={() => {
                                resetTilt(index);
                                setHoveredProject(null);
                            }}
                            onMouseEnter={() => setHoveredProject(index)}
                            className="glass-effect p-5 sm:p-6 rounded-xl border border-white/10 hover:border-accent/50 transition-all duration-500 group relative overflow-hidden"
                            style={{
                                transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), border 0.5s',
                            }}
                        >
                            {/* Shimmer overlay */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="absolute inset-0 animate-shimmer"></div>
                            </div>

                            {/* Glow effect */}
                            {hoveredProject === index && (
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-purple-500/20 to-pink-500/20 animate-pulse-glow rounded-xl"></div>
                            )}

                            <div className="relative z-10">
                                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-accent transition-colors duration-300 group-hover:scale-105 inline-block">
                                    {project.title}
                                </h3>
                                <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed group-hover:text-gray-300 transition-colors">
                                    {project.desc}
                                </p>

                                <div className="flex gap-3 sm:gap-4 mt-auto">
                                    {project.links.map((link, idx) => (
                                        <motion.a
                                            key={idx}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-accent transition-all duration-300 text-base sm:text-lg magnetic-hover"
                                            whileHover={{ scale: 1.2, rotate: 360 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            {link.icon}
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
