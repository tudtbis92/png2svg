# security-rules.md

1. No hardcoded secrets. None in workspace, ever.
2. Boundary validation: PNG type + 8 MB cap before decode.
3. `innerHTML` only for lib-generated SVG, never for user strings. Filenames via `download` attr, not HTML.
4. No exfiltration: files stay local, no network calls with file data.
5. Object URLs revoked after use where created for download.
6. Prompt hygiene: no pasting file bytes or user images into AI tools.
7. Deps pinned in `package.json`; `npm audit` clean on new dep.
