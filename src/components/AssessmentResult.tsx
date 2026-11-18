import { useRef, useState } from 'react';
import { ArrowDown, Download, RefreshCw } from 'lucide-react';
import type { Analysis } from '../analysis';
import { BRAND_NAME } from '../brand';
import { downloadAssessmentPdf } from '../utils/assessmentPdf';
import { AssessmentReport } from './AssessmentReport';
import { Certificate } from './Certificate';

export function AssessmentResult({ analysis, onRestart }: { analysis: Analysis; onRestart: () => void }) {
  const reportPage = useRef<HTMLDivElement>(null);
  const certificatePage = useRef<HTMLDivElement>(null);
  const [exportState, setExportState] = useState<'idle' | 'exporting' | 'error'>('idle');
  const isExporting = exportState === 'exporting';

  const download = async () => {
    if (isExporting || !reportPage.current || !certificatePage.current) return;
    setExportState('exporting');
    try {
      await downloadAssessmentPdf(analysis, reportPage.current, certificatePage.current);
      setExportState('idle');
    } catch (error) {
      console.error('PDF-Export fehlgeschlagen', error);
      setExportState('error');
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-8 sm:py-12">
      <AssessmentReport analysis={analysis} />

      <section id="pdf-download" className="mt-8 scroll-mt-44 rounded-3xl border border-amber-400/25 bg-zinc-900 p-5 sm:p-6" aria-label="PDF-Download">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <p className="font-medium text-amber-100">Dein Ergebnis in einem Dokument</p>
            <p className="mt-1 text-sm text-zinc-300">Zwei Seiten: ausführliche Bewertung und Urkunde.</p>
          </div>
          <button
            type="button"
            onClick={download}
            disabled={isExporting}
            aria-busy={isExporting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-400 px-5 py-3 text-center text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-300 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
          >
            {isExporting ? <RefreshCw aria-hidden="true" className="size-5 shrink-0 animate-spin" /> : <Download aria-hidden="true" className="size-5 shrink-0" />}
            {isExporting ? 'PDF wird erstellt …' : 'Bewertung & Urkunde als PDF herunterladen'}
          </button>
        </div>
        {exportState === 'error' && <p role="alert" className="mt-4 text-sm text-rose-300">Das PDF konnte nicht erstellt werden. Bitte versuche es erneut.</p>}
      </section>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm">
        <button type="button" onClick={onRestart} disabled={isExporting} className="rounded-2xl border border-white/25 px-5 py-3 hover:bg-white/5 disabled:opacity-50">Neu starten</button>
        <a href="#urkunde" className="inline-flex items-center gap-2 rounded-2xl px-3 py-3 text-amber-300 hover:text-amber-100">Zur Urkunde <ArrowDown aria-hidden="true" className="size-4" /></a>
      </div>

      <section id="urkunde" className="mt-9 scroll-mt-44">
        <Certificate analysis={analysis} />
        <div className="mt-4 text-right text-sm"><a href="#pdf-download" className="text-amber-300 hover:text-amber-100">Zum PDF-Download</a></div>
      </section>

      <div data-pdf-layout aria-hidden="true" className="pointer-events-none fixed top-0 left-[-10000px] w-[820px] text-white">
        <div ref={reportPage} className="bg-zinc-950 p-10">
          <p className="mb-8 border-b border-amber-400/30 pb-4 font-serif text-2xl text-amber-300">{BRAND_NAME}</p>
          <AssessmentReport analysis={analysis} />
        </div>
        <div ref={certificatePage}>
          <Certificate analysis={analysis} />
        </div>
      </div>
    </div>
  );
}
