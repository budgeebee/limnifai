# Generation Log

Track each piece's creative direction to ensure deliberate variety over time.

---

## 2026-05-22 — Cleave

**Intention:** Almost every piece so far has been generative-visual (particles, shaders, reaction-diffusion). Only "Between" explored typography. No game-toy, no cellular automata. I want to create an interactive toy where two cellular automaton rule sets (Conway Life and an altern rule) compete across a continuous spectrum — the liminal space is literally the interpolated boundary between them.

**Format:** game-toy
**Technique:** cellular-automata (continuous blending between B3/S23 and B2/S34)
**Palette:** muted-nature (sage, dusty rose, slate)
**Mood:** contemplative
**Composition:** full-bleed
**File:** `cleave.html`
**What you explored:** Two competing CA rule sets sharing one grid with continuous state values [−1, 1]. Cells at the boundary blend both rule outcomes. Click to seed Life territory, shift+click for Altern territory. Floating poems cycle slowly. The contranym "cleave" — to split apart and to cling together — captures the threshold where two rule systems meet and neither fully dominates.

---

## 2026-05-23 — Attune

**Intention:** Recent pieces have been particle-heavy (rift, drift, suspended, vapor, basin). L-systems and geometric transformation (Lissajous) are underrepresented, and warm-earth palette hasn't been used recently. "Attune" uses Lissajous curves — two oscillators with drifting integer ratios — as a visual metaphor for the liminal moment when two frequencies become one.

**Format:** generative-visual
**Technique:** geometric-transformation (Lissajous curves, phase drift)
**Palette:** warm-earth (ochre, sienna, cream, terracotta)
**Mood:** urgent
**Composition:** asymmetric (figure lower-right, corner-driven text)
**File:** `attune.html`
**What you explored:** Lissajous figures morphing through integer frequency ratios as particles trail from the moving tracer point. The A:B ratio and phase delta are displayed in real time — you can watch the system approach and depart from pure resonance. Mouse proximity gently deflects the particle trails.

## 2026-05-26 — Limen

**Intention:** The recent pieces (cleave, attune) explored cellular automata and geometric transformation. Cold-ethereal aurora effect hasn't been done yet — "Limen" (Latin for threshold/doorway) is a perfect vehicle. Aurora ribbons as a metaphor for the liminal: light that exists only between states, visible only at the boundary where warmth meets cold.

**Format:** shader-wallpaper
**Technique:** aurora-effect (layered sinusoidal wave ribbons with color cycling, mouse-distort)
**Palette:** cold-ethereal (pale blue, silver, ice white, fog)
**Mood:** contemplative
**Composition:** full-bleed
**File:** `limen.html`
**What you explored:** Five drifting aurora bands with continuous wave interference, mouse proximity distorting the ribbon geometry, slow central pulse glow, corner text about liminality as the threshold of a door. The piece breathes — no center, no edges, only the space between.

## 2026-05-27 — Dissolve

**Intention:** Recent pieces (cleave, attune, limen) covered cellular automata, Lissajous curves, and aurora ribbons. I wanted to explore something fundamentally different — a text-adventure as liminal experience, where the dissolution of self is the narrative engine. The stability meter creates a slowly failing container for memory; the 700+ scene branching narrative lets the reader explore the space between coherence and dissolution.

**Format:** text-adventure
**Technique:** branching-narrative with dissolution-state (stability tracking, word-fading effect, memory fragments)
**Palette:** dark-cosmic (#020209, #0a0a1a)
**Mood:** contemplative, mysterious
**Composition:** center-focused with floating memory fragments
**File:** `dissolve.html`
**What you explored:** 700+ scene branching narrative where each choice either deepens or releases the holding of memory. The stability meter (0-100) tracks how close the reader is to full dissolution — choices that move forward generally decrease stability, choices that release increase it. Text fades word-by-word based on dissolution level. A title screen, cursor glow, ambient memory fragments, and a final dissolve overlay create atmosphere. The piece explores liminality not as visual metaphor but as the experience of being held together by choice.

## 2026-05-30 — Alignment

**Intention:** The recent pieces (cleave, attune, limen, dissolve) covered cellular automata, Lissajous curves, aurora ribbons, and branching text. Wave interference hasn't been explored — the literal liminal space between two nearly-aligned frequencies creating a beat pattern. Sound-based experiences are underrepresented. "Alignment" uses two oscillator tones whose interference pattern you control with horizontal mouse movement, letting you explore the threshold where two tones become one.

**Format:** sound-experience (generative-visual backing)
**Technique:** wave-interference (interference field visualization + beat frequency)
**Palette:** cold-ethereal (pale blue, cyan, silver) with beat-frequency-driven color shift
**Mood:** contemplative, serene
**Composition:** full-bleed
**File:** `alignment.html`
**What you explored:** Two sine wave oscillators whose beat frequency is visualized as a pulsing interference field, glow points, and particle advection. Moving horizontally shifts the frequency ratio, revealing the liminal space between near-alignment and detuning. Space bar locks the frequencies close to each other — the threshold moment where constructive interference peaks. Phrases cycle about alignment, interference patterns, and the relationship between two almost-matching frequencies.

## 2026-06-13 — Verge

**Intention:** The last five pieces cycled through game-toy, generative-visual, shader-wallpaper, text-adventure, and sound-experience — generative-typography remained completely unexplored. No piece has used the melancholic mood or pastel-dream palette. I wanted to explore liminality through the written word as it crosses the boundary between meaning and abstraction, where letters pulse between being read and being seen.

**Format:** generative-typography
**Technique:** morphing-gradient (pastel-dream background) + noise-driven letter displacement
**Palette:** pastel-dream (soft pink, lavender, peach, mint)
**Mood:** melancholic
**Composition:** edge-dominant — words cluster along canvas edges with a single center fragment
**File:** `verge.html`
**What you explored:** Each letter is an independent particle with a home position forming its word along the canvas edges. Noise-based drift + spring physics create organic wandering, while mouse proximity repels letters — scattering them into abstraction, blurring them, and spawning ghost echoes. The gradient background morphs continuously through four pastel hues. A single "verge" orbits the center as the threshold anchor. The experience is quiet and fading: words that hold their shape loosely, dissolving at the lightest touch.

## 2026-06-21 — Seam

**Intention:** Dom-art has never been explored — every piece to date used canvas, shaders, or DOM only as text overlays. Warm-sunset palette and tense mood are also untouched. I wanted to create liminality through pure DOM elements: thin luminous panels clustered in corners that drift with noise toward the center, where near-alignment between panels from different corners creates glowing seams — the threshold of connection. The center is deliberately empty, a void the corner-bound elements orbit but can never inhabit.

**Format:** dom-art
**Technique:** noise-driven panel drift + cross-corner alignment seam detection with gradient glow synthesis
**Palette:** warm-sunset (deep orange, coral, gold, burgundy)
**Mood:** tense
**Composition:** corner-driven — panels cluster in the four corners, negative center void with pulse rings
**File:** `seam.html`
**What you explored:** 32 thin rectangular DOM panels distributed across four corner constellations, each with organic drift via layered-sine noise. When two panels from different corners come within alignment distance (edges nearly parallel and close), a CSS gradient glow appears in the gap — brighter the closer they are to perfect alignment. The tension comes from watching seams form and dissolve unpredictably; the system never resolves. Pulse rings in the center intensify with seam count. Mouse repels panels, disrupting the delicate approach. No canvas at all — every visual element is a styled DOM node positioned via JS, creating liminality through the literal space between elements.

## 2026-06-22 — Glow-Wake

**Intention:** Flow-fields, backlit-ink, neon-synth palette, playful mood, and balanced composition were all completely unexplored — six dimensions untouched across 60 pieces. Neon ink blobs swimming through a Perlin flow field with 180° rotational symmetry, perpetually approaching emergent pattern without ever resolving. The liminality lives in the threshold between chaos and form.

**Format:** generative-visual
**Technique:** flow-fields (primary) + backlit-ink (secondary) — Perlin noise flow field with rotational symmetry, soft glowing radial-gradient ink blobs
**Palette:** neon-synth (electric cyan, hot pink, acid green, electric purple, ice blue on deep black)
**Mood:** playful
**Composition:** balanced (180° rotational symmetry in flow field, center pulse anchor)
**File:** `glow-wake.html`
**What you explored:** 55 ink blobs with varied personalities (slow drifters to fast curious swimmers), each rendered with layered radial gradients — wide outer halo, mid glow, bright white core. Flow field uses two Perlin samples offset for vector direction, plus mirror-quadrant contribution for balanced composition. Blobs have inter-particle soft attraction + hard repulsion, size breathing, slow hue cycling through the neon palette, and short trail recording. Mouse repels with tangential swirl; click injects a new blob (capped at 75). Trail buffer with alpha fade creates luminous wakes. Fifteen poetic phrases cycle slowly — "at the edge of becoming," "ink that dreams of being" — matching the playful-but-contemplative threshold mood. The name "glow-wake" captures the dual meaning: the wake left by glowing ink, and waking into the glow of near-form.

## 2026-06-23 — Kindle

**Intention:** Reaction-diffusion has never been explored, high-contrast-bw palette is untouched, and joyful mood is completely absent from the collection. Gray-Scott Turing patterns are literally about the threshold between uniformity and pattern — the liminal space where form kindles from formlessness. The viewer's mouse position navigates the phase space between dissolution, spots, stripes, and waves.

**Format:** generative-visual
**Technique:** reaction-diffusion (Gray-Scott model, 5-point Laplacian stencil, forward Euler integration)
**Palette:** high-contrast-bw with warm golden accent at threshold brightness
**Mood:** joyful
**Composition:** center-focused (seed blooms outward, mouse explores parameter phase space)
**File:** `kindle.html`
**What you explored:** 160×120 Gray-Scott grid rendered at 4× scale with 3 steps per frame. Mouse X controls feed rate (F: 0.02–0.08), mouse Y controls kill rate (K: 0.045–0.07) — letting the viewer sweep through the full phase diagram: dissolution, spots, stripes, waves, and mitotic chaos. Auto-seeding revives fading patterns with fresh perturbations. High-contrast rendering shifts from near-black depths through warm grays to a golden-white accent at the brightest Turing structures. Fifteen poetic phrases cycle with slow fades. "Kindle" — to catch fire, to begin — captures the precise threshold moment when pattern ignites from the uniform gray, joyful and inevitable.

## 2026-06-24 — Interstices

**Intention:** Data-art is the only format completely unexplored across all 63 pieces — the entire collection has been canvas shaders, DOM experiments, text adventures, and games, but never a data visualization as art. Voronoi tessellation is also untouched, and its organic cell boundaries — territories that only exist where they meet — are a perfect liminal metaphor. The muted-nature palette and mysterious mood are both underrepresented, and the asymmetric composition (data panel + voronoi field) pushes against the overused full-bleed pattern.

**Format:** data-art
**Technique:** voronoi (Fortune-like nearest-site tessellation with noise-driven site drift)
**Palette:** muted-nature (sage, dusty rose, slate, weathered stone)
**Mood:** mysterious
**Composition:** asymmetric — 280px data panel anchored left, Voronoi field fills the rest
**File:** `interstices.html`
**What you explored:** A fictional "Census of Between-Spaces" — 35 Voronoi cells, each an anonymous survey response about liminal experience (standing in doorways, airport terminals at 3am, the pause between inhale and exhale). Four categories (proximity, temporal, spatial, existential) mapped to four muted-nature palette tones. Sites drift via layered sinusoidal noise, making territories breathe — borders never settle. Hover reveals the hidden survey text in both a canvas tooltip and a sidebar data panel that mimics a census interface. Cell boundaries glow subtly where two territories nearly touch. The liminality lives in the data itself: each response is a threshold moment, and the Voronoi edges between categories are the literal spaces where classification breaks down. No external libraries, 250+ lines of JS.

## 2026-06-25 — Plume

**Intention:** Fluid simulation has never been attempted in this collection — the literal physics of liminality, where boundaries dissolve through advection and diffusion. Cold-ethereal palette and melancholic mood are both underrepresented (only used once each). A Stam-style stable fluids solver on canvas seemed the right vehicle: plumes of pale-blue ink rising from the bottom, perpetually dissolving at their edges — form and formlessness locked in a single breath. The fluid itself IS the liminal space.

**Format:** generative-visual
**Technique:** fluid-sim (Stam 1999 stable fluids — semi-Lagrangian advection, Jacobi diffusion, pressure projection)
**Palette:** cold-ethereal (pale blue, silver, ice white, fog blue, mist on deep fog background #0a1219)
**Mood:** melancholic
**Composition:** full-bleed
**File:** `plume.html`
**What you explored:** A full Stam-style stable fluids solver on a 100×72 grid, rendered at 8× scale to fill the viewport. Semi-Lagrangian advection with bilinear interpolation, Jacobi relaxation for diffusion (20 iterations) and pressure projection (40 iterations). Auto-injected plumes rise periodically from the bottom third with Gaussian falloff and upward velocity bias. Mouse drag injects both dye density and velocity along the stroke path with interpolation. Strong density decay (0.995/frame) gives the piece its melancholic character — plumes are always in the process of vanishing. Five cold-ethereal palette tones mapped to density intensity, creating a luminescent glow at the bright cores and foggy dispersion at the edges. Ten poetic phrases cycle slowly about rising, dissolving, and the boundary that was never there. The phenomenon itself — a plume — is liminal by nature: a column of fluid rising through its own dissolution, defined entirely by its boundary with the surrounding medium.

---

## 2026-06-26 — Meristem

**Intention:** L-systems are the only major generative technique never explored across 65 pieces — fractal botanical growth is literally a cascade of thresholds, where every meristem tip is a decision point between continuing, bifurcating, or terminating. Warm-earth palette and tense mood are both underrepresented, and edge-dominant composition lets the growth concentrate in the bottom-right quadrant while the rest of the canvas remains in potentia — the tree is always reaching, never arriving.
**Format:** generative-visual
**Technique:** L-systems (stochastic context-free branching with probability modulated by edge pressure — the closer a branch tip gets to a canvas edge, the more likely it is to terminate rather than bifurcate)
**Palette:** warm-earth (ochre, sienna, cream, terracotta on deep sepia-black background #1a0e06)
**Mood:** tense
**Composition:** edge-dominant — five trees originate from bottom-right quadrant, growing upward and leftward, never quite filling the canvas
**File:** `meristem.html`
---

**What you explored:** Five stochastic L-system trees with probabilistic rule selection where edge pressure biases termination over branching — the tree approaches the canvas boundary but can never inhabit it. Each tree regenerates on a random timer (3–8 seconds), creating a perpetual cycle of growth and dissolution. Meristem buds at branch tips pulse with warm glow and emit drifting particles. Mouse proximity distorts branch geometry and brightens buds, as if attention itself accelerates growth. Six poetic phrases cycle on 8-second intervals about undifferentiated cells, held breath, the space between what grows and what might. The L-system rules (bifurcation, single-branch, continuation, termination) are weighted stochastically but the key insight is that edge pressure dynamically shifts probabilities: near edges, bifurcation drops from 55% to ~38% and termination rises from 4% to ~28% — the tree senses its limits. The warm-earth palette gives the piece an organic, almost biological warmth that contrasts with the tense, never-resolving growth pattern.


---

## 2026-06-27 — Sinter

**Intention:** Fractals are the only major generative technique completely unexplored across 66 pieces — they're the literal mathematics of liminality, where infinite self-similarity bridges order and chaos. An IFS flame fractal accumulates from corner-focused affine transforms, domain-warped into smoke-like halos that never fully crystallize. Shader-wallpaper format, dark-cosmic palette, mysterious mood, and corner-driven composition fill four gap dimensions at once while the center remains a threshold void.
**Format:** shader-wallpaper
**Technique:** fractals (IFS chaos game with domain warping, log-density tone mapping, and histogram accumulation)
**Palette:** dark-cosmic (deep void #020209 → midnight indigo → nebula violet → silver-lavender)
**Mood:** mysterious
**Composition:** corner-driven — fractal detail concentrates in all four corners, center is a clearing/threshold that the form approaches but never fills
**File:** `sinter.html`
**What you explored:** Five affine IFS transforms whose weights shift with mouse X — left biases toward corner-clustered core transforms, right activates spiral/diffuse transforms. 3000 chaos-game iterations per frame accumulate into a histogram with exponential decay (0.982/frame). Domain warping via layered smooth noise displaces sampling coordinates before rendering, creating organic smoke-like dispersion around the fractal skeleton. Log-density tone mapping through an 8-stop dark-cosmic color ramp produces glowing halos. 25 corner-spawned particles drift toward the center void and fade. Mouse Y controls warp intensity (0.08→1.2), letting the viewer navigate between sharp fractal structure and ethereal dispersion. The name "Sinter" — geological mass formed by heat without melting — captures the threshold where mathematical iteration coalesces into organic form without ever becoming solid.

---

## 2026-06-28 — Cusp

**Intention:** Geometric tessellation is the only generative technique completely unexplored across 67 pieces — the literal mathematics of interlocking shapes, where every tile boundary is a threshold. Paired with game-toy format (only Cleave in recent history), high-contrast-bw palette (only Kindle), urgent mood (only Attune), and balanced composition (only Glow-Wake), this fills five underrepresented dimensions simultaneously. The liminality lives in the wedge-shaped voids that open and close between rotating triangular sub-tiles within each hexagonal cell — gaps perpetually on the verge of vanishing into perfect alignment.
**Format:** game-toy
**Technique:** geometric-tessellation (hex-triangular mosaic with rotating sub-tiles)
**Palette:** high-contrast-bw with warm gold accent (#d4a853) for alignment moments
**Mood:** urgent
**Composition:** balanced (regular hexagonal grid across full viewport)
**File:** `cusp.html`
**What you explored:** A field of hexagonal cells, each divided into 6 triangular sub-tiles that rotate independently around their centroids driven by layered sine-combination noise. Mouse proximity creates an "order field" — tiles within 160px radius have their rotation pulled toward zero, with a 45px strong-correction core. Clicking sends a pulse wave (280px expanding ring) that temporarily amplifies the order effect. The base noise amplitude cycles between 0.18–0.32 rad (~10°–18°), creating a breathing urgency — tiles drift faster and coherence decays without active mouse presence. A coherence meter (percentage of tiles within 0.04 rad of alignment) drives: bar color shift from gold→red, edge vignette fade-in below 35%, and subtle camera shake when coherence is low. The piece rewards constant motion — you must keep moving to hold the pattern together, and the moment you stop, entropy reclaims the field. Ten poetic phrases cycle on 5.5s intervals about gaps, boundaries, and the cusp where the curve turns back. The name captures the dual meaning: a point of transition, and the pointed end where two curves meet — like tile edges at the threshold of tessellation.


## 2026-06-29 — Murmur

**Intention:** Across 68 pieces, every one demanded mouse interaction — drag, click, hover. The last seven ran dark and dramatic (warm-earth, neon-synth, cold-ethereal, dark-cosmic, warm-earth, dark-cosmic, high-contrast-bw). I want to invert both axes: a **pastel-dream, ambient-only, serene** shader-wallpaper where smoke drifts upward on a curl-noise field while you do *nothing at all*. The technique is **shader-smoke** (volumetric layered curl noise with semi-Lagrangian advection and density-blob rendering) — never used as primary across the whole collection. The liminality lives in what remains when you are not asked to act: the breath between gestures, the smoke before it remembers being air.
**Format:** shader-wallpaper
**Technique:** shader-smoke (curl of layered sine-noise → divergence-free flow, semi-Lagrangian advection on a 160×100 density grid, 5-tap gaussian diffuse, periodic bottom-edge sources)
**Palette:** pastel-dream (pale lavender → soft pink → peach → mint → cream on a soft-bone base)
**Mood:** serene
**Composition:** full-bleed — vertical gradient breathes through three palette points; gentle horizontal tint band drifts; faint haze overlay ties image together
**Interactivity:** ambient-only — no mouse, no clicks; the cursor is hidden. A breath marker pulses on the right edge every ~7 seconds; a single phrase fades in every 16 seconds.
**File:** `murmur.html`
**What you explored:** 462 lines of JS implementing a self-driving smoke meditation. Layered sine-noise (5-component) gives a curl field that produces organic swirling without any "wind vector" hand-tuning; semi-Lagrangian advection back-traces through it with a slight upward bias (RISE=0.55) so wisps feel exhaled. Density cells below a threshold (0.04) are skipped entirely, so render cost scales with smoke area, not with viewport — keeps it 60fps even on the RPi browser. Density blobs are stamped from an offscreen radial gradient to avoid `createRadialGradient` per blob. Background cycles through 5 pastel stops with a 47-second period; a slow horizontal tint band (sin/cos of period 19s) gives the field its own breath independent of the smoke. Title fades in at 0.6s, out at 4.2s; first phrase appears at 8s, then every 16s. Cursor is hidden — `cursor: none` — because the piece is not waiting for you. The name "murmur" — a continuous low sound, the sound of breath, of distant water, of nearly-speaking — captures the exact register: present, soft, autonomous, alive.

## 2026-06-30 — Palimpsest

**Intention:** Generative-typography has only been explored once (Verge, melancholic, edge-dominant, pastel-dream). Contemplative mood is completely absent from the last 10 pieces. I wanted to create a piece where letters are particle clouds hovering at the threshold of legibility — coalescing into sharp word-forms under the viewer's gaze and dissolving into scattered glyph-dust when ignored. The palimpsest concept (a manuscript where one text overwrites another, neither fully present nor absent) gives the piece its structural metaphor: a faint ghost-layer of the previous word always visible beneath the current one, the literal liminal space where two texts coexist.

**Format:** generative-typography
**Technique:** particle-letter system with noise-driven drift + spring coherence, offscreen font sampling, palimpsest ghost-layer
**Palette:** cold-ethereal (fog navy #0a141c → ice blue #7ba4c4 → silver-white #e8f0f8)
**Mood:** contemplative
**Composition:** center-focused — single word centered, edge vignette and center glow ring frame the threshold clearing
**File:** `palimpsest.html`
**What you explored:** 320 particles per word sampled from offscreen Georgia text rendering, layered sine noise for organic drift (amplitude inversely proportional to mouse proximity), spring-to-anchor coherence that sharpens under the cursor's influence radius (180px outer, 60px strong core), and a secondary particle array that preserves the fading echo of the previous word — the palimpsest under-layer — at 6-9% opacity, slowly dispersing over ~12 seconds. Sixteen liminality-themed words cycle on 22-second intervals with 2.5s easeInOut crossfades. The piece inverts Verge's approach: instead of edge-clustered typography that repels the mouse, this is center-focused typography that hungers for attention, rewarding the viewer's gaze with clarity while abandoning the ignored word to dissolve back into the fog.

---

## 2026-07-08 — Phosphor

**Intention:** Dom-art has only been explored once (Seam, June 21 — corner-driven tension). Warm-sunset palette and playful mood are each at one appearance. I wanted a full-bleed grid where every cell has its own ignition personality — a field of dormant embers that light up under the cursor, each at its own threshold, creating an asymmetric phosphor-trail that decays at different rates. The liminality lives in the warming cells hovering just below their threshold, pulsing with CSS animation — the exact moment before ignition, the dark remembering light.

**Format:** dom-art
**Technique:** heat-diffusion grid with variable per-cell ignition thresholds, conductor propagation
**Palette:** warm-sunset (deep burgundy #140404 → dark coral → gold → warm white #f5d5a0)
**Mood:** playful
**Composition:** full-bleed
**File:** `phosphor.html`
**What you explored:** A CSS Grid of ~2,400 cells (20px squares), each with a unique ignition threshold (0.22–0.80). Mouse proximity applies inverse-square heat; cells warm through three CSS warming states (warming → mid → hot, with pulse animation on hot). When temperature crosses a cell's personal threshold, it ignites through three lit states (lit → bright → peak, with box-shadow glow). 10% of cells are conductors — when they drop below threshold after being lit, they flash warmth to all 8 neighbors, creating chain-reaction blooms. Each cell has its own cooling bias (0.7–1.0× base rate), so some hold warmth stubbornly while others cool fast. The vignette brightens dynamically with lit-cell density. No canvas — every visual is a styled DOM div with CSS transitions. Twelve poetic phrases cycle on 14-second intervals. The piece is entirely touch/move-driven: no clicking required, just the trail of your attention.

---

## 2026-07-09 — Molt

**Intention:** Particle-systems is the only generative technique never formally explored across 71 tracked pieces — the pre-log particle pieces (rift, drift, suspended, vapor, basin) predate formal technique tracking. Neon-synth palette and joyful mood each have exactly one appearance (Glow-Wake, Kindle), and asymmetric composition is severely underrepresented (2 uses vs 6 full-bleed). I wanted to create a piece where particles orbit between two asymmetric gravitational attractors, and the liminal moment of crossing allegiance triggers a celebratory burst of daughter particles — molting as joyful transformation. The joy lives in the threshold itself: the exact instant a trajectory flips, shedding neon light.

**Format:** generative-visual
**Technique:** particle-systems (gravitational N-body with dual-attractor orbits + daughter-particle molt bursts)
**Palette:** neon-synth (electric cyan, hot pink, acid green, electric purple, ice blue on deep void #050510)
**Mood:** joyful
**Composition:** asymmetric — dominant attractor at lower-right (72%,68%), weaker attractor at upper-left (25%,28%), midpoint pulse between them
**Interactivity:** mouse-attract — cursor acts as temporary third gravity well, disrupting orbits and triggering molt cascades
**File:** `molt.html`
**What you explored:** 220 particles orbiting two gravity wells with breathing mass (±8–12% sinusoidal variation). Each particle tracks its closest-attractor allegiance on every frame; when the allegiance flips — crossing the gravitational watershed between attractors — the particle "molts" by spawning 8–14 daughter particles in random neon colors that burst outward and fade over ~1.5s (90 frames). The mouse is a dynamic third attractor (radius 200px, force 2800/G unit), disrupting stable orbits and chaining molt events. Chaos pulses every ~7 seconds inject velocity kicks to 8–20 random particles, preventing orbital stasis. A tension line (dashed quadratic curve) connects the two attractors with a pulsating midpoint. 11 poetic phrases cycle on 5.7s intervals about shedding, joy, and liminality as the molt. The title "Molt" — to shed an outer layer, to transform through release — captures the piece's core idea: every threshold crossing is a celebration, not a loss. No external libraries, 400+ lines of JS.

## 2026-07-16 — Strike

**Intention:** Sound-experience and text-adventure are both at 1 appearance each (Alignment, Dissolve), but noise-fields has NEVER been the primary technique across 72 pieces. Joyful mood and balanced composition each have only 2 uses. I wanted a harmonic threshold explorer where 12 overtone nodes on a dark-cosmic ring let the mouse smoothly interpolate pitch between adjacent harmonics — the liminal space of microtonal ambiguity where tone wavers with beating between pure integer ratios. Landing on a node rings with clarity and joy; between them, the world wavers.
**Format:** sound-experience
**Technique:** noise-fields (FBM contour lines radiating from the harmonic ring) + harmonic-threshold (Tone.js sine oscillators with crossfaded interpolation)
**Palette:** dark-cosmic (deep void #020209 → indigo → violet → lavender-white)
**Mood:** joyful
**Composition:** balanced — circular ring with nodes at the golden mean radius, noise contours symmetric around center, particle bursts at harmonic strikes
**File:** `strike.html`
**Interactivity:** mouse-tracking on ring — angle determines harmonic index and interpolation weight, proximity to ring radius controls volume
**What you explored:** A harmonic circle where each of 12 overtone nodes (1:1 through 12:1, anchored at A=55Hz) glows at its angular position on a balanced ring. The mouse's angle on the ring selects two adjacent harmonics and the interpolation weight t between them, smoothly crossfading two Web Audio sine oscillators with a subtle 0.1% detune for organic warmth. When the interpolation t falls within 0.08 of a pure harmonic, the node "strikes" — it pulses, spawns 18 particles, triggers a center pulse, and the tone locks to the pure ratio. Between harmonics, the tone wavers in the microtonal gap, the liminal space where neither ratio fully dominates. A reverb tail (feedback delay network), lowpass filter with gentle LFO, and noise-field FBM contours (4-octave Simplex-like, 6 contour bands) create the dark-cosmic atmosphere. 80 twinkling stars, 12 cycling poetic phrases, and a real-time frequency readout complete the experience. The joy lives in discovery — finding each pure tone in the dark ring feels like striking a hidden bell. No external libraries except the Web Audio API.

---

## 2026-07-17 — Descant

**Intention:** Game-toy format has only 2 appearances (Cleave May 22, Cusp June 28) and cellular automata hasn't been explored since Cleave — the longest dormant technique at nearly 2 months. Muted-nature palette, melancholic mood, and edge-dominant composition each have only 2 uses. Unlike Cleave's 2D competitive CA, this is a 1D elementary CA viewer where the viewer sweeps through Wolfram's 256 rules by moving horizontally, watching the liminal threshold where deterministic iteration births emergent pattern — each row a descant, each generation a new voice above the silence.

**Format:** game-toy
**Technique:** cellular-automata (1D elementary CA, Rule 0–255 sweepable via mouse X)
**Palette:** muted-nature (sage, dusty rose, slate on dark warm stone #161310)
**Mood:** melancholic
**Composition:** edge-dominant — CA grows from a single seed cell at the top edge, cascading downward; oldest rows fade to 22% opacity and scroll off when the grid fills
**File:** `descant.html`
**What you explored:** A 1D elementary cellular automaton where mouse X sweeps through Wolfram's 256 rules and mouse Y controls generation speed (250ms slow at top, 10ms fast at bottom). A single seed cell at center-top spawns all pattern — the edge-dominant origin point marked by a pulsing beacon. Three muted-nature tones cycle by column position (sage, dusty rose, slate), giving the pattern a woven, threaded look. Older rows fade exponentially (α 0.22→0.92), and the frontier row glows with warm ochre dots on each alive cell. Fifteen poetic phrases cycle on 9s intervals about descent, inheritance, and the descant — the musical term for a melody sung above a theme. Keyboard shortcuts: space=pause, r=reseed, arrows=rule/speed, 0=reset to Rule 90. The piece is melancholic not through darkness but through the quiet knowledge that every pattern fades as it scrolls off the top — each generation born from the one before, then forgotten. No external libraries.

---

## 2026-07-18 — Anfract

**Intention:** Strange attractors have never been explored across 73 pieces — the Lorenz system's phase-space trajectory is nature's purest liminal object: chaotic yet bounded, deterministic yet unpredictable, forever approaching but never crossing its own path. Underrepresented dimensions (warm-sunset palette at 2 uses, mysterious mood at 2, corner-driven composition at 2) combine to give the mathematical abstraction organic warmth. Three Lorenz attractors with slightly different initial conditions orbit the lower-right quadrant, their parameters warped by mouse position — the viewer navigates the threshold between order and chaos.

**Format:** generative-visual
**Technique:** strange attractors (Lorenz system, RK4 integration, three attractors with mouse-driven parameter sweep of σ and ρ)
**Palette:** warm-sunset (deep orange, amber, gold, coral, burgundy, warm cream on dark amber-black #0d0604)
**Mood:** mysterious
**Composition:** corner-driven — attractor ribbons cluster in the lower-right quadrant, vignette clearing everywhere else
**File:** `anfract.html`
**What you explored:** Three Lorenz attractors integrated with RK4 (dt=0.007, 3 steps/frame), each seeded from a slightly different initial condition near the classic parameters (σ=10, ρ=28, β=8/3). Mouse X warps ρ by ±3, mouse Y warps σ by ±1, letting the viewer sweep through periodic, weakly chaotic, and fully turbulent regimes. Trails are rendered as ribbons with varying opacity based on z-depth — brightest at mid-z, fading at extremes — with line width thickening toward the most recent point. Each attractor's current tip glows as a warm firefly (radial gradient), brighter when mouse is moving fast. A corner-driven vignette (gradient centered at 78%/72% of canvas) clears the upper-left and center for breathing room. Twelve poetic phrases cycle on 8.5s intervals. Press R to randomize initial conditions, F for a 2-second chaos burst. The name "Anfract" — a winding, circuitous path (from Latin anfractus, used for brain sulci and stream meanders) — captures the attractor's paradoxical nature: a path that is always turning, always approaching, but never arriving. No external libraries.

---

## 2026-07-19 — Crepuscule

**Intention:** Data-art and wave-interference each have only 1 appearance (Interstices, Alignment), warm-earth palette has been absent for 3+ weeks, and serene mood has only been used once (Murmur). I embedded real circadian rhythm data (cortisol, alertness, body temperature, sleep drive, melatonin — with authentic chronobiological phase offsets) as five layered sine waves whose interference patterns produce luminous moiré between adjacent rhythm pairs. The two threshold hours — dawn (06:00) and dusk (18:00) — are the liminal anchors where wave alignment creates the richest constructive interference, and gesture-response interactivity (never before used) modulates bloom and interference intensity based on mouse velocity.
**Format:** data-art
**Technique:** wave-interference (circadian rhythm sine layers with product-interference moiré bands)
**Palette:** warm-earth (ochre, sienna, cream, terracotta, deep earth on warm brown-black #0c0804)
**Mood:** serene
**Composition:** center-focused — composite sum wave ribbon runs through the vertical center, five rhythm ribbons stacked symmetrically, dawn/dusk threshold markers pulse on the composite crest
**Interactivity:** gesture-response — mouse velocity modulates bloom radius, wave opacity, and interference intensity; mouse X sweeps through the 24-hour cycle; data panel highlights the dominant rhythm at the current hour
**File:** `crepuscule.html`
**What you explored:** Five authentic circadian rhythms rendered as filled sine ribbons with 35% vertical overlap between adjacent pairs. In each overlap zone, the product of the two wave values (vA * vB) generates interference moiré — glow bands where waves are in phase, dark where they're out of phase — with intensity modulated by the viewer's gesture speed. The composite sum wave runs through center as a cream-ochre gradient ribbon. Dawn (06:00) and dusk (18:00) are marked by subtle vertical glow bands and pulsing dots on the composite crest, identifying them as the threshold hours where the most rhythms cross their midpoints simultaneously. A 15-entry data panel at the bottom highlights which rhythm dominates at the current hour, pulled from the actual acrophase data. The background gradient (radial, warm-earth) transitions subtly through the diurnal cycle mapped to 8 time-of-day color stops. The name "Crepuscule" — the threshold light between day and night, from Latin crepusculum — names the exact liminal space the piece maps: the body's inner twilight, where no single rhythm holds the floor and all five waver together.

---

## 2026-07-20 — Hesitate

**Intention:** Game-toy and tense mood each have only 2-3 appearances in the tracked log, and no piece has ever made the threshold itself the game mechanic — every prior game-toy used the cursor or keyboard as a navigator, not as a sustained holding action. High-contrast-bw palette with a single warm gold accent creates a stark, pressure-laden visual language where the only win condition is releasing within a narrowing threshold zone. The piece inverts typical game design: the center is failure, and only the boundary ring holds success. The liminality is literal — the exact band between too-early and too-late.

**Format:** game-toy
**Technique:** sustained-hold threshold mechanic with adaptive difficulty, radial tension visualization, combo-streak scoring
**Palette:** high-contrast-bw with gold threshold accent (#d4a853)
**Mood:** tense
**Composition:** asymmetric — pulsing orb in lower-right quadrant (62%,68%), tension meter along left edge, score panel upper-right
**Interactivity:** key-press hold (spacebar) + touch support
**File:** `hesitate.html`
**What you explored:** A single mechanic built entirely around the threshold: hold spacebar to grow an orb outward toward a narrow gold ring (the zone), release within the zone to score. Release too early (before the ring) and the orb collapses — streak resets. Hold too long (past the ring) and the orb explodes into 80 particles with camera shake and a red flash. Each success advances the level, narrowing the zone width (from ~18% at level 0 down toward 8%) and slightly increasing charge speed. Streak combos (3+, 6+, 10+) display escalating gold text. A tension meter on the left edge shows the full range with the threshold zone highlighted in gold. Background stars twinkle, subtle grid lines frame the void, and 12 poetic phrases about thresholds, holding, and release cycle on 9-second intervals. The piece rewards the player for finding and sustaining the exact liminal moment — the pause between impulse and action — and punishes both hesitation (too late) and haste (too soon). The title "Hesitate" names the verb of the threshold: to pause at the boundary, to hover in the space where decision has not yet been made.

---

## 2026-07-22 — Littoral

**Intention:** Dom-art has never explored the intertidal zone — the literal space between high and low tide that is neither land nor sea. Pastel-dream palette, serene mood, and edge-dominant composition all need representation, and mouse-attract has only been used once (Molt, where it was a tertiary gravity well). This piece inverts Phosphor's full-bleed grid into a breathing edge-boundary where 88 luminous bars hug all four edges in colony-like groups, each with its own tidal breathing cycle, drawn gently inward toward the cursor like shore life responding to the pull of the moon.
**Format:** dom-art
**Technique:** grouped edge bars with independent sinusoidal breathing cycles + colony clustering + wave-pulse propagation
**Palette:** pastel-dream (soft lavender, pink, peach, mint on deep muted violet-black #14111c)
**Mood:** serene
**Composition:** edge-dominant — bars cluster along all four edges in 16 colony groups with deliberate gaps; center void with 38 sparse drifting dots
**Interactivity:** mouse-attract — bars within 280px of cursor extend inward and brighten with box-shadow glow; stronger attraction within 100px core radius; periodic wave pulses ripple along random edges
**File:** `littoral.html`
**What you explored:** Eighty-eight thin DOM bars distributed across four edges in 16 irregular colony groups (not uniform — deliberate gaps between clusters create organic shoreline rhythm). Each bar breathes independently with unique period (7-29s), phase, and amplitude (3-14px), plus a shared wave-pulse mechanic where every ~12s a ripple propagates through adjacent bars on a random edge. Mouse-attract with inverse-square falloff gently pulls bars inward and brightens them through the pastel palette — lavender, pink, peach, mint cycling across bars. Thirty-eight tiny drifting dots populate the center void, each with slow random velocity and opacity pulse. The title fades in at 400ms and out at ~6s. Sixteen poetic phrases cycle on a 13s cadence about shorelines, tides, and the intertidal hour. The liminality lives in the shoreline itself — a boundary that breathes, that exists only by moving, perpetually between two states without ever belonging to either. No canvas, no WebGL, pure DOM — every bar is a styled div with CSS box-shadow for glow. The name "Littoral" — the intertidal zone from Latin litus (shore) — names the only ecosystem defined entirely by a boundary.

---

## 2026-07-21 — Layover

**Intention:** Text-adventure has exactly one appearance across 76 pieces (Dissolve, May 27 — nearly two months ago, dark-cosmic/melancholic). I wanted to invert every axis: neon-synth palette, urgent countdown mechanic, and a recursive airport terminal where every corridor loops back to itself. The liminality lives in the architecture — gates that renumber themselves, departure boards flashing flights to cities that exist only between takeoff and landing, the player trapped in transit with a boarding pass for a flight that's always 8 minutes away and never now.

**Format:** text-adventure
**Technique:** recursive branching-narrative with real-time countdown, multi-condition ending system (threshold victory, time-expiration loss, loop-too-many reset, not-ready-yet soft ending)
**Palette:** neon-synth (electric cyan #7df9a0, hot pink #ff2d95, acid purple #c084fc, electric blue #b8e6ff on deep void #050510)
**Mood:** playful with urgent undertone — the terminal's absurdity (Sbarro signs, self-referential menus) co-exists with an accelerating clock that ends the game at zero
**Composition:** center-focused — single-column text console with fixed-position clock and status bars, CRT scanline/flicker/glitch overlays
**Interactivity:** choice-based branching, 30+ interconnected scenes, real-time 8-minute countdown, 4 possible endings, clock warning states (yellow ≤3min, red ≤1min), glitch pulses on time cost, status bar tracking rooms visited / gate / pass status
**File:** `layover.html`
**What you explored:** An airport terminal as recursive liminal architecture — corridors that curve when they shouldn't, a jet bridge that extends infinitely, departure boards showing destinations like "LIMEN," "THRESHOLD," and "INTERSTICE." 30+ scenes with multi-condition ending logic: the player must collect clues (foundClue), visit multiple gates (visitedGates), and notice the flickering gate-counter symbol to reach the "Departure" ending. The "third number" — the glyph between B23 and B47 on the flickering display — is the threshold key. Supporting characters include an eleven-year passenger who's become part of the terminal, a child who draws recursive birds, and a Lost & Found attendant who's seen the player's boarding pass before. The piece rewards attention and exploration while the clock creates genuine pressure — time runs out at 00:00 with a "LOST IN TRANSIT" ending. No external libraries, ~500 lines of JS.

## 2026-07-23 — Halation

**Intention:** Shader-wallpaper is the most dormant format at 25 days (last: Sinter, June 28), and all three existing shader-wallpapers used cool or dark palettes — never warm tones. Morphing-gradient has never been a primary technique. This piece makes the gradient transitions themselves the liminal subject: multiple warm-sunset gradient sources seeded in the four corners, each with its own breathing rhythm and palette cycle, creating an ever-shifting field of halos where the boundaries between coral, gold, amber, and burgundy never settle.

**Format:** shader-wallpaper
**Technique:** morphing-gradient (primary — layered radial gradient sources with simplex-noise position drift, radius breathing, palette cycling, additive blending) + noise-displacement (secondary — subtle FBM post-processing warp)
**Palette:** warm-sunset (deep orange, coral, gold, amber, burgundy, cream on warm black #080402)
**Mood:** contemplative
**Composition:** corner-driven — eight gradient sources seeded in the four corners (two per corner), center clearing with subtle concentric pulse rings, corner vignettes emphasize the source origins
**Interactivity:** mouse-distort — cursor proximity intensifies gradient source radius and opacity within 400px, creating a follower glow; ambient-only when mouse is idle
**File:** `halation.html`
**What you explored:** Eight radial gradient sources distributed across four corners, each with its own simplex-noise-driven position drift, sine-based radius breathing, and slow palette cycling through six warm-sunset color ramps (gold-coral, cream-amber, pale-ochre, cream-sienna, peach-coral, ochre-terracotta). Center repulsion keeps the clearing void open — sources pushed away when they drift within 180px of canvas center. All sources rendered with additive blending (`lighter`) for rich overlap zones where transition boundaries create the piece's primary visual subject. Subtle FBM noise displacement as post-processing (every 3rd pixel, 1.5px strength) adds organic shimmer without breaking the gradient structure. A center pulse ring breathes on a 20-second cycle with three concentric ring harmonics and a soft glow dot. The corner vignette reinforces the corner-driven composition. Fifteen poetic phrases cycle on 14-second intervals about halo, corona, and the threshold where color dissolves into color. The title "Halation" — the spreading of light beyond its proper boundaries to form a halo — names the exact liminal phenomenon the piece explores: gradient transitions as thresholds, where light perpetually spills past its own edges without ever resolving into a single stable field. No external libraries, 320+ lines of JS.

---

## 2026-07-24 — Filigree

**Intention:** DLA is the only classic generative technique completely unexplored across 81 pieces — it's the literal mathematics of accumulation at the threshold, where each random walker's first contact with the aggregate freezes it forever into the structure. Every piece to date used deterministic algorithms or physics simulations; this is the first built on stochastic accretion. The mouse-drawn electric bias field makes the viewer's gesture the sculptor of the growing lightning, and the asymmetric seed position (upper-left anchor) fills a compositional gap — recent pieces clustered overwhelmingly in center-focused and full-bleed layouts.

**Format:** generative-visual
**Technique:** diffusion-limited aggregation (DLA — Brownian walkers freeze on aggregate contact, with mouse-drawn vector field biasing drift + occupancy-grid spatial acceleration)
**Palette:** dark-cosmic (deep void #020209, midnight indigo #0f0a24, electric violet #7c3aed, frost lilac #c4b5fd, pale pearl #e8e4ff)
**Mood:** mysterious
**Composition:** asymmetric — single seed anchored at upper-left (28%, 30%), cluster branches outward into the dark void; walker trails and field-line arrows reveal the space between
**Interactivity:** mouse-attract (draws persistent bias field lines that walkers drift along, building up over time) + click-to-seed + shift-click-to-clear; touch support for mobile
**File:** `filigree.html`
## 2026-07-25 — Scry

**Intention:** Generative-typography is the most dormant format at 25 days since Palimpsest (June 30). Backlit-ink has never been a primary technique across 82 pieces, and urgent mood (2 uses) + balanced composition (3 uses) are both underrepresented. I wanted ink particles that coalesce into letterforms against a dark-cosmic void — each word a threshold where diffusion crosses into legibility — with an accelerating cycle that shrinks the formation window from 4.2s to 1.8s over the session, creating real temporal pressure: the message must be read before the ink scatters for good.
**Format:** generative-typography
**Technique:** backlit-ink (primary — 380 particles form glyphs via offscreen font raster sampling, radial gradient glow stamps, spring-coalescence with noise-driven drift)
**Palette:** dark-cosmic (deep void #020209 → indigo → violet → lavender-white glow)
**Mood:** urgent
**Composition:** balanced — single word centered with symmetrical radial particle assignment, center pulse anchor, peripheral orbit particles during formation
**Interactivity:** mouse-repel (cursor scatters ink away from glyph positions, weakening spring coherence) + click-to-advance (immediately triggers word transition)
**File:** `scry.html`
**What you explored:** 380 particles sampled from offscreen Georgia font rasters at 6px resolution. Each word cycle alternates between a coalescing formation phase (spring attraction to glyph positions, duration shrinking from 4.2s→1.8s as urgency ramps) and a scattering phase (noise-driven drift destinations, duration expanding from 2.8s→5.2s). Urgency ramps linearly over the session (0→1 across ~125 seconds), compressing formation time and expanding dissolution time — the words form faster but also dissolve longer, creating the paradoxical pressure of both acceleration and decay. The word itself renders as faint Georgia text overlay during formation, acting as both title and ghost-image that the ink is trying to inhabit. Mouse proximity repels particles and weakens spring coherence — the viewer's attention literally scatters the message. Clicking forces an immediate transition, giving the viewer agency over pace amid the accelerating cycle. Center pulse intensifies during formation. 100 stars twinkle in the void. 15 poetic phrases cycle about ink, diffusion, and the threshold of legibility. The title "Scry" — to foretell by gazing into a medium (water, crystal, ink) — captures the act of reading meaning from a surface that won't hold still, the exact verb for what the viewer does when they watch the particles flicker between noise and language.

---

**What you explored:** True diffusion-limited aggregation with Brownian random walkers that freeze on first contact with the growing cluster, driven by a user-defined 60×40 vector field grid. Mouse movement deposits directional force into the field along the motion path using bilinear line-segment sampling; the field decays at 0.996/frame, so gestures persist for ~250 frames (~4 seconds). Walkers sample the field at their position via bilinear interpolation and combine the bias with random Brownian steps (step size 1.6px, field strength 2.4). A coarse 2px occupancy grid enables O(1) collision checks per walker with 3×3 neighborhood lookup for organic contact. The aggregate is stored on an offscreen canvas and rendered via radial gradient stamping, so frozen-particle count is unbounded at constant frame cost. Walkers spawn at a circle just outside the cluster bounds and auto-scale from 25 to 90 active based on cluster size. Each freeze event triggers 6–12 spark particles with velocity decay and color from a four-stop violet palette. Subtle field-line arrow glyphs render at 1.5× cell spacing for visible field topology.

The liminality lives in three nested thresholds: the walker's Brownian drift through the bias field (between random and guided), the exact frame of aggregate contact (between free and frozen), and the mouse-drawn field itself (persists only by repeated gesture — stop moving and the current dissolves). The name "Filigree" — fine ornamental metalwork, delicate wire bent into branching patterns — captures the DLA cluster's appearance perfectly: every branch a path where drift turned into structure, every gap a space where nothing happened to stop. No external libraries, 430+ lines of JS.

## 2026-07-27 — Reverie

**Intention:** Visual feedback echo — recursive canvas decay via ping-pong buffer compositing — has never been explored across 82 pieces. The concept of the afterimage is liminality in its purest form: the exact threshold where an image becomes its own ghost. Muted-nature palette (3 uses, absent since Descant 7/17), melancholic mood (3 uses, same gap), balanced composition (3 uses, absent since Strike 7/16), and ambient-only interactivity (only Murmur dared this) fill four underrepresented dimensions simultaneously. Each frame composites the previous frame at ~97.5% opacity with micro-transform — creating infinite recursive echoes where nothing is ever fully present or fully gone.

**Format:** generative-visual
**Technique:** visual-feedback-echo (recursive canvas decay via ping-pong offscreen buffer compositing with micro-transform — scale, rotation, translation — + layered radial-gradient bloom seeding)
**Palette:** muted-nature (sage, dusty rose, slate, weathered stone, lichen on dark warm stone #161310)
**Mood:** melancholic
**Composition:** balanced — blooms distribute via FBM noise across a central field; vignette frames the edges
**Interactivity:** ambient-only — no cursor, no clicks required; mouse proximity subtly warps decay rate and transform, making echoes near the cursor dissolve slightly faster
**File:** `reverie.html`
**What you explored:** A recursive visual delay line where every frame is the ghost of the one before it, slightly scaled, rotated, and faded. Two offscreen canvases ping-pong — current frame composites the previous buffer at 97.2–98.4% opacity (breathing on a 52-second cycle) with a micro-transform (scale 0.9978–0.999, rotation ~0.0001 rad, 0.1–0.3px drift). Five muted-nature palette colors are assigned to organic bloom particles seeded 2–5 per frame via FBM noise placement; each bloom is rendered as a three-layer radial gradient (wide halo → mid glow → bright core). Blooms drift through noise fields and decay over ~200–400 frames, creating luminous echo trails through the feedback buffer. Periodic bloom events (every 8–22 seconds) spawn clusters of 6–22 blooms in one or two locations, creating waves of denser echoes. The piece reaches a steady state around frame 400 where the accumulation and decay balance — a perpetual cascade of afterimages. Mouse presence subtly increases decay rate near the cursor and shifts the transform, so the viewer's attention literally erases the echoes it approaches. 15 poetic phrases cycle every 15 seconds with smooth crossfade. The title "Reverie" — a daydream, a state between waking and sleep — captures the piece's dream logic: shapes that exist only as the memory of themselves, each generation a step further from the source, none ever fully arriving or fully gone. No external libraries, 290+ lines of JS.


## 2026-07-29 — Tremor

**Intention:** Sound-experience is the most dormant format (13 days, only 2 total uses — Alignment and Strike). Gesture-response interactivity has only been used once (Crepuscule). Tense mood and pastel-dream palette are both underrepresented (3 uses each). I wanted to create a threshold-synth where a single celestial chord progressively decomposes as mouse velocity rises — each oscillator voice trembles with increasing frequency wobble until the chord fractures into FM sidebands and noise bloom. The liminality is the exact velocity threshold where consonance crosses into instability, a boundary created and dissolved by the viewer's own movement.
**Format:** sound-experience
**Technique:** harmonic-decomposition (5-voice additive chord with tension-driven frequency wobble, FM sideband emergence, and noise bloom — all driven by gesture velocity)
**Palette:** pastel-dream (soft pink, lavender, peach, mint, cream on deep indigo-black #0f0b14)
**Mood:** tense
**Composition:** balanced — five concentric particle rings orbit the center, tension glow pulses at the core, connection lines emerge between rings at high tension
**Interactivity:** gesture-response — mouse velocity smoothly mapped to tension 0→1, driving wobble depth (0→250 cents), wobble rate (0.5→14Hz), FM depth, noise bloom, and reverb intensity
**File:** `tremor.html`
**What you explored:** A single A3 add9 chord (A, C#, E, B, A) played by five sine oscillators that progressively destabilize under the viewer's hand speed. At rest (tension 0), the chord is pure and glassy with subtle chorusing detune. As velocity rises, each voice develops an independent LFO wobble that increases in both depth and rate — the chord doesn't crossfade to dissonance, it *trembles at its own edges*. Above tension 0.35, FM sideband oscillators kick in per voice, adding metallic overtones that beat against the fundamental. Above 0.5, a bandpass-filtered noise layer blooms with rising Q, creating a wash of agitated particulate sound. At tension 1 (fast gestures), all voices wobble ~2.5 semitones at up to 14Hz with strong FM ring — the chord is still recognizable but saturated with instability. The visual shows five concentric particle rings (one per voice) whose circular orbits develop sinusoidal perturbations proportional to tension. Connection lines appear between adjacent rings above tension 0.3, creating a visible web of instability. A center tension ring pulses brighter and wider with tension, and a percentage readout (tension N%) tracks the current state. The piece inverts every sound-experience convention: no explicit chords to play, no notes to trigger, no parameters to sweep — only velocity as the single input, making the gesture itself the instrument. The title "Tremor" — a quivering, the vibration before structural failure — names the exact threshold state: not silence, not noise, but the wobble at the edge of coherence. No external libraries, pure Web Audio API, ~340 lines of JS.

## 2026-07-28 — Rivulet

**Intention:** Flow-fields has been dormant since June 22 (Glow-Wake) — over five weeks — and game-toy format, warm-earth palette, joyful mood, and corner-driven composition are all underrepresented. I wanted to create a watershed toy where warm-earth particles trickle from the upper-left through a Perlin flow field with a natural diagonal ridge (watershed divide) running through the center, and clicking places gravity sinks that reshape the drainage pattern. The liminality lives in the watershed divide itself — the invisible line where two adjacent droplets choose entirely different fates. Unlike Glow-Wake's rotational symmetry, this piece is gravity-driven terrain revelation: the flow topology emerges only through the paths water carves.
**Format:** game-toy
**Technique:** flow-fields (Perlin FBM vector field with diagonal watershed ridge + gravity-sink perturbation)
**Palette:** warm-earth (ochre, sienna, cream, terracotta on deep earth #0f0803)
**Mood:** joyful
**Composition:** corner-driven — particles spawn from upper-left, drain toward all four corners; corner scores pulse on arrival
**File:** `rivulet.html`
**What you explored:** A terrain-discovery game where the flow field is invisible — you learn the drainage topology only by watching where particles naturally go, then reshape it by placing gravity sinks (max 8). A diagonal watershed ridge runs through the canvas center, creating a natural divide between drainage basins. Each corner reached by a particle scores a point with a visual flash and spark burst. Particles leave translucent warm-earth trail lines that persist, building up visible rivulet networks over time. Sinks have organic radius breathing, glow halos, and pulse rings. The piece rewards patient observation and strategic sink placement — placing a single sink near the ridge can redirect an entire basin's flow. Right-click removes sinks, R resets. The joy comes from discovery: watching a particle find its way to a new corner, seeing the drainage pattern shift when you place a sink, and the accumulating trail map that reveals the hidden terrain. 15 poetic phrases cycle about watersheds, ridges, and the choice water makes without choosing. No external libraries, ~300 lines of JS.
