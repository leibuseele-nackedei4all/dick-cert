import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { Upload, Award, Shield, Star, RefreshCw, CheckCircle } from 'lucide-react';
import { generateDemoAnalysis, type Analysis } from './analysis';
import { BRAND_NAME } from './brand';
import { AssessmentResult } from './components/AssessmentResult';

function App() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const analysisTimer = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => () => {
    if (analysisTimer.current !== null) window.clearTimeout(analysisTimer.current);
  }, []);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(typeof reader.result === 'string' ? reader.result : null);
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = () => {
    const displayName = name.trim();
    if (!displayName || !image || analysisTimer.current !== null) return;

    setIsAnalyzing(true);
    analysisTimer.current = window.setTimeout(() => {
      analysisTimer.current = null;
      setAnalysis(generateDemoAnalysis(displayName));
      setImage(null);
      setIsAnalyzing(false);
      setStep(3);
      window.scrollTo(0, 0);
    }, 2800);
  };

  const goToStart = () => {
    if (analysisTimer.current !== null) {
      window.clearTimeout(analysisTimer.current);
      analysisTimer.current = null;
    }
    setIsAnalyzing(false);
    setAnalysis(null);
    setStep(1);
    window.scrollTo(0, 0);
  };

  const resetApp = () => {
    goToStart();
    setName('');
    setEmail('');
    setImage(null);
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
              onClick={goToStart}
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
                onClick={() => { setStep(2); window.scrollTo(0, 0); }}
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
                <div className="px-4 py-1 bg-white/10 text-xs font-mono tracking-widest rounded-full">SCHRITT 2 / 3</div>
                <div className="h-px flex-1 bg-white/10"></div>
              </div>
              <h2 className="text-5xl font-serif tracking-tight">Persönliche Bewertung</h2>
              <p className="text-white/60 mt-3">Dein Bild bleibt in deinem Browser. Die Bewertung ist eine Simulation und wertet das Bild nicht aus.</p>
            </div>

            <div className="space-y-10">
              {/* Personal Info */}
              <div>
                <label htmlFor="assessment-name" className="block text-sm text-white/70 mb-3">DEIN NAME AUF DEM ZERTIFIKAT</label>
                <input
                  id="assessment-name"
                  type="text"
                  maxLength={80}
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
                          <p className="font-medium">Bild lokal ausgewählt</p>
                          <p className="text-xs text-white/50">Wird nicht übertragen</p>
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
                  onClick={goToStart}
                  className="flex-1 py-5 border border-white/30 rounded-3xl font-medium"
                >
                  ZURÜCK
                </button>
                <button
                  onClick={startAnalysis}
                  disabled={!name.trim() || !image || isAnalyzing}
                  className="flex-1 py-5 bg-gradient-to-r from-amber-400 to-yellow-500 disabled:from-zinc-700 disabled:text-white/40 text-zinc-950 font-semibold rounded-3xl flex items-center justify-center gap-3 hover:brightness-110 transition-all"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      DEMO-BEWERTUNG WIRD ERSTELLT …
                    </>
                  ) : (
                    <>JETZT ANALYSIEREN <Star className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: BEWERTUNG UND URKUNDE */}
        {step === 3 && analysis && <AssessmentResult analysis={analysis} onRestart={resetApp} />}

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
                desc: "Lade deine ausführliche Bewertung und die Urkunde gemeinsam als ein PDF herunter."
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
}

export default App;
