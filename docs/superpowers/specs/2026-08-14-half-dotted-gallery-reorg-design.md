# Half-dotted — unified shape gallery reorganization

**Date:** 2026-08-14
**Status:** Approved (design)
**Area:** `fun-shapes/index.html`, `index.html` (homepage)

## Problem

The Braille Lab homepage has three separate cards for dotted-halftone 3D
*shapes* — "Fun Shapes" (48 bodies), "Shapes" (pyramid / double-inverted
pyramid / dodecahedron / Möbius), and "Modes × Primitives" (11 primitives ×
9 motion modes). The shape bodies are scattered across three galleries with no
shared taxonomy, and there is no home for basic primitives or a planned
origami family. We want one parent entry that organizes all the half-dotted
shapes by type.

## Goal

A single **"Half-dotted"** homepage card opening one gallery where ~62 shape
bodies are browsable by category — **Primitives · Mathematical · Fun ·
Organic · Origami** — on the existing 9-treatment detail engine.

## Decisions (locked during brainstorming)

- **Nav model:** category *tabs* + *grouped grid* on one page (tabs filter;
  "All" shows every shape with section headers between categories).
- **Scope:** fold Fun Shapes + `shapes/` + `primitives/` bodies under one
  Half-dotted parent; retire the "Shapes" and "Modes × Primitives" homepage
  cards.
- **Primitives content:** add new basic solids AND port the Platonic/parametric
  solids already present in the sibling files.
- **Origami:** design Crane, Sailboat, Shuriken, Dragon.

## Non-goals / dropped

- The Rubik **"solving cube"** animation and the 2D **"shaping"** morph from
  `primitives/` are animation *modes*, not shape bodies; they are **dropped**.
  (Could return later as an additional treatment — out of scope here.)
- `shapes/index.html` and `primitives/index.html` are **left on disk**
  (still work by direct URL, just unlinked from the homepage). Deleting them is
  a separate, optional follow-up.
- No change to the 9 animation treatments or the detail view.

## Architecture

Everything lives in the two existing self-contained HTML files. No build step,
no new files besides this spec.

### Data model — `SHAPES` gains a `cat` field

Each entry in the `SHAPES` array (`fun-shapes/index.html`) gets a `cat`
property drawn from a fixed ordered list:

```js
const CATEGORIES = ['primitives', 'mathematical', 'fun', 'organic', 'origami'];
const CAT_LABEL = { primitives: 'Primitives', mathematical: 'Mathematical',
                    fun: 'Fun', organic: 'Organic', origami: 'Origami' };
// e.g. { key: 'amoeba', label: 'Amoeba', sub: 'pseudopod blob', cat: 'organic', pts: amoebaPts() }
```

`cat` is the single source of truth for grouping and filtering. Adding a shape
= add its generator + one `SHAPES` entry with a `cat` (unchanged workflow, one
new field).

### Taxonomy (initial assignment)

- **primitives:** sphere, cube, cone, cylinder, torus, tetra, octa, icosa,
  dodeca, pyramid, bipyramid
- **mathematical:** knot, spiral, shell, dspiral, gem, teardrop, mobius
- **organic:** corona, phage, adeno, tmv, amoeba, paramecium, bacterium,
  neuron, jellyfish, dna, mushroom, cactus, stick, banana, pineapple
- **fun:** heart, star, butterfly, snowflake, skull, ghost, cat, gear,
  lightning, umbrella, rocket, kettlebell, cloud, saturn, songs, invader, ufo,
  slime, mine, spider, bat, turret, turret-twin, gatling, railgun, howitzer,
  ciws
- **origami:** crane, sailboat, shuriken, dragon

Rule of thumb: Organic = microbiology / anatomy / botany specimens. Animal
*characters* (cat, butterfly, spider, bat) stay in Fun because they were
authored as playful/enemy characters. Reassigning any shape is a one-field
edit.

### New geometry generators

All return `fitUnit([...points])`, points `[x,y,z]` or `[x,y,z,1]` (highlight),
matching the existing idiom. Verified by the standard harness before commit.

**Primitives** — port a compact convex-solid helper set from the sibling
files (`facePlanes` + `makeConvexWarp`, plus `sampleFace`/`sampleEdge` for
edge-drawn solids), then:

- `spherePts` — `fibDir` lattice at unit radius (trivial).
- `conePts`, `cylinderPts` — swept rings + caps (same idiom as existing
  bodies).
- `cubePts`, `tetraPts`, `octaPts`, `icosaPts`, `dodecaPts`, `pyramidPts`,
  `bipyramidPts` — golden-ratio / unit vertices (reused from siblings) sampled
  over faces or edges via the ported helpers.

**Mathematical** — `mobiusPts`: port the parametric Möbius point loop
(`x=rad·cos(u)`, band across `v` with the half-twist) from the sibling files.

**Origami** — two helpers:

- `panel(pts, a, b, c, n)` — barycentric triangle fill (flat folded facet).
- `crease(pts, a, b, n)` — dense edge line (visible fold), optionally
  highlighted.

Composed models:

- `shurikenPts` — flat 4-point star (rotational); `flat: true`.
- `cranePts` — angular body + two wings + long neck/head + upturned tail.
- `sailboatPts` — triangular hull panel + triangular sail + mast crease.
- `dragonPts` — angular segmented body, head, two wings, tail; the hardest —
  built from a chain of panels with highlighted crease ridges.

### Gallery UI (`fun-shapes/index.html`)

1. **Tab row** injected above the gallery grid: `All`, then one button per
   category. A `<div id="cat-tabs">` with buttons styled like the existing
   `#seg-theme` segmented control. Clicking sets `activeCat` and re-renders the
   grid.
2. **Grouped rendering.** `buildGallery(activeCat)` clears and repopulates the
   grid:
   - For each category in `CATEGORIES` (or just `activeCat` when filtered),
     if it has visible shapes, append a full-width **section header**
     (`<div class="section-head" style="grid-column:1/-1">CAT_LABEL</div>`)
     then that category's shape cards.
   - `galleryCells` is rebuilt to only the visible cells so the animation loop
     draws just what's on screen.
3. **Filter is UI state**, not routed. Shape detail stays hash-routed via
   `#<key>` (unchanged). Returning from a detail view restores the gallery with
   the last `activeCat` (kept in a module variable; defaults to `All`).
4. **Titles/copy.** Gallery title → "Half-dotted"; lede updated to describe the
   categorized set. Detail view unchanged.

Sensitive interaction points to preserve: the `route()`/`showGallery()`/
`showDetail()` flow, the `reduced`-motion single-frame path, the theme toggle
redraw, and `visibilitychange` start/stop must all still work with the rebuilt
`galleryCells`.

### Homepage (`index.html`)

- Replace the **Fun Shapes** card's title/desc with **Half-dotted** (keep it
  linking to `fun-shapes/index.html`; keep its existing spinning snowflake
  preview unchanged).
- **Remove** the "Shapes" and "Modes × Primitives" cards.
- **Remove** the now-dead preview JS for those two cards (the shared
  "Homepage previews for the Shapes and Modes×Primitives tabs" block — the
  rotating-dodecahedron and solving-cube canvas code).
- Leave other cards (Spinners, DAB, Emotions, Loaders, Progress, Thinking Orbs,
  Braille Orbs) untouched.

## Testing / verification

Reuse the session's harness for every new body, before committing:

1. **Syntax:** extract the inline `<script>` and `new Function(src)` — must
   parse.
2. **Geometry:** each new generator's points are all finite and
   `maxRadius === 1.000` (unit-normalized); expected highlight counts.
3. **Silhouette:** ASCII projection (tilt 0.42 + yaw) per new body to confirm
   it reads as intended.
4. **UI smoke:** load the page (serve.py), confirm tabs filter, section headers
   appear under "All", a shape opens its detail view, back returns to the same
   tab, theme toggle and reduced-motion still render.

## Rollout / commits

Logical commits (all on `update-emotions`):

1. Primitives: helpers + 11 primitive generators + `mathematical` Möbius, with
   `cat` added to every existing `SHAPES` entry.
2. Origami: panel/crease helpers + crane, sailboat, shuriken, dragon.
3. Gallery UI: tabs + grouped sections + filter + title/lede.
4. Homepage: Half-dotted card; remove Shapes + Modes×Primitives cards and their
   preview JS.

Each commit verified green before the next.

## Open risks

- **Fun category is large (~27).** Acceptable with section headers; could be
  sub-grouped later if desired (out of scope).
- **Dragon legibility** as dots is the riskiest new body; the ASCII-silhouette
  gate catches it before commit, and it can be simplified/iterated if it
  doesn't read.
- **Convex-solid helper port** must not collide with existing fun-shapes helper
  names; verify no shadowing when copying `sampleFace`/`facePlanes`/etc.
