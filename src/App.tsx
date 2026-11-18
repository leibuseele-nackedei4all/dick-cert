import React, { useState, useRef } from 'react';
import { Upload, Award, Shield, Star, Download, RefreshCw, CheckCircle } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';

const BRAND_NAME = '*Nacke*Dei*-Proffessionell-Certification';
const PDF_FILENAME_PREFIX = BRAND_NAME.replace(/\*/g, '');

interface Analysis {
  overallScore: number;
  length: number;
  girth: number;
  shape: number;
  aesthetics: number;
  title: string;
  description: string;
  details: string[];
}

const App: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [showCert, setShowCert] = useState<boolean>(false);
  const certRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const titles = [
    "Der Goldene Titan",
    "Elite Harmoniker",
    "Perfekter Virtuose",
    "Majestätischer Athlet",
    "Souveräner Meister"
  ];

  const generateAnalysis = (): Analysis => {
    const overall = Math.floor(Math.random() * 3) + 8; // 8-10
    const lengthScore = Math.floor(Math.random() * 3) + 7;
    const girthScore = Math.floor(Math.random() * 3) + 8;
    const shapeScore = Math.floor(Math.random() * 4) + 7;
    const aestheticsScore = Math.floor(Math.random() * 3) + 8;

    const title = titles[Math.floor(Math.random() * titles.length)];

    const descriptions = [
      "Eine beeindruckende Kombination aus Proportionen und Ästhetik. Deine Anatomie strahlt natürliche Eleganz und Funktionalität aus.",
      "Hervorragende Maße mit einer natürlichen Krümmung, die besondere Empfindungszonen optimal anspricht. Ein wahres Meisterwerk der Natur.",
      "Perfekte Symmetrie und kraftvolle Präsenz. Ideal für höchste Zufriedenheit in allen Situationen.",
      "Ausgezeichnete Oberflächenmerkmale und eine starke, selbstbewusste Form. Dein Merkmal verdient höchste Anerkennung."
    ];

    return {
      overallScore: overall,
      length: lengthScore,
      girth: girthScore,
      shape: shapeScore,
      aesthetics: aestheticsScore,
      title,
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      details: [
        `Länge & Proportionen: ${lengthScore}/10 - Exzellente Maße im oberen Bereich`,
        `Umfang & Volumen: ${girthScore}/10 - Beeindruckende Fülle und Präsenz`,
        `Form & Krümmung: ${shapeScore}/10 - Natürliche, angenehme Biegung`,
        `Ästhetik & Details: ${aestheticsScore}/10 - Harmonische Kopfform und Textur`,
        "Pflege: Professionell und gepflegt",
        "Gesamteindruck: Stärkt das Selbstbewusstsein enorm"
      ]
    };
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = () => {
    if (!name || !image) {
      alert('Bitte gib deinen Namen ein und lade ein Bild hoch!');
      return;
    }

    setIsAnalyzing(true);

    // Simulate Grok AI processing
    setTimeout(() => {
      const newAnalysis = generateAnalysis();
      setAnalysis(newAnalysis);
      setIsAnalyzing(false);
      setStep(3);
    }, 2800);
  };

  const downloadPDF = async () => {
    if (!certRef.current || !analysis || !name) return;

    const canvas = await html2canvas(certRef.current, {
      scale: 2,
      backgroundColor: '#0a0a0a'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

    const finalWidth = imgWidth * ratio;
    const finalHeight = imgHeight * ratio;

    const x = (pdfWidth - finalWidth) / 2;
    const y = (pdfHeight - finalHeight) / 2 - 5;

    pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);

    pdf.setProperties({ title: BRAND_NAME });
    pdf.setFontSize(10);
    pdf.setTextColor(150, 150, 150);
    pdf.text(
      `Fiktives Zertifikat • Nur zum Spaß und zur Selbstmotivation • ${BRAND_NAME}`,
      pdfWidth / 2,
      pdfHeight - 15,
      { align: 'center', maxWidth: pdfWidth - 40 }
    );

    pdf.save(`${PDF_FILENAME_PREFIX}_${name.replace(/\s+/g, '_')}.pdf`);
  };

  const resetApp = () => {
    setStep(1);
    setName('');
    setEmail('');
    setImage(null);
    setAnalysis(null);
    setShowCert(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 9) return 'text-amber-400';
    if (score >= 8) return 'text-emerald-400';
    return 'text-blue-400';
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-x-clip">
      {/* Navbar */}
      <nav className="border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl sticky top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-8 sm:py-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="w-9 h-9 shrink-0 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-2xl flex items-center justify-center">
              <Award className="w-5 h-5 text-zinc-950" />
            </div>
            <div className="min-w-0">
              <div className="wrap-anywhere font-serif text-lg leading-tight tracking-tighter font-bold text-amber-300 sm:text-2xl lg:text-3xl">{BRAND_NAME}</div>
              <div className="text-[10px] text-white/40 -mt-1">ANATOMIE • EXPERTISE</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:gap-x-8 sm:text-sm">
            <a href="#how" className="hover:text-amber-400 transition-colors">Wie es funktioniert</a>
            <a href="#pricing" className="hover:text-amber-400 transition-colors">Preise</a>
            <button
              onClick={() => {setStep(1); window.scrollTo({top:0,behavior:'smooth'})}}
              className="px-3 py-1.5 sm:px-6 sm:py-2.5 bg-white text-zinc-900 rounded-2xl font-medium flex items-center gap-2 hover:bg-amber-300 transition-all active:scale-95"
            >
              <Star className="w-4 h-4" /> JETZT BEWERTEN
            </button>
          </div>
        </div>
      </nav>

      <div>
        {/* HERO */}
        {step === 1 && (
          <div className="max-w-5xl mx-auto px-6 pt-16 pb-24 text-center">
            <div className="inline-flex items-center gap-2 bg-white/5 text-amber-400 text-xs tracking-[2px] px-6 py-2 rounded-3xl border border-white/10 mb-6">
              <Shield className="w-4 h-4" /> 100% DISKRET &amp; PRIVAT
            </div>

            <h1 className="text-7xl font-serif tracking-tighter leading-none mb-6">
              Deine <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400">anatomische</span><br />Meisterleistung
            </h1>

            <p className="max-w-lg mx-auto text-xl text-white/70 mb-12">
              Professionelle, KI-gestützte Bewertung deiner intimsten Merkmale.<br />
              Erhalte ein offizielles Zertifikat und booste dein Selbstvertrauen.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setStep(2)}
                className="px-10 py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-zinc-950 font-semibold rounded-3xl text-lg flex items-center gap-3 hover:brightness-110 active:scale-[0.985] transition-all shadow-2xl shadow-amber-500/30"
              >
                <Upload className="w-5 h-5" />
                ANALYSE STARTEN
              </button>

              <button
                onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 border border-white/30 hover:bg-white/5 rounded-3xl text-lg transition-all"
              >
                Mehr erfahren
              </button>
            </div>

            <div className="mt-20 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              {[
                { icon: "📏", label: "Maße & Proportionen" },
                { icon: "🔄", label: "Form & Symmetrie" },
                { icon: "✨", label: "Ästhetik & Pflege" }
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <div className="font-medium">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: INPUT */}
        {step === 2 && (
          <div className="max-w-2xl mx-auto px-6 pt-12">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-2">
                <div className="px-4 py-1 bg-white/10 text-xs font-mono tracking-widest rounded-full">SCHRITT 2 / 4</div>
                <div className="h-px flex-1 bg-white/10"></div>
              </div>
              <h2 className="text-5xl font-serif tracking-tight">Persönliche Bewertung</h2>
              <p className="text-white/60 mt-3">Alles bleibt bei uns. Dein Foto wird nur für die Analyse verwendet.</p>
            </div>

            <div className="space-y-10">
              {/* Personal Info */}
              <div>
                <label className="block text-sm text-white/70 mb-3">DEIN NAME AUF DEM ZERTIFIKAT</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Max Mustermann"
                  className="w-full bg-zinc-900 border border-white/20 focus:border-amber-400 rounded-3xl px-7 py-5 text-xl placeholder:text-white/30 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-3">EMAIL (FÜR ZERTIFIKAT VERSAND SIMULATION)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="deine@email.com"
                  className="w-full bg-zinc-900 border border-white/20 focus:border-amber-400 rounded-3xl px-7 py-5 text-xl placeholder:text-white/30 outline-none"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm text-white/70 mb-3">DEIN FOTO HOCHLADEN</label>

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="group border-2 border-dashed border-white/30 hover:border-amber-400/70 transition-all h-80 rounded-3xl flex flex-col items-center justify-center cursor-pointer bg-zinc-900/50 overflow-hidden relative"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  {image ? (
                    <div className="relative w-full h-full">
                      <img src={image} alt="Upload" className="object-cover w-full h-full opacity-75" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/80 flex items-end justify-center pb-8">
                        <div className="text-center">
                          <CheckCircle className="mx-auto text-emerald-400 w-8 h-8 mb-2" />
                          <p className="font-medium">Bild erfolgreich hochgeladen</p>
                          <p className="text-xs text-white/50">Wird nur zur Analyse genutzt</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-16 h-16 text-white/40 mb-6 group-hover:scale-110 transition-transform" />
                      <p className="text-xl text-white/70 mb-1">Klicke oder ziehe ein Bild hierher</p>
                      <p className="text-white/40 text-sm max-w-[240px] text-center">Diskret verarbeitet • Wird nicht gespeichert</p>
                    </>
                  )}
                </div>
                <p className="text-center text-[10px] text-white/40 mt-4">Nur für Erwachsene • Anonymisiert</p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-5 border border-white/30 rounded-3xl font-medium"
                >
                  ZURÜCK
                </button>
                <button
                  onClick={startAnalysis}
                  disabled={!name || !image}
                  className="flex-1 py-5 bg-gradient-to-r from-amber-400 to-yellow-500 disabled:from-zinc-700 disabled:text-white/40 text-zinc-950 font-semibold rounded-3xl flex items-center justify-center gap-3 hover:brightness-110 transition-all"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      GROK AI ANALYSIERT...
                    </>
                  ) : (
                    <>JETZT ANALYSIEREN <Star className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: ANALYSIS RESULTS */}
        {step === 3 && analysis && (
          <div className="max-w-4xl mx-auto px-8 py-12">
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="uppercase tracking-[3px] text-xs text-amber-400 mb-1">KI-ANALYSE ABGESCHLOSSEN</div>
                <h2 className="text-5xl font-serif">Dein Ergebnis, {name.split(' ')[0]}</h2>
              </div>
              <div className={`text-7xl font-bold font-mono tabular-nums ${getScoreColor(analysis.overallScore)}`}>
                {analysis.overallScore}.<span className="text-4xl align-super">0</span>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
              {/* Main Score Card */}
              <div className="col-span-12 lg:col-span-7 bg-zinc-900/70 border border-white/10 rounded-3xl p-10">
                <div className="flex justify-between mb-8">
                  <div>
                    <div className="uppercase text-xs tracking-widest text-white/50">DEIN TITEL</div>
                    <div className="text-4xl font-serif text-amber-200 leading-none mt-1">{analysis.title}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-emerald-400 text-sm font-medium">SEHR GUT</div>
                  </div>
                </div>

                <p className="text-lg leading-relaxed text-white/80 mb-10">
                  {analysis.description}
                </p>

                <div className="space-y-6">
                  {analysis.details.map((detail, index) => (
                    <div key={index} className="flex gap-4 items-start">
                      <div className="mt-1.5 w-2 h-2 bg-amber-400 rounded-full flex-shrink-0"></div>
                      <div className="text-white/80">{detail}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar Stats */}
              <div className="col-span-12 lg:col-span-5 space-y-6">
                <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8">
                  <div className="text-white/60 text-sm mb-6">DETAILLIERTE BEWERTUNG</div>

                  <div className="space-y-7">
                    {[
                      { label: "Länge", value: analysis.length, color: "from-blue-400 to-cyan-400" },
                      { label: "Umfang", value: analysis.girth, color: "from-amber-400 to-orange-400" },
                      { label: "Form", value: analysis.shape, color: "from-purple-400 to-pink-400" },
                      { label: "Ästhetik", value: analysis.aesthetics, color: "from-emerald-400 to-teal-400" },
                    ].map((metric, idx) => (
                      <div key={idx} className="flex items-center gap-5">
                        <div className="w-20 text-sm text-white/60">{metric.label}</div>
                        <div className="flex-1 h-2.5 bg-white/10 rounded-3xl overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${metric.color}`}
                            style={{ width: `${metric.value * 10}%` }}
                          ></div>
                        </div>
                        <div className="font-mono w-8 text-right text-lg">{metric.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-amber-400/20 rounded-3xl p-8 text-center">
                  <div className="mx-auto w-16 h-16 bg-amber-400/10 rounded-2xl flex items-center justify-center mb-4">
                    <Award className="w-8 h-8 text-amber-400" />
                  </div>
                  <p className="font-medium text-lg">Dieses Ergebnis ist besser als 87% der Einsendungen.</p>
                  <p className="text-xs text-white/40 mt-6">Die Analyse wurde von einer KI durchgeführt, die auf 20 Jahren Erfahrung in der intimen Anatomie basiert.</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-10">
              <button
                onClick={resetApp}
                className="px-8 py-4 border border-white/30 rounded-3xl text-sm"
              >
                NEU STARTEN
              </button>
              <button
                onClick={() => setShowCert(true)}
                className="flex-1 py-4 bg-white text-zinc-950 rounded-3xl font-semibold flex items-center justify-center gap-2 hover:bg-amber-200"
              >
                <Award className="w-5 h-5" />
                OFFIZIELLES ZERTIFIKAT ERSTELLEN
              </button>
            </div>
          </div>
        )}

        {/* CERTIFICATE MODAL */}
        {showCert && analysis && (
          <div className="fixed inset-0 bg-black/90 flex justify-center z-[100] overflow-y-auto p-6">
            <div className="my-auto max-w-4xl w-full">
              {/* Certificate Preview */}
              <div ref={certRef} className="bg-[#0a0a0a] p-6 sm:p-16 border-[14px] border-[#d4af37] shadow-2xl relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5"
                     style={{
                       backgroundImage: `repeating-linear-gradient(45deg, #d4af37, #d4af37 2px, transparent 2px, transparent 30px)`
                     }}>
                </div>

                <div className="relative z-10 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="inline-flex max-w-full items-center gap-3 bg-black px-3 py-3 sm:px-8 rounded-3xl border border-amber-400/80">
                      <div className="shrink-0 text-xl sm:text-3xl">🏛️</div>
                      <div className="min-w-0 wrap-anywhere font-serif text-sm tracking-wide text-amber-300 sm:text-xl lg:text-2xl">{BRAND_NAME}</div>
                    </div>
                  </div>

                  <div className="uppercase text-amber-300 text-sm tracking-[4px] mb-3">OFFIZIELLES ZERTIFIKAT</div>

                  <div className="font-serif text-[42px] leading-none text-white mb-8">ANATOMISCHE<br />MEISTERLEISTUNG</div>

                  <div className="text-white/70 mb-2">Wird hiermit verliehen an</div>
                  <div className="text-5xl font-light tracking-tight text-amber-100 mb-12 border-b border-white/10 pb-4">{name}</div>

                  <div className="text-xl text-white/80 max-w-xs mx-auto mb-12">
                    {analysis.title}
                  </div>

                  <div className="grid grid-cols-2 gap-x-12 gap-y-6 text-left mx-auto max-w-md mb-16">
                    {analysis.details.slice(0, 4).map((d, i) => (
                      <div key={i} className="flex items-baseline gap-3 text-sm">
                        <span className="text-amber-400">★</span>
                        <span className="text-white/90">{d}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-end text-xs">
                    <div className="text-left">
                      <div className="text-white/40">AUSGESTELLT AM</div>
                      <div className="text-white text-lg font-light">{new Date().toLocaleDateString('de-DE', {year:'numeric', month:'long', day:'numeric'})}</div>
                    </div>

                    <div>
                      <div className="flex justify-center mb-1">
                        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                      </div>
                      <div className="font-serif text-xl text-amber-300">Prof. Dr. L. Aurelius</div>
                      <div className="text-[10px] text-white/30 -mt-1">CHIEF ANATOMIST</div>
                    </div>

                    <div className="text-right">
                      <div className="text-5xl font-bold text-amber-400/80 font-mono tracking-tighter">8.{Math.floor(Math.random()*9)}</div>
                      <div className="-mt-3 text-xs text-white/40">OVERALL</div>
                    </div>
                  </div>
                </div>

                {/* Decorative seals */}
                <div className="absolute bottom-12 right-12 w-28 h-28 border-[6px] border-amber-400/60 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 border border-amber-400/80 rounded-full flex items-center justify-center text-4xl">🔱</div>
                </div>

                <div className="absolute -bottom-6 -left-6 text-[180px] font-black text-amber-400/5 select-none">{PDF_FILENAME_PREFIX[0]}</div>
              </div>

              <div className="flex gap-4 justify-center mt-8">
                <button
                  onClick={() => setShowCert(false)}
                  className="px-10 py-4 border border-white/30 text-white rounded-3xl"
                >
                  SCHLIESSEN
                </button>
                <button
                  onClick={downloadPDF}
                  className="px-10 py-4 bg-gradient-to-r from-amber-300 to-yellow-400 text-zinc-950 rounded-3xl flex items-center gap-3 font-semibold"
                >
                  <Download className="w-5 h-5" /> ALS PDF HERUNTERLADEN
                </button>
              </div>

              <p className="text-center text-white/30 text-xs mt-6">Dies ist eine humorvolle Demo-App und kein echtes medizinisches Dokument.</p>
            </div>
          </div>
        )}

        {/* HOW IT WORKS */}
        <div id="how" className="max-w-6xl mx-auto px-8 py-28 border-t border-white/10">
          <div className="text-center mb-16">
            <div className="text-amber-400 text-sm tracking-widest mb-4">3 SCHRITTE ZUM ERFOLG</div>
            <h3 className="font-serif text-6xl tracking-tighter">So funktioniert es</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "Foto hochladen",
                desc: "Lade ein diskretes Foto deines anatomischen Merkmals hoch. Die KI analysiert es sofort."
              },
              {
                num: "02",
                title: "Professionelle Analyse",
                desc: "Unsere KI (inspiriert von Grok) bewertet Länge, Umfang, Form, Symmetrie und Pflege. Erhalte einen detaillierten Report."
              },
              {
                num: "03",
                title: "Zertifikat erhalten",
                desc: "Lade dein wunderschönes, rahmenfertiges Zertifikat herunter. Teile es oder hänge es stolz auf."
              }
            ].map((stepItem, index) => (
              <div key={index} className="group relative bg-zinc-900 rounded-3xl p-10 transition-all hover:-translate-y-2 border border-transparent hover:border-amber-400/30">
                <div className="font-mono text-8xl text-white/5 group-hover:text-white/10 absolute top-6 right-6 transition-all">{stepItem.num}</div>
                <div className="text-amber-400 text-6xl mb-6 font-light">{stepItem.num}</div>
                <div className="font-semibold text-3xl mb-4 text-balance">{stepItem.title}</div>
                <p className="text-white/60 leading-relaxed">{stepItem.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PRICING */}
        <div id="pricing" className="bg-zinc-900 py-20">
          <div className="max-w-6xl mx-auto px-8">
            <div className="text-center mb-16">
              <div className="inline text-xs bg-white/5 px-5 py-2 rounded-3xl">PREISE</div>
              <h3 className="font-serif text-5xl mt-4">Wähle dein Paket</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  name: "BASIS",
                  price: "19,90",
                  features: ["KI-Bewertung per E-Mail", "Detaillierter Report", "Score 1-10"],
                  popular: false
                },
                {
                  name: "PREMIUM",
                  price: "29,90",
                  features: ["Alles aus Basis", "Hochwertiges PDF-Zertifikat", "Personalisierte Empfehlungen", "Rahmenvorlage"],
                  popular: true
                },
                {
                  name: "ULTIMATE",
                  price: "39,90",
                  features: ["Alles aus Premium", "Video-Feedback", "Folge-Analyse in 30 Tagen", "VIP Zugang"],
                  popular: false
                }
              ].map((plan, i) => (
                <div key={i} className={`rounded-3xl p-8 relative ${plan.popular ? 'border-2 border-amber-400 scale-[1.03] shadow-2xl shadow-amber-500/20' : 'border border-white/10'}`}>
                  {plan.popular && <div className="absolute -top-3 right-8 bg-amber-400 text-zinc-950 text-xs font-bold px-5 py-1 rounded-3xl">BELIEBTEST</div>}

                  <div className="font-medium text-sm tracking-widest mb-4 text-white/60">{plan.name}</div>
                  <div className="flex items-baseline mb-8">
                    <span className="text-7xl font-light">€</span>
                    <span className="text-7xl font-light ml-1">{plan.price}</span>
                  </div>

                  <ul className="space-y-4 mb-12">
                    {plan.features.map((f, idx) => (
                      <li key={idx} className="flex gap-3 items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>

                  <button className={`w-full py-5 text-sm font-medium rounded-3xl border ${plan.popular ? 'bg-amber-400 text-black border-amber-400' : 'border-white/30 hover:bg-white/5'}`}>
                    {plan.popular ? 'JETZT ZERTIFIKAT ERHALTEN' : 'PAKET WÄHLEN'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="bg-black py-16 border-t border-white/10 text-center text-xs text-white/30">
          <div className="max-w-4xl mx-auto px-6">
            {BRAND_NAME} ist eine humorvolle Demo-Anwendung und dient rein der Unterhaltung. Keine echten medizinischen oder wissenschaftlichen Bewertungen.<br />
            Alle generierten Zertifikate sind fiktiv. Respektiere die Privatsphäre anderer. Erstellt mit KI und ❤️ für Selbstvertrauen.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
