import { motion } from 'framer-motion';
import fourthwork from '../assets/fourthwork.png';
import jrclg from '../assets/jrclg.png';
import school from '../assets/school.jpg';
import SectionHeading from './ui/SectionHeading';

const educationData = [
    {
        institution: "Vivekanand Education Society's Institute of Technology",
        degree: "B.Tech. in Information Technology",
        details: "Minor in Cloud Computing. Aggregate CGPA: 9.90",
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

// "Minor in Cloud Computing. Aggregate CGPA: 9.90" -> { score: "9.90", label: "Aggregate CGPA", rest: "Minor in Cloud Computing" }
const parseDetails = (details) => {
    const score = (details.match(/([\d.]+%?)\s*$/) || [])[1] || '';
    const head = details.replace(/([\d.]+%?)\s*$/, '').trim();
    const parts = head.split('. ');
    const labelPart = parts.pop().replace(/:$/, '').trim();
    return { score, label: labelPart, rest: parts.join('. ').replace(/\.$/, '') };
};

const Education = () => {
    return (
        <section id="education" className="relative bg-primary py-24 md:py-36">
            <div className="container mx-auto px-4 sm:px-6">
                <SectionHeading title="Education" note="From the ICSE board to a B.Tech in Information Technology." />

                <ul>
                    {educationData.map((edu, index) => {
                        const { score, label, rest } = parseDetails(edu.details);
                        return (
                            <motion.li
                                key={edu.institution}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                className="group relative overflow-hidden border-b border-white/10"
                            >
                                {/* wipe fill on hover/focus */}
                                <div className="absolute inset-0 origin-bottom scale-y-0 bg-blush transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 group-focus-within:scale-y-100" />
                                <div tabIndex={0} className="relative grid items-center gap-6 py-9 outline-none transition-colors duration-500 group-hover:text-primary group-focus-within:text-primary md:grid-cols-12 md:gap-8 md:py-12">
                                    <div className="md:col-span-3">
                                        <p className="display-type whitespace-nowrap text-[20vw] leading-[0.9] sm:text-[14vw] md:text-[8vw] lg:text-[6.2vw]">{score}</p>
                                        <p className="mt-1 text-sm text-bone/60 transition-colors duration-500 group-hover:text-primary/70">{label}</p>
                                    </div>
                                    <div className="md:col-span-6">
                                        <h3 className="text-xl font-medium leading-snug md:text-2xl">{edu.institution}</h3>
                                        <p className="mt-2 text-base text-blush transition-colors duration-500 group-hover:text-primary md:text-lg">{edu.degree}</p>
                                        {rest && <p className="mt-1 text-sm text-bone/60 transition-colors duration-500 group-hover:text-primary/70">{rest}</p>}
                                    </div>
                                    <div className="flex items-center justify-between gap-6 md:col-span-3 md:flex-col md:items-end md:gap-5">
                                        <p className="text-sm text-bone/70 transition-colors duration-500 group-hover:text-primary md:text-base">{edu.duration}</p>
                                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-white p-1.5 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                                            <img src={edu.logo} alt={`${edu.institution} logo`} className="h-full w-full object-contain" />
                                        </div>
                                    </div>
                                </div>
                            </motion.li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};

export default Education;
