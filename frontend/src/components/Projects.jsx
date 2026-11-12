import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaFileAlt } from 'react-icons/fa';
import SectionHeading from './ui/SectionHeading';

// Project images
import vaultHuntImg from '../assets/project_images/vault_hunt.png';
import gmailN8nImg from '../assets/project_images/gmail_n8n.png';
import myPortfolioImg from '../assets/project_images/myPortfolio.png';
import sentiqoImg from '../assets/project_images/sentiqo.jpg';
import officepulseImg from '../assets/project_images/officepulse.webp';
import retailPulseImg from '../assets/project_images/retailpulse_image.webp';
import greenforkImg from '../assets/project_images/greenfork.webp';
import railwayImg from '../assets/project_images/railway_cust_java.jpg';
import compliflowImg from '../assets/project_images/compliflow_img.png';
import instagramWrapImg from '../assets/project_images/Instagram_wrap.webp';
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

    return (
        <section id="projects" className="relative bg-primary py-24 md:py-36">
            <div className="container mx-auto px-4 sm:px-6">
                <SectionHeading title="Projects" note={`${projects.length} builds across AI, data and full-stack development.`} />

                <ul>
                    {projects.map((project, index) => {
                        const { name, sub } = splitTitle(project.title);
                        const isActive = active === index;
                        return (
                                <motion.li
                                    key={project.title}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.1 }}
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    tabIndex={0}
                                    role="button"
                                    aria-expanded={isActive}
                                    aria-label={`Project: ${name}`}
                                    onPointerEnter={(e) => { if (e.pointerType === 'mouse') setActive(index); }}
                                    onPointerLeave={() => setActive(null)}
                                    onFocus={() => setActive(index)}
                                    onBlur={() => setActive(null)}
                                    onKeyDown={(e) => {
                                        if (e.target !== e.currentTarget) return;
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            setActive((prev) => (prev === index ? null : index));
                                        }
                                    }}
                                    className="group border-b border-white/10 outline-none focus-visible:outline-2 focus-visible:outline-blush focus-visible:outline-offset-[-2px] focus-visible:bg-white/[0.02] transition-colors"
                                >
                                    <div className="grid items-center gap-5 py-7 sm:py-8 lg:grid-cols-12 lg:gap-8 lg:py-9">

                                        {/* Compact KPI-card thumbnail — visible on all viewports */}
                                        <div className="lg:col-span-3 flex">
                                            <div className="overflow-hidden rounded-xl border border-white/10 w-full max-w-[260px]">
                                                <img
                                                    src={project.image}
                                                    alt={`${name} screenshot`}
                                                    loading="lazy"
                                                    className={`w-full object-cover object-top transition-transform duration-700 ${!reduce && isActive ? 'scale-[1.04]' : 'scale-100'}`}
                                                    style={{ aspectRatio: '4/3' }}
                                                />
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <div className="lg:col-span-4">
                                            <h3 className={`display-type text-[9vw] leading-[1.05] transition-all duration-500 sm:text-[6vw] lg:text-[3.2vw] ${isActive ? 'translate-x-2 text-blush' : 'text-bone'}`}>
                                                {name}
                                            </h3>
                                            {sub && <p className="mt-2 text-sm text-bone/60 md:text-base">{sub}</p>}
                                        </div>

                                        {/* Description */}
                                        <div className="lg:col-span-4">
                                            <p className={`max-w-[60ch] text-sm leading-relaxed transition-colors duration-500 ${isActive ? 'text-bone' : 'text-bone/65'}`}>
                                                {project.desc}
                                            </p>
                                        </div>

                                        {/* Links */}
                                        <ul className="flex flex-wrap gap-2 lg:col-span-1 lg:justify-end">
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
                                                            className={`flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border text-base transition-all duration-300 ${
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
        </section>
    );
};

export default Projects;
