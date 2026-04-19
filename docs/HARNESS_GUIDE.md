# Harness guide

This repository inherits its shared operating model from `agentOS`.
이 저장소는 `agentOS`의 공통 운영 모델을 상속합니다.

## Global harness / 전역 하니스

- configured `global_harness_root`: `../agentOS`
- canonical `global_harness_repo`: `https://github.com/Dope-AI-KR/agentOS`

Read the global harness docs for shared workflow, validation, review, MCP, and
deploy/runtime standards.
공유 워크플로우, 검증, 리뷰, MCP, 배포/런타임 기준은 전역 하니스 문서를 읽습니다.

## Local authority in this repo / 이 저장소의 로컬 권한 문서

Use these local files as the authoritative adapter layer for this repository:
다음 로컬 파일을 이 저장소의 정식 어댑터 계층으로 사용합니다.

1. `docs/HARNESS_CHECKLIST.md`
2. `AGENTS.md`
3. `repo_harness.toml`
4. `docs/HARNESS_GUIDE.md`
5. the enabled lane-local config and context files such as `.codex/config.toml`, `.agents/skills/`, `.gemini/settings.json`, `GEMINI.md`, and `CLAUDE.md`
6. `docs/MCP_CONTRACT.md` when MCP exists
7. the active task plan under `docs/exec-plans/active/`
8. repo-local docs beside the owning code or feature when they exist

## Enabled lanes in this repo / 이 저장소에서 활성화된 레인

- `repo_harness.toml [lane]` is the local source of truth for lane mode, primary lane, enabled lanes, and any role routing
  - `repo_harness.toml [lane]`는 레인 모드, 기본 레인, 활성 레인, 역할 라우팅에 대한 로컬 source of truth입니다.
- `mode = "orchestrated"` means every non-trivial request enters through one orchestrator control plane
  - `mode = "orchestrated"`은 모든 비사소한 요청이 하나의 orchestrator control plane으로 진입한다는 뜻입니다.
- simple work may still collapse to one lane internally, but that is a topology decision inside orchestration
  - 단순 작업은 내부적으로 한 레인으로 collapse될 수 있지만, 그것도 orchestration 내부 topology 결정입니다.
- when secondary lanes are enabled, only the lanes declared in `lane.role_routing` may take delegated work
  - 보조 레인이 활성화되면 `lane.role_routing`에 선언된 레인만 delegated 작업을 맡을 수 있습니다.
- Codex, Claude, and Gemini are orchestrator-compatible lanes; Gemini secondary use stays consultant-only for planning, research, review, and handoff
  - Codex, Claude, Gemini는 orchestrator-compatible 레인이며 Gemini 보조 사용은 planning/research/review/handoff consultant 전용입니다.
- lane-specific wrappers should exist only under the enabled lane directories such as `scripts/codex/`, `scripts/gemini/`, and `scripts/claude/`
  - 레인별 래퍼는 `scripts/codex/`, `scripts/gemini/`, `scripts/claude/`처럼 활성화된 레인 디렉터리에만 존재해야 합니다.

## Lane automation in this repo / 이 저장소의 레인 자동화

- Codex repos use `.codex/config.toml` and `.agents/skills/` for repo-scoped defaults, automatic request routing, and Codex-specific shared methods
  - Codex 저장소는 `.codex/config.toml`과 `.agents/skills/`를 사용해 저장소 범위 기본값, 자동 요청 라우팅, Codex 전용 공유 방법을 관리합니다.
- `repo_harness.toml [runtime]` declares whether the primary lane uses the native AgentOS launcher path or the optional upstream OMX runtime backend
  - `repo_harness.toml [runtime]`는 기본 레인이 AgentOS 기본 실행 경로를 쓸지, 선택적 업스트림 OMX 런타임 백엔드를 쓸지 선언합니다.
- `scripts/harness/doctor_primary_runtime.sh` and `scripts/harness/run_primary_runtime.sh` are the repo-scoped entrypoints that should match the declared primary lane plus runtime backend
  - `scripts/harness/doctor_primary_runtime.sh`, `scripts/harness/run_primary_runtime.sh`는 선언된 기본 레인과 런타임 백엔드에 맞아야 하는 저장소 범위 엔트리포인트입니다.
- Gemini repos use `.gemini/settings.json` and `GEMINI.md` for repo-scoped context and automatic request routing
  - Gemini 저장소는 `.gemini/settings.json`과 `GEMINI.md`를 사용해 저장소 범위 컨텍스트와 자동 요청 라우팅을 관리합니다.
- ordinary engineering requests should flow through the enabled primary lane automatically
  - 일반적인 엔지니어링 요청은 활성화된 기본 레인을 통해 자동으로 흐르도록 구성되어야 합니다.
- if `runtime.backend = "omx"`, AgentOS still owns repo-local truth, TDD evidence, and completion gates while upstream `oh-my-codex` provides the interactive Codex runtime
  - `runtime.backend = "omx"`인 경우에도 저장소 로컬 truth, TDD 증거, 완료 게이트는 AgentOS가 계속 소유하고 업스트림 `oh-my-codex`는 대화형 Codex 런타임만 제공합니다.
- do not run `omx setup --scope project` in an AgentOS repo; the repo-local adapter files remain AgentOS-owned surfaces
  - AgentOS 저장소에서는 `omx setup --scope project`를 실행하지 않습니다. 저장소 로컬 adapter 파일은 계속 AgentOS 소유 surface입니다.
- when the Codex lane is enabled, `scripts/codex/clean_repo_artifacts.sh` should prune disposable screenshots, logs, and delegated run outputs
  - Codex 레인이 활성화된 경우 `scripts/codex/clean_repo_artifacts.sh`가 임시 스크린샷, 로그, delegated run output을 정리해야 합니다.
- `.claude/settings.json`, `CLAUDE.md`, `scripts/claude/bootstrap_repo_claude.sh`, `scripts/claude/run_repo_claude.sh`, and `scripts/claude/doctor_repo_claude.sh` should exist when Claude is the declared primary lane
  - Claude가 선언된 기본 레인인 경우 `.claude/settings.json`, `CLAUDE.md`, `scripts/claude/bootstrap_repo_claude.sh`, `scripts/claude/run_repo_claude.sh`, `scripts/claude/doctor_repo_claude.sh`가 존재해야 합니다.
- `scripts/claude/doctor_claude_bkit.sh` and `scripts/claude/claude_bkit_delegate.sh` should exist only when hybrid routing uses Claude as a secondary lane
  - hybrid 라우팅이 Claude를 보조 레인으로 사용할 때만 `scripts/claude/doctor_claude_bkit.sh`, `scripts/claude/claude_bkit_delegate.sh`가 존재해야 합니다.
- when hybrid routing uses Codex as a secondary lane, the normal Codex repo wrappers remain the intake surface for those routed roles
  - hybrid 라우팅이 Codex를 보조 레인으로 사용할 때는 해당 역할에도 일반 Codex 저장소 래퍼를 그대로 사용합니다.

## TDD in this repo / 이 저장소의 TDD

- `repo_harness.toml [tdd]` is the local source of truth for this repo's TDD mode, fastest test command, fixture strategy, and refactor guard
  - `repo_harness.toml [tdd]`는 이 저장소의 TDD 모드, 가장 빠른 테스트 명령, fixture 전략, refactor 보호 장치에 대한 로컬 source of truth입니다.
- non-trivial work should start with a TDD plan in the active execution plan
  - 비사소한 작업은 활성 실행 계획의 TDD 계획으로 시작해야 합니다.
- use `bash scripts/harness/run_declared_tdd_check.sh --phase red` and `--phase green` to record the machine-generated red/green artifacts for completion evidence
  - `bash scripts/harness/run_declared_tdd_check.sh --phase red`와 `--phase green`를 사용해 완료 증거에 넣을 machine-generated red/green artifact를 기록합니다.
- declare `tdd.red_signal_regex` so the red phase proves the intended failing seam instead of an arbitrary shell error
  - `tdd.red_signal_regex`를 선언해 red phase가 임의의 shell 오류가 아니라 의도한 failing seam을 증명하도록 합니다.
- completion claims should include red signal, red artifact, green result, green artifact, and refactor evidence in the active execution plan
  - 완료 주장에는 활성 실행 계획에 red signal, red artifact, green result, green artifact, refactor 증거가 포함되어야 합니다.
- `HARNESS_PROGRESS_LEDGER.html` is the shared progress projection for the active execution plan and should be refreshed when task state changes materially
  - `HARNESS_PROGRESS_LEDGER.html`은 활성 실행 계획의 공용 진행 상태 projection이며 작업 상태가 크게 바뀌면 갱신해야 합니다.
- if the repo changes enforceable behavior without a clear TDD loop, the adapter is incomplete
  - 저장소가 명확한 TDD 루프 없이 강제 가능한 동작을 변경한다면 어댑터가 불완전한 상태입니다.

## Read order / 읽기 순서

Read in this order before changing code:
코드를 변경하기 전에 다음 순서로 읽습니다.

1. `docs/HARNESS_CHECKLIST.md`
2. `AGENTS.md`
3. `repo_harness.toml`
4. `docs/HARNESS_GUIDE.md`
5. the enabled lane-local config and context files
6. `docs/MCP_CONTRACT.md` when MCP exists
7. the active task plan file for the task
8. only then the smallest relevant source files
9. the relevant global harness docs

This repository must pass the global repository execution gate before local
bootstrap or reusable CI can proceed, and non-trivial work must have an active
execution plan file with completion evidence before CI can accept the claim.
로컬 bootstrap이나 reusable CI가 진행되기 전에 전역 저장소 실행 게이트를 통과해야 하며,
비사소한 작업은 completion evidence가 포함된 활성 실행 계획 파일이 있어야 CI가 완료 주장을 받아들입니다.

Disposable artifacts should stay disposable: keep only evidence explicitly
retained by `retain-artifact: relative/path` lines in the active execution plan,
and, when the Codex lane is enabled, prune the rest through
`scripts/codex/clean_repo_artifacts.sh`.
임시 artifact는 임시로 남겨야 합니다. 활성 실행 계획의
`retain-artifact: relative/path` 라인으로 보관한 evidence만 남기고, 나머지는
Codex 레인이 활성화된 경우 `scripts/codex/clean_repo_artifacts.sh`로 정리합니다.

## Where to add new guidance / 새 지침을 어디에 둘지

- shared rules across multiple repositories:
  - add them to `agentOS`
- this repository's topology, commands, or MCP endpoints:
  - add them here, in `AGENTS.md`, `repo_harness.toml`, or `docs/MCP_CONTRACT.md`
- one feature or owner layer only:
  - add the guidance beside the owning code or feature docs

Keep the repo-local adapter small. Point to the global harness for shared
policy instead of duplicating it here.
로컬 어댑터는 작게 유지하고, 공유 정책은 여기서 중복하지 말고 전역 하니스를 참조합니다.
