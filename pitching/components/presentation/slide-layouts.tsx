import type { ReactNode } from "react"

/* ─── Full-center: big headline + optional sub ─── */
export function SlideCenter({
  headline,
  sub,
  accent,
  footnote,
  children,
}: {
  headline: string
  sub?: string
  accent?: boolean
  footnote?: string
  children?: ReactNode
}) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-16 py-20">
      <h1
        className={`text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-center text-balance leading-tight ${
          accent ? "text-primary" : "text-foreground"
        }`}
      >
        {headline}
      </h1>
      {sub && (
        <p className="mt-6 text-xl md:text-2xl text-muted-foreground text-center max-w-3xl leading-relaxed whitespace-pre-line">
          {sub}
        </p>
      )}
      {children && <div className="mt-10">{children}</div>}
      {footnote && (
        <p className="absolute bottom-16 left-16 text-xs text-muted-foreground/60">{footnote}</p>
      )}
    </div>
  )
}

/* ─── Left-heavy: headline left, visual right ─── */
export function SlideLeftHeavy({
  headline,
  sub,
  accentWord,
  visual,
  footnote,
}: {
  headline: string
  sub?: string
  accentWord?: string
  visual?: ReactNode
  footnote?: string
}) {
  const parts = accentWord ? headline.split(accentWord) : [headline]
  return (
    <div className="w-full h-full flex items-center px-16 py-20 gap-12">
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight text-balance text-foreground">
          {accentWord
            ? parts.map((part, i) => (
                <span key={i}>
                  {part}
                  {i < parts.length - 1 && <span className="text-primary">{accentWord}</span>}
                </span>
              ))
            : headline}
        </h1>
        {sub && (
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed whitespace-pre-line">
            {sub}
          </p>
        )}
      </div>
      {visual && <div className="flex-1 flex items-center justify-center">{visual}</div>}
      {footnote && (
        <p className="absolute bottom-16 left-16 text-xs text-muted-foreground/60">{footnote}</p>
      )}
    </div>
  )
}

/* ─── Two-column split ─── */
export function SlideSplit({
  leftTitle,
  leftContent,
  rightTitle,
  rightContent,
  headline,
  footnote,
}: {
  leftTitle: string
  leftContent: ReactNode
  rightTitle: string
  rightContent: ReactNode
  headline?: string
  footnote?: string
}) {
  return (
    <div className="w-full h-full flex flex-col px-16 py-20">
      {headline && (
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground mb-12 text-balance">
          {headline}
        </h1>
      )}
      <div className="flex-1 flex gap-8 items-stretch">
        <div className="flex-1 rounded-2xl bg-card p-10 flex flex-col border border-border">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">{leftTitle}</h2>
          <div className="flex-1 flex flex-col justify-center">{leftContent}</div>
        </div>
        <div className="flex-1 rounded-2xl bg-card p-10 flex flex-col border border-border">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">{rightTitle}</h2>
          <div className="flex-1 flex flex-col justify-center">{rightContent}</div>
        </div>
      </div>
      {footnote && (
        <p className="absolute bottom-16 left-16 text-xs text-muted-foreground/60">{footnote}</p>
      )}
    </div>
  )
}

/* ─── Statement slide: one big sentence ─── */
export function SlideStatement({
  statement,
  attribution,
}: {
  statement: string
  attribution?: string
}) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-20 py-20">
      <p className="text-3xl md:text-5xl lg:text-6xl font-bold text-center text-balance leading-snug text-foreground">
        {statement}
      </p>
      {attribution && (
        <p className="mt-8 text-lg text-muted-foreground">{attribution}</p>
      )}
    </div>
  )
}

/* ─── Diagram slide: headline + diagram area ─── */
export function SlideDiagram({
  headline,
  sub,
  children,
  footnote,
}: {
  headline: string
  sub?: string
  children: ReactNode
  footnote?: string
}) {
  return (
    <div className="w-full h-full flex flex-col px-16 py-20">
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground mb-4 text-balance">
        {headline}
      </h1>
      {sub && (
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
          {sub}
        </p>
      )}
      <div className="flex-1 flex items-center justify-center">{children}</div>
      {footnote && (
        <p className="absolute bottom-16 left-16 text-xs text-muted-foreground/60">{footnote}</p>
      )}
    </div>
  )
}

/* ─── Grid slide: headline + 4-cell grid ─── */
export function SlideGrid({
  headline,
  cells,
  footnote,
}: {
  headline: string
  cells: { title: string; content: string }[]
  footnote?: string
}) {
  return (
    <div className="w-full h-full flex flex-col px-16 py-20">
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground mb-10 text-balance">
        {headline}
      </h1>
      <div className="flex-1 grid grid-cols-2 gap-6">
        {cells.map((cell, i) => (
          <div key={i} className="rounded-2xl bg-card border border-border p-8 flex flex-col">
            <h3 className="text-xl md:text-2xl font-bold text-primary mb-4">{cell.title}</h3>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed whitespace-pre-line">{cell.content}</p>
          </div>
        ))}
      </div>
      {footnote && (
        <p className="absolute bottom-16 left-16 text-xs text-muted-foreground/60">{footnote}</p>
      )}
    </div>
  )
}

/* ─── CTA / Request slide ─── */
export function SlideCTA({
  headline,
  items,
  footnote,
}: {
  headline: string
  items: { label: string; value: string }[]
  footnote?: string
}) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-16 py-20">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-primary mb-16 text-center text-balance">
        {headline}
      </h1>
      <div className="flex flex-col gap-6 w-full max-w-2xl">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-6 py-4 border-b border-border last:border-0">
            <span className="text-lg md:text-xl font-bold text-foreground min-w-[140px]">{item.label}</span>
            <span className="text-lg md:text-xl text-muted-foreground">{item.value}</span>
          </div>
        ))}
      </div>
      {footnote && (
        <p className="absolute bottom-16 left-16 text-xs text-muted-foreground/60">{footnote}</p>
      )}
    </div>
  )
}

/* ─── Visual placeholder: dashed-border area for future images/diagrams ─── */
export function VisualPlaceholder({ label }: { label: string }) {
  return (
    <div className="w-full h-full min-h-[200px] rounded-2xl border-2 border-dashed border-border/50 flex items-center justify-center">
      <span className="text-sm text-muted-foreground/40">{label}</span>
    </div>
  )
}
