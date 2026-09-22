# png2svg

Drag-drop PNG → color-traced SVG. Client-side only, no backend, no auth, no DB.

## Stack

TypeScript + Vite, `imagetracerjs` for color tracing, `vitest` for tests.

## Run

```bash
npm install
npm run dev      # local preview
npm test         # unit tests
npm run build    # typecheck + build
```

## Governance

- Spec: `docs/spec-01-png2svg.md` (Definition of Ready).
- Rules: `docs/coding-rules.md`, `docs/api-rules.md`, `docs/security-rules.md`.
- Scorecard: `docs/scorecard-trace.md`.
- Contributing: `CONTRIBUTING.md`. AI output must be reviewed; provenance disclosed in PRs.
