import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useDragControls } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaFileAlt } from 'react-icons/fa';

// Import project images
import myPortfolioImg from '../assets/project_images/myPortfolio.png';
import sentiqoImg from '../assets/project_images/sentiqo.jpg';
import officepulseImg from '../assets/project_images/officepulse.png';
import retailPulseImg from '../assets/project_images/retailpulse_image.png';
import greenforkImg from '../assets/project_images/greenfork.png';
import railwayImg from '../assets/project_images/railway_cust_java.jpg';
import compliflowImg from '../assets/project_images/compliflow_img.png';
import instagramWrapImg from '../assets/project_images/Instagram_wrap.png';
import attensiaImg from '../assets/project_images/attensia_pic.png';
import clinifyImg from '../assets/project_images/clinify_his.png';
import nexCartImg from '../assets/project_images/nexCart.png';

const Projects = () => {
    const [hoveredProject, setHoveredProject] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const controls = useAnimation();
    const containerRef = useRef(null);
    const dragControls = useDragControls();

    const projects = [
        {
            title: "RetailPulse – AI Powered Customer Analytics & Demand Forecasting Platform",
            desc: "Developed a retail analytics platform that transforms transaction data into meaningful business insights. It helps analyze customer behavior, forecast future sales, identify customers at risk of churn, and support inventory planning through interactive dashboards. Deployed with Docker to enable scalable and consistent analytics across different environments.",
            image: retailPulseImg,
            links: [
                { icon: <FaGithub />, url: "https://github.com/AtharvaLotankar11/RetailPulse---Data-Analytics-Project.git" },
                { icon: <FaExternalLinkAlt />, url: "https://retailpulse-analytics.streamlit.app/" },
                { icon: <FaFileAlt />, url: "https://drive.google.com/file/d/17KfUNVuVrT0KLz6WRdIed7F2V5YSdQVT/view?usp=drive_link" }
            ]
        },
        {
            title: "Sentiqo AI: Social Media Sentimental Analysis",
            desc: "Built a multi-tenant NLP sentiment analysis platform using React and Django, featuring a Hybrid Ensemble ML model for real-time brand monitoring, bulk CSV ingestion, Recharts-powered trend visualization, and JWT-secured analyst dashboards.",
            image: sentiqoImg,
            links: [
                { icon: <FaGithub />, url: "https://github.com/AtharvaLotankar11/Sentiqo-AI---Social-Media-Sentimental-Analysis.git" },
                { icon: <FaFileAlt />, url: "https://drive.google.com/file/d/10XwzbOtdMhHNPPaG7b89Vgwae3h1n_iB/view?usp=drive_link" }
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
                { icon: <FaGithub />, url: "https://github.com/AtharvaLotankar11/Clinify_Hospital_Project.git" },
                { icon: <FaFileAlt />, url: "https://drive.google.com/file/d/1FlrtbpZICt9mf9TP31nVCJFPKjUcfdWn/view?usp=drive_link" }
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

    // Duplicate projects for seamless loop
    const duplicatedProjects = [...projects, ...projects];

    // Start animation when component mounts
    useEffect(() => {
        if (!isPaused && !isMouseDown) {
            controls.start({
                x: [0, -100 * projects.length],
                transition: {
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: projects.length * 5, // Increased speed (reduced from 8 to 5)
                        ease: "linear"
                    }
                }
            });
        } else {
            controls.stop();
        }
    }, [isPaused, isMouseDown, controls, projects.length]);

    const handleMouseDown = () => {
        setIsMouseDown(true);
        setIsPaused(true);
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
        setIsPaused(false);
    };

    const handleTouchStart = () => {
        setIsMouseDown(true);
        setIsPaused(true);
    };

    const handleTouchEnd = () => {
        setIsMouseDown(false);
        setIsPaused(false);
    };

    const handleDragEnd = (event, info) => {
        // Resume animation after drag ends
        setIsMouseDown(false);
        setIsPaused(false);
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

                {/* Marquee Container */}
                <div 
                    className="relative overflow-hidden"
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    style={{ cursor: isMouseDown ? 'grabbing' : 'grab' }}
                >
                    {/* Gradient overlays for fade effect */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-[#0B0808] to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-[#0B0808] to-transparent z-10 pointer-events-none"></div>

                    {/* Scrolling Projects */}
                    <motion.div
                        ref={containerRef}
                        className="flex gap-6 sm:gap-8"
                        animate={controls}
                        drag="x"
                        dragConstraints={{ left: -100 * projects.length, right: 0 }}
                        dragElastic={0.1}
                        dragMomentum={true}
                        onDragStart={() => {
                            setIsMouseDown(true);
                            setIsPaused(true);
                        }}
                        onDragEnd={handleDragEnd}
                        style={{ 
                            width: 'fit-content',
                            touchAction: 'pan-y' // Allow vertical scroll while enabling horizontal swipe
                        }}
                    >
                        {duplicatedProjects.map((project, index) => (
                            <motion.div
                                key={index}
                                onMouseEnter={() => setHoveredProject(index)}
                                onMouseLeave={() => setHoveredProject(null)}
                                className="glass-effect p-5 sm:p-6 rounded-xl border border-white/10 hover:border-accent/50 transition-all duration-500 group relative overflow-hidden flex-shrink-0"
                                style={{
                                    width: '380px',
                                    maxWidth: '90vw',
                                    pointerEvents: isMouseDown ? 'none' : 'auto' // Prevent card interactions while dragging
                                }}
                                whileHover={!isMouseDown ? { scale: 1.05 } : {}}
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

                                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-accent transition-colors duration-300 line-clamp-2">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed group-hover:text-gray-300 transition-colors line-clamp-3">
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
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {link.icon}
                                            </motion.a>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Pause indicator */}
                {isMouseDown && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mt-6 text-accent/70 text-sm"
                    >
                        ⏸ Paused - Release to continue scrolling
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Projects;
