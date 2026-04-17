import React from "react"
import type { Metadata } from 'next'
import { Noto_Sans_KR, Geist_Mono } from 'next/font/google'

import './globals.css'

const _notoSansKR = Noto_Sans_KR({ subsets: ['latin'], weight: ['300', '400', '500', '700', '900'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '레전드 아카데미 | 2단계 본 개발',
  description: '레전드 아카데미 2단계 본 개발 개요 프레젠테이션',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className="font-sans antialiased overflow-hidden">{children}</body>
    </html>
  )
}
