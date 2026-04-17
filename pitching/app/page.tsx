"use client"

import { useState } from "react"
import { PresentationEngine } from "@/components/presentation/presentation-engine"
import { SpeakerNotesPanel } from "@/components/presentation/speaker-notes-panel"
import {
  Slide01,
  Slide02,
  Slide03,
  Slide04,
  Slide05,
  Slide06,
  Slide07,
  Slide08,
  Slide09,
  Slide10,
  Slide11,
  Slide12,
  Slide13,
  Slide14,
} from "@/components/presentation/slides"

const TOTAL_SLIDES = 14

export default function Page() {
  const [currentSlide, setCurrentSlide] = useState(0)

  return (
    <main className="w-screen h-screen overflow-hidden bg-background">
      <SpeakerNotesPanel currentSlide={currentSlide} />
      <PresentationEngine totalSlides={TOTAL_SLIDES} onSlideChange={setCurrentSlide}>
        {[
          <Slide01 key="01" />,
          <Slide02 key="02" />,
          <Slide03 key="03" />,
          <Slide04 key="04" />,
          <Slide05 key="05" />,
          <Slide06 key="06" />,
          <Slide07 key="07" />,
          <Slide08 key="08" />,
          <Slide09 key="09" />,
          <Slide10 key="10" />,
          <Slide11 key="11" />,
          <Slide12 key="12" />,
          <Slide13 key="13" />,
          <Slide14 key="14" />,
        ]}
      </PresentationEngine>
    </main>
  )
}
