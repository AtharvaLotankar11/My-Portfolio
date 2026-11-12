# Design doc - Portfolio (cover-inspired redesign)

**Concept:** the Canva cover, built as a site. A giant condensed title sits behind a 3D building corner; every section reuses that language (giant type, facade grid, slate and blush).

**Palette:** ink #1C1C1C, charcoal #2F2F2F, bone #E6E6E6, blush #E3BFB2 (interaction), slate #98AEB3.
**Type:** Anton (display, uppercase) and Poppins Light/Regular (body). Self-hosted in public/fonts.

**Motion:** one orchestrated moment (hero letters rise, tower rises). Everything else answers the user: tilt cards, trailing project preview, wipe fills, accordions, tabs. prefers-reduced-motion is respected.

**3D:** `BuildingScene.jsx` (react-three-fiber). Camera fitted to the cover; tower pivots about its apex edge on pointer move and scroll. Lazy-loaded; pauses off-screen; CSS fallback without WebGL.
