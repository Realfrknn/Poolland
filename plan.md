# plan.md — DERİNER Cinematic AAA Marketing Website

## 1) Objectives
- Deliver an Apple-minimal + cinematic-documentary marketing site for **DERİNER** (23 years, KKTC geneli) with premium motion, realistic 3D scenes, and strong trust cues.
- Implement required sections: cinematic intro/loader, hero with 3D, 6 services (unique experiences), 3 dedicated 3D scenes (Yatay Sondaj / Kuyu Derinleştirme / Kuyu Güçlendirme), gallery (masonry + lightbox + before/after), contact CTAs.
- Ensure **mobile adaptive quality**, high FPS, and Lighthouse 90+ targets.
- Minimal backend: store contact form submissions in MongoDB.

## 2) Implementation Steps (Phased)

### Phase 1 — Core POC (Isolation): 3D + Scroll + Performance Envelope
**Goal:** Prove the hardest core (cinematic 3D + scroll orchestration + postprocessing) works smoothly in React.

**Steps**
1. Web research (quick): best practices for R3F performance + postprocessing + mobile fallbacks + GSAP ScrollTrigger with React.
2. Create a single `/poc` route/page with:
   - R3F Canvas + Drei + Postprocessing (bloom/vignette/chromatic aberration)
   - One hero-like 3D scene stub (procedural materials, HDRI, soft shadows)
   - Lenis smooth scroll + GSAP ScrollTrigger driving camera/lighting
   - Adaptive quality toggles (dpr clamp, effect intensity, shadows, particles)
3. Validate: stable FPS desktop, acceptable mobile fallback mode, no scroll jank.
4. Fix until it works: tune DPR, shadow maps, instancing, memoization, suspense/lazy.

**User stories (POC)**
- As a visitor, I want scrolling to feel ultra-smooth and premium throughout the site.
- As a visitor, I want the 3D visuals to look cinematic (not game-like) with realistic lighting.
- As a mobile visitor, I want the site to stay fluid with reduced GPU mode when needed.
- As a visitor, I want transitions to be subtle and not distracting.
- As an owner, I want performance to remain strong even with premium effects enabled.

**Exit criteria**
- Scroll-driven camera animation works without tearing.
- Postprocessing stack works and can be degraded on mobile.
- Baseline scene renders consistently across breakpoints.

---

### Phase 2 — V1 App Development (Frontend + Backend) + 1st E2E Test
**Goal:** Build the full marketing site MVP with all required sections and a working contact backend.

**Frontend build (React + Tailwind + motion/3D)**
1. Project scaffolding + deps:
   - Tailwind, Framer Motion, Lenis, GSAP + ScrollTrigger + @gsap/react
   - Three.js + @react-three/fiber + drei + postprocessing
2. Architecture + folders:
   - `components/` (Navbar, Footer, Cursor, Progress, Buttons, Lightbox)
   - `sections/` (Intro, Hero, Services, ServiceDetail blocks, Gallery, About, Contact)
   - `scenes/` (HeroScene, YataySondajScene, KuyuDerinlestirmeScene, KuyuGuclendirmeScene)
   - `shaders/` (stone reveal, concrete wet look, dust/particle materials)
   - `hooks/` (useLenis, useMedia, useQuality, useActiveSection)
   - `lib/` (services data, gallery data, animation helpers)
3. Cinematic Intro/Loader:
   - Logo reveal “DERİNER” emerges-from-stone feel (shader/texture + light sweep)
   - Dust particles + subtle volumetric impression + soft fades
4. Hero section:
   - Left typography (exact copy) + premium CTAs (Call / WhatsApp optional / Contact)
   - Right: hero 3D scene (equipment silhouettes/geo + high-quality lighting/materials)
5. Services (6) with unique layouts/animations:
   - Alternate grids, pinned sections, reveal masks, micro-interactions
   - Each service links to a dedicated detail block with relevant scene insert
6. Dedicated 3D scenes (required):
   - **Yatay Sondaj:** metallic drill rig forms, hoses, water vein particles, rock debris, mist
   - **Kuyu Derinleştirme:** layered rock shaft, dust, sparks, impact pulses
   - **Kuyu Güçlendirme:** circular mold + rebar feel, wet concrete shader, subtle reflections
   (MVP: procedural/low-poly + premium materials; ready for later asset swap)
7. Gallery:
   - Masonry grid + lazy loading
   - Lightbox with cinematic transitions
   - Before/after slider component for select items
8. UX systems:
   - Sticky navbar with active section
   - Scroll progress indicator
   - Custom cursor (context-aware on links/media)
   - Smooth section snapping (light touch; disable if harms UX)
9. Mobile optimization:
   - Adaptive quality (auto + manual override)
   - Reduce particles/shadows/effects on low power
   - Fallback static poster if WebGL fails

**Backend build (FastAPI + MongoDB)**
1. `POST /api/contact`:
   - Validate fields (name, phone/email, message)
   - Store submission with timestamp + userAgent/ip (if available)
2. Optional: `GET /api/services`, `GET /api/gallery` (can be static JSON in V1; upgrade later)
3. Basic rate limiting / honeypot field (lightweight anti-spam)

**Content wiring**
- Contact info:
  - Phone: **0533 863 62 64**
  - Email: **123furkantopal@gmail.com**
  - Location: **KKTC geneli**

**User stories (V1)**
- As a visitor, I want a cinematic intro that signals premium engineering trust instantly.
- As a visitor, I want a hero section that clearly communicates “23 yıllık tecrübe” with stunning visuals.
- As a visitor, I want each service to feel distinct with unique motion and storytelling.
- As a visitor, I want a modern gallery with lightbox and before/after comparisons.
- As a visitor, I want to contact DERİNER easily via phone/email or a form.
- As the owner, I want contact messages stored reliably in MongoDB.

**Phase 2 testing (1st E2E pass)**
- Run a full journey test: load → intro → hero → services → gallery lightbox/slider → contact submit → verify DB.
- Verify mobile breakpoints + reduced GPU mode.
- Validate accessibility basics (focus states, reduced motion).

---

### Phase 3 — Polish + Production Hardening + 2nd E2E Test
**Goal:** Upgrade from V1 to “million-dollar” finish without scope creep.

**Steps**
1. Visual polish:
   - Refine typography scale, spacing rhythm, and micro-interactions
   - Improve materials (stone/concrete/metal), lighting rigs, and camera moves
2. Performance:
   - Code-splitting scenes, lazy load heavy sections, compress textures
   - Clamp DPR, dynamic effect intensity, memoize geometries/materials
3. Robustness:
   - WebGL failure handling, slow-device detection, graceful fallbacks
   - Form UX: loading/success/error states + retry
4. SEO + share:
   - meta tags, OpenGraph, sitemap/basic robots
5. Analytics hooks (optional, lightweight) + event tracking plan (CTA clicks)

**User stories (Polish)**
- As a visitor, I want the site to feel premium on every interaction (hover, scroll, transitions).
- As a visitor, I want visuals to remain clean and minimal, never cluttered.
- As a mobile visitor, I want fast load and smooth navigation with no overheating.
- As a visitor, I want the gallery to load quickly and feel cinematic when opening items.
- As the owner, I want fewer spam submissions and clearer form confirmations.

**Phase 3 testing (2nd E2E pass)**
- Re-test full funnel + measure Lighthouse.
- Stress test: low-end mobile emulation + throttled network.

---

### Phase 4 — Optional Enhancements (Post-V1)
- Replace procedural 3D with curated high-quality assets (glTF) + baked lighting where needed.
- Add CMS-like editing (services/gallery JSON admin) if requested.
- Add WhatsApp CTA, multilingual (TR/EN), and richer case studies.

## 3) Next Actions (Immediate)
1. Run Phase 1 POC page: R3F + Lenis + GSAP ScrollTrigger + postprocessing + adaptive quality.
2. Lock the design tokens (colors, type scale, spacing) and motion rules.
3. Build Phase 2 in one consolidated implementation pass (frontend + backend) with required sections.

## 4) Success Criteria
- Premium cinematic look (Apple-minimal, engineering-trust) with no “game-like” feel.
- All required sections implemented, including 6 unique service presentations + 3 dedicated scenes.
- Mobile adaptive quality + graceful fallback; smooth scroll without jank.
- Lighthouse target: 90+ (with WebGL allowances), stable FPS.
- Contact form reliably stores submissions in MongoDB; clear UX states.
