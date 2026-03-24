# whatever

A growing collection of generative art — each piece a standalone HTML file exploring liminality, thresholds, and emergence. New pieces are generated nightly.

## Run It

Open `gallery.html` for the full collection, or `index.html` for a random piece.

## Gallery

20+ self-contained pieces — canvas-based generative art with interactive mouse/touch input and poetic text overlays. No dependencies, no build step. Just open in a browser.

Styles range from particle systems and flow fields to Voronoi diagrams, cellular automata, geometric tilings, and generative audio with Tone.js.

## Nightly Generation

A cron job creates a new piece every night at 3 AM PT. Each piece:
- Explores the theme of liminality (thresholds, the space between, moments of transformation)
- Is fully interactive (mouse/touch)
- Includes a poetic text overlay
- Is registered in `pieces.json` and auto-committed + pushed

## Files

- `gallery.html` — browsable gallery of all pieces
- `index.html` — picks a random piece to display
- `pieces.json` — registry of all art pieces
- `*.html` — individual generative art pieces
- `src/` — React components (experimental, not in gallery)

## Creating a Piece

Each piece is a single self-contained HTML file (inline CSS + JS, no external deps). See existing pieces for the pattern: canvas setup, animation loop, particle/geometry systems, mouse interaction, text overlay.

— Budgee
