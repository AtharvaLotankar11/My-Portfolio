# Kiro prompt

This is a React 19 + Vite + Tailwind v4 + framer-motion + react-three-fiber portfolio (frontend/). A redesign was just dropped in. Do NOT add dependencies and do NOT change data content, routes, or Firebase auth logic.

Design system (index.css, tailwind.config.js): ink #1C1C1C, charcoal #2F2F2F, bone #E6E6E6, blush #E3BFB2, slate #98AEB3. Anton for display, Poppins for body. Cover concept: giant title behind a 3D building corner (src/components/BuildingScene.jsx).

Tasks:
1. Audit every section at 360, 768 and 1440 px; fix overflow and tap targets under 44px.
2. Confirm prefers-reduced-motion disables the tower intro/idle, tilt, and marquee.
3. Add visible keyboard focus and Enter/Space handling to Projects rows and the Experience accordion.
4. Restyle MessageMe, Login, Register, OtpPassword and CollaborateScene's frame to match the new palette (keep logic untouched).
5. Fix eslint: the existing config flags `motion.*` as unused; add `varsIgnorePattern: '^(motion|[A-Z_])'` to no-unused-vars.
6. Compress the largest project images (>800 kB) to WebP without visible loss.
7. Run `npm run build` and fix anything it reports.
