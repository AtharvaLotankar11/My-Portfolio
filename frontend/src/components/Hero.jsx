import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import SceneGuard, { hasWebGL } from './ui/SceneGuard';

// three.js is the heavy part - load it after first paint so the title appears instantly
const BuildingScene = lazy(() => import('./BuildingScene'));

const WORD = 'PORTFOLIO';

// Pure-CSS stand-in for the tower (no WebGL, or while the 3D chunk loads)
const FlatTower = () => (
    <div className="absolute inset-x-0 bottom-0 h-[52%] pointer-events-none" aria-hidden="true">
        <div
            className="absolute inset-0"
            style={{
                clipPath: 'polygon(50% 0%, 8% 100%, 50% 100%)',
                background: 'linear-gradient(160deg, #7d939e 0%, #5f737d 100%)',
            }}
        />
        <div
            className="absolute inset-0"
            style={{
                clipPath: 'polygon(50% 0%, 50% 100%, 89% 100%)',
                background: 'linear-gradient(200deg, #e4c8bd 0%, #c9a597 100%)',
            }}
        />
    </div>
);

const Hero = () => {
    const reduce = useReducedMotion();
    const heroRef = useRef(null);
    const pointer = useRef({ x: 0, y: 0 });      // -1..1, read by the 3D scene every frame
    const scrollRef = useRef(0);                  // 0..1 while the hero scrolls out, read by the 3D scene
    const [active, setActive] = useState(true);   // pause rendering when hero is off-screen
    const [webgl] = useState(() => (typeof document === 'undefined' ? false : hasWebGL()));
    const [sceneReady, setSceneReady] = useState(false);

    // pointer -> shared ref + springs for the DOM title
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
    const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });

    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const wordY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
    const wordX = useTransform(sx, [-1, 1], ['1.4%', '-1.4%']);   // title drifts opposite to the tower = depth
    const wordYPointer = useTransform(sy, [-1, 1], ['1%', '-1%']);
    const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    useEffect(() => {
        const onMove = (e) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            pointer.current = { x, y };
            mx.set(x);
            my.set(y);
        };
        const unsub = scrollYProgress.on('change', (v) => { scrollRef.current = v; });
        window.addEventListener('pointermove', onMove, { passive: true });

        const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0 });
        if (heroRef.current) io.observe(heroRef.current);

        return () => {
            window.removeEventListener('pointermove', onMove);
            unsub();
            io.disconnect();
        };
    }, [mx, my, scrollYProgress]);

    const rise = (i) => ({
        initial: { y: reduce ? '0%' : '110%' },
        animate: { y: '0%' },
        transition: { delay: reduce ? 0 : 0.15 + i * 0.06, duration: reduce ? 0 : 1.1, ease: [0.16, 1, 0.3, 1] },
    });

    return (
        <section
            id="home"
            ref={heroRef}
            className="grain relative h-[100svh] min-h-[480px] w-full overflow-hidden bg-charcoal"
        >
            {/* Sky: soft vignette + drifting haze (the clouds on the cover) */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        'radial-gradient(120% 80% at 50% 40%, #3a3a3a 0%, #2f2f2f 45%, #232323 100%)',
                }}
            />
            <div className="haze absolute -left-[10%] top-[8%] h-[38%] w-[55%] rounded-full bg-white/[0.045] blur-3xl" />
            <div className="haze absolute -right-[12%] top-[34%] h-[30%] w-[50%] rounded-full bg-white/[0.05] blur-3xl" style={{ animationDelay: '-9s' }} />

            {/* Top label + tracked role line */}
            <motion.div
                style={{ opacity: fade }}
                className="absolute inset-x-0 top-[clamp(4.2rem,8.5vh,6rem)] z-10 flex flex-col items-center gap-1.5 sm:gap-2 px-4 text-center"
            >
                <motion.p
                    initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.8 }}
                    className="text-[clamp(1rem,1.6vw,1.5rem)] font-light tracking-wide text-bone"
                >
                    Atharva Lotankar
                </motion.p>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="tracked text-[clamp(0.58rem,1.1vw,0.88rem)] text-bone/85 [letter-spacing:0.25em] sm:[letter-spacing:0.45em]"
                >
                    Full Stack Developer <span className="mx-[0.3em] opacity-60">|</span> AI Enthusiast
                </motion.p>
            </motion.div>

            {/* Giant title - sits BEHIND the tower */}
            <motion.h1
                aria-label="Portfolio"
                style={{ y: wordY, x: wordX, translateY: wordYPointer, opacity: fade }}
                className="display-type absolute inset-x-0 top-[clamp(7.5rem,19vh,12rem)] z-10 flex select-none justify-center text-[clamp(3.8rem,min(21vw,33vh),16.5rem)] text-bone"
            >
                {Array.from(WORD).map((ch, i) => (
                    <span key={i} className="block overflow-hidden px-[0.005em] py-[0.07em] -my-[0.07em]" aria-hidden="true">
                        <motion.span className="block" {...rise(i)}>
                            {ch}
                        </motion.span>
                    </span>
                ))}
            </motion.h1>

            {/* 3D tower - in front of the title */}
            <div className="absolute inset-0 z-20 pointer-events-none">
                {!sceneReady && <FlatTower />}
                {webgl && (
                    <SceneGuard fallback={<FlatTower />}>
                        <Suspense fallback={null}>
                            <motion.div
                                className="absolute inset-0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: sceneReady ? 1 : 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <SceneMount
                                    pointer={pointer}
                                    scrollRef={scrollRef}
                                    active={active}
                                    reduce={!!reduce}
                                    onReady={() => setSceneReady(true)}
                                />
                            </motion.div>
                        </Suspense>
                    </SceneGuard>
                )}
            </div>

            {/* Fade the tower into the page below */}
            <div className="absolute inset-x-0 bottom-0 z-30 h-[22%] bg-gradient-to-b from-transparent to-primary pointer-events-none" />

            {/* Bottom row */}
            <motion.div
                initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.9 }}
                className="absolute inset-x-0 bottom-6 sm:bottom-8 md:bottom-10 z-30 mx-auto hidden w-[90%] sm:flex max-w-[1700px] items-end justify-between gap-6 text-[clamp(0.8rem,1.15vw,1.1rem)] font-light text-bone"
            >
                <a
                    href="https://www.instagram.com/atharva_lotankar11"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-draw pb-1 min-h-[44px] inline-flex items-center"
                >
                    @atharva_lotankar11
                </a>
                <p className="text-right pb-2.5">B.Tech IT, VESIT - Class of 2027</p>
            </motion.div>

            <motion.a
                href="#about"
                style={{ opacity: fade }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                className="absolute bottom-6 left-1/2 z-40 hidden -translate-x-1/2 sm:flex flex-col items-center justify-center gap-2 text-xs font-light tracking-[0.3em] text-bone/80 min-h-[44px] min-w-[44px]"
                aria-label="Scroll to About"
            >
                Scroll
                <span className="relative block h-10 w-px overflow-hidden bg-bone/25">
                    <motion.span
                        className="absolute inset-x-0 top-0 h-4 bg-blush"
                        animate={reduce ? undefined : { y: ['-100%', '260%'] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </span>
            </motion.a>
        </section>
    );
};

// Tiny wrapper so we can signal "first frame drawn" to cross-fade from the CSS stand-in
function SceneMount({ onReady, ...props }) {
    useEffect(() => {
        const id = setTimeout(onReady, 350);
        return () => clearTimeout(id);
    }, [onReady]);
    return <BuildingScene {...props} />;
}

export default Hero;
