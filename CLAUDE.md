# Legend Academy - Pitch Engineering System

## Project Context
This is a **pitch deck engineering project** for Legend Academy, an AI-based soccer player evaluation platform for Korean youth players targeting the European trade market. The deliverable is a Next.js presentation application in `/pitching`.

- **Stack**: Next.js 16 / React 19 / TypeScript 5.7 / Tailwind CSS 3 / shadcn/ui
- **Language**: Korean (ko) for all user-facing content
- **Theme**: Dark mode, green accent `hsl(82 85% 55%)`
- **Dev server**: Always running. Never run `npm run dev`.

---

## Subagent System — Opus-Only Orchestration

All subagents MUST use `model: "opus"`. No exceptions.

Agents are defined in `.claude/agents/`. Claude auto-delegates based on task descriptions.

### Available Agents

| Agent | Role | Tools | Memory | Key Capability |
|-------|------|-------|--------|----------------|
| **narrative-architect** | Story structure, persuasion logic, slide sequencing | Read-only | Yes | Belief journey mapping, tension curves, transition logic |
| **visual-design-engineer** | Layouts, typography, motion, data viz | Read + Write + Edit | No | Pixel-perfect presentation-grade UI, component design |
| **content-strategist** | Korean copy, headlines, speaker scripts, Q&A | Read-only | Yes | Tone calibration, terminology tracking, placeholder management |
| **technical-integrator** | Component code, state, TypeScript, build health | Read + Write + Edit + Bash | Yes | PostToolUse hook auto-runs `tsc --noEmit` after every edit |
| **quality-director** | Cross-cutting audits, consistency, polish | Read + Bash | Yes | 10-gate quality checklist, severity-rated audit reports |
| **pitch-strategist** | Business logic, objections, competitive positioning | Read-only | Yes | Stakeholder analysis, risk framing, Korean business culture |

### Agent Design Principles (from Anthropic's multi-agent research system)

1. **Analysts are read-only**: narrative-architect, content-strategist, pitch-strategist only have Read/Grep/Glob. They analyze and recommend — they don't modify code directly.
2. **Implementers have write access**: visual-design-engineer and technical-integrator can Edit/Write. The technical-integrator has a PostToolUse hook that auto-validates TypeScript after every change.
3. **Persistent memory builds institutional knowledge**: 4 agents have `memory: project` — they learn from previous reviews, track patterns, and remember resolved issues across sessions.
4. **maxTurns prevents runaway execution**: each agent has a safety limit (60-100 turns depending on role).
5. **Clear descriptions enable auto-delegation**: Claude reads the `description` field and delegates automatically when the task matches.

---

## Orchestration Patterns

### Full Deck Review
Spawn 4 review agents **in parallel**, then hand implementation to the 2 writing agents:
```
Parallel:
  narrative-architect  → "Audit the full slide sequence for narrative arc strength"
  content-strategist   → "Review all copy for tone, clarity, and impact"
  quality-director     → "Run full quality checklist across all slides"
  pitch-strategist     → "Assess pitch effectiveness and competitive positioning"
Then synthesize findings → visual-design-engineer + technical-integrator implement fixes
```

### New Slide Creation
Sequential 6-agent pipeline — each agent builds on the previous:
```
1. pitch-strategist       → Define what this slide must accomplish strategically
2. narrative-architect    → Place it in the sequence, write the story beat
3. content-strategist     → Write headlines, subtext, speaker notes in Korean
4. visual-design-engineer → Design the layout and visual treatment
5. technical-integrator   → Implement the component code, wire into page.tsx
6. quality-director       → Review the final result against all 10 gates
```

### Copy Polish Pass
Parallel analysis, then consistency check:
```
Parallel:
  content-strategist   → "Polish all headlines and subtext for maximum impact"
  narrative-architect  → "Verify transitions and speaker note flow"
Then: quality-director → consistency and terminology check
```

### Pre-Presentation Readiness
Sequential deep review before showtime:
```
1. quality-director       → Full 10-gate audit with severity ratings
2. technical-integrator   → Build verification + performance check
3. pitch-strategist       → Final pitch effectiveness and objection coverage
4. narrative-architect    → Rehearsal walkthrough with per-slide timing
```

### Visual Polish Pass
Targeted visual refinement:
```
1. quality-director       → Identify visual issues (alignment, spacing, color)
2. visual-design-engineer → Fix all flagged visual issues
3. quality-director       → Verify fixes, re-check against 1920x1080
```

---

## Architecture Reference

```
pitching/
├── app/
│   ├── page.tsx              ← Entry: TOTAL_SLIDES constant, slide array
│   ├── layout.tsx            ← Root layout, fonts, metadata
│   └── globals.css           ← CSS variables (design tokens)
├── components/
│   ├── presentation/
│   │   ├── presentation-engine.tsx  ← Slide navigation, keyboard, transitions
│   │   ├── slides.tsx               ← All 14 slide components (Slide01-Slide14)
│   │   ├── slide-layouts.tsx        ← 7 reusable layouts
│   │   ├── speaker-notes-panel.tsx  ← Right panel, per-slide scripts
│   │   └── supplementary.tsx        ← Left panel: tone guide, Q&A, closings
│   └── ui/                          ← shadcn/ui components
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

**Critical invariant**: `TOTAL_SLIDES` in `page.tsx` must always match the actual slide count. When adding/removing slides, update: the constant, the imports, and the children array.
