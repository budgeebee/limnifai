# The Bureau of Lost and Found Sounds

## Project Overview
- **Project name**: The Bureau of Lost and Found Sounds
- **Type**: Interactive web experience / art installation
- **Core functionality**: A 1970s government office interface for cataloging audio that has gone missing. Users browse a fictional database of lost sounds, can "play" them (white noise that almost resolves), encounter corrupted files, search (unsuccessfully), and "checkout" sounds for 7 days.
- **Target users**: Art enthusiasts, nostalgic users, fans of weird/melancholic digital experiences

## UI/UX Specification

### Layout Structure
- **Container**: Fixed 100vh, no scroll on main, internal scrolling for content areas
- **Header**: Government agency sign "THE BUREAU OF LOST AND FOUND SOUNDS" with date stamp
- **Main area**: Split into left (filing cabinet) and right (CRT monitor/database)
- **Footer**: Fluorescent light bar, clerk status indicator

### Responsive Breakpoints
- Desktop: Full layout with filing cabinet + CRT side by side
- Tablet (< 1024px): Stacked layout
- Mobile (< 768px): Simplified vertical stack

### Visual Design

#### Color Palette
- **Background (beige)**: #D4C5A9 (main office), #C9B896 (filing cabinets)
- **CRT phosphor amber**: #FFB000 (primary text), #CC8800 (dimmed)
- **CRT glow**: #FF9500 with blur
- **Metal/gray**: #8B8680 (desk edges), #6B6660 (shadows)
- **Paper white**: #F5F0E6
- **Coffee stain**: rgba(139, 90, 43, 0.15)
- **Static/corruption**: #1A1A1A, #FFFFFF, #333333

#### Typography
- **Headers**: "Special Elite" (typewriter), fallback: "Courier New", monospace
- **Body/Forms**: "IBM Plex Mono" or "Courier New"
- **File labels**: "American Typewriter" or "Courier"
- **Sizes**: 
  - Agency header: 1.5rem
  - Section headers: 1.1rem
  - Body: 0.9rem
  - Small labels: 0.75rem

#### Spacing System
- Base unit: 8px
- Content padding: 24px
- Card gaps: 16px
- Form field gaps: 12px

#### Visual Effects
- **CRT scanlines**: Horizontal lines overlay, 2px gap, 5% opacity
- **CRT flicker**: Subtle opacity animation (0.97-1.0)
- **Phosphor glow**: Text-shadow with amber blur
- **Fluorescent hum**: Subtle CSS animation on header bar
- **Coffee stain**: SVG/PNG overlay with radial gradient, positioned randomly
- **Filing cabinet**: 3D effect with gradients, drawer handles
- **Corrupted files**: RGB split, pixel displacement, noise overlay

### Components

#### 1. Header Bar
- Agency name in embossed metal sign
- Current date (simulated 1970s date)
- Fluorescent light indicator (pulsing green/amber)
- States: Normal, "SYSTEM LOADING" (initial)

#### 2. Filing Cabinet (Left Panel)
- 4 drawers labeled: A-D, E-H, I-P, Q-Z
- Each drawer clickable, reveals file cards
- Drawers have 3D effect with handle
- States: Closed, Open (slides out), Hover (slight glow)

#### 3. Sound File Cards
- Paper texture background
- Typewriter-style text
- Fields: Case #, Description, Date Lost, Status
- Status badges: "AVAILABLE", "CHECKED OUT", "CORRUPTED"
- Click to select → loads in CRT panel

#### 4. CRT Monitor (Right Panel)
- Beige frame with rounded corners
- Green/amber text on dark background
- Screen curvature effect (subtle)
- States: Off, Booting, Active, Playing, Corrupted

#### 5. Search Interface
- Input field with blinking cursor
- "SEARCHING..." animation
- Results appear below
- Always shows "NO RESULTS FOUND" or unrelated suggestions
- Suggests sounds that have nothing to do with query

#### 6. Audio Player (in CRT)
- Play button (triangle in circle)
- Progress bar (phosphor style)
- Waveform visualization (simple bars)
- Text: "AUDIO CORRUPTED" for bad files

#### 7. Checkout Form
- Paper form aesthetic
- Fields: Name, Department, Extension, Reason for Request
- Checkbox: "I accept responsibility for this audio"
- Submit button: "PROCESS REQUEST"
- On submit: "REQUEST SUBMITTED - APPROVAL PENDING"

#### 8. Record Button
- Red "REC" button with pulsing animation
- Click to start recording (uses Web Audio API)
- Shows recording duration
- On stop: "RECORDING LOST IN TRANSIT"
- Adds to database as "Unidentified, [timestamp]"

#### 9. Corrupted File Overlay
- Full static/noise effect
- Glitchy text fragments
- RGB color separation
- "FILE CORRUPTED - RECOVERY IMPOSSIBLE" message

## Functionality Specification

### Core Features

#### 1. Sound Database (50 entries)
JSON data structure with:
- id: string (e.g., "BLS-1974-001")
- description: string (creative lost sound)
- year: number
- status: "available" | "checked_out" | "corrupted"
- category: string

**Example entries:**
- "My grandmother's laugh, 1987"
- "The noise my car made on cold mornings"
- "A promise I didn't keep"
- "The sound of rain on a specific roof in 1992"
- "My first word (allegedly)"
- "The song playing when I realized I was happy"
- "A phone call I should have answered"
- "The echo in an empty church"
- etc.

#### 2. Audio Playback
- On click: Generate white noise using Web Audio API
- Fade in white noise (0-3 seconds)
- At ~3 seconds: Mix in almost-recognizable sound (filtered noise patterns)
- At ~6 seconds: Dissolve back to pure white noise
- Total duration: ~8 seconds
- Uses Tone.js for audio synthesis

#### 3. Search System
- Input accepts any text
- Always returns results that DON'T match
- Algorithm: Randomly select 3-5 sounds that have no keyword overlap
- Display "NO EXACT MATCHES - SUGGESTED RESULTS:"
- Never finds what user searches for

#### 4. Checkout Process
- Form validation (all fields required)
- On submit: Show "REQUEST PROCESSING..." (3 second delay)
- Then: "REQUEST DENIED - INSUFFICIENT CLEARANCE" (50% chance)
- Or: "REQUEST APPROVED - PICKUP IN 6-8 WEEKS"
- Does nothing permanent

#### 5. Recording Feature
- Uses MediaRecorder API
- Records up to 5 seconds
- On stop: "ERROR - FILE HAS ALREADY BEEN LOST"
- Adds entry to database: "Unidentified Audio, [timestamp]"
- Entry appears in "Recent Acquisitions" with "corrupted" status

### User Interactions and Flows
1. User lands → sees filing cabinet + "CLICK TO BEGIN" on CRT
2. Click → CRT boots up with retro sequence
3. User clicks drawer → opens, shows files
4. User clicks file → loads in CRT, can play audio
5. User can search → gets unrelated results
6. User clicks checkout → fills form, gets bureaucratic response
7. User clicks record → records, loses it, adds to DB
8. Corrupted files → show glitch effects, no audio

### Edge Cases
- Empty search: "PLEASE ENTER SEARCH CRITERIA"
- Special characters: Strip them, show "INVALID CHARACTERS"
- Very long input: Truncate at 50 chars
- Recording denied: Handle mic permission denial gracefully
- Audio context blocked: Show "CLICK TO ENABLE AUDIO"

## Acceptance Criteria
1. ✓ Page loads with 1970s office aesthetic (beige, filing cabinets)
2. ✓ CRT monitor displays with scanlines and phosphor glow
3. ✓ 50 fictional lost sounds are displayed in filing cabinet
4. ✓ Clicking a sound plays white noise that almost resolves
5. ✓ At least 5 files are marked "corrupted" with visual glitches
6. ✓ Search never returns what user searches for
7. ✓ Checkout form works but does nothing meaningful
8. ✓ Record button uses mic, immediately "loses" the file
9. ✓ Coffee stain visible on UI
10. ✓ Overall feeling is weird, melancholic, bureaucratic

## Technical Stack
- React 19
- Vite
- Tone.js for audio synthesis
- CSS for all styling (no Tailwind)
