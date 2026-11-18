export const analysisMetrics = [
  { key: 'length', label: 'Länge', detailLabel: 'Länge & Proportionen', note: 'Harmonische Proportionen' },
  { key: 'girth', label: 'Umfang', detailLabel: 'Umfang & Volumen', note: 'Beeindruckende Fülle und Präsenz' },
  { key: 'shape', label: 'Form', detailLabel: 'Form & Krümmung', note: 'Natürliche, angenehme Biegung' },
  { key: 'aesthetics', label: 'Ästhetik', detailLabel: 'Ästhetik & Details', note: 'Harmonische Kopfform und Textur' },
] as const;

type ScoreKey = (typeof analysisMetrics)[number]['key'];
export type Scores = Readonly<Record<ScoreKey, number>>;

export interface Analysis {
  readonly name: string;
  readonly issuedOn: string;
  readonly scores: Scores;
  readonly overallScore: number;
  readonly title: string;
  readonly description: string;
}

const titles = [
  'Der Goldene Titan',
  'Elite Harmoniker',
  'Perfekter Virtuose',
  'Majestätischer Athlet',
  'Souveräner Meister',
];

const descriptions = [
  'Eine beeindruckende Kombination aus Proportionen und Ästhetik. Deine Anatomie strahlt natürliche Eleganz und Funktionalität aus.',
  'Harmonische Proportionen und eine natürliche Form ergeben ein stimmiges Gesamtbild.',
  'Ausgewogene Symmetrie und kraftvolle Präsenz. Das Zusammenspiel der vier Merkmale prägt dein Ergebnis.',
  'Ausgezeichnete Oberflächenmerkmale und eine markante Form. Eine Kombination mit eigenem Charakter.',
];

const scoreFormatter = new Intl.NumberFormat('de-DE', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});
const dateFormatter = new Intl.DateTimeFormat('de-DE', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export function calculateOverallScore(scores: Scores): number {
  const total = analysisMetrics.reduce((sum, metric) => sum + scores[metric.key], 0);
  return Math.round(total * 10 / analysisMetrics.length) / 10;
}

export function formatScore(score: number): string {
  return scoreFormatter.format(score);
}

export function generateDemoAnalysis(name: string, random = Math.random, issuedAt = new Date()): Analysis {
  const randomScore = (min: number, max: number) => min + Math.floor(random() * (max - min + 1));
  const scores: Scores = {
    length: randomScore(7, 9),
    girth: randomScore(8, 10),
    shape: randomScore(7, 10),
    aesthetics: randomScore(8, 10),
  };

  return {
    name: name.trim(),
    issuedOn: dateFormatter.format(issuedAt),
    scores,
    overallScore: calculateOverallScore(scores),
    title: titles[Math.floor(random() * titles.length)],
    description: descriptions[Math.floor(random() * descriptions.length)],
  };
}
