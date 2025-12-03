import React, { useState } from 'react';
import { motion } from 'framer-motion';
import fourthwork from '../assets/fourthwork.png';
import jrclg from '../assets/jrclg.png';
import school from '../assets/school.jpg';

const Education = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const educationData = [
        {
            institution: "Vivekanand Education Society's Institute of Technology",
            degree: "B.E. in Information Technology",
            details: "Minors in Cloud Computing. Aggregate CGPA: 9.875",
            duration: "Sep 2023 - May 2027",
            logo: fourthwork
        },
        {
            institution: "People's Education Society, English Medium High School and Junior College",
            degree: "HSC Science Stream",
            details: "Maharashtra State Board. Percentage: 90.33%",
            duration: "Aug 2021 - May 2023",
            logo: jrclg
        },
        {
            institution: "Billabong High International School, Thane",
            degree: "ICSE 10th Grade",
            details: "CISCE Board. Percentage: 98.17%",
            duration: "Dec 2008 - Jul 2021",
            logo: school
        }
    ];

    return (
        <section id="education" className="py-12 sm:py-16 md:py-20 bg-secondary/30 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-[30%] left-[5%] w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-[10%] right-[5%] sm:right-[20%] w-60 sm:w-72 md:w-80 h-60 sm:h-72 md:h-80 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-500 to-pink-500 neon-text"
                >
                    Education
                </motion.h2>

                <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
                    {educationData.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, rotateX: -90 }}
                            whileInView={{ opacity: 1, rotateX: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: index * 0.2,
                                type: "spring",
                                stiffness: 100
                            }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="glass-effect p-4 sm:p-5 md:p-6 rounded-xl border border-white/10 flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-5 md:gap-6 hover-lift group relative overflow-hidden"
                        >
                            {/* Shimmer overlay */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="absolute inset-0 animate-shimmer"></div>
                            </div>

                            {/* Glow effect */}
                            {hoveredIndex === index && (
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-purple-500/20 to-pink-500/20 animate-pulse-glow rounded-xl"></div>
                            )}

                            <motion.div
                                className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-white rounded-lg p-2 overflow-hidden magnetic-hover relative z-10"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <img src={edu.logo} alt={edu.institution} className="w-full h-full object-contain" />
                            </motion.div>
                            <div className="flex-1 text-center md:text-left relative z-10">
                                <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 sm:mb-2 group-hover:text-accent transition-colors duration-300">{edu.institution}</h3>
                                <p className="text-accent font-medium mb-1 text-sm sm:text-base">{edu.degree}</p>
                                <p className="text-gray-400 text-xs sm:text-sm mb-2 group-hover:text-gray-300 transition-colors">{edu.details}</p>
                                <motion.span
                                    className="inline-block px-2.5 sm:px-3 py-1 bg-accent/10 text-accent text-[10px] sm:text-xs rounded-full border border-accent/20"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    {edu.duration}
                                </motion.span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
