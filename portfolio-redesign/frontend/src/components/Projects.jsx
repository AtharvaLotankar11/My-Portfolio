import { useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaFileAlt } from 'react-icons/fa';
import SectionHeading from './ui/SectionHeading';

// Project images
import vaultHuntImg from '../assets/project_images/vault_hunt.png';
import gmailN8nImg from '../assets/project_images/gmail_n8n.png';
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

const projects = [
    {
        title: "🔐 VaultHunt – Decentralized Escrow for Bug Bounty Hunters",
        desc: "Built a decentralized blockchain escrow platform for bug bounties, featuring encrypted vulnerability proofs, staked jury arbitration, automated payouts, and a Next.js dApp, deployed on Ethereum Sepolia with 299 tests and 99.8% coverage.",
        image: vaultHuntImg,
        links: [
            { icon: <FaGithub />, url: "https://github.com/AtharvaLotankar11/vaulthunt-escrow-blockchain-project.git" },
            { icon: <FaExternalLinkAlt />, url: "https://vaulthunt-escrow.vercel.app/" }
        ]
    },
    {
        title: "📧 Gmail Summariser – AI Powered Email Summarisation Workflow",
        desc: "Built a Docker-hosted n8n email automation workflow integrating Gmail OAuth2 and Gemini AI to automatically trigger, summarize emails into concise bullet points, and generate structured outputs without writing application code.",
        image: gmailN8nImg,
        links: [
            { icon: <FaGithub />, url: "#" }
        ]
    },
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

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

// "VaultHunt - Decentralized Escrow..." -> { name: "VaultHunt", sub: "Decentralized Escrow..." }  (also drops the leading emoji)
const splitTitle = (title) => {
    const clean = title.replace(/^[^\p{L}\p{N}]+/u, '').trim();
    const parts = clean.split(/\s+[\u2013\u2014-]\s+|:\s+/);
    return { name: parts[0], sub: parts.slice(1).join(': ') };
};

const linkLabel = (icon) => {
    const name = icon?.type?.name || '';
    if (name === 'FaGithub') return 'Source code';
    if (name === 'FaExternalLinkAlt') return 'Live site';
    return 'Project report';
};

const Projects = () => {
    const reduce = useReducedMotion();
    const [active, setActive] = useState(null);

    // Floating image preview that trails the cursor and leans into its movement (desktop only)
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const x = useSpring(mx, { stiffness: 170, damping: 24, mass: 0.6 });
    const y = useSpring(my, { stiffness: 170, damping: 24, mass: 0.6 });
    const rotateY = useTransform([mx, x], ([m, s]) => clamp((m - s) / 9, -16, 16));
    const rotateX = useTransform([my, y], ([m, s]) => clamp((s - m) / 9, -12, 12));

    const onMove = (e) => {
        mx.set(e.clientX + 40);
        my.set(e.clientY - 120);
    };

    return (
        <section id="projects" className="relative bg-primary py-24 md:py-36">
            <div className="container mx-auto px-4 sm:px-6">
                <SectionHeading title="Projects" note={`${projects.length} builds across AI, data and full-stack development.`} />

                <ul onPointerMove={onMove} onPointerLeave={() => setActive(null)}>
                    {projects.map((project, index) => {
                        const { name, sub } = splitTitle(project.title);
                        const isActive = active === index;
                        return (
                            <motion.li
                                key={project.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                onPointerEnter={(e) => { if (e.pointerType === 'mouse') setActive(index); }}
                                onFocus={() => setActive(index)}
                                onBlur={() => setActive(null)}
                                className="group border-b border-white/10"
                            >
                                <div className="grid items-start gap-5 py-7 lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-9">
                                    {/* image: always visible on small screens, trailing preview on desktop */}
                                    <img
                                        src={project.image}
                                        alt={`${name} screenshot`}
                                        loading="lazy"
                                        className="aspect-[16/9] w-full border border-white/10 object-cover lg:hidden"
                                    />

                                    <div className="lg:col-span-5">
                                        <h3 className={`display-type text-[10vw] leading-[0.95] transition-all duration-500 sm:text-[7vw] lg:text-[3.8vw] ${isActive ? 'translate-x-3 text-blush' : 'text-bone'}`}>
                                            {name}
                                        </h3>
                                        {sub && <p className="mt-2 text-sm text-bone/60 md:text-base">{sub}</p>}
                                    </div>

                                    <div className="lg:col-span-5">
                                        <p className={`max-w-[60ch] text-sm leading-relaxed transition-colors duration-500 ${isActive ? 'text-bone' : 'text-bone/65'}`}>
                                            {project.desc}
                                        </p>
                                    </div>

                                    <ul className="flex gap-2 lg:col-span-2 lg:justify-end">
                                        {project.links.map((link, idx) => {
                                            const dead = link.url === '#';
                                            return (
                                                <li key={idx}>
                                                    <a
                                                        href={link.url}
                                                        target={dead ? undefined : '_blank'}
                                                        rel="noopener noreferrer"
                                                        onClick={dead ? (e) => e.preventDefault() : undefined}
                                                        aria-label={`${name}: ${linkLabel(link.icon)}`}
                                                        aria-disabled={dead || undefined}
                                                        title={dead ? 'Link not available yet' : linkLabel(link.icon)}
                                                        className={`flex h-10 w-10 items-center justify-center rounded-full border text-base transition-all duration-300 ${
                                                            dead
                                                                ? 'cursor-not-allowed border-white/10 text-bone/30'
                                                                : 'border-white/20 text-bone hover:-translate-y-0.5 hover:border-blush hover:bg-blush hover:text-primary'
                                                        }`}
                                                    >
                                                        {link.icon}
                                                    </a>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </motion.li>
                        );
                    })}
                </ul>
            </div>

            {/* Trailing preview (desktop, fine pointers) */}
            <div className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block" style={{ perspective: 900 }} aria-hidden="true">
                <motion.div style={{ x, y, rotateX: reduce ? 0 : rotateX, rotateY: reduce ? 0 : rotateY }} className="relative h-[210px] w-[340px]">
                    <AnimatePresence>
                        {active !== null && (
                            <motion.img
                                key={active}
                                src={projects[active].image}
                                alt=""
                                initial={{ opacity: 0, scale: 0.82 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute inset-0 h-full w-full border border-white/20 object-cover shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
                            />
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
