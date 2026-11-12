import { motion, useReducedMotion } from 'framer-motion';

/**
 * Section title in the same giant condensed type as the cover.
 * Letters rise out of a mask once, when the heading enters the viewport.
 * (The in-view trigger lives on the <h2>, not on the masked letters - a clipped element never reports as visible.)
 */
export default function SectionHeading({ title, note }) {
    const reduce = useReducedMotion();
    const container = { hidden: {}, show: { transition: { staggerChildren: 0.045 } } };
    const letter = {
        hidden: { y: reduce ? '0%' : '108%' },
        show: { y: '0%', transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
    };
    return (
        <div className="mb-14 flex flex-col gap-6 border-b border-white/10 pb-8 md:mb-20 md:flex-row md:items-end md:justify-between">
            <motion.h2
                className="display-type flex flex-wrap max-w-full text-[clamp(2.4rem,14vw,8.5rem)] leading-[0.98] text-bone sm:text-[13vw] lg:text-[9.5vw]"
                aria-label={title}
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
            >
                {Array.from(title).map((ch, i) => (
                    <span key={i} className="block overflow-hidden py-[0.06em] -my-[0.06em]" aria-hidden="true">
                        <motion.span className="block" variants={letter}>
                            {ch === ' ' ? '\u00A0' : ch}
                        </motion.span>
                    </span>
                ))}
            </motion.h2>
            {note && <p className="max-w-xs pb-2 text-sm leading-relaxed text-bone/60 md:text-right md:text-base">{note}</p>}
        </div>
    );
}
