# coding-rules.md (TypeScript + Vite, client-only)

1. TS `strict` on. No `any` without narrow. Name: `camelCase` fns/vars, `PascalCase` types, `UPPER_SNAKE` consts.
2. Errors as `Error` subclasses or union returns at trust boundary (file input). No silent `catch {}`.
3. Logging: `console` only for local debug, never log file bytes or object URLs. No PII.
4. No DOM in pure logic (`src/trace.ts` stays DOM-free, testable in node).
5. Validate at boundary: `validatePng` before any decode/trace.
6. Clamp numeric options (colors 2–64, blur 0–5). Never pass raw input to lib.
7. Reuse installed dep (`imagetracerjs`). No new dep without benchmark + note.
8. Simplicity: no abstraction with one use, no config for fixed values.
9. No hallucinated deps/APIs. Import must resolve in `package.json`.
10. AI output must be reviewed; provenance disclosed in PR.
11. Secrets ban: no keys/tokens in workspace. Client-side hint only; real block is host settings.
12. String building: template literals for SVG names; never concat untrusted bytes into HTML (use `textContent`, never `innerHTML` for user data — `after.innerHTML` only receives lib-generated SVG).

Good: `const err = validatePng(file); if (err) return;`
Bad: `ImageTracer.imagedataToSVG(data, { numberofcolors: Number(input.value) })` (raw input).
