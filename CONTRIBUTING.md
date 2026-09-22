# Contributing

- Default branch: `main`. Never commit straight to it.
- Flow: `git checkout -b feature/<id>-<desc>` → work → `npm test` + `npm run build` green → `git status` (only intended files) → explicit `git add` → commit `type(scope): what` → push → PR with template fully filled.
- One human approval required. AI never self-merges.
- AI output must be reviewed; disclose tools + generated vs hand-written in PR.
- After merge: sync `main`, tag `0.0.x`, push tag.
