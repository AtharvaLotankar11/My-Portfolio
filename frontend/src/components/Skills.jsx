import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaGitAlt, FaGithub, FaDocker, FaAws, FaMicrosoft, FaGoogle, FaJava, FaPython, FaReact, FaNodeJs, FaUbuntu, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { SiJenkins, SiKubernetes, SiMongodb, SiFirebase, SiSupabase, SiMysql, SiPostgresql, SiDart, SiCplusplus, SiJavascript, SiTensorflow, SiPandas, SiNumpy, SiNextdotjs, SiExpress } from 'react-icons/si';
import SectionHeading from './ui/SectionHeading';
import TiltCard from './ui/TiltCard';

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

// Words for the two marquee rows (icon-only badges are skipped - they have no readable name of their own)
const MARQUEE_A = ['Python', 'Java', 'C/C++', 'Dart', 'JavaScript', 'Machine Learning', 'TensorFlow', 'Computer Vision', 'Pandas', 'NumPy'];
const MARQUEE_B = ['React.js', 'Next.js', 'Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'Firebase', 'Supabase', 'Docker', 'Kubernetes', 'AWS'];

const MarqueeRow = ({ words, direction = 'left', reduce = false }) => {
    const row = [...words, ...words];     // duplicated so the -50% loop is seamless
    return (
        <div className="marquee overflow-hidden" aria-hidden="true">
            <div className={`marquee-track ${reduce ? '' : (direction === 'left' ? 'marquee-left' : 'marquee-right')}`}>
                {row.map((w, i) => (
                    <span
                        key={i}
                        className={`display-type shrink-0 whitespace-nowrap pr-[0.5em] text-[13vw] sm:text-[9vw] ${i % 2 === 0 ? 'outline-type' : 'text-bone'}`}
                    >
                        {w}
                    </span>
                ))}
            </div>
        </div>
    );
};

const Skills = () => {
    const reduce = useReducedMotion();
    const total = useMemo(() => skillCategories.reduce((n, c) => n + c.skills.length, 0), []);

    return (
        <section id="skills" className="relative overflow-hidden bg-secondary py-24 md:py-36">
            <div className="container mx-auto px-4 sm:px-6">
                <SectionHeading title="Skills" note={`${total} skills across ${skillCategories.length} areas: languages, ML and data, web, databases, DevOps and operating systems.`} />
            </div>

            <div className="mb-16 space-y-1 md:mb-24">
                <MarqueeRow words={MARQUEE_A} direction="left" reduce={!!reduce} />
                <MarqueeRow words={MARQUEE_B} direction="right" reduce={!!reduce} />
            </div>

            <div className="container mx-auto px-4 sm:px-6">
                <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ delay: (index % 3) * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-secondary"
                        >
                            <TiltCard max={3} glare={false} className="h-full">
                                <div className="group relative h-full overflow-hidden p-7 sm:p-9">
                                    {/* facade tint that rises on hover */}
                                    <div className="absolute inset-x-0 bottom-0 h-0 bg-blush transition-[height] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:h-full" />
                                    <div className="relative">
                                        <h3 className="display-type mb-7 text-3xl sm:text-4xl leading-[1.05] text-bone transition-colors duration-500 group-hover:text-primary">{category.title}</h3>
                                        <ul className="flex flex-wrap gap-2.5">
                                            {category.skills.map((skill) => (
                                                <li
                                                    key={skill.name}
                                                    className="flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-2 text-sm text-bone/85 transition-colors duration-500 group-hover:border-primary/30 group-hover:text-primary"
                                                >
                                                    <span className="flex h-4 w-4 items-center justify-center text-base leading-none [&>span]:text-[9px]" aria-hidden="true">
                                                        {skill.icon}
                                                    </span>
                                                    {skill.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
