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
