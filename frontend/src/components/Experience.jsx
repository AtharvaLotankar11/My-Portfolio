import React from 'react';
import { motion } from 'framer-motion';
import firstWork from '../assets/firstWork.png';
import secondWork from '../assets/secondWork.jpg';
import thirdWork from '../assets/thirdWork.png';
import fourthwork from '../assets/fourthwork.png';

const Experience = () => {
    const experiences = [
        {
            role: "Senior Technical Officer",
            company: "QuestIT",
            duration: "Aug 2025 - May 2026",
            desc: "• 🎓 Conducted \"CodeFlix\", a 2-day ML Workshop 🧠 where learners built a Netflix Recommendation Engine Clone 🎬 using KNN",
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

    return (
        <section id="experience" className="py-20 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-[25%] right-[20%] w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
                <div className="absolute bottom-[15%] left-[10%] w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3.5s' }}></div>
            </div>

            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500 neon-text"
                >
                    Experience
                </motion.h2>

                <div className="relative border-l-2 border-white/10 ml-4 md:ml-10 space-y-12">
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
                            className="relative pl-8 md:pl-12"
                        >
                            {/* Pulsing timeline dot */}
                            <motion.div
                                className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent border-4 border-primary animate-pulse-glow"
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

                            <div className="glass-effect p-6 rounded-xl border border-white/10 hover:border-accent/30 transition-all duration-500 hover-lift group relative overflow-hidden">
                                {/* Shimmer overlay */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="absolute inset-0 animate-shimmer"></div>
                                </div>

                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4 relative z-10">
                                    <div className="flex items-center gap-4">
                                        <motion.div
                                            className="w-12 h-12 bg-white rounded-full p-1 overflow-hidden magnetic-hover"
                                            whileHover={{ scale: 1.2, rotate: 360 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain" />
                                        </motion.div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors duration-300">{exp.role}</h3>
                                            <p className="text-accent">{exp.company}</p>
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-full group-hover:bg-accent/20 transition-colors duration-300">{exp.duration}</span>
                                </div>

                                <p className="text-gray-300 mb-4 text-sm leading-relaxed relative z-10 group-hover:text-white transition-colors">{exp.desc}</p>

                                {exp.links.length > 0 && (
                                    <div className="flex flex-wrap gap-3 relative z-10">
                                        {exp.links.map((link, idx) => (
                                            <motion.a
                                                key={idx}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs px-3 py-1 bg-accent/10 text-accent border border-accent/20 rounded hover:bg-accent hover:text-white transition-colors magnetic-hover"
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

