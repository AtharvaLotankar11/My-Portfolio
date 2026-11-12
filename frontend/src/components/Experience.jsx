import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import firstWork from '../assets/firstWork.png';
import secondWork from '../assets/secondWork.jpg';
import thirdWork from '../assets/thirdWork.png';
import fourthwork from '../assets/fourthwork.png';
import vaidsysIntern from '../assets/vaidsysIntern.png';
import zidioIntern from '../assets/zidioIntern.png';
import SectionHeading from './ui/SectionHeading';

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

const ArrowUpRight = () => (
    <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M4 12L12 4M5 4h7v7" />
    </svg>
);

const Experience = () => {
    const [open, setOpen] = useState(0);

    return (
        <section id="experience" className="relative bg-secondary py-24 md:py-36">
            <div className="container mx-auto px-4 sm:px-6">
                <SectionHeading title="Experience" note="Five internships and one council role, newest first." />

                <ul>
                    {experiences.map((exp, index) => {
                        const isOpen = open === index;
                        return (
                            <motion.li
                                key={exp.company + exp.duration}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.7, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
                                className="border-b border-white/10"
                            >
                                <h3>
                                    <button
                                        onClick={() => setOpen(isOpen ? -1 : index)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                setOpen(isOpen ? -1 : index);
                                            }
                                        }}
                                        aria-expanded={isOpen}
                                        aria-controls={`exp-panel-${index}`}
                                        className="group flex w-full items-center gap-4 py-7 text-left outline-none focus-visible:outline-2 focus-visible:outline-blush focus-visible:outline-offset-2 rounded-lg transition-all md:gap-8 md:py-9"
                                    >
                                        <span className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white p-1 transition-transform duration-500 group-hover:rotate-[360deg] md:h-16 md:w-16">
                                            <img src={exp.logo} alt="" className="h-full w-full object-contain" />
                                        </span>
                                        <span className="min-w-0 flex-1">
                                            <span className={`display-type block text-[8vw] leading-[1.05] transition-all duration-500 group-hover:translate-x-2 sm:text-[5vw] lg:text-[3.6vw] ${isOpen ? 'text-blush' : 'text-bone group-hover:text-blush'}`}>
                                                {exp.role}
                                            </span>
                                            <span className="mt-1.5 block text-sm text-bone/65 md:text-base">{exp.company}</span>
                                        </span>
                                        <span className="hidden shrink-0 text-sm text-bone/60 md:block">{exp.duration}</span>
                                        <span
                                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                                                isOpen ? 'rotate-45 border-blush bg-blush text-primary' : 'border-white/20 text-bone group-hover:border-blush'
                                            }`}
                                            aria-hidden="true"
                                        >
                                            <svg viewBox="0 0 16 16" width="14" height="14" stroke="currentColor" strokeWidth="1.6" fill="none"><path d="M8 2v12M2 8h12" /></svg>
                                        </span>
                                    </button>
                                </h3>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            id={`exp-panel-${index}`}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="grid gap-8 pb-10 pl-0 md:grid-cols-12 md:pb-14 md:pl-24">
                                                <p className="text-sm text-bone/60 md:hidden">{exp.duration}</p>
                                                <p className="max-w-[68ch] text-base leading-[1.85] text-bone/75 md:col-span-8">{exp.desc}</p>
                                                {exp.links.length > 0 && (
                                                    <ul className="flex flex-wrap content-start gap-2.5 md:col-span-4">
                                                        {exp.links.map((link) => (
                                                            <li key={link.label}>
                                                                <a
                                                                    href={link.url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-xs text-bone/85 transition-colors duration-300 hover:border-blush hover:bg-blush hover:text-primary"
                                                                >
                                                                    {link.label}
                                                                    <ArrowUpRight />
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};

export default Experience;
