import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGitAlt, FaGithub, FaDocker, FaAws, FaMicrosoft, FaGoogle, FaJava, FaPython, FaReact, FaNodeJs, FaUbuntu, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { SiJenkins, SiKubernetes, SiMongodb, SiFirebase, SiSupabase, SiMysql, SiPostgresql, SiDart, SiCplusplus, SiJavascript, SiTensorflow, SiPandas, SiNumpy, SiNextdotjs, SiExpress } from 'react-icons/si';

const Skills = () => {
    const [hoveredCard, setHoveredCard] = useState(null);

    const skillCategories = [
        {
            title: "Languages",
            skills: [
                { name: "Python", icon: <FaPython /> },
                { name: "Java", icon: <FaJava /> },
                { name: "C/C++", icon: <SiCplusplus /> },
                { name: "Dart", icon: <SiDart /> },
                { name: "JavaScript (ES6+)", icon: <SiJavascript /> },
            ]
        },
        {
            title: "ML & Data",
            skills: [
                { name: "Machine Learning", icon: <span className="font-bold text-xs">ML</span> },
                { name: "TensorFlow", icon: <SiTensorflow /> },
                { name: "Computer Vision", icon: <span className="font-bold text-xs">CV</span> },
                { name: "Data Analysis", icon: <span className="font-bold text-xs">DA</span> },
                { name: "Pandas", icon: <SiPandas /> },
                { name: "NumPy", icon: <SiNumpy /> },
            ]
        },
        {
            title: "Web Dev.",
            skills: [
                { name: "React.js", icon: <FaReact /> },
                { name: "Next.js", icon: <SiNextdotjs /> },
                { name: "Node.js", icon: <FaNodeJs /> },
                { name: "Express.js", icon: <SiExpress /> },
                { name: "HTML5", icon: <FaHtml5 /> },
                { name: "CSS3", icon: <FaCss3Alt /> },
            ]
        },
        {
            title: "Databases",
            skills: [
                { name: "MySQL", icon: <SiMysql /> },
                { name: "PostgreSQL", icon: <SiPostgresql /> },
                { name: "MongoDB", icon: <SiMongodb /> },
                { name: "Firebase", icon: <SiFirebase /> },
                { name: "Supabase", icon: <SiSupabase /> },
            ]
        },
        {
            title: "DevOps",
            skills: [
                { name: "Git", icon: <FaGitAlt /> },
                { name: "GitHub", icon: <FaGithub /> },
                { name: "Docker", icon: <FaDocker /> },
                { name: "Kubernetes", icon: <SiKubernetes /> },
                { name: "Jenkins", icon: <SiJenkins /> },
                { name: "AWS", icon: <FaAws /> },
                { name: "Azure", icon: <FaMicrosoft /> },
                { name: "GCP", icon: <FaGoogle /> },
            ]
        },
        {
            title: "OS",
            skills: [
                { name: "Linux (Ubuntu)", icon: <FaUbuntu /> },
                { name: "Raspberry Pi OS", icon: <span className="font-bold text-[10px] leading-tight text-center">Pi<br/>OS</span> },
                { name: "MacOS", icon: <span className="font-bold text-xs">Mac</span> },
            ]
        }
    ];

    return (
        <section id="skills" className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-[20%] right-[5%] sm:right-[10%] w-56 sm:w-64 md:w-72 h-56 sm:h-64 md:h-72 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-[30%] left-[5%] sm:left-[15%] w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 text-center text-accent font-display tracking-widest uppercase drop-shadow-[0_0_10px_rgba(152,174,179,0.3)]"
                >
                    Skills
                </motion.h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, rotateY: 90 }}
                            whileInView={{ opacity: 1, rotateY: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: index * 0.1,
                                type: "spring",
                                stiffness: 100
                            }}
                            onMouseEnter={() => setHoveredCard(index)}
                            onMouseLeave={() => setHoveredCard(null)}
                            className="glass-effect p-4 sm:p-5 md:p-6 rounded-xl border border-white/10 hover:border-accent/50 transition-all duration-500 hover-lift relative overflow-hidden group"
                        >
                            {/* Shimmer effect on hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="absolute inset-0 animate-shimmer"></div>
                            </div>

                            {/* Glow effect */}
                            {hoveredCard === index && (
                                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-earth/5 animate-pulse-glow rounded-xl"></div>
                            )}

                            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-5 md:mb-6 text-center text-white relative z-10 group-hover:text-accent transition-colors duration-300">
                                {category.title}
                            </h3>
                            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 relative z-10">
                                {category.skills.map((skill, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="flex flex-col items-center group/skill"
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            delay: index * 0.1 + idx * 0.05,
                                            type: "spring",
                                            stiffness: 200
                                        }}
                                    >
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-[#0B0808] rounded-full text-xl sm:text-2xl text-gray-400 group-hover/skill:text-accent group-hover/skill:scale-110 sm:group-hover/skill:scale-125 transition-all duration-300 mb-1.5 sm:mb-2 magnetic-hover animate-glow-pulse">
                                            {skill.icon}
                                        </div>
                                        <span className="text-[10px] sm:text-xs text-center text-gray-500 group-hover/skill:text-white transition-colors w-16 sm:w-20 leading-tight">
                                            {skill.name}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
