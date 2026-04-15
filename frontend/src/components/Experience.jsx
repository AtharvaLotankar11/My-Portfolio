import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import firstWork from '../assets/firstWork.png';
import secondWork from '../assets/secondWork.jpg';
import thirdWork from '../assets/thirdWork.png';
import fourthwork from '../assets/fourthwork.png';
import vaidsysIntern from '../assets/vaidsysIntern.png';

const Experience = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const experienceSection = document.getElementById('experience');
            if (!experienceSection) return;

            const rect = experienceSection.getBoundingClientRect();
            const sectionHeight = experienceSection.offsetHeight;
            const windowHeight = window.innerHeight;
            
            // Start movement when section comes into view
            let progress = 0;
            if (rect.top <= windowHeight && rect.bottom >= 0) {
                // Calculate how much of the section has been scrolled through
                const scrolled = Math.max(0, windowHeight - rect.top);
                const totalScrollable = sectionHeight + windowHeight;
                progress = Math.min(1, scrolled / totalScrollable);
            }
            
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const experiences = [
        {
            role: "Data Science Intern",
            company: "Vaidsys Technologies",
            duration: "Apr 2026 - May 2026",
            desc: "Built NLP-based sentiment analysis on social media data enabling trend and polarity insights. Performed healthcare data analytics deriving actionable insights using Python-based pipelines.",
            logo: vaidsysIntern,
            links: []
        },
        {
            role: "Senior Technical Officer",
            company: "QuestIT Council - IT Department, VESIT",
            duration: "Aug 2025 - May 2026",
            desc: "During my tenure, I led the 'CodeFlix' ML workshop, guiding over 30 students to build and implement a KNN-based recommendation engine, achieving a 95% project completion rate. Beyond technical mentorship, I initiated the council's first O2O sponsorship transaction for the GENESIS 2026 Hackathon—a major event engaging 200+ participants and 3 judging panels. I also took charge of our digital presence by redesigning the QuestIT council website, engineering the complete frontend and partial backend architecture to streamline operations for our 50+ members.",
            logo: firstWork,
            links: []
        },
        {
            role: "AI & ML Project Intern",
            company: "Vision Sports Reconnect Pvt. Ltd.",
            duration: "June 2025 - Sep 2025",
            desc: "My team and I built an AI-powered snooker scoring system using Python, combining YOLO for object detection, DeepSort for real-time tracking, and OpenCV for video processing to enable live ball and cue-action detection with instant score updates. The solution was selected for the Intern to Innovator Start-up Challenge 2025 by VESIT and won 3rd prize as Best Startup.",
            logo: secondWork,
            links: [
                { label: "Github Repo", url: "https://github.com/AtharvaLotankar11/Snooker-Scoring-via-Video-Analytics-Project.git" },
                { label: "Certificate", url: "https://drive.google.com/file/d/1q07ZYcK5BF9Brdi7dHuq_uuHgNGziYR9/view?usp=sharing" }
            ]
        },
        {
            role: "Data Analyst Project Intern",
            company: "Electrolyte Solutions",
            duration: "May 2025 - Aug 2025",
            desc: "I led a team in a four-month CRM project focused on managing and optimizing large datasets of AtomBerg to improve visibility into customer and technician issue handling. Transformed raw data into structured Excel formats, leveraging PivotTables and advanced spreadsheet techniques. Utilized Power BI for dynamic data visualization.",
            logo: thirdWork,
            links: [
                { label: "Github Repo", url: "https://github.com/AtharvaLotankar11/Electrolyte-Solutions-Internship.git" },
                { label: "Certificate", url: "https://drive.google.com/file/d/1LpGCWEarYQkom_LYEM81M0iz2kDKZrXe/view?usp=sharing" }
            ]
        },
        {
            role: "Agentic AI Project Intern",
            company: "VESIT",
            duration: "May 2025 - Aug 2025",
            desc: "My team and I spent three months at VESIT developing a Multi-Agent AI Website Builder capable of generating deployment-ready code from a single prompt. We then expanded this work into the Agentic AI project and entered the Intern to Innovator Start-up Challenge 2025, where our idea, design, and consistent innovation earned us the 2nd prize for Best Idea & Design.",
            logo: fourthwork,
            links: [
                { label: "Github Repo", url: "https://github.com/AtharvaLotankar11/Autogen_Mini_Projects.git" },
                { label: "Certificate", url: "https://drive.google.com/file/d/1HNQyuAjgEF2vbxsHL2eznAXZSH2ys3dJ/view?usp=sharing" }
            ]
        }
    ];

    // Calculate rocket position - starts at apex (top) and moves slowly to the end
    const rocketPosition = scrollProgress * 100; // Moves from 0% (top) to 100% (bottom)

    return (
        <section id="experience" className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-[25%] right-[5%] sm:right-[20%] w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
                <div className="absolute bottom-[15%] left-[5%] sm:left-[10%] w-60 sm:w-72 md:w-80 h-60 sm:h-72 md:h-80 bg-earth/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3.5s' }}></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 text-center text-accent font-display tracking-widest uppercase drop-shadow-[0_0_10px_rgba(152,174,179,0.3)]"
                >
                    Experience
                </motion.h2>

                <div className="relative border-l-2 border-white/10 ml-3 sm:ml-4 md:ml-10 space-y-8 sm:space-y-10 md:space-y-12">
                    {/* Animated Rocket */}
                    <motion.div
                        className="absolute -left-[30px] sm:-left-[35px] z-20 pointer-events-none"
                        style={{
                            top: `${rocketPosition}%`,
                        }}
                        animate={{
                            rotate: scrollProgress > 0.5 ? [0, 5, -5, 0] : [0, -5, 5, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        {/* Rocket SVG - Increased Size */}
                        <div className="relative">
                            <svg 
                                width="60" 
                                height="60" 
                                viewBox="0 0 100 100" 
                                className="drop-shadow-lg"
                            >
                                {/* Rocket Body */}
                                <ellipse cx="50" cy="45" rx="15" ry="30" fill="url(#rocketGradient)" stroke="#38bdf8" strokeWidth="2"/>
                                
                                {/* Rocket Nose */}
                                <path d="M35 18 L50 8 L65 18 Z" fill="#ec4899" stroke="#38bdf8" strokeWidth="1"/>
                                
                                {/* Rocket Fins */}
                                <path d="M35 65 L28 80 L35 75 Z" fill="#a855f7" stroke="#38bdf8" strokeWidth="1"/>
                                <path d="M65 65 L72 80 L65 75 Z" fill="#a855f7" stroke="#38bdf8" strokeWidth="1"/>
                                
                                {/* Window */}
                                <circle cx="50" cy="35" r="8" fill="#38bdf8" opacity="0.8"/>
                                <circle cx="50" cy="35" r="6" fill="#ffffff" opacity="0.9"/>
                                
                                {/* Flame */}
                                <motion.path 
                                    d="M42 75 L50 92 L58 75 L54 82 L46 82 Z" 
                                    fill="url(#flameGradient)"
                                    animate={{
                                        scaleY: [1, 1.3, 0.8, 1.2, 1],
                                        opacity: [0.8, 1, 0.6, 1, 0.8]
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                                
                                {/* Gradients */}
                                <defs>
                                    <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#38bdf8" />
                                        <stop offset="50%" stopColor="#a855f7" />
                                        <stop offset="100%" stopColor="#ec4899" />
                                    </linearGradient>
                                    <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#fbbf24" />
                                        <stop offset="50%" stopColor="#f97316" />
                                        <stop offset="100%" stopColor="#dc2626" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            
                            {/* Rocket Trail */}
                            <motion.div
                                className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-2 bg-gradient-to-t from-accent to-transparent rounded-full"
                                style={{
                                    height: `${Math.max(0, scrollProgress * 120)}px`,
                                }}
                                animate={{
                                    opacity: [0.3, 0.7, 0.3],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        </div>
                    </motion.div>

                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: index * 0.2,
                                type: "spring",
                                stiffness: 80
                            }}
                            className="relative pl-6 sm:pl-8 md:pl-12"
                        >
                            {/* Pulsing timeline dot */}
                            <motion.div
                                className="absolute -left-[7px] sm:-left-[9px] top-0 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-accent border-2 sm:border-4 border-primary animate-pulse-glow"
                                animate={{
                                    scale: [1, 1.3, 1],
                                    boxShadow: [
                                        "0 0 0 0 rgba(56, 189, 248, 0.7)",
                                        "0 0 0 10px rgba(56, 189, 248, 0)",
                                        "0 0 0 0 rgba(56, 189, 248, 0)"
                                    ]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatDelay: 1
                                }}
                            ></motion.div>

                            <div className="glass-effect p-4 sm:p-5 md:p-6 rounded-xl border border-white/10 hover:border-accent/30 transition-all duration-500 hover-lift group relative overflow-hidden">
                                {/* Shimmer overlay */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="absolute inset-0 animate-shimmer"></div>
                                </div>

                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 sm:mb-4 gap-3 sm:gap-4 relative z-10">
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <motion.div
                                            className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full p-1 overflow-hidden magnetic-hover flex-shrink-0"
                                            whileHover={{ scale: 1.15, rotate: 360 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain" />
                                        </motion.div>
                                        <div>
                                            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white group-hover:text-accent transition-colors duration-300">{exp.role}</h3>
                                            <p className="text-accent text-sm sm:text-base">{exp.company}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs sm:text-sm text-gray-400 bg-white/5 px-2.5 sm:px-3 py-1 rounded-full group-hover:bg-accent/10 transition-colors duration-300 self-start md:self-auto">{exp.duration}</span>
                                </div>

                                <p className="text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed relative z-10 group-hover:text-white transition-colors">{exp.desc}</p>

                                {exp.links.length > 0 && (
                                    <div className="flex flex-wrap gap-2 sm:gap-3 relative z-10">
                                        {exp.links.map((link, idx) => (
                                            <motion.a
                                                key={idx}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 bg-accent/10 text-accent border border-accent/20 rounded hover:bg-accent hover:text-white transition-colors magnetic-hover"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {link.label}
                                            </motion.a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;

