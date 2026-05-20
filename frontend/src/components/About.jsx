import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="py-12 sm:py-16 md:py-20 bg-[#0B0808]/50 backdrop-blur-sm border-y border-white/5 relative overflow-hidden">
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
                        <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-accent relative z-10 group-hover:scale-105 transition-transform duration-300">🎓 𝐄𝐝𝐮𝐜𝐚𝐭𝐢𝐨𝐧 𝐚𝐧𝐝 𝐓𝐞𝐜𝐡𝐧𝐢𝐜𝐚𝐥 𝐅𝐨𝐮𝐧𝐝𝐚𝐭𝐢𝐨𝐧</h3>
                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed relative z-10 group-hover:text-white transition-colors">
                            Currently pursuing a B.E. in Information Technology at Vivekanand Education Society's Institute of Technology, with a strong academic foundation in Data Science, Machine Learning, Deep Learning, and Software Engineering. Proficient in Python, Java, SQL, C/C++, and JavaScript, with practical experience in modern development frameworks including Next.js, Django, PostgreSQL, and the MERN stack.
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
                        <h3 className="text-xl font-semibold mb-4 text-accent relative z-10 group-hover:scale-105 transition-transform duration-300">📊 𝐀𝐫𝐞𝐚𝐬 𝐨𝐟 𝐈𝐧𝐭𝐞𝐫𝐞𝐬𝐭 𝐚𝐧𝐝 𝐄𝐱𝐩𝐞𝐫𝐭𝐢𝐬𝐞</h3>
                        <p className="text-gray-300 leading-relaxed relative z-10 group-hover:text-white transition-colors">
                            Primarily focused on Data Analytics, Data Science, and AI/ML, applying data-driven methodologies to build intelligent and impactful solutions. Hands-on experience across domains such as predictive analytics, automation, computer vision, sentiment analysis, and AI-powered applications. Additionally interested in full-stack development, with a preference for building scalable applications using Next.js, Django, and PostgreSQL.
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
                        <h3 className="text-xl font-semibold mb-4 text-accent relative z-10 group-hover:scale-105 transition-transform duration-300">🚀 𝐏𝐫𝐨𝐟𝐞𝐬𝐬𝐢𝐨𝐧𝐚𝐥 𝐀𝐬𝐩𝐢𝐫𝐚𝐭𝐢𝐨𝐧𝐬</h3>
                        <p className="text-gray-300 leading-relaxed relative z-10 group-hover:text-white transition-colors">
                            Continuously strengthening expertise in Data Structures & Algorithms, backend engineering, and applied AI. Aspiring to contribute as a Data Scientist or Machine Learning Engineer, while developing strong full-stack capabilities to bridge advanced intelligence with seamless user experiences.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
