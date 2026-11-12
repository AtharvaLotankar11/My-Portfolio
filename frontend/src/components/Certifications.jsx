import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';

const categories = [
    {
        title: "Co-Curriculum Achievements",
        items: [
            { name: "Java Full Stack Developer Specialization by Board Infinity via Coursera", url: "https://coursera.org/share/8e6b56028eeea19f4727a17c65acf690" },
            { name: "ISTE VESIT's Certificate of Participation in Instagram Wrapped - Data Analytics", url: "https://drive.google.com/file/d/1ovjHUT_doOfxiXJbRmWLQUtXe_fefPe7/view?usp=drive_link" },
            { 
                name: "IBM SkillsBuild Certifications",
                hasDropdown: true,
                dropdownItems: [
                    { name: "Make Agentic AI Work For You", url: "https://drive.google.com/file/d/186JPM5FLnKJbGgpwYQwQj5hwDfl3yjRV/view?usp=drive_link" },
                    { name: "Quantum Engimas", url: "https://drive.google.com/file/d/1TJCfjtPFieDBce8kxHl6NqK2P6iGwnfc/view?usp=drive_link" }
                ]
            },
            {
                name: "Cisco Network Academy Courses of Completion",
                hasDropdown: true,
                dropdownItems: [
                    { name: "Introduction to Data Science", url: "https://drive.google.com/file/d/1wt_CD-4VdGdT6eGhRUmn6ksmaxqbMjlm/view?usp=drive_link" },
                    { name: "Data Analytics Essentials", url: "https://drive.google.com/file/d/1onQL68j3BrPc1lOjRDIlifx1bkZFt6Bv/view?usp=sharing" }
                ]
            },
            { name: "Master Ethereum & Solidity Programming From Scratch by Udemy", url: "https://www.udemy.com/certificate/UC-c95806c1-aa87-43c3-a293-ad39bfc1c9cb/" },
            { 
                name: "Oracle Academy & VESIT's Award of Achievement in Dual Course Program", 
                hasDropdown: true,
                dropdownItems: [
                    { name: "Java Programming", url: "https://drive.google.com/file/d/1dn8sUsdh25GrnURrGe_yPOW1uJeDglEY/view?usp=drive_link" },
                    { name: "Database Programming with SQL", url: "https://drive.google.com/file/d/1Y7k-inpiZFXRY82L9xVtg7Gxw2-aCs_i/view?usp=drive_link" }
                ]
            },
            { name: "Kerala Blockchain Academy's Certificate of Completion in Blockchain Foundation Programs", url: "https://verify.kba.ai/view/IIITMK-KBA-BFP-OL-45490" },
            { 
                name: "Google Cloud Skills Boost Badges", 
                hasDropdown: true,
                dropdownItems: [
                    { name: "Cloud Speech API in 3 Ways", url: "https://www.credly.com/badges/06182327-3082-4b23-8227-edb6b3823394/public_url" },
                    { name: "Prompt Design in Vertex AI", url: "https://www.credly.com/badges/cf7b75bb-c953-4f62-a5b0-7cf662481876/public_url" },
                    { name: "Set up a google cloud network", url: "https://www.credly.com/badges/2d0609cd-1056-431f-8af6-b4708bfceda7/public_url" }
                ]
            },
            { name: "CSI VESIT's Certification of Participation in Git Set Go", url: "https://drive.google.com/file/d/1PsG32aerbBMEV_ipmuacUavMHflV2gzy/view?usp=drive_link" },
            { name: "AWS Academy Graduate in Cloud Foundations by Amazon Web Services (AWS)", url: "https://drive.google.com/file/d/1ChS3ITWU6tdWz9xH01BLvHFxRY1b2aVD/view?usp=drive_link" },
            { 
                name: "NVIDIA's Certificate of Competency", 
                hasDropdown: true,
                dropdownItems: [
                    { name: "Fundamentals of Deep Learning", url: "https://learn.nvidia.com/certificates?id=is21AOsNQJqx-T1NnsczMQ#" },
                    { name: "Applications of AI for Anomaly Detection", url: "https://learn.nvidia.com/certificates?id=ll-DmDRGRCO-LVUMUYpasA" }
                ]
            },
            { 
                name: "ISA VESIT Workshop Certifications",
                hasDropdown: true,
                dropdownItems: [
                    { name: "Certificate of Participation in AppSprint Workshop by ISA VESIT", url: "https://drive.google.com/file/d/1SPW5jG1m2PPcnp0oJ6Ya2SUwzlgG7inT/view" },
                    { name: "Bootcamp Certification in Intro to Raspberry Pi and Linux by ISA VESIT", url: "https://drive.google.com/file/d/1-49tSFn5knydETNt3FzTtRJt1uxBMw1q/view?usp=drive_link" },
                ] 
            },
            { name: "Data Warehouse Concepts, Design, and Data Integration by University of Colorado", url: "https://www.coursera.org/account/accomplishments/verify/V3W7V399KY7K" },
            { name: "Blockchain Basics - Certificate of Completion by Great Learning", url: "https://www.mygreatlearning.com/certificate/DPWRRJJH" },
            { name: "Introduction to Cybersecurity Essentials by IBM", url: "https://www.coursera.org/account/accomplishments/verify/2UAQCKUTUSXY" },
            { name: "AI Agentic Design Patterns with AutoGen by DeepLearning.AI", url: "https://learn.deeplearning.ai/accomplishments/672d7fdf-454c-490f-87f6-71e96ac9e1dd?usp=sharing" },
            { name: "Supervised Machine Learning: Regression and Classification by Stanford University", url: "https://www.coursera.org/account/accomplishments/verify/DVDKP2VFTKVK" },
            { name: "The Complete Flutter Dev Bootcamp with Dart Certificate by Udemy", url: "https://www.udemy.com/certificate/UC-1ae0c945-a0d8-4b0c-9338-06f211bfec2a/" },
            { name: "Udemy's 100 Days of Code: The Complete Python Pro Bootcamp Certificate by Udemy", url: "https://www.udemy.com/certificate/UC-517e5de0-e6bc-4f92-82e0-22322f45df56/" },          
        ]
    },
    {
        title: "Hackathon Certificates",
        items: [
            { name: "Certificate of Appreciation, InnovGenius - Finalist in TCET, Mumbai", url: "https://drive.google.com/file/d/1fVqQKzsAiDXNM7PisEg1T9htsvvrkdxT/view?usp=drive_link" },
            { name: "Certificate of Participation, KJSSE's AgriTech 2026 Hackathon - Finalist, 24 Hour National Hackathon", url: "https://drive.google.com/file/d/1ph-jG15H0cDBu2chgXmo6g3b0LWVhEpx/view?usp=drive_link" },
            { name: "Certificate of Merit, Quasar 4.0 – Top 28 National Selection, PVPPCOE", url: "https://drive.google.com/file/d/1zzkSbHNAWYOaMId-I6Nt0WAtRC1D4o3J/view?usp=sharing" },
            { name: "Certificate of Participation – Finalist, Odoo X SPIT 25 Hackathon, FEC Club SPIT", url: "https://drive.google.com/file/d/1QXmzU03Jr9VZEIK4ClSgsMw4KvcwwlO2/view?usp=sharing" },
            { name: "Certificate of Achievement, Hack-AI-Thon 3.0 Hackathon – AI Colegion VESIT", url: "https://drive.google.com/file/d/1-muADZcB8Ki56JBQDJNf3PVclV3-Rywy/view" },
            { name: "Certificate of Participation, Ves-Hack-It Hackathon – Unstop", url: "https://unstop.com/certificate-preview/8641c967-7775-4a6c-b02e-e18a84b55452" },
        ]
    },
    {
        title: "Extra Curriculum Achievements",
        items: [
            { name: "Manthan: Paper Presentation Competition - Technology Day - Certificate of Participation", url: "https://drive.google.com/file/d/1A2DXfBcyI-WWZIbScP6XiqpiVWJ6P-Ku/view?usp=drive_link" },
            { name: "Advanced Aircraft Design Workshop by Bharat Space Education Research Centre", url: "https://drive.google.com/file/d/1BkgHljW-MhDvtq-7sLL1RrL3G-TXt5y6/view?usp=drive_link" },
            { name: "Games of Shows – Certificate of Participation by VESLIT Council", url: "https://drive.google.com/file/d/1mNv3ubFKAidBkVgAxXe4eTbU3AkpxiPJ/view?usp=drive_link" },
            { 
                name: "Maharashtra Youth For Climate Action Certifications by MYCA Foundation", 
                hasDropdown: true,
                dropdownItems: [
                    { name: "Living with Climate Change & Water Management", url: "https://www.mahayouthnet.in/share-certificate?serialno=ZWGQUMAK" },
                    { name: "Bio-cultural Diversity Conservation and Climate Action", url: "https://www.mahayouthnet.in/share-certificate?serialno=VUYPQFKT" },
                    { name: "Energy Management and Climate Action", url: "https://www.mahayouthnet.in/share-certificate?serialno=GF3G4I8R" },
                    { name: "Waste Management and Climate Action", url: "https://www.mahayouthnet.in/share-certificate?serialno=R9YZH8DH" }
                ]
            },
            { name: "Manorama Tell Me Why Quiz in Current Affairs with association in BSE 2019", url: "https://drive.google.com/file/d/1P5-_X4Om6-YtNf3oKvog--fq2vXqKKp6/view?usp=drive_link" },
            { name: "Akhil Bhartiya Gandharva Mahavidyalay Certification of Excellence in Harmonium", url: "https://drive.google.com/file/d/152gMDRiRKc4yBUNi2PX_-ZLrg3_lfYaT/view?usp=drive_link" },
            { name: "Dr. Homi Bhabha Balvaidnyanik Competition 6th Grade Certification by The Mumbai Science Teachers' Association", url: "https://drive.google.com/file/d/1CktK5yyhsb5S8X25AXsdl56477U51Tq6/view?usp=drive_link" },
            { 
                name: "IProto Robotics & Automation Program Under IRoboKid", 
                hasDropdown: true,
                dropdownItems: [
                    { name: "IProto Level 2", url: "https://drive.google.com/file/d/1v7FpGXNKhg3quZYVZMjVXZkOfJHG2C52/view?usp=drive_link" },
                    { name: "IProto Level 1", url: "https://drive.google.com/file/d/1Sb2muUH2qquLfh3cqp8qwSsd0CuLpgKg/view?usp=drive_link" }
                ]
            },
            { 
                name: "SilverZone Olympiad Certifications by SilverZone Foundation Under Society of Science Education", 
                hasDropdown: true,
                dropdownItems: [
                    { name: "English Language", url: "https://drive.google.com/file/d/11uKUrqRdehWbCy1sn0atMW1iV2xu1PLa/view?usp=drive_link" },
                    { name: "Science", url: "https://drive.google.com/file/d/1i4pK4pb82d8KlhJBAx3TxL_cm9IUA5-o/view?usp=drive_link" },
                    { name: "Informatics", url: "https://drive.google.com/file/d/1izlEibtOH7nTv04p9V2o4bM4Kv4Or9al/view?usp=drive_link" },
                    { name: "Mathematics", url: "https://drive.google.com/file/d/1KYRXdI9gh6Fd7r74fmx1zU5N6uu-Hm35/view?usp=drive_link" },
                    { name: "General Knowledge", url: "https://drive.google.com/file/d/1sZlQUbqK7Eod_6yxsK1t3tp81OcI5uyn/view?usp=drive_link" }
                ]
            },
            { name: "Helen O' Grady International's Course Completion in Speech & Drama", url: "https://drive.google.com/file/d/1cswXswYmQx5FnFzyY4Y2HUUzzPTZ7ckl/view?usp=drive_link" },
            { name: "Second Summer Coaching Camp in Badminton by Mulund Gymkhana", url: "https://drive.google.com/file/d/1ireoPGcjnH1Lg-j-jG8OZiZQ_5ODkRlH/view?usp=drive_link" },
            { name: "SpellBee Certificate of Merit International Level issued by Spell Bee International ~ Language for Life", url: "https://drive.google.com/file/d/1LF7kl5HWB5ZjYuHL3BB2Y6fvBndw28ew/view?usp=drive_link" },
            { name: "National Abacus & Mental Arithmetic and Mathematics Test issued by The National Abacus & Mental Arithmetic and Mathematics Test Committee", url: "https://drive.google.com/file/d/1Jh9dgB449_m8f2VE_p1iTnuZFGiDVDqL/view?usp=drive_link" },
        ]
    }
];

const ArrowUpRight = () => (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M4 12L12 4M5 4h7v7" />
    </svg>
);

const Certifications = () => {
    const [tab, setTab] = useState(0);
    const [expanded, setExpanded] = useState({});

    const toggle = (key) => setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
    const category = categories[tab];

    return (
        <section id="certifications" className="relative bg-secondary py-24 md:py-36">
            <div className="container mx-auto px-4 sm:px-6">
                <SectionHeading title="Certifications" note="Coursework, hackathons and extra-curricular achievements, each linked to its certificate." />

                {/* Tabs */}
                <div role="tablist" aria-label="Certificate categories" className="mb-10 flex flex-wrap gap-2.5 md:mb-14">
                    {categories.map((c, i) => (
                        <button
                            key={c.title}
                            role="tab"
                            id={`cert-tab-${i}`}
                            aria-selected={tab === i}
                            aria-controls="cert-panel"
                            onClick={() => setTab(i)}
                            className={`relative min-h-[44px] inline-flex items-center justify-center rounded-full border px-5 py-2.5 text-sm transition-colors duration-300 ${
                                tab === i ? 'border-blush text-primary' : 'border-white/20 text-bone/80 hover:border-white/50'
                            }`}
                        >
                            {tab === i && (
                                <motion.span layoutId="cert-tab" className="absolute inset-0 rounded-full bg-blush" transition={{ type: 'spring', stiffness: 380, damping: 34 }} />
                            )}
                            <span className="relative z-10">
                                {c.title} <span className="opacity-60">{c.items.length}</span>
                            </span>
                        </button>
                    ))}
                </div>

                <div id="cert-panel" role="tabpanel" aria-labelledby={`cert-tab-${tab}`}>
                    <AnimatePresence mode="wait">
                        <motion.ul
                            key={tab}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="grid gap-x-12 border-t border-white/10 lg:grid-cols-2"
                        >
                            {category.items.map((item, idx) => {
                                const key = `${tab}-${idx}`;
                                const isOpen = !!expanded[key];
                                return (
                                    <li key={key} className="border-b border-white/10">
                                        {item.hasDropdown ? (
                                            <>
                                                <button
                                                    onClick={() => toggle(key)}
                                                    aria-expanded={isOpen}
                                                    className="group flex min-h-[44px] w-full items-center justify-between gap-6 py-5 text-left"
                                                >
                                                    <span className="text-[15px] leading-snug text-bone/85 transition-colors group-hover:text-blush">{item.name}</span>
                                                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-400 ${isOpen ? 'rotate-45 border-blush bg-blush text-primary' : 'border-white/20 text-bone'}`} aria-hidden="true">
                                                        <svg viewBox="0 0 16 16" width="12" height="12" stroke="currentColor" strokeWidth="1.6" fill="none"><path d="M8 2v12M2 8h12" /></svg>
                                                    </span>
                                                </button>
                                                <AnimatePresence initial={false}>
                                                    {isOpen && (
                                                        <motion.ul
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                                            className="overflow-hidden"
                                                        >
                                                            {item.dropdownItems.map((d) => (
                                                                <li key={d.name}>
                                                                    <a
                                                                        href={d.url}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="group flex min-h-[44px] items-center justify-between gap-6 border-l border-blush/60 py-3 pl-5 text-sm text-bone/65 transition-colors hover:text-blush"
                                                                    >
                                                                        {d.name}
                                                                        <ArrowUpRight />
                                                                    </a>
                                                                </li>
                                                            ))}
                                                            <li aria-hidden="true" className="h-3" />
                                                        </motion.ul>
                                                    )}
                                                </AnimatePresence>
                                            </>
                                        ) : (
                                            <a
                                                href={item.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex min-h-[44px] items-center justify-between gap-6 py-5"
                                            >
                                                <span className="text-[15px] leading-snug text-bone/85 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-blush">{item.name}</span>
                                                <span className="shrink-0 text-bone/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blush"><ArrowUpRight /></span>
                                            </a>
                                        )}
                                    </li>
                                );
                            })}
                        </motion.ul>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Certifications;
