import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaFileAlt } from 'react-icons/fa';

// Import project images
import myPortfolioImg from '../assets/project_images/myPortfolio.png';

import officepulseImg from '../assets/project_images/officepulse.png';

import greenforkImg from '../assets/project_images/greenfork.png';
import railwayImg from '../assets/project_images/railway_cust_java.jpg';
import compliflowImg from '../assets/project_images/compliflow_img.png';
import instagramWrapImg from '../assets/project_images/Instagram_wrap.png';
import attensiaImg from '../assets/project_images/attensia_pic.png';
import clinifyImg from '../assets/project_images/clinify_his.png';
import nexCartImg from '../assets/project_images/nexCart.png';

const Projects = () => {
    const [hoveredProject, setHoveredProject] = useState(null);
    const cardRefs = useRef([]);

    const projects = [
        {
            title: "Sentiqo AI: Social Media Sentimental Analysis",
            desc: "Built a multi-tenant NLP sentiment analysis platform using React and Django, featuring a Hybrid Ensemble ML model for real-time brand monitoring, bulk CSV ingestion, Recharts-powered trend visualization, and JWT-secured analyst dashboards.",
            image: nexCartImg,
            links: [
                { icon: <FaGithub />, url: "https://github.com/AtharvaLotankar11/Sentiqo-AI---Social-Media-Sentimental-Analysis.git" }
            ]
        },
        {
            title: "NexCart AI – Predictive E-Commerce Platform",
            desc: "Engineered an AI-driven full-stack e-commerce platform using Next.js and Django REST, featuring LSTM-based predictive modeling for personalized recommendations and Ethereum smart contracts for immutable order tracking.",
            image: nexCartImg,
            links: [
                { icon: <FaGithub />, url: "https://github.com/AtharvaLotankar11/NexCart-DL_Project_using_LSTM.git" }
            ]
        },
        {
            title: "Clinify – Smart Hospital Information Ecosystem",
            desc: "Designed modular AI-enabled HIS using Django, PostgreSQL, React, REST APIs, RBAC dashboards, Gemini-powered NLP summarization, voice notes, intelligent scheduling automation.",
            image: clinifyImg,
            links: [
                { icon: <FaGithub />, url: "https://github.com/AtharvaLotankar11/Clinify_Hospital_Project.git" }
            ]
        },
        {
            title: "Instagram Wrapped: a Next JS Project",
            desc: "Instagram Wrapped–inspired Next.js project generating personalized insight slides from Instagram metadata, including Interaction Key, Night Owl, Doom Scroller, Power Poster, and Group Chat analytics.",
            image: instagramWrapImg,
            links: [
                { icon: <FaGithub />, url: "https://github.com/AtharvaLotankar11/Instagram-Wrapped-Project.git" }
            ]
        },
        {
            title: "Attensia – Smart Attendance Management Application",
            desc: "Cross-platform Flutter mobile app for academic attendance tracking with MVC architecture, Supabase backend, and PostgreSQL. Features real-time attendance calculation, intelligent timetable management, data analytics, secure authentication, and neo-brutal UI with Material Design 3 across Android and iOS.",
            image: attensiaImg,
            links: [
                { icon: <FaGithub />, url: "https://github.com/AtharvaLotankar11/Attensia.git" }
            ]
        },
        {
            title: "CompliFlow: A Complaint/Issue Tracking System",
            desc: "An AI-powered MERN platform for real-time complaint and issue tracking, enabling 40% faster resolution, workflow automation, role-based access, and analytics for enterprise-grade management.",
            image: compliflowImg,
            links: [
                { icon: <FaGithub />, url: "https://github.com/AtharvaLotankar11/CompliFlow_Website.git" }
            ]
        },
        {
            title: "FERN Based Portfolio",
            desc: "Engineered full-stack portfolio using Firebase, Express, React, Node.js with 10+ interactive sections, Deployed responsive design achieving 95% performance score and seamless cross-device compatibility.",
            image: myPortfolioImg,
            links: [
                { icon: <FaGithub />, url: "https://github.com/AtharvaLotankar11/My-Portfolio.git" },
                { icon: <FaExternalLinkAlt />, url: "https://atharva-lotankar-portfolio.onrender.com/" }
            ]
        },

        {
            title: "OfficePulse",
            desc: "Built smart desk management system using Chart.js, boosting booking efficiency 50%, Integrated GROQ SDK for AI analytics, improving workspace optimization by 3x.",
            image: officepulseImg,
            links: [
                { icon: <FaGithub />, url: "https://github.com/AtharvaLotankar11/OfficePulse_Project.git" },
                { icon: <FaExternalLinkAlt />, url: "https://officepulse-frontend.onrender.com/" }
            ]
        },

        {
            title: "GreenFork",
            desc: "Developed responsive GreenFork platform reducing food waste through surprise bags 40%, Integrated Firebase notifications enabling real-time donations.",
            image: greenforkImg,
            links: [
                { icon: <FaGithub />, url: "https://github.com/AtharvaLotankar11/GreenFork---Field-Project.git" },
                { icon: <FaExternalLinkAlt />, url: "https://greenfork-jade.vercel.app/index.html" },
                { icon: <FaFileAlt />, url: "https://drive.google.com/file/d/1tHJ5wZJ07ukBEksNFJkZSL7ioQGmYrgn/view" }
            ]
        },
        {
            title: "Railways & Customers",
            desc: "Developed Java OOP system for railway data, improving booking process 30%, Engineered GUI forms using Swing for efficient train, customer data handling.",
            image: railwayImg,
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
        <section id="projects" className="py-12 sm:py-16 md:py-20 bg-[#0B0808]/50 backdrop-blur-sm border-y border-white/5 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-[10%] left-[5%] w-60 sm:w-72 md:w-80 h-60 sm:h-72 md:h-80 bg-earth/10 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-[20%] right-[5%] sm:right-[10%] w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 text-center text-accent font-display tracking-widest uppercase drop-shadow-[0_0_10px_rgba(152,174,179,0.3)]"
                >
                    Projects
                </motion.h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            ref={(el) => (cardRefs.current[index] = el)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: index * 0.1,
                                duration: 0.5,
                                ease: "easeOut"
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
                                {/* Project Image */}
                                <div className="mb-4 overflow-hidden rounded-lg border-2 border-white/10 group-hover:border-accent/50 transition-all duration-300">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>

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
