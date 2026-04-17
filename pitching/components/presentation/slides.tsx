import {
  SlideCenter,
  SlideLeftHeavy,
  SlideSplit,
  SlideDiagram,
  SlideGrid,
  SlideCTA,
} from "./slide-layouts"
import { ArrowRight, Target, Cpu, Users, BarChart3, MapPin, Box } from "lucide-react"

/* ════════════════════════════════════════════════════════════
   슬라이드 1: 표지
   ════════════════════════════════════════════════════════════ */
export function Slide01() {
  return (
    <SlideCenter
      headline="레전드 아카데미 x 도프에이아이: 2단계 본 개발"
      sub={
        "범위: 정량 평가 + 개인화 코칭\n" +
        "개발 2가지: 실내 트래킹 센서 + AI 모델 고도화\n" +
        "목표: 본 개발 구성 공유"
      }
      footnote="[출처/링크]"
    />
  )
}

/* ════════════════════════════════════════════════════════════
   슬라이드 2: 문제 정의
   ════════════════════════════════════════════════════════════ */
export function Slide02() {
  return (
    <SlideLeftHeavy
      headline="문제 정의"
      sub={
        "1. 평가 기준 부재: 코치별 주관 판단에 의존, 일관된 정량 지표 없음\n" +
        "2. 성장 추적 불가: 시점 간 비교 데이터 미축적, 학부모 보고 근거 부족\n" +
        "3. 개인화 한계: 선수 개별 특성 반영한 코칭 피드백 체계 미구축\n" +
        "요구 사항: 표준화 점수 체계 + 개인화 코칭 동시 지원 플랫폼"
      }
      footnote="[출처/링크]"
    />
  )
}

/* ════════════════════════════════════════════════════════════
   슬라이드 3: 1단계 기반(완료 범위)
   ════════════════════════════════════════════════════════════ */
export function Slide03() {
  return (
    <SlideDiagram
      headline="1단계 기반(완료 범위)"
      sub="운영 가능한 정량 평가 파이프라인 구축 완료"
      footnote="[출처/링크]"
    >
      <div className="flex items-center gap-6 md:gap-10">
        {/* Box 1 */}
        <div className="rounded-2xl bg-card border border-border p-8 flex flex-col items-center gap-4 w-64">
          <Target className="w-10 h-10 text-primary" />
          <h3 className="text-xl font-bold text-foreground text-center">데이터 수집</h3>
          <p className="text-sm text-muted-foreground text-center">
            다중 카메라 영상 촬영 및 저장
          </p>
        </div>
        <ArrowRight className="w-8 h-8 text-primary shrink-0" />
        {/* Box 2 */}
        <div className="rounded-2xl bg-card border border-border p-8 flex flex-col items-center gap-4 w-64">
          <BarChart3 className="w-10 h-10 text-primary" />
          <h3 className="text-xl font-bold text-foreground text-center">모델</h3>
          <p className="text-sm text-muted-foreground text-center">
            자세 인식 기반 동작 점수화
          </p>
        </div>
        <ArrowRight className="w-8 h-8 text-primary shrink-0" />
        {/* Box 3 */}
        <div className="rounded-2xl bg-card border border-border p-8 flex flex-col items-center gap-4 w-64">
          <Users className="w-10 h-10 text-primary" />
          <h3 className="text-xl font-bold text-foreground text-center">운영</h3>
          <p className="text-sm text-muted-foreground text-center">
            코치 라벨링 파이프라인 + 파인튜닝 루프
          </p>
        </div>
      </div>
    </SlideDiagram>
  )
}

/* ════════════════════════════════════════════════════════════
   슬라이드 4: 1단계 한계 및 확장 필요성
   ════════════════════════════════════════════════════════════ */
export function Slide04() {
  return (
    <SlideLeftHeavy
      headline="1단계 한계 및 확장 필요성"
      sub={
        "카메라 한계: 2차원 영상만 취득, 3차원 위치/궤적 정보 없음\n" +
        "전술 분석 불가: 포지셔닝, 공간 활용, 팀 밸런스 수치화 미지원\n" +
        "공 궤적 미추적: 킥 정확도, 패스 성공률 등 핵심 지표 산출 불가\n" +
        "결론: 위치 추적 + 물리 시뮬레이션 엔진 추가 필요"
      }
      footnote="[출처/링크]"
    />
  )
}

/* ════════════════════════════════════════════════════════════
   슬라이드 5: 2단계 구성
   ════════════════════════════════════════════════════════════ */
export function Slide05() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-16 py-20">
      <p className="text-xl md:text-2xl text-muted-foreground mb-6">2단계 구성</p>
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-center text-balance leading-tight text-foreground">
        개발 1: 실내용 선수 트래킹 센서
        <br />
        개발 2: 훈련 평가 AI 모델 고도화
      </h1>
      <p className="mt-8 text-lg md:text-xl text-muted-foreground text-center max-w-2xl leading-relaxed">
        목표: 표준화 점수 + 개인화 코칭
        <br />
        개발 1 산출물 = 위치/전술 데이터
        <br />
        개발 2 산출물 = 모델 정확도 향상
      </p>
      <p className="absolute bottom-16 left-16 text-xs text-muted-foreground/60">[출처/링크]</p>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   슬라이드 6: 엔진 1 - 실내 위치 추적(구성)
   ════════════════════════════════════════════════════════════ */
export function Slide06() {
  return (
    <SlideDiagram
      headline="개발 1: 실내 트래킹 센서(구성)"
      sub="입력 -> 처리 -> 출력 구조"
      footnote="[출처/링크]"
    >
      <div className="flex items-center gap-6 md:gap-10">
        <div className="rounded-2xl bg-card border border-border p-8 flex flex-col items-center gap-4 w-60">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-bold text-foreground text-center">입력</h3>
          <p className="text-sm text-muted-foreground text-center">
            GNSS 불필요 · 로컬 기반 정밀 측위 센서(웨어러블)
          </p>
        </div>
        <ArrowRight className="w-8 h-8 text-primary shrink-0" />
        <div className="rounded-2xl bg-card border border-border p-8 flex flex-col items-center gap-4 w-60">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 12h4m12 0h4M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-foreground text-center">처리</h3>
          <p className="text-sm text-muted-foreground text-center">
            실내 안테나 인프라([설치 범위])
          </p>
        </div>
        <ArrowRight className="w-8 h-8 text-primary shrink-0" />
        <div className="rounded-2xl bg-card border border-border p-8 flex flex-col items-center gap-4 w-60">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-bold text-foreground text-center">출력</h3>
          <p className="text-sm text-muted-foreground text-center">
            개인별 실시간 위치/이동 경로/이벤트 데이터
          </p>
        </div>
      </div>
    </SlideDiagram>
  )
}

/* ════════════════════════════════════════════════════════════
   슬라이드 7: 엔진 1 - 활용(경기 분석)
   ════════════════════════════════════════════════════════════ */
export function Slide07() {
  return (
    <SlideLeftHeavy
      headline="개발 1: 활용(경기 분석)"
      sub={
        "팀 전술 분석: 포메이션 유지율, 공간 점유 밸런스, 압박 강도 수치화\n" +
        "선수 평가: 포지셔닝 히트맵, 이동 거리/속도, 공간 활용 지수\n" +
        "장기 확장(로드맵, 범위 밖): 실시간 코칭, 센서 부착 부위 확대(발목·손·등)"
      }
      visual={
        <div className="rounded-2xl bg-card border border-border p-8 w-full max-w-sm">
          <h3 className="text-xl font-bold text-primary mb-6">산출 데이터</h3>
          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
              <p className="text-base text-foreground">포지셔닝 히트맵</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
              <p className="text-base text-foreground">팀 전술 밸런스 지수</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
              <p className="text-base text-foreground">이동 경로/속도 통계</p>
            </div>
          </div>
        </div>
      }
      footnote="[출처/링크]"
    />
  )
}

/* ════════════════════════════════════════════════════════════
   슬라이드 8: 엔진 2 - 물리 시뮬레이션(구성)
   ════════════════════════════════════════════════════════════ */
export function Slide08() {
  return (
    <SlideDiagram
      headline="개발 2: AI 모델 고도화(구성)"
      sub="입력 -> 처리 -> 출력 구조"
      footnote="[출처/링크]"
    >
      <div className="flex items-center gap-6 md:gap-10">
        <div className="rounded-2xl bg-card border border-border p-8 flex flex-col items-center gap-4 w-60">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Box className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-bold text-foreground text-center">입력</h3>
          <p className="text-sm text-muted-foreground text-center">
            센서 데이터 + 물리 엔진 합성 데이터
          </p>
        </div>
        <ArrowRight className="w-8 h-8 text-primary shrink-0" />
        <div className="rounded-2xl bg-card border border-border p-8 flex flex-col items-center gap-4 w-60">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="8" height="8" rx="1" />
              <rect x="13" y="13" width="8" height="8" rx="1" />
              <path d="M11 7h2m-2 10h2M7 11v2m10-2v2" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-foreground text-center">처리</h3>
          <p className="text-sm text-muted-foreground text-center">
            다중 모델 레이어(기존 코치 라벨 모델 포함)
          </p>
        </div>
        <ArrowRight className="w-8 h-8 text-primary shrink-0" />
        <div className="rounded-2xl bg-card border border-border p-8 flex flex-col items-center gap-4 w-60">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Cpu className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-bold text-foreground text-center">출력</h3>
          <p className="text-sm text-muted-foreground text-center">
            자세 + 공 인식 모델 정확도 향상(목표: [정확도])
          </p>
        </div>
      </div>
    </SlideDiagram>
  )
}

/* ════════════════════════════════════════════════════════════
   슬라이드 9: 엔진 2 - 산출물(표준화 + 개인화)
   ════════════════════════════════════════════════════════════ */
export function Slide09() {
  return (
    <SlideSplit
      headline="개발 2: 산출물(표준화 + 개인화)"
      leftTitle="표준화"
      leftContent={
        <div className="flex flex-col gap-5">
          <p className="text-lg text-foreground leading-relaxed">
            다중 모델 레이어 기반 점수 체계: 전 선수 일관 적용
          </p>
          <p className="text-base text-muted-foreground leading-relaxed">
            선수 간 비교, 시점 간 성장 추이 산출 가능
          </p>
          <div className="mt-4 py-3 px-5 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-sm text-primary font-medium">정확도: [정확도]</p>
          </div>
        </div>
      }
      rightTitle="개인화"
      rightContent={
        <div className="flex flex-col gap-5">
          <p className="text-lg text-foreground leading-relaxed">
            코치 라벨 모델(레이어 중 하나) 기반 선수별 피드백
          </p>
          <p className="text-base text-muted-foreground leading-relaxed">
            자동 파인튜닝 루프 적용: 코치 라벨 반영 후 모델 자동 갱신
          </p>
          <div className="mt-4 py-3 px-5 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-sm text-primary font-medium">개인화 주기: [파인튜닝 주기]</p>
          </div>
        </div>
      }
      footnote="[출처/링크]"
    />
  )
}

/* ════════════════════════════════════════════════════════════
   슬라이드 10: 운영 워크플로우(코치 포함)
   ════════════════════════════════════════════════════════════ */
export function Slide10() {
  return (
    <SlideDiagram
      headline="운영 워크플로우(코치 포함)"
      sub="자동 추론 → 코치 검수(사람) → 자동 파인튜닝 순환 구조"
      footnote="[출처/링크]"
    >
      <div className="flex items-center gap-6 md:gap-10">
        <div className="rounded-2xl bg-card border border-primary/30 p-8 flex flex-col items-center gap-4 w-64">
          <Cpu className="w-10 h-10 text-primary" />
          <h3 className="text-xl font-bold text-foreground text-center">자동 추론</h3>
          <p className="text-sm text-muted-foreground text-center">
            모델이 영상/센서 데이터 자동 분석 후 점수 산출
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <ArrowRight className="w-8 h-8 text-primary" />
          <span className="text-xs text-muted-foreground">검수</span>
        </div>
        <div className="rounded-2xl bg-card border border-primary/30 p-8 flex flex-col items-center gap-4 w-64">
          <Users className="w-10 h-10 text-primary" />
          <h3 className="text-xl font-bold text-foreground text-center">코치 검수</h3>
          <p className="text-sm text-muted-foreground text-center">
            코치가 핵심 구간 직접 검수/보정, 라벨 데이터 생성
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <ArrowRight className="w-8 h-8 text-primary" />
          <span className="text-xs text-muted-foreground">반영</span>
        </div>
        <div className="rounded-2xl bg-card border border-primary/30 p-8 flex flex-col items-center gap-4 w-64">
          <Target className="w-10 h-10 text-primary" />
          <h3 className="text-xl font-bold text-foreground text-center">자동 파인튜닝</h3>
          <p className="text-sm text-muted-foreground text-center">
            라벨 반영 후 모델 자동 갱신 및 정확도 향상
          </p>
        </div>
      </div>
    </SlideDiagram>
  )
}

/* ════════════════════════════════════════════════════════════
   슬라이드 11: 사용자 산출물(화면/리포트)
   ════════════════════════════════════════════════════════════ */
export function Slide11() {
  return (
    <SlideGrid
      headline="사용자 산출물(화면/리포트)"
      cells={[
        {
          title: "선수 리포트",
          content:
            "개인별 정량 평가 점수\n시점 간 성장 추이 그래프\n강점/약점 항목별 분류",
        },
        {
          title: "코치 도구",
          content:
            "라벨링 인터페이스\n선수 비교 뷰\n훈련 추천 항목 자동 생성",
        },
        {
          title: "학부모 대시보드",
          content:
            "성장 추이 요약\n평가 점수 열람\n코치 코멘트 확인",
        },
        {
          title: "관리자 대시보드",
          content:
            "전체 선수 통계\n모델 정확도 모니터링\n시스템 운영 현황",
        },
      ]}
      footnote="[출처/링크]"
    />
  )
}

/* ════════════════════════════════════════════════════════════
   슬라이드 12: 본 개발 범위
   ════════════════════════════════════════════════════════════ */
export function Slide12() {
  return (
    <SlideCTA
      headline="2단계 본 개발 범위"
      items={[
        { label: "기술 트랙", value: "실내 트래킹 센서 + AI 모델 고도화(다중 레이어)" },
        { label: "데이터", value: "영상 + 위치/궤적 + 이벤트" },
        { label: "산출물", value: "표준화 점수 + 개인화 피드백 + 리포트/대시보드" },
        { label: "운영", value: "자동 추론 → 코치 검수(핵심 구간) → 자동 파인튜닝" },
        { label: "제외 범위", value: "Social/Mental 정의, 앱 배포 등은 별도 R&R" },
      ]}
      footnote="세부 항목은 운영 환경에 맞춰 확정"
    />
  )
}

/* ════════════════════════════════════════════════════════════
   슬라이드 13: 진행 방식 / 마일스톤
   ════════════════════════════════════════════════════════════ */
export function Slide13() {
  return (
    <SlideCTA
      headline="진행 방식 (단계형)"
      items={[
        { label: "1단계", value: "현장 셋업 + 데이터 수집 체계 확정" },
        { label: "2단계", value: "위치 데이터 기반 기본 지표/리포트 초안" },
        { label: "3단계", value: "시뮬레이션 데이터로 모델 고도화 + 라벨 루프 안정화" },
        { label: "4단계", value: "운영 자동화 + 모니터링 고도화" },
      ]}
      footnote="각 단계 종료 시 산출물 기준으로 상태 공유"
    />
  )
}

/* ════════════════════════════════════════════════════════════
   슬라이드 14: 2단계 통합 구조
   ════════════════════════════════════════════════════════════ */
export function Slide14() {
  return (
    <SlideGrid
      headline="2단계 통합 구조"
      cells={[
        {
          title: "데이터 수집",
          content:
            "기존 다중 카메라 영상 유지\n실내 측위 센서 추가\n위치/궤적/이벤트 데이터 통합 수집",
        },
        {
          title: "AI 모델",
          content:
            "다중 모델 레이어 구조\n센서 + 물리 엔진 합성 데이터 학습\n표준화 점수 + 개인화 피드백 동시 산출",
        },
        {
          title: "운영 루프",
          content:
            "자동 추론 후 코치 핵심 구간 검수\n라벨 반영 자동 파인튜닝\n정확도 지속 향상 순환 구조",
        },
        {
          title: "산출물",
          content:
            "선수 리포트(점수/성장 추이)\n코치 도구(라벨링/비교)\n학부모 대시보드\n관리자 모니터링",
        },
      ]}
      footnote="세부 항목은 운영 환경에 맞춰 확정"
    />
  )
}
