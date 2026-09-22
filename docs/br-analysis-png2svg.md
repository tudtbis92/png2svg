# br-analysis-png2svg

Raw requirement: "project mới dùng để convert file .png thành .svg".

## Entities

| Entity | Fields | Notes |
|---|---|---|
| InputImage | name, type, size, dimensions | PNG only, ≤8MB |
| TraceJob | colors 2–64, blur 0–5 | defaults 16 / 1 |
| SvgOutput | svg text, byte size | download as .svg |

## Open Questions / risks

| # | Question | Why it blocks DoR |
|---|---|---|
| 1 | Lib trace màu nào (imagetracerjs vs vtracer-wasm)? | Bundle size + quality differ. Decision: imagetracerjs now (pure JS, zero build pain); vtracer-wasm later if quality gap measured. |
| 2 | File cap bao nhiêu? | Huge PNG hangs tab. Decision: 8MB, revisit after benchmark. |

## UI / Data / API

- UI: dropzone, sliders, preview, download. Data: local only. API: module fns, no backend.

## Contradictions

None. No auth requested, none added.

## DoR verdict: READY.
