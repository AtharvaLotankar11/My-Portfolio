import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';

/**
 * Pointer-driven 3D tilt with a moving light sheen.
 * `max` is the maximum rotation in degrees. Disabled for reduced-motion users.
 */
export default function TiltCard({ children, max = 8, glare = true, className = '', style, ...rest }) {
    const reduce = useReducedMotion();
    const ref = useRef(null);
    const px = useMotionValue(0.5);
    const py = useMotionValue(0.5);
    const sx = useSpring(px, { stiffness: 220, damping: 22 });
    const sy = useSpring(py, { stiffness: 220, damping: 22 });
    const rotateY = useTransform(sx, [0, 1], [-max, max]);
    const rotateX = useTransform(sy, [0, 1], [max, -max]);
    const sheen = useTransform([sx, sy], ([x, y]) => `radial-gradient(420px circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.16), transparent 60%)`);
    const glareOpacity = useMotionValue(0);

    const onMove = (e) => {
        if (reduce || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
    };
    const onEnter = () => glareOpacity.set(1);
    const onLeave = () => { px.set(0.5); py.set(0.5); glareOpacity.set(0); };

    return (
        <div style={{ perspective: 1100 }} className={className}>
            <motion.div
                ref={ref}
                onPointerMove={onMove}
                onPointerEnter={onEnter}
                onPointerLeave={onLeave}
                style={{ rotateX: reduce ? 0 : rotateX, rotateY: reduce ? 0 : rotateY, transformStyle: 'preserve-3d', ...style }}
                className="relative h-full w-full will-change-transform"
                {...rest}
            >
                {children}
                {glare && !reduce && (
                    <motion.div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                        style={{ background: sheen, opacity: glareOpacity }}
                    />
                )}
            </motion.div>
        </div>
    );
}
