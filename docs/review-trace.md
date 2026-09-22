# review-trace (ordered, Lab 2.2 B3)

Target: `src/main.ts` + `src/trace.ts` @ d2080a0. All blockers fixed in this branch.

## Spec delta

1. **Blocker (fixed): `MAX_DIMENSION_PX` declared but never enforced.** Spec-01 lists 4096px cap; code only checked type+size. Fix: `checkDimensions()` pure fn, enforced after `decode()`, tests added.
2. **Note: `traceImage` wrapped sync lib call in `new Promise`.** No behavior gap, simplification only. Fix: sync return.

## Security

3. **Blocker (fixed): preview object URL never revoked.** One leak per file. Fix: `finally { revokeObjectURL }`.
4. **Blocker (fixed): download URL revoked synchronously after `click()`.** Could cancel download on some browsers. Fix: revoke after 1s timeout.
5. **OK: `after.innerHTML = svgText`.** Only lib-generated SVG (paths, no user strings); scripts via innerHTML don't execute. Comment added at sink. No change needed.

## Testing & validation

6. **Blocker (fixed): `Number('')` = 0 / non-numeric = NaN passed raw.** `Math.max(2, NaN)` = NaN → lib gets NaN. Fix: `Number.isFinite` fallback to defaults in `clampOptions`, test added.
7. **Note: DOM flow (`handleFile`, `getImageData`) untested.** Needs jsdom/canvas or browser harness; genuinely out of node-vitest scope. Follow-up: playwright smoke (single upload → download) when UI stabilizes. Not blocking merge.

## Complexity

8. Promise-executor anti-pattern removed with fix #2. Layering kept: `trace.ts` DOM-free, `main.ts` DOM-only. No change beyond fixes.

## Style

9. **Note: 7× non-null `getElementById` assertions.** Typo in an id = runtime crash. Accepted: ids are static in same-repo `index.html`, crash is loud not silent. No change.
10. `catch` maps unknown to `Error('Trace failed.')`. Matches coding-rule 2. No change.

## Sketch (fixed code shape)

```ts
// trace.ts: pure, DOM-free
export function clampOptions(o: TraceOptions): TraceOptions // NaN-safe
export function checkDimensions(w: number, h: number): string | null
// main.ts: try { decode → check → trace } finally { revoke preview URL }
```

Verdict: 4 blockers fixed + tests (10 tests now). #7 playwright smoke = follow-up.
