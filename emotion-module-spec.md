# Emotion Module — Braille Lab
## Spec for Claude CLI implementation

---

## Context

Braille Lab already has two modules: `spinners/` and `dab/`. This is a third: `emotions/`.

The DAB editor (`dab/index.html`) is the authoring and export tool — do not duplicate its logic. The emotion module is a **viewer + library**, backed by a data file of pre-authored expressions, with a radial picker UI for browsing and selecting them.

---

## File Structure

```
braille-lab/
└── emotions/
    ├── index.html        # the module UI
    ├── emotions.js       # expression data + renderer (no framework)
    └── emotions.json     # the expression library (source of truth)
```

Add a link card on the root `index.html` matching the existing two cards (spinners, DAB).

---

## Data Format

Reuse the DAB JSON schema exactly — no new format:

```json
{
  "cellCols": 4,
  "cellRows": 2,
  "fps": 4,
  "loop": true,
  "frames": [ /* array of 8×8 binary dot matrices */ ]
}
```

`emotions.json` is an array of named expressions:

```json
[
  {
    "id": "neutral",
    "label": "Neutral",
    "group": "base",
    "tags": ["valence:0", "arousal:0"],
    "animation": { /* DAB JSON object inline */ }
  },
  ...
]
```

The `animation` field is a verbatim DAB export (cellCols: 4, cellRows: 2, fps, loop, frames). Single-frame = static expression. Multi-frame = animated (blink, scan, etc.).

---

## Expression Library

### Canvas grammar (8×8, read top-to-bottom)

```
Row 0–1  →  brow zone
Row 2–3  →  eye zone
Row 4    →  separator (usually empty)
Row 5–7  →  mouth zone
```

Left half cols 0–3, right half cols 4–7. Asymmetry = skeptical/wink register.

### Emotion set — 20 expressions

Grouped semantically for the radial menu:

**GROUP: base** (center / resting)
- `neutral` — flat brows, normal eyes, flat mouth

**GROUP: positive** (~12 o'clock arc)
- `happy` — raised brows, normal eyes, smile arc up
- `glee` — high brows wide, wide eyes, big smile
- `awe` — brows raised max, wide eyes, open mouth oval

**GROUP: negative** (~6 o'clock arc)
- `sad` — inner brows raised (worried shape), half-lid eyes, mouth arc down
- `worried` — inner brows raised, normal eyes, tight small mouth
- `scared` — inner brows raised high, max-wide eyes, small open mouth

**GROUP: assertive** (~3 o'clock arc)
- `angry` — brows angled inward hard, squint eyes, tight flat mouth
- `frustrated` — brows low flat, squint, flat mouth
- `focused` — brows low flat, squint, no mouth expression

**GROUP: withdrawn** (~9 o'clock arc)
- `unimpressed` — brows flat low, half-lid eyes, wide flat mouth
- `skeptical` — one brow up one flat (asymmetric), normal eyes, small offset mouth
- `suspicious` — asymmetric brows, both eyes squint, flat mouth

**GROUP: reactive** (outer ring, mixed)
- `surprised` — brows raised max, round wide eyes, open rectangle mouth
- `sleepy` — no brows, heavy-lid eyes (bottom strip only), flat mouth
- `blink` — normal brows, closed eyes (empty), previous mouth — 2-frame animation
- `scan` — normal brows, eyes shift left→right — 3-frame animation
- `curious` — one brow raised (asymmetric), normal eyes, slight smile
- `determined` — brows flat pressed, squint, small tight mouth

**GROUP: special**
- `grin` — normal brows, normal eyes, wide jagged/toothy mouth
- `love` — raised brows, heart-dot eyes (custom), smile

Total: ~20. Author in DAB, export JSON, paste into `emotions.json`.

---

## Rendering

Reuse or inline the DAB braille renderer. Core logic:

```js
// dot matrix (8×8 binary) → 8 Unicode braille characters (4 cells × 2 rows)
// Each braille cell covers cols [c*2, c*2+1] × rows [r*4, r*4+3]
// Map to Unicode 8-dot braille: U+2800 + bitmask
// Dot order: d1=top-left, d2=mid-left, d3=bot-left, d7=btm-left2,
//            d4=top-right, d5=mid-right, d6=bot-right, d8=btm-right2

function matrixToBraille(matrix8x8) {
  // returns array of 8 braille chars (4 cols × 2 rows of cells)
}
```

The renderer outputs a 4×2 grid of `<span>` elements, each one braille character. Scale via `font-size` CSS — no canvas.

Animation: `setInterval` cycling frames at `fps` from the expression's animation object. FPS exposed as a slider (1–24, default from data).

---

## UI — Radial Menu

Single page, minimal chrome. Dark background matching DAB aesthetic.

**Center:** live braille face preview, large (~8–12rem font-size), animated if multi-frame.

**Around center:** pie/radial menu with the 6 semantic groups as sectors. On hover/click of a sector, expand to show individual expressions as smaller nodes on the arc.

**Interaction:**
- Hover sector → highlight group, show labels
- Click expression node → load into center preview
- Selected expression name + group label shown below preview
- FPS slider below name (affects playback speed of animated expressions)

**Copy button:** copies the DAB JSON of the selected expression to clipboard, ready to paste into DAB import. This is the reuse hook — no re-implementation of the editor.

**Open in DAB button:** encodes the selected expression JSON into a URL param or localStorage key and opens `../dab/index.html` with it preloaded (if DAB supports import via URL — check; if not, fallback to clipboard + instruction).

**Braille string display:** below the preview, show the current frame as a copyable 8-char braille string (the actual Unicode characters). Label it. This is the unique hook of the module.

---

## Aesthetic Direction

Match the existing Braille Lab visual language:
- Dark background (`#0a0a0a` or similar)
- Monospace font for all braille output
- Minimal sans for UI labels
- Accent color: use the existing site accent (check CSS vars in `index.html`)
- No rounded cards, no shadows — flat, terminal-adjacent
- Radial menu: SVG-based, drawn with `<path>` arcs, not DOM elements

The radial menu sectors should feel like a clock face, not a pie chart. Thin arc separators, labels at the rim, expressions as dots on the arc that grow on hover.

---

## Implementation Notes for Claude CLI

1. **Check the DAB source** (`dab/index.html`) for the braille renderer function — extract and reuse verbatim rather than re-implementing. Look for the dot→Unicode mapping.

2. **Check the root `index.html`** for CSS variables, font imports, and card component structure to match.

3. **Author the 20 expressions in DAB first**, export each as JSON, then assemble `emotions.json`. Alternatively, hand-author the simpler ones (neutral, happy, sad) directly in the JSON since the format is known.

4. **The radial menu is SVG** — compute arc paths mathematically. 6 groups = 60° sectors. Inner radius ~120px (preview area), outer radius ~280px. Expression nodes at ~220px radius within their sector arc.

5. **No build step** — vanilla JS, ES modules if needed, but no bundler. Match the zero-dependency pattern of the existing modules.

6. **Mobile:** radial menu degrades to a flat grid of labeled expression buttons below the preview. Same JSON data, different layout at `<600px`.

---

## Open Questions (decide locally)

- Does DAB support import via URL param? If yes, the "Open in DAB" button can deep-link. If no, clipboard fallback.
- Exact accent color / CSS variable names — read from existing source.
- Whether to pre-author all 20 in DAB or start with 8–10 and expand.
