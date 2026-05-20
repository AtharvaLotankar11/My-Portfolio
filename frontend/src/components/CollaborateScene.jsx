import React, { useRef, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Custom hook: native pinch-to-zoom on the canvas div, moves camera Z directly
function usePinchZoom(canvasRef, cameraRef) {
    React.useEffect(() => {
        const el = canvasRef.current;
        if (!el) return;

        let lastDist = null;
        let velocity = 0;
        let rafId = null;

        const getDistance = (touches) => {
            const dx = touches[0].clientX - touches[1].clientX;
            const dy = touches[0].clientY - touches[1].clientY;
            return Math.sqrt(dx * dx + dy * dy);
        };

        // Momentum loop — keeps coasting after fingers lift
        const applyMomentum = () => {
            const cam = cameraRef.current;
            if (!cam || Math.abs(velocity) < 0.001) { velocity = 0; return; }
            cam.position.z = Math.min(7, Math.max(2.5, cam.position.z + velocity));
            velocity *= 0.88;   // friction — lower = stops faster, higher = longer coast
            rafId = requestAnimationFrame(applyMomentum);
        };

        const onTouchStart = (e) => {
            if (e.touches.length === 2) {
                lastDist = getDistance(e.touches);
                velocity = 0;
                cancelAnimationFrame(rafId);
            }
        };

        const onTouchMove = (e) => {
            if (e.touches.length === 2 && lastDist !== null) {
                e.preventDefault();
                const cam = cameraRef.current;
                if (!cam) return;
                const newDist = getDistance(e.touches);
                const delta = lastDist - newDist;   // positive = fingers closing = zoom out
                const speed = 0.12;                 // swift response
                velocity = delta * speed;
                cam.position.z = Math.min(7, Math.max(2.5, cam.position.z + velocity));
                lastDist = newDist;
            }
        };

        const onTouchEnd = (e) => {
            if (e.touches.length < 2) {
                lastDist = null;
                // kick off momentum coast
                rafId = requestAnimationFrame(applyMomentum);
            }
        };

        el.addEventListener('touchstart', onTouchStart, { passive: true });
        el.addEventListener('touchmove', onTouchMove, { passive: false });
        el.addEventListener('touchend', onTouchEnd, { passive: true });

        return () => {
            el.removeEventListener('touchstart', onTouchStart);
            el.removeEventListener('touchmove', onTouchMove);
            el.removeEventListener('touchend', onTouchEnd);
            cancelAnimationFrame(rafId);
        };
    }, [canvasRef, cameraRef]);
}

// Desktop Monitor component (not laptop!)
function DesktopMonitor({ onRegisterClick, onLoginClick, isPowerOn }) {
    return (
        <group position={[0, 0.23, -0.3]}>
            {/* Monitor Stand Base - sits ON desk */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.15, 0.15, 0.05]} />
                <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
            </mesh>

            {/* Monitor Stand Pole */}
            <mesh position={[0, 0.25, 0]}>
                <cylinderGeometry args={[0.03, 0.03, 0.5]} />
                <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.4} />
            </mesh>

            {/* Monitor Screen Frame */}
            <group position={[0, 0.7, 0]}>
                <mesh>
                    <boxGeometry args={[1.8, 1.1, 0.08]} />
                    <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
                </mesh>

                {/* Screen Display */}
                <mesh position={[0, 0, 0.045]}>
                    <boxGeometry args={[1.7, 1.0, 0.02]} />
                    <meshStandardMaterial 
                        color={isPowerOn ? "#0f0f1e" : "#020205"} 
                        emissive={isPowerOn ? "#4444ff" : "#000000"} 
                        emissiveIntensity={isPowerOn ? 0.15 : 0}
                    />
                </mesh>

                {isPowerOn && (
                    <>
                        {/* Main Title */}
                        <Text
                            position={[0, 0.35, 0.07]}
                            fontSize={0.15}
                            color="#ffffff"
                            anchorX="center"
                            anchorY="middle"
                            fontWeight="bold"
                        >
                            Ready to
                        </Text>
                        <Text
                            position={[0, 0.19, 0.07]}
                            fontSize={0.15}
                            color="#6366f1"
                            anchorX="center"
                            anchorY="middle"
                            fontWeight="bold"
                        >
                            Collaborate?
                        </Text>

                        {/* Subtitle */}
                        <Text
                            position={[0, 0.0, 0.07]}
                            fontSize={0.07}
                            color="#9ca3af"
                            anchorX="center"
                            anchorY="middle"
                            maxWidth={1.6}
                        >
                            💬 Sign In to connect with me directly 🌐
                        </Text>

                        {/* Register Button - CLICKABLE */}
                        <group position={[-0.32, -0.24, 0.07]}>
                            <mesh 
                                onClick={onRegisterClick}
                                onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
                                onPointerOut={(e) => { e.stopPropagation(); document.body.style.cursor = 'default'; }}
                            >
                                <boxGeometry args={[0.45, 0.14, 0.02]} />
                                <meshStandardMaterial 
                                    color="#6366f1" 
                                    emissive="#6366f1" 
                                    emissiveIntensity={0.3}
                                />
                            </mesh>
                            <Text
                                position={[0, 0, 0.02]}
                                fontSize={0.07}
                                color="#ffffff"
                                anchorX="center"
                                anchorY="middle"
                                fontWeight="bold"
                            >
                                Register
                            </Text>
                        </group>

                        {/* Login Button - CLICKABLE */}
                        <group position={[0.32, -0.24, 0.07]}>
                            <mesh
                                onClick={onLoginClick}
                                onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
                                onPointerOut={(e) => { e.stopPropagation(); document.body.style.cursor = 'default'; }}
                            >
                                <boxGeometry args={[0.45, 0.14, 0.02]} />
                                <meshStandardMaterial 
                                    color="#1a1a2e" 
                                    emissive="#6366f1" 
                                    emissiveIntensity={0.1}
                                />
                            </mesh>
                            {/* Button Border */}
                            <mesh position={[0, 0, 0.005]}>
                                <boxGeometry args={[0.47, 0.16, 0.01]} />
                                <meshStandardMaterial 
                                    color="#6366f1" 
                                    transparent 
                                    opacity={0.5}
                                />
                            </mesh>
                            <Text
                                position={[0, 0, 0.02]}
                                fontSize={0.07}
                                color="#6366f1"
                                anchorX="center"
                                anchorY="middle"
                                fontWeight="bold"
                            >
                                Login
                            </Text>
                        </group>

                        {/* Screen Glow */}
                        <pointLight position={[0, 0, 0.3]} intensity={0.4} color="#6366f1" distance={2} />
                    </>
                )}
            </group>
        </group>
    );
}

// Desk component
function Desk() {
    return (
        <group position={[0, 0, 0]}>
            {/* Desk Top */}
            <mesh position={[0, 0.075, 0]}>
                <boxGeometry args={[3.5, 0.15, 2]} />
                <meshStandardMaterial color="#A0522D" roughness={0.6} metalness={0.2} />
            </mesh>

            {/* Name inscription on front edge of desk */}
            <Text
                position={[0, 0.075, 1.01]}
                fontSize={0.13}
                color="#FFD700"
                anchorX="center"
                anchorY="middle"
                font="/CinzelDecorative.woff"
                outlineWidth={0.005}
                outlineColor="#5C2A00"
                letterSpacing={0.06}
                maxWidth={3.2}
                fillOpacity={1}
            >
                Atharva Lotankar
            </Text>
            {/* Subtle glow light on the inscription */}
            <pointLight position={[0, 0.15, 1.1]} intensity={0.3} color="#FFD700" distance={1.2} />

            {/* Desk Legs */}
            {[
                [-1.5, -0.425, -0.8],
                [1.5, -0.425, -0.8],
                [-1.5, -0.425, 0.8],
                [1.5, -0.425, 0.8]
            ].map((pos, i) => (
                <mesh key={i} position={pos}>
                    <cylinderGeometry args={[0.06, 0.06, 1]} />
                    <meshStandardMaterial color="#8B4513" />
                </mesh>
            ))}
        </group>
    );
}

// Keyboard on desk - same width as desktop
function Keyboard() {
    return (
        <group position={[0, 0.17, 0.5]} rotation={[0, 0, 0]}>
            {/* Keyboard base - wider to match desktop */}
            <mesh>
                <boxGeometry args={[1.6, 0.04, 0.5]} />
                <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
            </mesh>
            {/* Keys */}
            {Array.from({ length: 60 }).map((_, i) => (
                <mesh key={i} position={[-0.7 + (i % 15) * 0.1, 0.025, -0.2 + Math.floor(i / 15) * 0.1]}>
                    <boxGeometry args={[0.08, 0.01, 0.08]} />
                    <meshStandardMaterial color="#2a2a2a" />
                </mesh>
            ))}
        </group>
    );
}

// Gaming Mouse with RGB lighting - right next to keyboard
function Mouse({ isPowerOn }) {
    return (
        <group position={[1.0, 0.2, 0.5]}>
            {/* Main mouse body - gaming style with angular design - TALLER */}
            <mesh scale={[1.3, 1.6, 1.6]}>
                <sphereGeometry args={[0.08, 32, 32]} />
                <meshStandardMaterial 
                    color="#1a1a1a" 
                    metalness={0.7} 
                    roughness={0.3}
                />
            </mesh>
            
            {/* Left mouse button */}
            <mesh position={[-0.03, 0.08, 0.02]} scale={[0.9, 1.2, 1.3]}>
                <sphereGeometry args={[0.03, 16, 16]} />
                <meshStandardMaterial 
                    color="#2a2a2a" 
                    metalness={0.6}
                    roughness={0.4}
                />
            </mesh>
            
            {/* Right mouse button */}
            <mesh position={[0.03, 0.08, 0.02]} scale={[0.9, 1.2, 1.3]}>
                <sphereGeometry args={[0.03, 16, 16]} />
                <meshStandardMaterial 
                    color="#2a2a2a" 
                    metalness={0.6}
                    roughness={0.4}
                />
            </mesh>
            
            {/* Scroll wheel with RGB glow */}
            <mesh position={[0, 0.11, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.015, 0.015, 0.05]} />
                <meshStandardMaterial 
                    color={isPowerOn ? "#00ffff" : "#1a1a1a"} 
                    metalness={0.8} 
                    roughness={0.2}
                    emissive={isPowerOn ? "#00ffff" : "#000000"}
                    emissiveIntensity={isPowerOn ? 0.8 : 0}
                />
            </mesh>
            {isPowerOn && <pointLight position={[0, 0.13, 0]} intensity={0.4} color="#00ffff" distance={0.3} />}
            
            {/* RGB LED strip - Left side (Cyan to Purple gradient) */}
            {Array.from({ length: 5 }).map((_, i) => (
                <mesh key={`left-${i}`} position={[-0.09, 0.03 + i * 0.025, 0.05]} scale={[0.3, 0.8, 1]}>
                    <sphereGeometry args={[0.008, 8, 8]} />
                    <meshStandardMaterial 
                        color={isPowerOn ? (i % 2 === 0 ? "#00ffff" : "#ff00ff") : "#1a1a1a"}
                        emissive={isPowerOn ? (i % 2 === 0 ? "#00ffff" : "#ff00ff") : "#000000"}
                        emissiveIntensity={isPowerOn ? 1.2 : 0}
                        metalness={0.5}
                    />
                </mesh>
            ))}
            
            {/* RGB LED strip - Right side (Purple to Red gradient) */}
            {Array.from({ length: 5 }).map((_, i) => (
                <mesh key={`right-${i}`} position={[0.09, 0.03 + i * 0.025, 0.05]} scale={[0.3, 0.8, 1]}>
                    <sphereGeometry args={[0.008, 8, 8]} />
                    <meshStandardMaterial 
                        color={isPowerOn ? (i % 2 === 0 ? "#ff00ff" : "#ff0000") : "#1a1a1a"}
                        emissive={isPowerOn ? (i % 2 === 0 ? "#ff00ff" : "#ff0000") : "#000000"}
                        emissiveIntensity={isPowerOn ? 1.2 : 0}
                        metalness={0.5}
                    />
                </mesh>
            ))}
            
            {/* RGB glow lights on sides */}
            {isPowerOn && (
                <>
                    <pointLight position={[-0.09, 0.07, 0.05]} intensity={0.3} color="#00ffff" distance={0.25} />
                    <pointLight position={[0.09, 0.07, 0.05]} intensity={0.3} color="#ff00ff" distance={0.25} />
                </>
            )}
            
            {/* DPI indicator lights on top */}
            {[0, 1, 2].map((i) => (
                <mesh key={`dpi-${i}`} position={[-0.02 + i * 0.02, 0.11, -0.05]}>
                    <circleGeometry args={[0.005, 8]} />
                    <meshStandardMaterial 
                        color={isPowerOn ? (i === 1 ? "#00ff00" : "#333333") : "#111111"}
                        emissive={isPowerOn ? (i === 1 ? "#00ff00" : "#000000") : "#000000"}
                        emissiveIntensity={isPowerOn ? (i === 1 ? 1 : 0) : 0}
                    />
                </mesh>
            ))}
            
            {/* Logo area with RGB glow */}
            <mesh position={[0, 0.12, -0.08]}>
                <circleGeometry args={[0.015, 16]} />
                <meshStandardMaterial 
                    color={isPowerOn ? "#ff0000" : "#222222"}
                    emissive={isPowerOn ? "#ff0000" : "#000000"}
                    emissiveIntensity={isPowerOn ? 0.8 : 0}
                    metalness={0.7}
                />
            </mesh>
            {isPowerOn && <pointLight position={[0, 0.13, -0.08]} intensity={0.2} color="#ff0000" distance={0.2} />}
        </group>
    );
}

// CPU Tower - same height as desktop - FACING FRONT with visible components and better lighting
function CPUTower({ isPowerOn, onPowerToggle }) {
    return (
        <group position={[-1.3, 0.525, 0]} rotation={[0, -Math.PI / 2, 0]}>
            {/* Main tower body - lighter color - CLICKABLE FROM ANY ANGLE */}
            <mesh
                onClick={onPowerToggle}
                onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
                onPointerOut={(e) => { e.stopPropagation(); document.body.style.cursor = 'default'; }}
            >
                <boxGeometry args={[0.3, 0.9, 0.4]} />
                <meshStandardMaterial 
                    color="#2a2a2a" 
                    metalness={0.6} 
                    roughness={0.4}
                    emissive="#1a1a1a"
                    emissiveIntensity={0.1}
                />
            </mesh>
            {/* Front panel - lighter - CLICKABLE */}
            <mesh 
                position={[0.151, 0, 0]}
                onClick={onPowerToggle}
                onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
                onPointerOut={(e) => { e.stopPropagation(); document.body.style.cursor = 'default'; }}
            >
                <boxGeometry args={[0.002, 0.85, 0.35]} />
                <meshStandardMaterial 
                    color="#3a3a3a" 
                    metalness={0.5}
                    roughness={0.5}
                />
            </mesh>
            
            {/* Power Button - Toggle click */}
            <mesh 
                position={[0.16, 0.38, 0.12]}
                onClick={onPowerToggle}
                onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
                onPointerOut={(e) => { e.stopPropagation(); document.body.style.cursor = 'default'; }}
            >
                <circleGeometry args={[0.018, 16]} />
                <meshStandardMaterial 
                    color={isPowerOn ? "#666666" : "#444444"} 
                    metalness={0.6}
                    roughness={0.4}
                />
            </mesh>
            
            {/* Power LED - green with strong glow */}
            <mesh 
                position={[0.16, 0.32, 0.12]}
                onClick={onPowerToggle}
                onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
                onPointerOut={(e) => { e.stopPropagation(); document.body.style.cursor = 'default'; }}
            >
                <circleGeometry args={[0.01, 16]} />
                <meshStandardMaterial 
                    color={isPowerOn ? "#00ff00" : "#222222"} 
                    emissive={isPowerOn ? "#00ff00" : "#000000"} 
                    emissiveIntensity={isPowerOn ? 1.5 : 0}
                />
            </mesh>
            {isPowerOn && <pointLight position={[0.2, 0.32, 0.12]} intensity={0.5} color="#00ff00" distance={0.8} />}
            
            {/* HDD LED - red */}
            <mesh 
                position={[0.16, 0.26, 0.12]}
                onClick={onPowerToggle}
                onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
                onPointerOut={(e) => { e.stopPropagation(); document.body.style.cursor = 'default'; }}
            >
                <circleGeometry args={[0.008, 16]} />
                <meshStandardMaterial 
                    color={isPowerOn ? "#ff0000" : "#222222"} 
                    emissive={isPowerOn ? "#ff0000" : "#000000"} 
                    emissiveIntensity={isPowerOn ? 1 : 0}
                />
            </mesh>
            
            {/* DVD Drive slot */}
            <mesh position={[0.16, 0.15, 0]}>
                <boxGeometry args={[0.001, 0.04, 0.3]} />
                <meshStandardMaterial color="#1a1a1a" />
            </mesh>
            
            {/* DVD Eject button */}
            <mesh position={[0.16, 0.15, 0.13]}>
                <boxGeometry args={[0.002, 0.02, 0.02]} />
                <meshStandardMaterial color="#555555" metalness={0.5} />
            </mesh>
            
            {/* USB Ports - blue */}
            {[0, 1].map((i) => (
                <mesh key={i} position={[0.16, 0.05, -0.08 + i * 0.04]}>
                    <boxGeometry args={[0.002, 0.015, 0.03]} />
                    <meshStandardMaterial 
                        color="#0066cc" 
                        metalness={0.7}
                        emissive="#0044aa"
                        emissiveIntensity={0.3}
                    />
                </mesh>
            ))}
            
            {/* Audio jacks - colored */}
            {[0, 1].map((i) => (
                <mesh key={i} position={[0.16, 0.05, 0.05 + i * 0.03]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.01, 0.01, 0.002]} />
                    <meshStandardMaterial 
                        color={i === 0 ? "#00ff00" : "#ff69b4"} 
                        metalness={0.6}
                        emissive={i === 0 ? "#00aa00" : "#ff1493"}
                        emissiveIntensity={0.3}
                    />
                </mesh>
            ))}
            
            {/* Ventilation grills */}
            {Array.from({ length: 10 }).map((_, i) => (
                <mesh key={i} position={[0.16, -0.25 + i * 0.05, 0]}>
                    <boxGeometry args={[0.001, 0.02, 0.28]} />
                    <meshStandardMaterial color="#0a0a0a" />
                </mesh>
            ))}
        </group>
    );
}

// Wired Connections for Keyboard, Mouse, and Monitor to CPU
function Cables() {
    // 1. Keyboard Cable
    // Starts from CPU back socket, drops to desk, curves behind keyboard, enters keyboard back center
    const keyboardPoints = [
        new THREE.Vector3(-1.3, 0.35, -0.15),   // CPU back socket
        new THREE.Vector3(-1.35, 0.28, -0.22),  // Droop out of CPU
        new THREE.Vector3(-1.2, 0.19, -0.25),   // Desk level behind CPU (raised to 0.19)
        new THREE.Vector3(-0.7, 0.19, -0.1),    // Curved path along desk (raised to 0.19)
        new THREE.Vector3(-0.3, 0.19, 0.1),     // Curve nearing keyboard (raised to 0.19)
        new THREE.Vector3(0, 0.18, 0.25)        // Into keyboard back center
    ];
    const keyboardCurve = new THREE.CatmullRomCurve3(keyboardPoints);

    // 2. Mouse Cable
    // Starts from CPU back socket, curves behind monitor stand, goes along desk, loops around and enters mouse front
    const mousePoints = [
        new THREE.Vector3(-1.3, 0.45, -0.15),   // CPU back socket (higher port)
        new THREE.Vector3(-1.35, 0.38, -0.25),  // Droop out of CPU
        new THREE.Vector3(-1.1, 0.19, -0.32),   // Desk level (raised to 0.19)
        new THREE.Vector3(0.0, 0.19, -0.25),    // Curved behind monitor stand base (raised to 0.19)
        new THREE.Vector3(0.8, 0.19, -0.15),    // Curved towards mouse side (raised to 0.19)
        new THREE.Vector3(1.2, 0.19, 0.25),     // Wrapping curve (raised to 0.19)
        new THREE.Vector3(1.0, 0.2, 0.58)       // Into front of mouse (between buttons)
    ];
    const mouseCurve = new THREE.CatmullRomCurve3(mousePoints);

    // 3. Monitor Display Cable
    // Starts from back of monitor, drops down and runs behind CPU, curves up and plugs into CPU graphics port
    const monitorPoints = [
        new THREE.Vector3(0, 0.75, -0.34),      // Monitor back center
        new THREE.Vector3(0, 0.6, -0.38),       // Droop out of monitor back
        new THREE.Vector3(-0.6, 0.19, -0.35),   // Desk level behind monitor (raised to 0.19)
        new THREE.Vector3(-1.1, 0.19, -0.32),   // Running along desk behind CPU (raised to 0.19)
        new THREE.Vector3(-1.3, 0.45, -0.25),   // Curve up behind CPU
        new THREE.Vector3(-1.3, 0.55, -0.15)    // Into CPU back display port
    ];
    const monitorCurve = new THREE.CatmullRomCurve3(monitorPoints);

    return (
        <group>
            {/* Keyboard Cable Port on CPU Back */}
            <mesh position={[-1.3, 0.35, -0.15]}>
                <boxGeometry args={[0.03, 0.02, 0.015]} />
                <meshStandardMaterial color="#0c0c0c" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Mouse Cable Port on CPU Back */}
            <mesh position={[-1.3, 0.45, -0.15]}>
                <boxGeometry args={[0.03, 0.02, 0.015]} />
                <meshStandardMaterial color="#0c0c0c" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Monitor Cable Port on CPU Back */}
            <mesh position={[-1.3, 0.55, -0.15]}>
                <boxGeometry args={[0.03, 0.02, 0.015]} />
                <meshStandardMaterial color="#0c0c0c" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Keyboard Cable */}
            <mesh>
                <tubeGeometry args={[keyboardCurve, 64, 0.012, 8, false]} />
                <meshStandardMaterial color="#151515" roughness={0.6} metalness={0.2} />
            </mesh>

            {/* Mouse Cable */}
            <mesh>
                <tubeGeometry args={[mouseCurve, 64, 0.01, 8, false]} />
                <meshStandardMaterial color="#151515" roughness={0.6} metalness={0.2} />
            </mesh>

            {/* Monitor Display Cable */}
            <mesh>
                <tubeGeometry args={[monitorCurve, 64, 0.016, 8, false]} />
                <meshStandardMaterial color="#1c1c1c" roughness={0.5} metalness={0.3} />
            </mesh>
        </group>
    );
}

// Rotating Scene Group - Everything rotates together
// Scale is fixed at 1.5; camera position handles zoom for responsiveness
function RotatingScene({ onRegisterClick, onLoginClick, isDraggingRef, isPowerOn, onPowerToggle }) {
    const sceneRef = useRef();

    useFrame(() => {
        if (!isDraggingRef.current) {
            sceneRef.current.rotation.y += 0.002;
        }
    });

    return (
        <group ref={sceneRef} position={[0, 0.05, 0]} scale={[1.5, 1.5, 1.5]}>
            <DesktopMonitor onRegisterClick={onRegisterClick} onLoginClick={onLoginClick} isPowerOn={isPowerOn} />
            <Desk />
            <Keyboard />
            <Mouse isPowerOn={isPowerOn} />
            <CPUTower isPowerOn={isPowerOn} onPowerToggle={onPowerToggle} />
            <Cables />
        </group>
    );
}

// Responsive camera — moves closer on mobile so the scene fills the canvas
function ResponsiveCamera() {
    const { camera } = useThree();
    React.useEffect(() => {
        const update = () => {
            const w = window.innerWidth;
            if (w < 380) {
                camera.position.set(0, 1.5, 4.0);
                camera.fov = 65;
            } else if (w < 480) {
                camera.position.set(0, 1.4, 4.4);
                camera.fov = 60;
            } else if (w < 768) {
                camera.position.set(0, 1.3, 4.8);
                camera.fov = 55;
            } else {
                camera.position.set(0, 1.2, 5);
                camera.fov = 50;
            }
            camera.updateProjectionMatrix();
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, [camera]);
    return null;
}

// Main Scene — camera ref exposed for pinch zoom
function Scene({ onRegisterClick, onLoginClick, cameraRef }) {
    const isDraggingRef = useRef(false);
    const [isPowerOn, setIsPowerOn] = React.useState(true);

    const handlePowerToggle = (e) => {
        if (e) e.stopPropagation();
        setIsPowerOn(prev => !prev);
    };

    return (
        <>
            <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 1.2, 5]} fov={50} />
            <ResponsiveCamera />
            {/* OrbitControls — zoom disabled, pinch handled manually */}
            <OrbitControls 
                enableZoom={false}
                enablePan={false}
                autoRotate={false}
                rotateSpeed={0.5}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 2.2}
                target={[0, 0.5, 0]}
                onStart={() => { isDraggingRef.current = true; }}
                onEnd={() => { isDraggingRef.current = false; }}
            />

            {/* Beautiful Yellow Gaming Environment - surrounds everything */}
            <color attach="background" args={['#ffcc66']} />
            <fog attach="fog" args={['#ffcc66', 8, 20]} />

            {/* Gaming-style Lighting */}
            <ambientLight intensity={0.7} color="#fff5e6" />
            <directionalLight position={[3, 4, 3]} intensity={1.2} color="#ffd700" />
            <pointLight position={[-3, 2, -2]} intensity={0.8} color="#ffaa00" />
            <pointLight position={[3, 2, 2]} intensity={0.6} color="#ff6600" />
            <spotLight 
                position={[0, 5, 0]} 
                angle={0.4} 
                penumbra={0.5} 
                intensity={1} 
                color="#ffcc00"
            />

            {/* Rotating Scene Group */}
            <RotatingScene 
                onRegisterClick={onRegisterClick} 
                onLoginClick={onLoginClick}
                isDraggingRef={isDraggingRef}
                isPowerOn={isPowerOn}
                onPowerToggle={handlePowerToggle}
            />

            {/* Polished Wood Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.075, 0]} receiveShadow>
                <planeGeometry args={[10, 10]} />
                <meshStandardMaterial 
                    color="#8B4513"
                    roughness={0.2}
                    metalness={0.1}
                    emissive="#3d2817"
                    emissiveIntensity={0.1}
                />
            </mesh>
        </>
    );
}

// Main Component with Error Boundary
const CollaborateScene = () => {
    const [hasError, setHasError] = React.useState(false);
    const navigate = useNavigate();
    const canvasWrapperRef = useRef(null);
    const cameraRef = useRef(null);

    // Native pinch-to-zoom — works independently of OrbitControls
    usePinchZoom(canvasWrapperRef, cameraRef);

    const handleRegisterClick = (e) => {
        e.stopPropagation();
        navigate('/register');
    };

    const handleLoginClick = (e) => {
        e.stopPropagation();
        navigate('/login');
    };

    if (hasError) {
        return (
            <section className="py-12 sm:py-16 md:py-20 bg-secondary/30">
                <div className="container mx-auto px-4 sm:px-6 flex justify-center">
                    <div className="bg-gradient-to-r from-secondary to-primary p-6 sm:p-8 md:p-12 rounded-xl sm:rounded-2xl border border-white/10 text-center max-w-4xl w-full shadow-2xl">
                        <h2 className="text-2xl font-bold mb-4">Ready to Collaborate?</h2>
                        <p className="text-gray-400 mb-6">💬 Sign In to connect with me directly 🌐</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-12 sm:py-16 md:py-20 bg-secondary/30">
            <div className="container mx-auto px-4 sm:px-6 flex justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-secondary to-primary p-3 sm:p-8 md:p-12 rounded-xl sm:rounded-2xl border border-white/10 text-center max-w-4xl w-full shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-purple-500 to-pink-500"></div>

                    {/* Full 3D Scene */}
                    <div ref={canvasWrapperRef} className="w-full h-[340px] sm:h-[420px] md:h-[500px] rounded-xl overflow-hidden bg-gradient-to-br from-yellow-900/20 via-orange-900/20 to-yellow-800/20 relative">
                        {/* Animated shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent animate-shimmer pointer-events-none z-10"></div>
                        <Suspense fallback={
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="text-yellow-400 text-lg animate-pulse">Loading 3D Scene...</div>
                            </div>
                        }>
                            <Canvas 
                                gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }} 
                                dpr={[1, 2]}
                                onCreated={({ gl }) => {
                                    gl.setClearColor('#0a0a00');
                                }}
                            >
                                <Scene onRegisterClick={handleRegisterClick} onLoginClick={handleLoginClick} cameraRef={cameraRef} />
                            </Canvas>
                        </Suspense>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CollaborateScene;
