import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';
import { formatScore, type Analysis } from '../analysis';
import { BRAND_NAME, PDF_FILENAME_PREFIX } from '../brand';

const PDF_MARGIN = 8;
const FOOTER_SPACE = 17;

function capturePage(element: HTMLElement) {
  return html2canvas(element, {
    scale: 2,
    backgroundColor: '#0a0a0a',
    logging: false,
    windowWidth: 1024,
    windowHeight: 1200,
    scrollX: 0,
    scrollY: 0,
    onclone: (_document, target) => {
      const layout = target.closest<HTMLElement>('[data-pdf-layout]');
      if (!layout) return;

      // The print layout is off-screen in the app. Move only the cloned page into view.
      layout.style.position = 'absolute';
      layout.style.left = '0';
      for (const sibling of [...layout.children]) {
        if (sibling !== target) sibling.remove();
      }
    },
  });
}

export async function downloadAssessmentPdf(analysis: Analysis, reportPage: HTMLElement, certificatePage: HTMLElement) {
  await document.fonts.ready;
  const pdf = new jsPDF({ orientation: 'portrait', format: 'a4', unit: 'mm', compress: true });
  pdf.setProperties({
    title: `${BRAND_NAME} | Bewertung und Urkunde`,
    subject: 'Bewertungsbericht und fiktives Zertifikat',
    author: BRAND_NAME,
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const contentWidth = pageWidth - 2 * PDF_MARGIN;
  const contentHeight = pageHeight - 2 * PDF_MARGIN - FOOTER_SPACE;
  const pages = [
    { element: reportPage, label: 'Bewertung' },
    { element: certificatePage, label: 'Urkunde' },
  ];

  for (const [index, page] of pages.entries()) {
    const canvas = await capturePage(page.element);
    try {
      if (!canvas.width || !canvas.height) throw new Error('PDF page has no renderable content');
      if (index > 0) pdf.addPage('a4', 'portrait');

      const scale = Math.min(contentWidth / canvas.width, contentHeight / canvas.height);
      const width = canvas.width * scale;
      const height = canvas.height * scale;
      pdf.addImage(canvas, 'PNG', (pageWidth - width) / 2, PDF_MARGIN + (contentHeight - height) / 2, width, height, undefined, 'FAST');
    } finally {
      canvas.width = 0;
      canvas.height = 0;
    }

    pdf.setDrawColor(212, 175, 55);
    pdf.line(PDF_MARGIN, pageHeight - 21, pageWidth - PDF_MARGIN, pageHeight - 21);
    pdf.setFontSize(10);
    pdf.setTextColor(48, 48, 48);
    pdf.text(`Seite ${index + 1} von ${pages.length}: ${page.label}`, PDF_MARGIN, pageHeight - 15);
    pdf.text(`Gesamtnote: ${formatScore(analysis.overallScore)} / 10`, pageWidth - PDF_MARGIN, pageHeight - 15, { align: 'right' });
    pdf.setFontSize(8);
    pdf.setTextColor(90, 90, 90);
    pdf.text('Fiktives Dokument – nur zur Unterhaltung.', pageWidth / 2, pageHeight - 8, { align: 'center' });
  }

  const safeName = [...analysis.name.replace(/[<>:"/\\|?*]/g, '').replace(/\s+/g, '_')].slice(0, 40).join('') || 'Demo';
  pdf.save(`${PDF_FILENAME_PREFIX}_${safeName}_Bewertung-und-Urkunde.pdf`);
}
