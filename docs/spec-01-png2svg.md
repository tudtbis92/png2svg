# spec-01: PNG → color SVG (first feature)

## UI

- Dropzone (click + drag-drop + keyboard Enter/Space).
- Controls: colors (2–64, default 16), smoothing/blur (0–5, default 1).
- Side-by-side preview before/after, status line, Download SVG button.

## Data

- `TraceOptions { colors, blurRadius }`, `DEFAULT_OPTIONS`, caps `MAX_FILE_BYTES = 8MB`, `MAX_DIMENSION_PX = 4096`.
- No persistence, no DB, no auth.

## API (module boundary)

- `validatePng(file): string | null`
- `clampOptions(o): TraceOptions`
- `svgFilename(pngName): string`
- `traceImage(img, opts): Promise<string>` via `imagetracerjs.imagedataToSVG`.

## Acceptance (Given/When/Then)

- Given a PNG ≤8MB, When dropped, Then SVG preview renders and Download enables.
- Given a JPEG, When dropped, Then status shows rejection, no trace runs.
- Given colors=100, When traced, Then clamped to 64.

## DoR: this doc + rules pack + scorecard. DoD: `npm test` + `npm run build` green.
