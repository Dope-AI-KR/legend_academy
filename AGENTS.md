# Legend Academy - Pitch Engineering System

## Project Context
This is a **pitch deck engineering project** for Legend Academy, an AI-based soccer player evaluation platform for Korean youth players targeting the European trade market. The deliverable is a Next.js presentation application in `/pitching`.

- **Stack**: Next.js 16 / React 19 / TypeScript 5.7 / Tailwind CSS 3 / shadcn/ui
- **Language**: Korean (ko) for all user-facing content
- **Theme**: Dark mode, green accent `hsl(82 85% 55%)`
- **Dev server**: Always running. Never run `npm run dev`.

---

## Specialist review profiles

These specialist roles are repo-local pitch-work profiles, not the authoritative lane contract for this repository.

- the global routing, enabled lanes, and primary mutation ownership live in `repo_harness.toml`
- any delegation or consultation still has to obey AgentOS 4.0.0 primary-only acceptance, bounded maximum-safe parallelism, and the enabled-lane contract
- the current specialist briefs live in `.claude/agents/`
- do not treat this section as a hardcoded model pin; use the strongest available model supported by the tool that is actually invoking the profile

### Available Agents

| Agent | Role | Tools | Memory | Key Capability |
|-------|------|-------|--------|----------------|
| **narrative-architect** | Story structure, persuasion logic, slide sequencing | Read-only | Yes | Belief journey mapping, tension curves, transition logic |
| **visual-design-engineer** | Layouts, typography, motion, data viz | Read + Write + Edit | No | Pixel-perfect presentation-grade UI, component design |
| **content-strategist** | Korean copy, headlines, speaker scripts, Q&A | Read-only | Yes | Tone calibration, terminology tracking, placeholder management |
| **technical-integrator** | Component code, state, TypeScript, build health | Read + Write + Edit + Bash | Yes | PostToolUse hook auto-runs `tsc --noEmit` after every edit |
| **quality-director** | Cross-cutting audits, consistency, polish | Read + Bash | Yes | 10-gate quality checklist, severity-rated audit reports |
| **pitch-strategist** | Business logic, objections, competitive positioning | Read-only | Yes | Stakeholder analysis, risk framing, Korean business culture |

### Specialist profile design principles

1. **Analysts are read-only**: narrative-architect, content-strategist, pitch-strategist only have Read/Grep/Glob. They analyze and recommend — they don't modify code directly.
2. **Implementers have write access**: visual-design-engineer and technical-integrator can Edit/Write. The technical-integrator has a PostToolUse hook that auto-validates TypeScript after every change.
3. **Persistent memory builds institutional knowledge**: 4 agents have `memory: project` — they learn from previous reviews, track patterns, and remember resolved issues across sessions.
4. **maxTurns prevents runaway execution**: each agent has a safety limit (60-100 turns depending on role).
5. **Clear descriptions enable auto-delegation**: Codex reads the `description` field and delegates automatically when the task matches.

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

## Lane selection / 레인 선택

- `repo_harness.toml [lane]` is the local source of truth for lane mode, primary lane, and delegated role routing
  - `repo_harness.toml [lane]`는 레인 모드, 기본 레인, delegated 역할 라우팅에 대한 로컬 source of truth입니다.
- `mode = "orchestrated"` means this repo enters through one orchestrator control plane by default
  - `mode = "orchestrated"`은 이 저장소가 기본적으로 하나의 orchestrator control plane으로 진입한다는 뜻입니다.
- simple work may still collapse to one lane internally; secondary lanes are used only for the roles declared in `lane.role_routing`
  - 단순 작업은 내부적으로 한 레인으로 collapse될 수 있고, 보조 레인은 `lane.role_routing`에 선언된 역할에만 사용합니다.
- Codex, Claude, and Gemini are orchestrator-compatible lanes; Gemini secondary use remains consultant-only for planning, research, review, and handoff
  - Codex, Claude, Gemini는 orchestrator-compatible 레인이며 Gemini 보조 사용은 planning/research/review/handoff consultant 전용입니다.
- do not use Claude/BKit or any other external lane unless `repo_harness.toml [lane]` enables it
  - `repo_harness.toml [lane]`가 활성화하지 않은 Claude/BKit 또는 다른 외부 레인은 사용하지 않습니다.
- even in orchestrated mode, keep the declared primary lane as the default mutation owner and use secondary lanes only for the delegated roles declared in `lane.role_routing`
  - orchestrated 모드에서도 선언된 기본 레인을 기본 mutation owner로 유지하고 보조 레인은 `lane.role_routing`에 선언된 delegated 역할에만 사용합니다.

## Primary-lane request routing / 기본 레인 요청 라우팅

- treat ordinary engineering requests as harness-managed by default
  - 일반적인 엔지니어링 요청은 기본적으로 하니스 관리 요청으로 취급합니다.
- use `bash scripts/harness/run_primary_runtime.sh` as the default interactive launch path so the repo enters through the declared primary lane and runtime backend
  - 저장소가 선언된 기본 레인과 런타임 백엔드로 진입하도록 기본 대화형 실행 경로로 `bash scripts/harness/run_primary_runtime.sh`를 사용합니다.
- use `bash scripts/harness/doctor_primary_runtime.sh` before relying on a newly installed runtime path
  - 새 런타임 경로를 신뢰하기 전에 `bash scripts/harness/doctor_primary_runtime.sh`를 사용합니다.
- if the Codex lane is enabled, use the repo skill `harness-executor` as the intake path for non-trivial implementation, debugging, refactoring, review, or research work
  - Codex 레인이 활성화된 경우 비사소한 구현, 디버깅, 리팩터링, 리뷰, 리서치 작업은 저장소 skill `harness-executor`를 intake 경로로 사용합니다.
- if `repo_harness.toml [runtime].backend = "omx"`, keep AgentOS as the repo constitution and use OMX only as the interactive Codex runtime
  - `repo_harness.toml [runtime].backend = "omx"`이면 AgentOS를 저장소 헌법으로 유지하고 OMX는 대화형 Codex 런타임으로만 사용합니다.
- in an AgentOS repo with OMX enabled, do not run `omx setup --scope project`; AgentOS owns `AGENTS.md`, `.codex/config.toml`, and the repo adapter files
  - OMX가 활성화된 AgentOS 저장소에서는 `omx setup --scope project`를 실행하지 않습니다. `AGENTS.md`, `.codex/config.toml`, 저장소 adapter 파일은 AgentOS가 소유합니다.
- if the Claude lane is enabled, keep `.agents/skills/` present and use `harness-executor` as the default shared HOS method package for non-trivial Claude work
  - Claude 레인이 활성화된 경우 `.agents/skills/`를 유지하고 비사소한 Claude 작업의 기본 공용 HOS 방법 패키지로 `harness-executor`를 사용합니다.
- if the Gemini lane is enabled, keep `.gemini/settings.json` and `GEMINI.md` aligned so Gemini reads the same repo-local adapter context before acting
  - Gemini 레인이 활성화된 경우 Gemini가 동작 전에 같은 저장소 로컬 어댑터 컨텍스트를 읽도록 `.gemini/settings.json`과 `GEMINI.md`를 정렬 상태로 유지합니다.
- if the task is broad, ambiguous, risky, or multi-step, create or update an
  active execution plan before editing code
  - 작업이 넓거나, 모호하거나, 위험하거나, 여러 단계라면 코드 수정 전에 활성 실행
    계획을 만들거나 갱신합니다.
- when a workflow becomes repeatable, keep the method in the lane-local reusable surfaces instead of restating it in prompts
  - 워크플로우가 반복되면 프롬프트에 다시 쓰지 말고 레인 로컬 재사용 surface에 방법을 유지합니다.
- when a workflow becomes stable and recurring, prefer an automation
  - 워크플로우가 안정적이고 반복 주기까지 생기면 automation을 우선합니다.
- the declared primary lane is the default intake lane for this repo unless hybrid routing says otherwise for a specific role
  - 특정 역할에 대해 hybrid 라우팅이 별도로 지정하지 않는 한 선언된 기본 레인이 이 저장소의 기본 intake 레인입니다.
- treat screenshots, Playwright captures, temporary images, and delegated run
  outputs as disposable unless the active execution plan retains them through
  `retain-artifact: relative/path`
  - 활성 실행 계획의 `retain-artifact: relative/path`로 보관하지 않은
    스크린샷, Playwright 캡처, 임시 이미지, delegated run output은 임시
    산출물로 취급합니다.
- when the Codex lane is enabled, run `scripts/codex/clean_repo_artifacts.sh` before final handoff
  - Codex 레인이 활성화된 경우 최종 핸드오프 전에 `scripts/codex/clean_repo_artifacts.sh`를 실행합니다.

## AgentOS 4.0.0 execution law / AgentOS 4.0.0 실행 법칙

- accept canonical completion, release, and truth updates only from the declared primary lane
  - 정식 완료 선언, 릴리스 선언, canonical truth 갱신은 선언된 primary lane만 수행합니다.
- bounded sidecars may run only under the `maximum-safe-parallel` contract; keep them isolated, readonly unless explicitly primary-owned, and never duplicate mutable work
  - 제한된 sidecar는 `maximum-safe-parallel` 계약 아래에서만 실행하며, primary ownership이 명시되지 않은 한 readonly·격리 상태를 유지하고 mutable 작업을 중복하지 않습니다.
- all harness-owned browser or UI automation must run through `bash scripts/harness/run_browser_automation.sh` in Docker-first mode; host browser fallback is forbidden unless an override artifact is linked from the active execution plan
  - 하니스가 소유하는 브라우저/UI 자동화는 반드시 Docker-first 모드의 `bash scripts/harness/run_browser_automation.sh`를 통해 실행하며, 활성 실행 계획에 override artifact가 연결되지 않은 한 호스트 브라우저 fallback은 금지됩니다.
- consultation on global harness changes, breaking contract changes, routing-law changes, release-law changes, and browser-automation-law changes is `best-effort`; record a concrete attempt artifact even when a reviewer is unavailable
  - 전역 하니스 변경, breaking contract 변경, routing/release/browser-automation 법칙 변경에 대한 consultation은 `best-effort`이며, 리뷰어를 사용할 수 없더라도 구체적인 시도 artifact를 남깁니다.
- deploy-capable repos must certify the exact final tree before completion; rollout evidence belongs under `docs/exec-plans/active/release-certification/` and must match the current candidate tree
  - 배포 가능한 저장소는 완료 전에 정확한 최종 트리를 인증해야 하며, rollout 증거는 `docs/exec-plans/active/release-certification/` 아래에 두고 현재 candidate tree와 일치해야 합니다.

## Repository map / 저장소 구조

- product entrypoints / 제품 진입점: `pitching/app/page.tsx`, `pitching/components/presentation/slides.tsx`, `pitching/components/presentation/presentation-engine.tsx`, `pitching/components/presentation/speaker-notes-panel.tsx`
- backend or services / 백엔드 또는 서비스: 없음. 이 저장소는 API route나 별도 서비스 계층 없이 프레젠테이션 앱만 포함합니다.
- frontend or UI / 프론트엔드 또는 UI: `pitching/app/`, `pitching/components/`, `pitching/lib/`, `pitching/hooks/`
- infra or deploy / 인프라 또는 배포: `pitching/Dockerfile`, `pitching/docker-compose.yml`, `scripts/harness/`, `scripts/codex/`

## Local source-of-truth rules / 로컬 source-of-truth 규칙

- canonical product truth lives in / 정식 제품 진실 데이터 위치: 슬라이드 구조와 카피는 `pitching/components/presentation/slides.tsx`, 발표 흐름은 `pitching/app/page.tsx`와 `pitching/components/presentation/presentation-engine.tsx`, 발표 스크립트는 `pitching/components/presentation/speaker-notes-panel.tsx` 및 `pitching/components/presentation/supplementary.tsx`
- projection or derived surfaces / projection 또는 파생 surface: `pitching/.next/`, `docs/exec-plans/active/HARNESS_PROGRESS_LEDGER.html`, Docker build output
- feature-specific invariants / 기능별 불변 조건: `TOTAL_SLIDES`는 실제 slide component 개수·import·children 배열과 항상 일치해야 하며, 사용자 노출 카피는 한국어 유지, 시각 테마는 dark mode + green accent를 유지합니다.

## Runtime and deploy topology / 런타임 및 배포 토폴로지

- environments / 환경: 로컬 작업은 `pitching/`의 Next.js 16 앱에서 수행하고, 배포형 런타임 증명은 repo-local `next start`로 확인합니다. 컨테이너 경로는 `node:20-alpine` 기반 `pitching/Dockerfile`을 사용합니다.
- deploy path / 배포 경로: `cd pitching && ./node_modules/.bin/next build` 후 `./node_modules/.bin/next start --hostname 127.0.0.1 --port 3100`로 smoke 검증하며, `docker-compose.yml`은 컨테이너 `3000:3000` 매핑을 선언합니다.
- health or smoke endpoints / health 또는 smoke 엔드포인트: `GET http://127.0.0.1:3100/` 가 응답하고 HTML에 `레전드 아카데미`가 포함되어야 합니다.

## Validation commands / 검증 명령

- frontend build / 프론트엔드 빌드: `cd pitching && ./node_modules/.bin/next build`
- backend boot / 백엔드 부트: 해당 없음. 이 저장소는 별도 백엔드 부트 경로를 가지지 않습니다.
- targeted checks / 대상 검증: `cd pitching && ./node_modules/.bin/tsc --noEmit`
- browser automation / 브라우저 자동화: `bash scripts/harness/run_browser_automation.sh ...`
- runtime smoke / 런타임 스모크: `bash scripts/harness/runtime_smoke.sh`
- release certification / 릴리스 인증: `python3 ../agentOS/scripts/harness/verify_release_certification.py --repo "$(pwd)" --require-artifacts --require-current-tree`

## TDD method / TDD 방법

- default TDD mode from `repo_harness.toml [tdd]` / `repo_harness.toml [tdd]`의 기본 TDD 모드: `contract-first`
- fastest test command to run red-green-refactor loops / red-green-refactor 루프에 사용할 가장 빠른 테스트 명령: `cd pitching && ./node_modules/.bin/tsc --noEmit`
- fixture or seam strategy / fixture 또는 seam 전략: 가장 작은 TypeScript contract seam을 `pitching/` 아래 임시 파일 또는 최소 수정으로 만들어 red artifact를 기록하고, green 단계 전에 제거합니다.
- refactor guard / refactor 보호 장치: 타입체크 green 후 `next build`, Docker-first browser automation, `bash scripts/harness/runtime_smoke.sh`, exact-tree release certification을 다시 실행해 slide wiring과 runtime boot, rollout readiness를 같이 검증합니다.
- start enforceable behavior changes by writing or selecting the smallest failing check first
  - 강제 가능한 동작 변경은 가장 작은 실패 체크를 먼저 작성하거나 선택하면서 시작합니다.
- record red, green, and refactor evidence in the active execution plan
  - red, green, refactor 증거는 활성 실행 계획에 기록합니다.

## Shared harness skills / 공용 하니스 스킬

- shared skill root / 공용 스킬 루트: `.agents/skills`
- automatic request router / 자동 요청 라우터: `harness-executor`
- planner / 계획 수립: `harness-planner`
- reviewer / 리뷰: `harness-reviewer`
- runtime verifier / 런타임 검증: `harness-runtime-verifier`
- MCP auditor / MCP 점검: `harness-mcp-auditor`
- handoff / 핸드오프: `harness-handoff`

## Local MCP surfaces / 로컬 MCP surface

- guide URL / 가이드 URL: `docs/MCP_CONTRACT.md`
- default surface / 기본 surface: repo-owned MCP 서버는 없습니다. 기본 운영 surface는 저장소 파일, 하네스 래퍼, 그리고 필요 시 로컬로 띄운 Next.js deck입니다.
- admin surface / 관리자 surface: 없음. 고위험 mutation도 별도 MCP surface가 아니라 git-tracked 파일 수정과 로컬 검증으로만 수행합니다.
- mutation rules / mutation 규칙: 제품 변경은 `pitching/`, `docs/`, `scripts/` 아래 git-tracked 파일에만 반영하고, `repo_harness.toml`에 선언된 build/typecheck/runtime smoke를 통과시켜야 합니다.

## Directory-specific instructions / 디렉터리별 지침

- `path/`: instruction / 지침
