"use client"

import { useState } from "react"
import { FileText, X } from "lucide-react"

const speakerNotes: Record<number, { title: string; points: string[] }> = {
  0: {
    title: "개요",
    points: [
      "목적: 2단계 본 개발 구성/산출물 공유",
      "범위: 정량 평가 + 개인화 코칭 플랫폼(운영 워크플로우 포함)",
      "개발 2가지: 실내 트래킹 센서(GNSS 불필요, 로컬 기반) + AI 모델 고도화(다중 모델 레이어)",
      "1단계 기반: 카메라 기반 자세 인식 + 코치 라벨링 루프 유지",
      "오늘 확인: 설치 환경/데이터 정책/운영 프로세스/지표 정의",
    ],
  },
  1: {
    title: "문제 정의",
    points: [
      "평가 주관성: 코치별/세션별 결과 상이",
      "비교 곤란: 지점 간, 시기 간 성장 추적 불가",
      "맥락 부족: 위치, 공간 활용, 전술 데이터 미수집",
      "학부모/운영 관점에서 일관된 보고 형태 필요",
      "핵심 요구: 납득 가능한 정량 지표 + 운영 가능 워크플로우",
    ],
  },
  2: {
    title: "1단계 기반(완료 범위)",
    points: [
      "데이터 수집: 다중 카메라 촬영",
      "모델: 자세 인식 기반 동작 점수화",
      "운영: 코치 라벨링 반자동 파이프라인",
      "개선: 라벨 데이터 기반 파인튜닝 루프",
      "산출물: 점수/클립/기본 리포트",
      "한계 인지: 2D 영상만 가능, 경기 맥락 데이터 부재",
    ],
  },
  3: {
    title: "1단계 한계 및 확장 필요성",
    points: [
      "카메라 한계: 2차원 영상만 확보",
      "누락: 3차원 위치, 공 궤적, 팀 간격/전술 데이터",
      "모델 한계: 실촬영 데이터만으로 학습량 제한",
      "확장 방향: 경기 맥락 + 학습 데이터 품질 동시 개선",
      "1단계 인프라(카메라/라벨링)는 그대로 유지",
    ],
  },
  4: {
    title: "2단계 구성",
    points: [
      "개발 1: 실내 트래킹 센서 → GNSS 불필요, 로컬 기반 정밀 측위로 경기 맥락 확보",
      "개발 2: AI 모델 고도화 → 센서 데이터 + 물리 엔진 합성 데이터, 다중 모델 레이어",
      "두 개발 축은 독립 운용, 최종 산출물은 통합 평가 체계",
      "기존 카메라 + 라벨링 인프라 병행 유지",
    ],
  },
  5: {
    title: "개발 1: 실내 트래킹 센서(구성)",
    points: [
      "입력: GNSS 불필요, 로컬 기반 정밀 측위 센서(웨어러블)",
      "기술 계열: 산업용 정밀 측위 기술 기반(성능은 현장 검증 후 확정)",
      "처리: 실내 안테나 인프라 + 동기화 + 선수 식별 + 위치 추정",
      "출력: 개인별 위치/궤적/속도/이벤트",
      "설치 범위: [설치 범위] (현장 조건 기반 확정)",
      "정확도 정의/검증: 운영 환경 기준으로 지표화",
    ],
  },
  6: {
    title: "개발 1: 활용(경기 분석)",
    points: [
      "팀 전술: 히트맵, 간격, 라인 유지, 압박/전환 지표",
      "선수 평가: 움직임량, 공간 활용, 포지셔닝 패턴",
      "산출 형태: 경기 후 분석 리포트/대시보드",
      "장기 확장(로드맵, 범위 밖): 실시간 코칭, 센서 부착 부위 확대(발목·손·등)",
      "지표 정의: 팀/개인 지표를 먼저 고정 후 확장",
    ],
  },
  7: {
    title: "개발 2: AI 모델 고도화(구성)",
    points: [
      "입력: 센서 데이터 + 물리 엔진 합성 데이터",
      "처리: 다중 모델 레이어 구조(기존 코치 라벨 모델 포함)",
      "출력: 자세/공 인식 모델 정확도 향상(목표: [정확도])",
      "핵심: 코치 라벨 모델은 다중 레이어 중 하나로 동작",
      "목적: 단일 모델이 아닌 레이어 조합으로 정확도 고도화",
    ],
  },
  8: {
    title: "개발 2: 산출물(표준화 + 개인화)",
    points: [
      "표준화: 다중 모델 레이어 기반 점수 체계 → 비교/추이 가능",
      "개인화: 코치 라벨 모델(레이어 중 하나) → 맞춤 코칭 인사이트",
      "자동 파인튜닝 루프 → 시간 경과에 따라 정확도 향상",
      "개인화 주기: [파인튜닝 주기] (운영 지표로 관리)",
    ],
  },
  9: {
    title: "운영 워크플로우(코치 포함)",
    points: [
      "자동 추론: 모델이 영상/센서 데이터 분석 후 라벨/이벤트 후보 생성",
      "코치 검수: 코치가 핵심 구간 직접 검수/보정(전수 아님), 라벨 데이터 → 모델 학습 반영",
      "자동 파인튜닝: 학습 → 검증 → 배포 루프",
      "품질 관리: 데이터/모델 버전 관리, 평가 리포트",
      "운영 지표: 라벨 처리량, 재학습 주기, 오류/누락율",
    ],
  },
  10: {
    title: "사용자 산출물(화면/리포트)",
    points: [
      "선수 리포트: 표준 점수, 성장 추이, 개인 피드백",
      "코치 도구: 라벨링 화면, 클립 리뷰, 훈련 과제 태그",
      "학부모 화면: 성장 추이 요약 + 코치 코멘트(단순)",
      "관리자 화면: 운영 현황 + 모델 성능 모니터링",
      "MVP 범위부터 고정 후 단계적으로 확장",
    ],
  },
  11: {
    title: "2단계 본 개발 범위",
    points: [
      "목표: 두 엔진을 평가/리포트 파이프라인으로 통합",
      "개발 1: GNSS 불필요 로컬 센서/안테나 셋업, 식별/동기화, 궤적 데이터",
      "개발 2: 센서+합성 데이터 기반 다중 모델 레이어, 학습/검증 자동화",
      "공통: 점수 산출 로직, 리포트/대시보드, 운영 모니터링",
      "범위 외: Social/Mental 정의, 최종 앱 배포 등은 별도 R&R",
    ],
  },
  12: {
    title: "진행 방식 (단계형)",
    points: [
      "1단계: 현장 셋업 + 데이터 수집 체계 확정",
      "2단계: 위치 데이터 기반 기본 지표/리포트 초안",
      "3단계: 시뮬레이션 데이터로 모델 고도화 + 라벨 루프 안정화",
      "4단계: 운영 자동화 + 모니터링 고도화",
      "각 단계 종료: 산출물 기준으로 상태 공유",
      "참고: 착수 전 실무 조율 사항은 별도 문서로 공유 예정",
    ],
  },
  13: {
    title: "2단계 통합 구조",
    points: [
      "2단계 전체 구조를 네 가지 축으로 정리합니다",
      "데이터 수집: 기존 카메라 유지 + 실내 측위 센서 추가 → 위치/궤적 데이터 확보",
      "AI 모델: 다중 모델 레이어 구조로 표준화 점수와 개인화 피드백 동시 산출",
      "운영 루프: 자동 추론 → 코치 검수 → 자동 파인튜닝 순환 구조",
      "산출물: 선수/코치/학부모/관리자 각각에 맞는 리포트와 도구 제공",
      "이상 2단계 본 개발 전체 구성입니다. 세부 일정은 현장 환경 확인 후 확정합니다",
    ],
  },
}

export function SpeakerNotesPanel({ currentSlide }: { currentSlide: number }) {
  const [isOpen, setIsOpen] = useState(false)
  const note = speakerNotes[currentSlide]

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-[60] p-3 rounded-xl bg-card border border-border hover:bg-secondary transition-colors"
        aria-label="발표자 노트 열기"
      >
        <FileText className="w-5 h-5 text-muted-foreground" />
      </button>
    )
  }

  return (
    <div className="fixed top-0 right-0 z-[60] w-[420px] h-full bg-card border-l border-border p-8 overflow-y-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-bold text-foreground">발표자 노트</h2>
        <button
          onClick={() => setIsOpen(false)}
          className="p-2 rounded-lg hover:bg-secondary transition-colors"
          aria-label="닫기"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>
      {note && (
        <div className="flex flex-col gap-6">
          <div>
            <span className="text-xs text-primary font-mono">
              {String(currentSlide + 1).padStart(2, "0")}
            </span>
            <h3 className="text-xl font-bold text-foreground mt-1">{note.title}</h3>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-3">설명 포인트</h4>
            <ul className="flex flex-col gap-3">
              {note.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-primary font-mono text-xs mt-1 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-foreground leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
