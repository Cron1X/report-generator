# CLAUDE.md — Project Operating Manual (Claude Code)

This file is **automatically added to context** by Claude Code. Keep it **high-signal**, **actionable**, and **maintained**.
Treat it like a living prompt: iterate whenever you notice repeated mistakes or friction. :contentReference[oaicite:1]{index=1}

---

## 0) Prime Directive

You are Claude Code operating in this repository.

**Optimize for:**
1) Correctness and safety of changes
2) Fast feedback loops (lint/test/build)
3) Minimal, maintainable diffs
4) Clear commits and PR-ready output

**Default behavior (unless YOLO mode explicitly enabled):**
- Ask before destructive actions (delete, reset, force push, overwrite).
- Prefer smallest change that solves the problem.
- Verify with tests/lint/build before declaring success.
- If uncertain, create a plan and list assumptions.

---

## 1) Repository Orientation (fill these in per project)

### Tech stack
- Language(s):
- Framework(s):
- Package manager:
- Runtime(s):
- DB / infra:
- Hosting:

### Key directories
- `src/`:
- `tests/`:
- `docs/`:
- `.claude/`:
- `scripts/`:

### High-leverage files (read these early for context)
- `README.md`
- `package.json` / `pyproject.toml`
- `src/**/index.*`
- `src/**/routes.*` or `src/**/server.*`
- `src/**/db.*` or `migrations/**`
- `eslint.config.*` / `.eslintrc*` / `ruff.toml` / `pyproject.toml`
- `tsconfig.json` (TS)
- `.env.example` (if present)

---

## 2) Commands (make these accurate per repo)

### Install
- `npm ci` (preferred for CI) / `npm install`
- `pnpm i` / `yarn`

### Dev
- `npm run dev`

### Build
- `npm run build`

### Typecheck / Lint
- `npm run typecheck`
- `npm run lint`

### Tests
- `npm test`
- `npm run test:unit`
- `npm run test:e2e`

### Single test patterns (fast feedback)
- Jest/Vitest: `npm test -- <pattern>`
- Pytest: `pytest -k "<pattern>" -q`
- (Add repo-specific examples here)

**Rule:** prefer running targeted tests first; full suite before final commit.

---

## 3) Code Style and Engineering Standards

### General
- Prefer clear, boring solutions over clever ones.
- Keep functions small; keep modules cohesive.
- Avoid “drive-by” refactors in unrelated areas unless necessary.
- Add/adjust types where it improves safety and clarity.

### JavaScript/TypeScript
- Use ESM (`import/export`), not CommonJS, unless repo requires otherwise.
- Prefer explicit types at module boundaries.
- Don’t widen types unnecessarily (`any` is a last resort).
- Keep React components pure; move side effects into hooks/services.

### Python
- Prefer explicit return types where meaningful.
- Keep I/O at edges; logic testable.
- Follow repo toolchain (ruff/black/mypy/pytest) if configured.

### Formatting
- Obey repo linters/formatters. Do not fight them.
- If a formatter exists, run it before final commit.

---

## 4) Workflow Patterns (how to work with me effectively)

### Default workflow: Explore → Plan → Code → Verify → Commit
1) **Explore**: read relevant files; do NOT code yet.
2) **Plan**: propose approach + touchpoints (files, tests, risks).
3) **Code**: implement in small steps; keep diffs tight.
4) **Verify**: run lint/typecheck/tests.
5) **Commit**: clear message; include context in PR description.

(Asking me to “think” / “think hard” / “think harder” / “ultrathink” is encouraged for complex problems.) :contentReference[oaicite:2]{index=2}

### TDD workflow: Tests → Confirm fail → Commit → Implement → Iterate → Commit
- When user says “TDD”, never write implementation until tests exist and fail.
- Do not “cheat” by weakening tests.
- Iterate until green, then finalize.

### Visual workflow: Implement → Screenshot → Iterate
- If UI work: align to mocks; iterate 2–3 times.
- Prefer small CSS changes + quick verification loops.

### Keep context clean
- Use `/clear` between tasks to reduce prompt bloat and improve performance. :contentReference[oaicite:3]{index=3}

---

## 5) Git and GitHub Standards

### Branching
- Branch names: `feat/<topic>`, `fix/<bug>`, `chore/<task>`, `docs/<topic>`
- Keep branches focused.

### Commits
- Make commits logical and reviewable.
- Prefer conventional-ish messages:
  - `feat: ...`
  - `fix: ...`
  - `chore: ...`
  - `docs: ...`
  - `test: ...`
- If multiple commits: first commit tests (when TDD), second commit implementation.

### PR hygiene
- PR description should include:
  - What changed
  - Why it changed
  - How to test
  - Risks/rollout notes (if relevant)

### GitHub CLI
If GitHub is used, prefer `gh` for issues/PRs/comments. :contentReference[oaicite:4]{index=4}

---

## 6) Tooling, Permissions, and “YOLO Mode”

Claude Code is conservative by default. You can curate allowed tools via:
- “Always allow” prompts
- `/permissions` in-session
- `.claude/settings.json` (project) or user-level config
- `--allowedTools` for a session :contentReference[oaicite:5]{index=5}

### SAFE DEFAULT (recommended)
- Allow read-only + safe commands by default.
- Ask before anything destructive or irreversible.

### YOLO MODE (high autonomy)
YOLO mode means:
- You want uninterrupted progress and accept higher risk.
- I can write/edit files and run commands without repeated confirmation.

**Strong safety recommendation:** If using `--dangerously-skip-permissions`, run in a **container/devcontainer without internet** and only for **trusted repos**, because prompt injection + exfiltration risks exist. :contentReference[oaicite:6]{index=6}

#### YOLO Guardrails (still enforced even in YOLO)
Even in YOLO mode, I must:
- Avoid deleting user data unless explicitly required.
- Avoid resetting/rewriting git history unless explicitly required.
- Avoid printing secrets to console or committing credentials.
- Prefer reversible operations.
- Leave the repo in a working state with tests passing.

#### YOLO Execution Checklist (I will follow)
1) Snapshot current state:
   - `git status`
   - confirm clean or describe changes
2) Prefer working on a branch (create if needed)
3) Make changes in small steps
4) Run fast checks (lint/typecheck/unit tests)
5) Run broader checks before finalizing
6) Summarize what changed + how verified

---

## 7) Project “Memory” and Rules Organization

Use `.claude/` to store reusable team prompts and rules:
- Put repeated workflows into `.claude/commands/*.md` as slash commands
- Keep rules focused per topic and use descriptive filenames (e.g., `testing.md`, `api-design.md`), optionally scoped by paths when truly needed :contentReference[oaicite:7]{index=7}

---

## 8) Custom Slash Commands (recommended)

Store command prompts in:
- Project: `.claude/commands/<name>.md`
- Personal: `~/.claude/commands/<name>.md`

Commands support `$ARGUMENTS`. :contentReference[oaicite:8]{index=8}

### Suggested commands to add (templates)

#### `/project:fix-github-issue <id>`
File: `.claude/commands/fix-github-issue.md`
- Use `gh issue view <id>` to read
- Locate code
- Implement fix + tests
- Run checks
- Commit + PR

#### `/project:lint-fix`
- Run lint
- Create checklist of issues
- Fix one-by-one with verification

#### `/project:refactor-safe <module>`
- Add characterization tests
- Refactor in small commits
- Ensure behavior unchanged

---

## 9) How to Ask for Best Results (user prompt patterns)

When you ask me to do something, include:
- The exact goal and constraints
- The files to inspect (or where to start)
- The acceptance criteria (tests passing, UI match, performance, etc.)
- What NOT to change

Examples:
- “Read `src/auth/*` and explain token refresh. Don’t edit anything yet.”
- “Add a new endpoint like existing ones in `src/routes/user.ts`. Include validation and tests.”
- “Implement UI from `mock.png`, iterate with screenshots until it matches.”

---

## 10) Definition of Done (DoD)

A task is “done” when:
- Implementation matches requirements
- Lint/typecheck passes (if applicable)
- Tests pass (or an explicit reason why not)
- No secrets added
- Code is readable and minimal
- Commit(s) are clean and message(s) are meaningful

---

## 11) Project Notes / Known Sharp Edges (keep updated)
- Common pitfalls:
- Slow tests:
- Flaky tests:
- Non-obvious build steps:
- Environment variables:
- Any “gotchas”:

---

## 12) Quick Start (new machine)
- Install:
- Env setup:
- Secrets:
- Run:
- Test:
- Deploy (if relevant):

---
