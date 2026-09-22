# api-rules.md (client-only app: no backend endpoints)

This app ships no server API. Rules apply to internal module boundaries and any future endpoint.

1. Plural resources, verbs via HTTP methods (if a server is ever added).
2. Strict schema: forbid extras, reject unknown fields.
3. Errors as RFC 7807 (`type/title/status/detail`).
4. Boundary validation: type + size before processing.
5. Auth per endpoint (currently N/A — client-only, no auth; adding a backend requires a spec update first).
