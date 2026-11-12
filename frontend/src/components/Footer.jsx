import { motion, useReducedMotion } from 'framer-motion';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const socialLinks = [
    { label: 'Instagram', icon: <FaInstagram size={18} />, url: "https://www.instagram.com/atharva_lotankar11?utm_source=qr&igsh=cWZyd2RyZjRlYWE5" },
    { label: 'LinkedIn', icon: <FaLinkedin size={18} />, url: "https://www.linkedin.com/in/atharva-lotankar-51824537b" },
    { label: 'GitHub', icon: <FaGithub size={18} />, url: "https://www.github.com/AtharvaLotankar11" },
];

const NAME = 'ATHARVA LOTANKAR';

const Footer = () => {
    const reduce = useReducedMotion();
    return (
        <footer className="relative overflow-hidden bg-primary pb-8 pt-24 md:pt-36">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-10 md:flex-row md:items-center">
                    <ul className="flex gap-3">
                        {socialLinks.map((s) => (
                            <li key={s.label}>
                                <a
                                    href={s.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-bone transition-all duration-300 hover:-translate-y-1 hover:border-blush hover:bg-blush hover:text-primary"
                                >
                                    {s.icon}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <a href="#home" className="link-draw pb-1 text-sm text-bone/80 min-h-[44px] inline-flex items-center">Back to top</a>
                </div>
            </div>

            {/* Closing wordmark - each letter lifts on hover */}
            <h2 className="display-type flex select-none justify-center whitespace-nowrap pt-10 text-[clamp(2.5rem,11.5vw,12.6vw)] text-bone" aria-label="Atharva Lotankar">
                {Array.from(NAME).map((ch, i) => (
                    <motion.span
                        key={i}
                        aria-hidden="true"
                        className="inline-block cursor-default"
                        whileHover={reduce ? undefined : { y: '-6%', color: '#E3BFB2' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                    >
                        {ch === ' ' ? '\u00A0' : ch}
                    </motion.span>
                ))}
            </h2>

            <p className="mt-6 text-center text-xs text-bone/45">&copy; {new Date().getFullYear()} Atharva Lotankar</p>
        </footer>
    );
};

export default Footer;
