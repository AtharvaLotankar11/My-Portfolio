import { motion } from 'framer-motion';
import myPhoto from '../assets/myPhoto.png';
import SectionHeading from './ui/SectionHeading';
import TiltCard from './ui/TiltCard';

const blocks = [
    {
        title: 'Education and Technical Foundation',
        text: "Currently pursuing a B.E. in Information Technology at Vivekanand Education Society's Institute of Technology, with a strong academic foundation in Data Science, Machine Learning, Deep Learning, and Software Engineering. Proficient in Python, Java, SQL, C/C++, and JavaScript, with practical experience in modern development frameworks including Next.js, Django, PostgreSQL, and the MERN stack.",
    },
    {
        title: 'Areas of Interest and Expertise',
        text: 'Primarily focused on Data Analytics, Data Science, and AI/ML, applying data-driven methodologies to build intelligent and impactful solutions. Hands-on experience across domains such as predictive analytics, automation, computer vision, sentiment analysis, and AI-powered applications. Additionally interested in full-stack development, with a preference for building scalable applications using Next.js, Django, and PostgreSQL.',
    },
    {
        title: 'Professional Aspirations',
        text: 'Continuously strengthening expertise in Data Structures & Algorithms, backend engineering, and applied AI. Aspiring to contribute as a Data Scientist or Machine Learning Engineer, while developing strong full-stack capabilities to bridge advanced intelligence with seamless user experiences.',
    },
];

const About = () => {
    return (
        <section id="about" className="relative bg-primary py-24 md:py-36">
            <div className="container mx-auto px-4 sm:px-6">
                <SectionHeading title="About" note="An Information Technology student building data, machine learning and full-stack products." />

                <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-20">
                    {/* Portrait */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:sticky lg:top-28 lg:col-span-5"
                    >
                        <TiltCard max={9} className="mx-auto max-w-md">
                            <div className="group relative overflow-hidden border border-white/10 bg-secondary">
                                {/* glass-block facade pattern from the hero tower */}
                                <div
                                    className="absolute inset-0 opacity-60"
                                    style={{
                                        backgroundImage:
                                            'linear-gradient(rgba(152,174,179,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(152,174,179,0.10) 1px, transparent 1px)',
                                        backgroundSize: '28px 28px',
                                    }}
                                />
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-blush/25 to-transparent" />
                                <div className="relative p-8 pb-6 sm:p-10 sm:pb-8" style={{ transform: 'translateZ(40px)' }}>
                                    <img
                                        src={myPhoto}
                                        alt="Portrait of Atharva Lotankar"
                                        className="aspect-square w-full rounded-full object-cover grayscale contrast-110 transition-[filter] duration-700 group-hover:grayscale-0"
                                    />
                                </div>
                                <div className="relative flex items-end justify-between px-8 pb-8 sm:px-10" style={{ transform: 'translateZ(24px)' }}>
                                    <div>
                                        <p className="display-type text-3xl text-bone">Atharva Lotankar</p>
                                        <p className="mt-1 text-sm text-bone/60">B.Tech IT, VESIT</p>
                                    </div>
                                    <p className="text-sm text-blush">CGPA 9.92</p>
                                </div>
                            </div>
                        </TiltCard>
                    </motion.div>

                    {/* Text */}
                    <div className="group/list lg:col-span-7">
                        {blocks.map((b, i) => (
                            <motion.article
                                key={b.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                className="border-t border-white/10 py-9 transition-opacity duration-500 first:border-t-0 first:pt-0 group-hover/list:opacity-45 hover:!opacity-100 md:py-12"
                            >
                                <h3 className="display-type text-3xl sm:text-4xl md:text-5xl leading-[1.05] text-bone">{b.title}</h3>
                                <p className="mt-5 max-w-[62ch] text-base leading-[1.8] text-bone/70 md:text-lg">{b.text}</p>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
