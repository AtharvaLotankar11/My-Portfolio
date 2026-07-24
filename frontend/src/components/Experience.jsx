import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import firstWork from '../assets/firstWork.png';
import secondWork from '../assets/secondWork.jpg';
import thirdWork from '../assets/thirdWork.png';
import fourthwork from '../assets/fourthwork.png';
import vaidsysIntern from '../assets/vaidsysIntern.png';
import zidioIntern from '../assets/zidioIntern.png';

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
            role: "Data Science & Analytics Intern",
            company: "Zidio Development",
            duration: "May 2026 - Jun 2026",
            desc: "During my 1-month internship at Zidio Development, I worked on the RetailPulse project as part of a four-member Data Science & Analytics team. My primary responsibility was serving as the Dashboard & Deployment Lead, where I developed and integrated the Streamlit-based dashboard, connected outputs from customer analytics, demand forecasting, churn prediction, and inventory optimization modules, and managed project deployment and GitHub collaboration. One of the key challenges I faced was integrating multiple machine learning components into a single interactive application while ensuring smooth functionality, data consistency, and an intuitive user experience. Through continuous testing, debugging, and team coordination, I successfully contributed to delivering a fully functional end-to-end retail analytics platform, strengthening my practical skills in data science, dashboard development, deployment, and collaborative project execution.",
            logo: zidioIntern,
            links: [
                { label: "Internship Offer Letter", url: "https://drive.google.com/file/d/1cELoDPZJy-W-JBHlnkjjmtThiufXQZab/view?usp=drive_link" },
                { label: "RetailPulse - Data Sci Project", url: "https://github.com/AtharvaLotankar11/RetailPulse---Data-Analytics-Project.git" },
                { label: "RetailPulse Website", url: "https://retailpulse-analytics.streamlit.app/" },
                { label: "Internship Project Report", url: "https://drive.google.com/file/d/17KfUNVuVrT0KLz6WRdIed7F2V5YSdQVT/view?usp=drive_link" },
                { label: "Internship Certificate", url: "https://drive.google.com/file/d/1bFGA66T88pTsf08sl6Nq_AtUV57kOEp3/view?usp=drive_link" },
                { label: "Certificate of Training", url: "https://drive.google.com/file/d/1y2txzRtoZHvwjb2tNu7KWpH9xpaoGHNb/view?usp=drive_link" }
            ]
        },
        {
            role: "Data Science Intern",
            company: "Vaidsys Technologies",
            duration: "Apr 2026 - May 2026",
            desc: "Developed an NLP-based sentiment analysis system on social media data, performing preprocessing, feature engineering, and classification to derive sentiment trends and actionable insights for brand monitoring. Additionally, built Python-based healthcare data analytics pipelines to clean and analyze patient data, applied exploratory analysis and predictive modeling, and generated insights to improve decision-making and resource optimization.",
            logo: vaidsysIntern,
            links: [
                { label: "Internship Offer Letter", url: "https://drive.google.com/file/d/1QfEW4I7bewMeRAfyXOaUNCBcq-ooXp7p/view?usp=drive_link" },
                { label: "Sentiqo AI", url: "https://github.com/AtharvaLotankar11/Sentiqo-AI---Social-Media-Sentimental-Analysis.git" },
                { label: "Clinify EHR", url: "https://github.com/AtharvaLotankar11/Clinify_Hospital_Project.git" },
                { label: "Internship Certificate", url: "https://drive.google.com/file/d/1Vw_ozNWGZ7tiRmEKLaOOx5xUxnDcsB1j/view" }
            ]
        },
        {
            role: "Senior Technical Officer",
            company: "QuestIT Council - IT Department, VESIT",
            duration: "Aug 2025 - May 2026",
            desc: "During my tenure, I led the 'CodeFlix' ML workshop, guiding over 30 students to build and implement a KNN-based recommendation engine, achieving a 95% project completion rate. Beyond technical mentorship, I initiated the council's first O2O sponsorship transaction for the GENESIS 2026 Hackathon—a major event engaging 200+ participants and 3 judging panels. I also took charge of our digital presence by redesigning the QuestIT council website, engineering the complete frontend and partial backend architecture to streamline operations for our 50+ members.",
            logo: firstWork,
            links: [
                {label: "QuestIT Certificate of Contribution", url: "https://drive.google.com/file/d/1LHUbsr_iVhSPXtPhsGT4HQjbiDlIEo7f/view?usp=drive_link"},
                {label: "My_QuestIT_Post on LinkedIn", url: "https://www.linkedin.com/posts/atharva-lotankar-51824537b_questit-team-professionalgrowth-ugcPost-7466477261291057152-3LIl/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF3UcKQBGiEbzBqaMbrcLuCQpcZqg4FoOyY"}
            ]
        },
        {
            role: "AI & ML Project Intern",
            company: "Vision Sports Reconnect Pvt. Ltd.",
            duration: "June 2025 - Sep 2025",
            desc: "My team and I built an AI-powered snooker scoring system using Python, combining YOLO for object detection, DeepSort for real-time tracking, and OpenCV for video processing to enable live ball and cue-action detection with instant score updates. The solution was selected for the Intern to Innovator Start-up Challenge 2025 by VESIT and won 3rd prize as Best Startup.",
            logo: secondWork,
            links: [
                { label: "SnookerSync Repo", url: "https://github.com/AtharvaLotankar11/Snooker-Scoring-via-Video-Analytics-Project.git" },
                { label: "Internship Certificate", url: "https://drive.google.com/file/d/1q07ZYcK5BF9Brdi7dHuq_uuHgNGziYR9/view?usp=sharing" }
            ]
        },
        {
            role: "Data Analyst Project Intern",
            company: "Electrolyte Solutions",
            duration: "May 2025 - Aug 2025",
            desc: "I led a team in a four-month CRM project focused on managing and optimizing large datasets of AtomBerg to improve visibility into customer and technician issue handling. Transformed raw data into structured Excel formats, leveraging PivotTables and advanced spreadsheet techniques. Utilized Power BI for dynamic data visualization.",
            logo: thirdWork,
            links: [
                { label: "Atomberg CRM (PrivateRepo)", url: "https://github.com/AtharvaLotankar11/Electrolyte-Solutions-Internship.git" },
                { label: "Internship Certificate", url: "https://drive.google.com/file/d/1LpGCWEarYQkom_LYEM81M0iz2kDKZrXe/view?usp=sharing" }
            ]
        },
        {
            role: "Agentic AI Project Intern",
            company: "VESIT",
            duration: "May 2025 - Aug 2025",
            desc: "My team and I spent three months at VESIT developing a Multi-Agent AI Website Builder capable of generating deployment-ready code from a single prompt. We then expanded this work into the Agentic AI project and entered the Intern to Innovator Start-up Challenge 2025, where our idea, design, and consistent innovation earned us the 2nd prize for Best Idea & Design.",
            logo: fourthwork,
            links: [
                { label: "AutoGen_Proj Repo", url: "https://github.com/AtharvaLotankar11/Autogen_Mini_Projects.git" },
                { label: "Internship Certificate", url: "https://drive.google.com/file/d/1HNQyuAjgEF2vbxsHL2eznAXZSH2ys3dJ/view?usp=sharing" }
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
                                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full p-1 overflow-hidden magnetic-hover flex-shrink-0"
                                            style={{ backgroundColor: '#ffffff' }}
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

