import { Landmark } from 'lucide-react';
import { analysisMetrics, formatScore, type Analysis } from '../analysis';
import { BRAND_NAME, PDF_FILENAME_PREFIX } from '../brand';

export function Certificate({ analysis }: { analysis: Analysis }) {
  return (
    <article aria-label="Urkunde" className="@container relative isolate overflow-hidden border-8 border-[#d4af37] bg-[#0a0a0a] text-white sm:border-[14px]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #d4af37, #d4af37 2px, transparent 2px, transparent 30px)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-12 -left-6 -z-10 select-none text-[180px] font-black text-amber-400/8">{PDF_FILENAME_PREFIX[0]}</div>

      <div className="px-5 py-8 text-center @lg:px-9 @2xl:px-14 @2xl:py-12">
        <div className="mx-auto mb-6 inline-flex max-w-full items-center gap-3 rounded-3xl border border-amber-400/80 bg-black px-4 py-3 text-amber-300 @lg:px-7">
          <Landmark aria-hidden="true" className="size-6 shrink-0" />
          <span className="min-w-0 wrap-anywhere font-serif text-sm tracking-wide @lg:text-xl">{BRAND_NAME}</span>
        </div>

        <p className="mb-3 text-xs uppercase tracking-[3px] text-amber-300">02 / Urkunde</p>
        <h2 className="mb-7 wrap-anywhere font-serif text-2xl uppercase leading-tight @lg:text-4xl @2xl:text-[42px]">Anatomische<br />Meisterleistung</h2>
        <p className="text-sm text-zinc-300">Wird hiermit verliehen an</p>
        <p className="mt-2 wrap-anywhere border-b border-white/10 pb-4 font-serif text-3xl text-amber-100 @lg:text-5xl">{analysis.name}</p>
        <p className="mt-5 font-serif text-2xl text-zinc-100">{analysis.title}</p>

        <ul className="mx-auto my-8 grid max-w-xl grid-cols-1 gap-x-8 gap-y-4 text-left text-sm @lg:grid-cols-2">
          {analysisMetrics.map((metric) => (
            <li key={metric.key} className="flex gap-2">
              <span aria-hidden="true" className="text-amber-400">★</span>
              <span>
                <span className="block font-medium text-amber-100">{metric.detailLabel} · {analysis.scores[metric.key]}/10</span>
                <span className="text-zinc-300">{metric.note}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="grid items-center justify-items-center gap-5 border-t border-white/10 pt-6 @lg:grid-cols-[1fr_1fr_auto]">
          <div className="@lg:justify-self-start @lg:text-left">
            <p className="text-xs uppercase tracking-widest text-zinc-400">Ausgestellt am</p>
            <p className="mt-1 text-zinc-100">{analysis.issuedOn}</p>
          </div>
          <div>
            <p className="font-serif text-xl text-amber-300">Prof. Dr. L. Aurelius</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-zinc-400">Fiktive Signatur</p>
          </div>
          <div className="grid size-28 shrink-0 place-content-center rounded-full border-4 border-double border-amber-400/75">
            <p className="font-mono text-3xl font-bold leading-none text-amber-300"><span data-overall-score>{formatScore(analysis.overallScore)}</span><sup className="ml-0.5 text-xs text-amber-100">/10</sup></p>
            <p className="mt-2 text-[10px] uppercase tracking-wide text-amber-100/80">Gesamtnote</p>
          </div>
        </div>
        <p className="mt-6 text-xs text-zinc-400">Fiktives Zertifikat · Nur zum Spaß und zur Selbstmotivation</p>
      </div>
    </article>
  );
}
