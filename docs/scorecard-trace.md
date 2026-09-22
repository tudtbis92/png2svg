# scorecard-trace (draft: docs/drafts/trace-draft.ts)

| # | Criterion (source rule) | Verdict | Evidence |
|---|---|---|---|
| 1 | Strict TS, no raw `any` (coding 1) | Pass | Typed params/returns |
| 2 | Boundary validation first (coding 5) | Pass | `validatePngDraft` type+size |
| 3 | Clamp numeric options (coding 6) | Pass | colors 2–64, blur 0–5 |
| 4 | DOM-free pure logic (coding 4) | Pass | No DOM refs |
| 5 | No hallucinated dep (coding 9) | Pass | `imagetracerjs` in package.json |
| 6 | No secrets (security 1) | Pass | None present |
| 7 | No user-data innerHTML (coding 12) | Pass | Returns string, no HTML sink |
| 8 | Error style (coding 2) | Partial | Returns string|null, no Error type; acceptable at boundary, note only |
| 9 | Logging hygiene (coding 3) | Pass | No logging of bytes |
| 10 | Simplicity, no one-use abstraction (coding 8) | Pass | Two flat fns |
| 11 | Strict schema extras (api 2) | Pass | Fixed params, no extras |
| 12 | Magic numbers named | Partial | `8*1024*1024` inline; app code uses `MAX_FILE_BYTES` — draft only |

Tally: 10 Pass, 2 Partial, 0 Fail. Follow-ups: none blocking. Draft must NOT be used as-is (partials); app code in `src/trace.ts` already applies named consts.
