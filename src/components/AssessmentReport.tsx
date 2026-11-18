import { Award } from 'lucide-react';
import { analysisMetrics, formatScore, type Analysis } from '../analysis';

const gradients = {
  length: 'from-blue-400 to-cyan-400',
  girth: 'from-amber-400 to-orange-400',
  shape: 'from-purple-400 to-pink-400',
  aesthetics: 'from-emerald-400 to-teal-400',
};

export function AssessmentReport({ analysis }: { analysis: Analysis }) {
  const scoreColor = analysis.overallScore >= 9 ? 'text-amber-400'
    : analysis.overallScore >= 8 ? 'text-emerald-400'
    : 'text-blue-400';

  return (
    <article className="@container" aria-label="Ausführliche Bewertung">
      <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="mb-1 text-xs font-medium uppercase tracking-[3px] text-amber-400">01 / Bewertungsbericht</p>
          <h2 className="wrap-anywhere font-serif text-3xl @lg:text-5xl">Dein Ergebnis, {analysis.name}</h2>
          <p className="mt-2 text-sm text-zinc-400">Erstellt am {analysis.issuedOn}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className={`font-mono text-4xl font-bold tabular-nums leading-none @lg:text-6xl ${scoreColor}`}>
            <span data-overall-score>{formatScore(analysis.overallScore)}</span>
            <span className="ml-1 text-sm font-medium text-zinc-400">/ 10</span>
          </p>
          <p className="mt-2 text-xs uppercase tracking-wider text-zinc-400">Gesamtnote</p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 @2xl:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <section className="rounded-3xl border border-white/10 bg-zinc-900/70 p-6 @lg:p-8">
          <p className="text-xs uppercase tracking-widest text-zinc-400">Dein Titel</p>
          <h3 className="mt-1 font-serif text-3xl leading-tight text-amber-200">{analysis.title}</h3>
          <p className="my-6 text-base leading-relaxed text-zinc-200">{analysis.description}</p>
          <ul className="space-y-4 text-sm leading-relaxed text-zinc-200">
            {analysisMetrics.map((metric) => (
              <li key={metric.key} className="flex items-baseline gap-3">
                <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-amber-400" />
                <span><strong className="font-medium text-white">{metric.detailLabel}: {analysis.scores[metric.key]}/10</strong> – {metric.note}</span>
              </li>
            ))}
            <li className="flex items-baseline gap-3">
              <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-amber-400" />
              <span>Pflege: Professionell und gepflegt</span>
            </li>
            <li className="flex items-baseline gap-3">
              <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-amber-400" />
              <span>Gesamteindruck: Stärkt das Selbstbewusstsein</span>
            </li>
          </ul>
        </section>

        <div className="space-y-5">
          <section className="rounded-3xl border border-white/10 bg-zinc-900 p-6 @lg:p-7">
            <h3 className="mb-5 text-xs uppercase tracking-widest text-zinc-300">Detaillierte Bewertung</h3>
            <ul className="space-y-4">
              {analysisMetrics.map((metric) => (
                <li key={metric.key} className="grid grid-cols-[4.5rem_minmax(0,1fr)_1.75rem] items-center gap-3">
                  <span className="text-sm text-zinc-300">{metric.label}</span>
                  <span aria-hidden="true" className="h-2.5 overflow-hidden rounded-full bg-white/10">
                    <span className={`block h-full rounded-full bg-linear-to-r ${gradients[metric.key]}`} style={{ width: `${analysis.scores[metric.key] * 10}%` }} />
                  </span>
                  <span className="text-right font-mono text-lg tabular-nums">{analysis.scores[metric.key]}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl border border-amber-400/25 bg-linear-to-br from-zinc-900 to-zinc-950 p-6 text-center @lg:p-7">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-amber-400/10">
              <Award aria-hidden="true" className="size-6 text-amber-400" />
            </div>
            <h3 className="font-medium text-amber-100">Eine Note für beide Seiten</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">Die Gesamtnote ist der gleich gewichtete Durchschnitt der vier Einzelnoten, gerundet auf eine Nachkommastelle.</p>
            <p className="mt-3 text-xs text-zinc-400">Simulierte Bewertung, keine medizinische Einschätzung.</p>
          </section>
        </div>
      </div>
    </article>
  );
}
