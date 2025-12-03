import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGitAlt, FaGithub, FaDocker, FaAws, FaMicrosoft, FaGoogle, FaJava, FaPython, FaReact, FaNodeJs, FaUbuntu } from 'react-icons/fa';
import { SiJenkins, SiKubernetes, SiAutocad, SiKicad, SiOpenscad, SiMongodb, SiFirebase, SiSupabase, SiMysql, SiDart, SiCplusplus, SiC } from 'react-icons/si';

const Skills = () => {
    const [hoveredCard, setHoveredCard] = useState(null);

    const skillCategories = [
        {
            title: "Automation",
            skills: [
                { name: "Git", icon: <FaGitAlt /> },
                { name: "GitHub", icon: <FaGithub /> },
                { name: "Jenkins", icon: <SiJenkins /> },
                { name: "Docker", icon: <FaDocker /> },
                { name: "Kubernetes", icon: <SiKubernetes /> },
            ]
        },
        {
            title: "CAD/CAM",
            skills: [
                { name: "AutoCAD", icon: <SiAutocad /> },
                { name: "KiCad", icon: <SiKicad /> },
                { name: "OpenSCAD", icon: <SiOpenscad /> },
            ]
        },
        {
            title: "Cloud",
            skills: [
                { name: "AWS", icon: <FaAws /> },
                { name: "Azure", icon: <FaMicrosoft /> },
                { name: "GCP", icon: <FaGoogle /> },
            ]
        },
        {
            title: "Databases",
            skills: [
                { name: "MySQL", icon: <SiMysql /> },
                { name: "MongoDB", icon: <SiMongodb /> },
                { name: "Firebase", icon: <SiFirebase /> },
                { name: "Supabase", icon: <SiSupabase /> },
            ]
        },
        {
            title: "Languages",
            skills: [
                { name: "C", icon: <SiC /> },
                { name: "C++", icon: <SiCplusplus /> },
                { name: "Java", icon: <FaJava /> },
                { name: "Python", icon: <FaPython /> },
                { name: "MERN", icon: <FaReact /> },
                { name: "Dart", icon: <SiDart /> },
                { name: "VB", icon: <span className="font-bold text-xs">VB</span> },
            ]
        },
        {
            title: "OS",
            skills: [
                { name: "Ubuntu", icon: <FaUbuntu /> },
                { name: "Raspbian", icon: <span className="font-bold text-xs">Pi</span> },
                { name: "OpenStack", icon: <span className="font-bold text-xs">OS</span> },
                { name: "MacOS", icon: <span className="font-bold text-xs">Mac</span> },
            ]
        }
    ];

    return (
        <section id="skills" className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-[20%] right-[5%] sm:right-[10%] w-56 sm:w-64 md:w-72 h-56 sm:h-64 md:h-72 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-[30%] left-[5%] sm:left-[15%] w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-500 to-pink-500 neon-text"
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
                                <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-purple-500/10 to-pink-500/10 animate-pulse-glow rounded-xl"></div>
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
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-primary rounded-full text-xl sm:text-2xl text-gray-400 group-hover/skill:text-accent group-hover/skill:scale-110 sm:group-hover/skill:scale-125 transition-all duration-300 mb-1.5 sm:mb-2 magnetic-hover animate-glow-pulse">
                                            {skill.icon}
                                        </div>
                                        <span className="text-[10px] sm:text-xs text-gray-500 group-hover/skill:text-white transition-colors">
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
