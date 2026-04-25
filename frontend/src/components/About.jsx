import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="py-6 sm:py-8 md:py-10 bg-[#0B0808]/50 backdrop-blur-sm border-y border-white/5 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-[15%] left-[5%] sm:left-[10%] w-60 sm:w-72 md:w-80 h-60 sm:h-72 md:h-80 bg-accent/10 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-[25%] right-[5%] sm:right-[15%] w-56 sm:w-64 md:w-72 h-56 sm:h-64 md:h-72 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2.5s' }}></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 text-center text-accent font-display tracking-widest uppercase drop-shadow-[0_0_10px_rgba(152,174,179,0.3)]"
                >
                    About Me
                </motion.h2>

                <div className="grid md:grid-cols-1 gap-6 sm:gap-8 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.3, y: -50 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                        className="glass-effect p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-white/10 hover:border-accent/30 transition-all duration-500 shadow-xl hover-lift group relative overflow-hidden"
                    >
                        {/* Shimmer overlay */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="absolute inset-0 animate-shimmer"></div>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-accent relative z-10 group-hover:scale-105 transition-transform duration-300">🎓 Education & Skills</h3>
                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed relative z-10 group-hover:text-white transition-colors">
                            I'm currently pursuing a B.E. in Information Technology at Vivekanand Education Society's Institute of Technology (VESIT), building a strong foundation in computer science, software development, and IT domains. I've gained hands-on experience with languages and technologies like Java, Python, C/C++, MySQL and PostgreSQL, HTML/CSS/JS, Django, Bash, Dart, and MERN.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.3, y: -50 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                        className="glass-effect p-8 rounded-2xl border border-white/10 hover:border-accent/30 transition-all duration-500 shadow-xl hover-lift group relative overflow-hidden"
                    >
                        {/* Shimmer overlay */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="absolute inset-0 animate-shimmer"></div>
                        </div>
                        <h3 className="text-xl font-semibold mb-4 text-accent relative z-10 group-hover:scale-105 transition-transform duration-300">💡 Interests and Focus</h3>
                        <p className="text-gray-300 leading-relaxed relative z-10 group-hover:text-white transition-colors">
                            Beyond web development, I'm passionate about programming languages, databases, scripting, and cloud solutions. I actively explore emerging tech like AI, Generative AI, and automation to drive innovation.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.3, y: -50 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
                        className="glass-effect p-8 rounded-2xl border border-white/10 hover:border-accent/30 transition-all duration-500 shadow-xl hover-lift group relative overflow-hidden"
                    >
                        {/* Shimmer overlay */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="absolute inset-0 animate-shimmer"></div>
                        </div>
                        <h3 className="text-xl font-semibold mb-4 text-accent relative z-10 group-hover:scale-105 transition-transform duration-300">🚀 Goals and Mindset</h3>
                        <p className="text-gray-300 leading-relaxed relative z-10 group-hover:text-white transition-colors">
                            With growing expertise in data structures and algorithms, I aim to create scalable, user-focused solutions. I'm driven by curiosity, continuous learning, and a desire to contribute as a Full Stack Developer to impactful, boundary-pushing projects.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
