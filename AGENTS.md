## Communication

Talk with the user in Thai or simple English. Avoid technical jargon. When a technical term is unavoidable, explain it in plain words and give a picture-like example (เช่น "queue คือคิวเหมือนต่อแถวซื้อกาแฟ").

## Versioning and changelog

- The project version lives in the `VERSION` file at the repo root, using semantic versioning (`x.y.z`).
- Every change (add, edit, delete, or patch) must bump the version in `VERSION` and update `CHANGELOG.md`.
- Always commit to git when the version is bumped.

Semantic versioning in plain words (เวอร์ชันแบบ x.y.z): แก้บั๊กเล็กๆ ใช้ PATCH (0.1.0 → 0.1.1), เพิ่มของใหม่ ใช้ MINOR (0.1.0 → 0.2.0), เปลี่ยนแบบทำให้ของเดิมพัง ใช้ MAJOR (0.1.0 → 1.0.0).

## Agent skills

### Issue tracker

Issues and specs live as GitHub issues in `zerooneK/hangman` (via the `gh` CLI). See `docs/agents/issue-tracker.md`.

### Triage labels

Five canonical roles; label strings equal their role names. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `CONTEXT.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
