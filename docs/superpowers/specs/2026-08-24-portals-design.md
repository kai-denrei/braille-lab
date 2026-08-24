# Half-dotted: Portals category — design

Date: 2026-08-24 · Status: approved by operator (chat)

## Goal

Add a new **Portals** category to the Half-dotted gallery (`fun-shapes/index.html`):
eight portal-themed dot-cloud shapes, three with animated features.

## Shapes

| # | key | label | sub | notes |
|---|-----|-------|-----|-------|
| 1 | `stargate` | Stargate | chevrons + horizon | torus R≈0.72/tube≈0.13 in x–y plane, 9 chevron studs (hi dots) on outer rim. **Animated**: event-horizon disc ~120 dots, `white`/`r` shimmer `sin(t·2 + radius·5)`, rotated with ring via `rotY(t·0.45)`. |
| 2 | `warpring` | Warp Ring | flow through | thin ring + ~8 streamlines along ±z through the center, sparser with distance, popped throat dots. |
| 3 | `wormhole` | Wormhole | hyperboloid throat | surface of revolution `r(y)=sqrt(r₀²+(y·k)²)`, y∈[−1,1], throat r₀≈0.3·mouth. |
| 4 | `vortex` | Vortex | swirl · inward | conical log-spiral ~4 turns to a bright popped center. **Animated**: spiral re-emitted per frame with angle offset `−t·1.2` (feature supplies the swirl; static pts keep a faint base spiral). |
| 5 | `torii` | Torii Gate | pillars + kasagi | 3D: two cylindrical pillars, curved upswept top lintel, straight nuki beam. |
| 6 | `moongate` | Moon Gate | wall + void | thin wall slab with circular opening punched out, rim traced with hi dots. |
| 7 | `tesseract` | Tesseract Door | nested cubes | outer wire cube + ½-scale inner cube + 8 corner connectors via `traceEdge`, popped vertices. |
| 8 | `rift` | Rift | tear · pulses | `flat: true` jagged vertical tear, dense crack edges. **Animated**: outward-bleeding dots, amplitude `sin(t·1.4)`, tracking flat rotation (in-plane `t·0.5`). |

## Animation contract

`features(t)` returns screen-space dot objects `{x, y, z, white?, r?, a?, hi?}`
appended **after** shape rotation (`drawGallery`). Gallery rotation is
deterministic — `rotY(p, t·0.45)` for 3D, in-plane rotation by `t·0.5` for flat —
so each feature function applies the same transform to track its geometry
(unlike ghost/slime faces, which intentionally stay front-facing).

## Registration

- `CATEGORIES`: append `'portals'`; `CAT_LABEL`: `portals: 'Portals'`.
- Eight `SHAPES` entries in a new `// portals` block.
- Tabs, gallery sections, and per-shape export all derive from these arrays — no other changes.

## Verification

Extract inline script → `node --check`; run each generator standalone
(point count, unit-sphere bounds, ASCII x–y profile); evaluate the three
`features(t)` functions at several t values (finite coords, sane ranges).
