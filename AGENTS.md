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
