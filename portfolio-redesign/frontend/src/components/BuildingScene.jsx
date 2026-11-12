import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';

/**
 * Hero 3D scene - the building corner from the cover design.
 *
 * - Camera sits low and looks steeply up, so the roof corner becomes the apex in front of the giant title.
 * - Pointer: building yaws +/- (parallax). Scroll: building rotates and rises out of frame.
 * - Intro: building rises from below the fold once.
 * Camera numbers were fitted to the Canva cover (apex ~49% from the top, roof lines ~41 degrees, running off both bottom corners).
 */

const PITCH = THREE.MathUtils.degToRad(64);
const BUILDING_SIZE = 24;                   // edge length of the square tower (wide, so the roof lines run off-frame like the cover)
const CORNER = (BUILDING_SIZE / 2) * Math.SQRT2;
const ROOF_Y = 15.6;                          // roof height above the camera
const TOWER_H = 80;

// One facade "bay": glass-block panel around a dark window with a railing.
function makeFacadeTexture({ base, tint, dark, frame, cols, rows, reduce }) {
    const c = document.createElement('canvas');
    c.width = 256;
    c.height = 300;
    const g = c.getContext('2d');

    g.fillStyle = base;
    g.fillRect(0, 0, c.width, c.height);

    // glass-block panel
    const px = 8, py = 8, pw = c.width - 16, ph = c.height - 16;
    g.fillStyle = tint;
    g.fillRect(px, py, pw, ph);
    g.strokeStyle = 'rgba(0,0,0,0.13)';
    g.lineWidth = 1;
    for (let x = 0; x <= pw; x += 14) { g.beginPath(); g.moveTo(px + x, py); g.lineTo(px + x, py + ph); g.stroke(); }
    for (let y = 0; y <= ph; y += 14) { g.beginPath(); g.moveTo(px, py + y); g.lineTo(px + pw, py + y); g.stroke(); }

    // window opening
    const ww = 84, wh = 196;
    const wx = (c.width - ww) / 2, wy = 52;
    g.fillStyle = dark;
    g.fillRect(wx, wy, ww, wh);
    g.strokeStyle = frame;
    g.lineWidth = 4;
    g.strokeRect(wx - 2, wy - 2, ww + 4, wh + 4);

    // railing across the lower half of the opening
    g.strokeStyle = 'rgba(230,230,230,0.38)';
    g.lineWidth = 2;
    g.beginPath(); g.moveTo(wx, wy + wh * 0.52); g.lineTo(wx + ww, wy + wh * 0.52); g.stroke();
    g.lineWidth = 1.5;
    for (let x = wx + 9; x < wx + ww; x += 11) {
        g.beginPath(); g.moveTo(x, wy + wh * 0.52); g.lineTo(x, wy + wh); g.stroke();
    }

    // bay seam
    g.strokeStyle = 'rgba(0,0,0,0.28)';
    g.lineWidth = 2;
    g.strokeRect(1, 1, c.width - 2, c.height - 2);

    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(cols, rows);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
}

function Tower({ pointer, scrollRef, reduce }) {
    const group = useRef();
    const { camera } = useThree();
    const start = useRef(null);
    const smooth = useRef({ x: 0, y: 0 });

    const textures = useMemo(() => {
        const cols = 12, rows = 34;
        return {
            slate: makeFacadeTexture({ base: '#7d939e', tint: '#8da6b2', dark: '#0f1113', frame: '#aebcc2', cols, rows }),
            blush: makeFacadeTexture({ base: '#d8b5a8', tint: '#e4c8bd', dark: '#101113', frame: '#f0ddd5', cols, rows }),
        };
    }, []);

    useEffect(() => () => { textures.slate.dispose(); textures.blush.dispose(); }, [textures]);

    useFrame((state) => {
        if (!group.current) return;
        if (start.current === null) start.current = state.clock.elapsedTime;
        const t = state.clock.elapsedTime - start.current;

        // pointer easing
        smooth.current.x += (pointer.current.x - smooth.current.x) * 0.06;
        smooth.current.y += (pointer.current.y - smooth.current.y) * 0.06;

        const intro = reduce ? 1 : Math.min(1, Math.max(0, (t - 0.25) / 2.0));
        const eased = 1 - Math.pow(1 - intro, 4);           // easeOutQuart
        const scroll = scrollRef.current;                    // 0..1 while the hero scrolls away
        const idle = reduce ? 0 : Math.sin(t * 0.45) * 0.045;

        // rotate around the apex edge so the corner stays put while the two faces swing
        group.current.rotation.y = idle + smooth.current.x * 0.22 + scroll * 0.8;
        group.current.position.y = -(1 - eased) * 16 + scroll * 16;

        camera.rotation.x = PITCH + smooth.current.y * -0.035;
        camera.position.x = smooth.current.x * 0.35;
    });

    return (
        <group ref={group} position={[0, 0, CORNER]}>
          <group position={[0, 0, -CORNER]} rotation={[0, -Math.PI / 4, 0]}>
            {/* +x -> right-front face (blush), +z -> left-front face (slate) */}
            <mesh position={[0, ROOF_Y - TOWER_H / 2, 0]}>
                <boxGeometry args={[BUILDING_SIZE, TOWER_H, BUILDING_SIZE]} />
                <meshStandardMaterial attach="material-0" map={textures.blush} roughness={0.92} />
                <meshStandardMaterial attach="material-1" map={textures.slate} roughness={0.92} />
                <meshStandardMaterial attach="material-2" color="#b9bec0" />
                <meshStandardMaterial attach="material-3" color="#b9bec0" />
                <meshStandardMaterial attach="material-4" map={textures.slate} roughness={0.92} />
                <meshStandardMaterial attach="material-5" map={textures.blush} roughness={0.92} />
            </mesh>
            {/* parapet lip - reads as the pale band along the roof lines */}
            <mesh position={[0, ROOF_Y + 0.05, 0]}>
                <boxGeometry args={[BUILDING_SIZE + 0.9, 0.8, BUILDING_SIZE + 0.9]} />
                <meshStandardMaterial color="#aeb4b6" roughness={0.7} />
            </mesh>
          </group>
        </group>
    );
}

function Rig() {
    const { camera, size } = useThree();
    useEffect(() => {
        camera.position.set(0, 0, 8 + CORNER);
        camera.rotation.set(PITCH, 0, 0);
        // keep the cover's horizontal framing on tall (mobile) screens
        const aspect = size.width / size.height;
        const baseTan = Math.tan(THREE.MathUtils.degToRad(25)) * 1.414;
        const fov = aspect >= 1.414 ? 50 : Math.min(98, THREE.MathUtils.radToDeg(2 * Math.atan(baseTan / aspect)));
        camera.fov = fov;
        camera.updateProjectionMatrix();
    }, [camera, size]);
    return null;
}

export default function BuildingScene({ pointer, scrollRef, active = true, reduce = false }) {
    return (
        <Canvas
            frameloop={active ? 'always' : 'never'}
            dpr={[1, 2]}
            flat
            gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
            camera={{ fov: 50, near: 0.1, far: 120, position: [0, 0, 8 + CORNER], rotation: [PITCH, 0, 0] }}
            style={{ pointerEvents: 'none' }}
            aria-hidden="true"
        >
            <Rig />
            <ambientLight intensity={0.85} />
            <directionalLight position={[5, 6, 7]} intensity={2.3} color="#fff3ea" />
            <directionalLight position={[-6, 3, 4]} intensity={0.6} color="#b8d0dc" />
            <Tower pointer={pointer} scrollRef={scrollRef} reduce={reduce} />
        </Canvas>
    );
}
