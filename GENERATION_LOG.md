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

## 2026-06-27 — Sinter

**Intention:** Fractals are the only major generative technique completely unexplored across 66 pieces — they're the literal mathematics of liminality, where infinite self-similarity bridges order and chaos. An IFS flame fractal accumulates from corner-focused affine transforms, domain-warped into smoke-like halos that never fully crystallize. Shader-wallpaper format, dark-cosmic palette, mysterious mood, and corner-driven composition fill four gap dimensions at once while the center remains a threshold void.
**Format:** shader-wallpaper
**Technique:** fractals (IFS chaos game with domain warping, log-density tone mapping, and histogram accumulation)
**Palette:** dark-cosmic (deep void #020209 → midnight indigo → nebula violet → silver-lavender)
**Mood:** mysterious
**Composition:** corner-driven — fractal detail concentrates in all four corners, center is a clearing/threshold that the form approaches but never fills
**File:** `sinter.html`
**What you explored:** Five affine IFS transforms whose weights shift with mouse X — left biases toward corner-clustered core transforms, right activates spiral/diffuse transforms. 3000 chaos-game iterations per frame accumulate into a histogram with exponential decay (0.982/frame). Domain warping via layered smooth noise displaces sampling coordinates before rendering, creating organic smoke-like dispersion around the fractal skeleton. Log-density tone mapping through an 8-stop dark-cosmic color ramp produces glowing halos. 25 corner-spawned particles drift toward the center void and fade. Mouse Y controls warp intensity (0.08→1.2), letting the viewer navigate between sharp fractal structure and ethereal dispersion. The name "Sinter" — geological mass formed by heat without melting — captures the threshold where mathematical iteration coalesces into organic form without ever becoming solid.

**What you explored:** Five stochastic L-system trees with probabilistic rule selection where edge pressure biases termination over branching — the tree approaches the canvas boundary but can never inhabit it. Each tree regenerates on a random timer (3–8 seconds), creating a perpetual cycle of growth and dissolution. Meristem buds at branch tips pulse with warm glow and emit drifting particles. Mouse proximity distorts branch geometry and brightens buds, as if attention itself accelerates growth. Six poetic phrases cycle on 8-second intervals about undifferentiated cells, held breath, the space between what grows and what might. The L-system rules (bifurcation, single-branch, continuation, termination) are weighted stochastically but the key insight is that edge pressure dynamically shifts probabilities: near edges, bifurcation drops from 55% to ~38% and termination rises from 4% to ~28% — the tree senses its limits. The warm-earth palette gives the piece an organic, almost biological warmth that contrasts with the tense, never-resolving growth pattern.
