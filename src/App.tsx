import React, { useState } from 'react';
import { Upload, Shield, Star, Award, CheckCircle, Camera, ChevronRight, Download, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

type Step = 'landing' | 'upload' | 'processing' | 'result';
type Package = 'basis' | 'certificate' | 'premium';

interface Assessment {
  name: string;
  length: string;
  girth: string;
  shape: string;
  glans: string;
  grooming: string;
  rating: number;
  title: string;
  id: string;
}

interface Assessment {
  name: string;
  length: string;
  girth: string;
  shape: string;
  glans: string;
  testicles: string;
  grooming: string;
  rating: number; // 1-10
  title: string;
  id: string;
}

const mockGenerateAssessment = (name: string): Assessment => {
  const lengths = ["16 cm – Im oberen Normalbereich (Top 30%)", "14 cm – Ideale Durchschnittsgröße (harmonisch)", "18 cm – Imposant & respektvoll", "15 cm – Perfekt für stetige Stimulation"];
  const girths = ["13 cm – Beeindruckend voll (perfekt für Stimulation)", "14 cm – Voluminös & prall", "12 cm – Sehr angenehm & passgenau", "15 cm – Dominant & ausfüllend"];
  const shapes = ["Leichte Aufwärtskrümmung – Ideal für G-Zonen-Zielgenauigkeit", "Gerade und kraftvoll – Symmetrische Stärke", "Leichte Linksneigung – Charakteristischer Schwung"];
  const glanses = ["Pilzförmig, sensibel – Hochästhetisch", "Klassisch geformt – Perfekte Proportion", "Ausgeprägt und markant – Sehr ansprechend"];
  const testicles = ["Symmetrisch, mittelgroß – Harmonisch", "Prall und definiert – Maskuline Präsenz", "Kompakt – Sportlich und dynamisch"];
  const groomings = ["Perfekt getrimmt – Top-Ästhetik", "Natürlich gepflegt – Maskulin & bodenständig", "Komplett glatt – Puristisch & rein"];
  const titles = ["Der Titan", "Der Ästhet", "Der Perfektionist", "Das Meisterwerk", "Die Legende"];

  const random = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
  const rating = Math.floor(Math.random() * 3) + 8; // 8, 9, 10
  
  return {
    name: name || "Anonymer Ästhet",
    length: random(lengths),
    girth: random(girths),
    shape: random(shapes),
    glans: random(glanses),
    testicles: random(testicles),
    grooming: random(groomings),
    rating: rating,
    title: random(titles),
    id: `PEN-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`
  };
};

export default function App() {
  const [step, setStep] = useState<Step>('landing');
  const [, setSelectedPackage] = useState<Package>('certificate');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [processingStatus, setProcessingStatus] = useState<string>('');

  const handleStart = (pkg: Package) => {
    setSelectedPackage(pkg);
    setStep('upload');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    if (!imagePreview) return;
    setStep('processing');
    
    // Simulate AI workflow
    const stages = [
      { text: "Agent 1: Empfange und verschlüssele Bild...", duration: 1500 },
      { text: "Agent 2 (Grok AI): Analysiere Maße und Proportionen...", duration: 2000 },
      { text: "Agent 2 (Grok AI): Bewerte Oberflächenmerkmale und Symmetrie...", duration: 2500 },
      { text: "Agent 2 (Grok AI): Erstelle finales Ranking und Titel...", duration: 1500 },
      { text: "Agent 3 (Designer): Generiere hochauflösendes Zertifikat...", duration: 2000 },
    ];

    let totalTime = 0;
    stages.forEach((stage, index) => {
      setTimeout(() => {
        setProcessingStatus(stage.text);
        if (index === stages.length - 1) {
          setTimeout(() => {
            setAssessment(mockGenerateAssessment(userName));
            setStep('result');
            triggerConfetti();
          }, stage.duration);
        }
      }, totalTime);
      totalTime += stage.duration;
    });
  };

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  const printCertificate = () => {
    window.print();
  };

  const reset = () => {
    setStep('landing');
    setImagePreview(null);
    setAssessment(null);
    setUserName('');
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-amber-200">
      {/* Navigation */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={reset}>
            <Award className="w-8 h-8 text-amber-600" />
            <span className="font-serif text-xl font-bold tracking-tight text-neutral-900">Eronite<span className="text-amber-600">Experts</span></span>
          </div>
          <div className="hidden sm:flex items-center space-x-6 text-sm font-medium text-neutral-600">
            <button onClick={() => setStep('landing')} className="hover:text-amber-600 transition-colors">Startseite</button>
            <button className="hover:text-amber-600 transition-colors">Wie es funktioniert</button>
            <button className="hover:text-amber-600 transition-colors">Preise</button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {step === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-24"
            >
              {/* Hero Section */}
              <section className="text-center space-y-8 max-w-4xl mx-auto">
                <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Star className="w-4 h-4" />
                  <span>Künstliche Intelligenz trifft auf Ästhetik</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-serif font-bold text-neutral-900 leading-tight">
                  Professionelle Anatomische <br className="hidden md:block"/> Selbsteinschätzung Online
                </h1>
                <p className="text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
                  Viele Menschen schätzen es, wenn ihr persönlichstes Merkmal von einer Expertin oder einem Experten fachgerecht analysiert wird. Holen Sie sich jetzt Ihr Zertifikat.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                  <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all shadow-lg hover:shadow-xl w-full sm:w-auto flex items-center justify-center">
                    Jetzt Analyse starten <ChevronRight className="ml-2 w-5 h-5" />
                  </button>
                  <div className="flex items-center space-x-2 text-neutral-500 text-sm">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span>100% Legal & Diskret verschlüsselt</span>
                  </div>
                </div>
              </section>

              {/* Features */}
              <section className="grid md:grid-cols-3 gap-12 text-center">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
                    <Upload className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold font-serif">1. Sicher hochladen</h3>
                  <p className="text-neutral-600">Laden Sie Ihr Foto verschlüsselt hoch. Es wird von unserem AI-Intake-Agenten direkt anonymisiert verarbeitet.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto">
                    <Star className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold font-serif">2. Grok AI Analyse</h3>
                  <p className="text-neutral-600">Unsere spezialisierte KI bewertet Maße, Form, Proportionen und Oberflächenmerkmale absolut objektiv und detailliert.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto">
                    <Award className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold font-serif">3. Designer Zertifikat</h3>
                  <p className="text-neutral-600">Unser Design-Agent erstellt ein wunderschönes, einrahmbares PDF-Zertifikat mit Ihrem persönlichen Anatomie-Rating.</p>
                </div>
              </section>

              {/* Pricing */}
              <section id="pricing" className="pt-12">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-serif font-bold mb-4">Wählen Sie Ihr Paket</h2>
                  <p className="text-neutral-600">Transparente Preise für einen Boost Ihres Selbstvertrauens.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  {/* Basis */}
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-200 flex flex-col hover:shadow-md transition-shadow">
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-neutral-900 mb-2">Basis-Bewertung</h3>
                      <div className="flex items-baseline space-x-1">
                        <span className="text-4xl font-extrabold">19,90</span>
                        <span className="text-neutral-500 font-medium">€</span>
                      </div>
                      <p className="text-neutral-500 mt-2 text-sm">Detaillierte Analyse per E-Mail</p>
                    </div>
                    <ul className="space-y-4 mb-8 flex-1">
                      <li className="flex items-center space-x-3 text-neutral-700"><CheckCircle className="w-5 h-5 text-green-500" /><span>Grok AI Text-Analyse</span></li>
                      <li className="flex items-center space-x-3 text-neutral-700"><CheckCircle className="w-5 h-5 text-green-500" /><span>Maße & Proportionen</span></li>
                    </ul>
                    <button onClick={() => handleStart('basis')} className="w-full py-3 rounded-xl font-medium text-neutral-900 bg-neutral-100 hover:bg-neutral-200 transition-colors">Auswählen</button>
                  </div>

                  {/* Mit Zertifikat */}
                  <div className="bg-neutral-900 rounded-3xl p-8 shadow-xl border border-neutral-800 flex flex-col relative transform md:-translate-y-4">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Bestseller</div>
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-white mb-2">Mit Zertifikat (PDF)</h3>
                      <div className="flex items-baseline space-x-1 text-white">
                        <span className="text-4xl font-extrabold">29,90</span>
                        <span className="text-neutral-400 font-medium">€</span>
                      </div>
                      <p className="text-neutral-400 mt-2 text-sm">Für die Wand oder das Ego</p>
                    </div>
                    <ul className="space-y-4 mb-8 flex-1 text-neutral-300">
                      <li className="flex items-center space-x-3"><CheckCircle className="w-5 h-5 text-amber-500" /><span>Alles aus Basis</span></li>
                      <li className="flex items-center space-x-3"><CheckCircle className="w-5 h-5 text-amber-500" /><span>PDF-Zertifikat der Exzellenz</span></li>
                      <li className="flex items-center space-x-3"><CheckCircle className="w-5 h-5 text-amber-500" /><span>Vergabe eines Titels</span></li>
                    </ul>
                    <button onClick={() => handleStart('certificate')} className="w-full py-3 rounded-xl font-bold text-neutral-900 bg-amber-500 hover:bg-amber-400 transition-colors shadow-[0_0_20px_rgba(245,158,11,0.3)]">Jetzt starten</button>
                  </div>

                  {/* Premium */}
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-200 flex flex-col hover:shadow-md transition-shadow">
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-neutral-900 mb-2">Premium</h3>
                      <div className="flex items-baseline space-x-1">
                        <span className="text-4xl font-extrabold">39,90</span>
                        <span className="text-neutral-500 font-medium">€</span>
                      </div>
                      <p className="text-neutral-500 mt-2 text-sm">Foto-Analyse + Tipps</p>
                    </div>
                    <ul className="space-y-4 mb-8 flex-1">
                      <li className="flex items-center space-x-3 text-neutral-700"><CheckCircle className="w-5 h-5 text-green-500" /><span>Alles aus Zertifikat</span></li>
                      <li className="flex items-center space-x-3 text-neutral-700"><CheckCircle className="w-5 h-5 text-green-500" /><span>Persönliche Pflegetipps</span></li>
                      <li className="flex items-center space-x-3 text-neutral-700"><CheckCircle className="w-5 h-5 text-green-500" /><span>Bevorzugte Bearbeitung</span></li>
                    </ul>
                    <button onClick={() => handleStart('premium')} className="w-full py-3 rounded-xl font-medium text-neutral-900 bg-neutral-100 hover:bg-neutral-200 transition-colors">Auswählen</button>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {step === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white rounded-3xl shadow-xl border border-neutral-200 p-8 md:p-12 text-center">
                <div className="mb-8">
                  <h2 className="text-3xl font-serif font-bold mb-4">Foto-Upload & Daten</h2>
                  <p className="text-neutral-600">Ihre Daten werden sicher an unseren AI-Agenten übertragen und nach der Zertifikatserstellung sofort gelöscht.</p>
                </div>

                <div className="space-y-6 text-left">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Name für das Zertifikat (optional)</label>
                    <input 
                      type="text" 
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="z.B. Max Mustermann oder Pseudonym" 
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-shadow"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Bild hochladen</label>
                    <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-2xl transition-colors ${imagePreview ? 'border-amber-500 bg-amber-50' : 'border-neutral-300 hover:border-amber-400'}`}>
                      <div className="space-y-1 text-center">
                        {imagePreview ? (
                          <div className="flex flex-col items-center">
                            <div className="w-32 h-32 rounded-lg overflow-hidden mb-4 border border-amber-200 shadow-sm">
                              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover blur-sm hover:blur-none transition-all cursor-pointer" title="Hover zum Ansehen" />
                            </div>
                            <div className="flex text-sm text-neutral-600">
                              <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-amber-600 hover:text-amber-500 focus-within:outline-none">
                                <span>Anderes Bild wählen</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageUpload} />
                              </label>
                            </div>
                          </div>
                        ) : (
                          <>
                            <Camera className="mx-auto h-12 w-12 text-neutral-400 mb-4" />
                            <div className="flex text-sm text-neutral-600 justify-center">
                              <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-amber-600 hover:text-amber-500 focus-within:outline-none px-2 py-1">
                                <span>Datei auswählen</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageUpload} />
                              </label>
                              <p className="pl-1 py-1">oder Drag & Drop</p>
                            </div>
                            <p className="text-xs text-neutral-500 mt-2">PNG, JPG bis zu 10MB</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button 
                      onClick={handleAnalyze} 
                      disabled={!imagePreview}
                      className={`w-full py-4 rounded-xl text-lg font-bold transition-all shadow-lg flex items-center justify-center ${imagePreview ? 'bg-amber-500 text-neutral-900 hover:bg-amber-400 hover:shadow-xl' : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'}`}
                    >
                      Analyse durch Grok AI starten <ChevronRight className="ml-2 w-5 h-5" />
                    </button>
                    <p className="text-center text-xs text-neutral-500 mt-4 flex items-center justify-center">
                      <Shield className="w-3 h-3 mr-1" /> Verschlüsselte Übertragung
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-xl mx-auto text-center py-20"
            >
              <div className="relative w-32 h-32 mx-auto mb-8">
                <div className="absolute inset-0 border-4 border-amber-200 rounded-full animate-ping opacity-75"></div>
                <div className="absolute inset-0 border-4 border-amber-500 rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center bg-white rounded-full m-2 shadow-inner">
                  <Star className="w-10 h-10 text-amber-500 animate-pulse" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-4 font-serif">Agenten arbeiten...</h2>
              <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm max-w-sm mx-auto">
                <p className="text-amber-600 font-medium font-mono text-sm animate-pulse h-10 flex items-center justify-center">
                  {processingStatus}
                </p>
              </div>
            </motion.div>
          )}

          {step === 'result' && assessment && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-8 space-y-4">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900">Ihre Analyse ist abgeschlossen!</h2>
                <p className="text-lg text-neutral-600">Grok AI hat das Rating ermittelt. Der Designer-Agent hat Ihr Zertifikat erstellt.</p>
                <div className="flex justify-center space-x-4">
                  <button onClick={printCertificate} className="bg-neutral-900 hover:bg-neutral-800 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center">
                    <Download className="w-4 h-4 mr-2" /> PDF / Drucken
                  </button>
                  <button onClick={reset} className="bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-700 px-6 py-2 rounded-lg font-medium transition-colors flex items-center">
                    <RefreshCcw className="w-4 h-4 mr-2" /> Neue Analyse
                  </button>
                </div>
              </div>

              {/* Printable Certificate Area */}
              <div className="print:m-0 print:p-0 bg-white rounded-sm shadow-2xl p-8 md:p-16 border-[12px] border-double border-amber-600/30 relative overflow-hidden" id="certificate">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                
                {/* Gold Corner Accents */}
                <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-amber-500"></div>
                <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-amber-500"></div>
                <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-amber-500"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-amber-500"></div>

                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-6 border-2 border-amber-500 shadow-md">
                    <Award className="w-10 h-10 text-amber-600" />
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-serif font-extrabold text-neutral-900 mb-2 tracking-wide uppercase">
                    Zertifikat
                  </h1>
                  <h2 className="text-xl md:text-2xl font-serif text-amber-700 mb-12 tracking-widest uppercase">
                    Der Anatomischen Exzellenz
                  </h2>

                  <p className="text-neutral-500 italic mb-4 text-lg">Dieses Dokument bestätigt die professionelle AI-Bewertung von:</p>
                  
                  <div className="w-3/4 border-b-2 border-amber-500 pb-2 mb-10">
                    <h3 className="text-3xl font-serif font-bold text-neutral-900">{assessment.name}</h3>
                  </div>

                  <div className="bg-neutral-50 w-full max-w-2xl p-8 rounded-xl border border-neutral-200 mb-10 text-left relative">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white px-4 text-neutral-400 text-sm font-bold uppercase tracking-wider font-mono">
                      Anatomie-Profil
                    </div>
                    <ul className="space-y-4 font-serif text-lg">
                      <li className="flex items-start">
                        <span className="text-amber-600 font-bold mr-3 w-24">Länge:</span> 
                        <span className="text-neutral-800">{assessment.length}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-600 font-bold mr-3 w-24">Umfang:</span> 
                        <span className="text-neutral-800">{assessment.girth}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-600 font-bold mr-3 w-24">Form:</span> 
                        <span className="text-neutral-800">{assessment.shape}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-600 font-bold mr-3 w-24">Eichel:</span> 
                        <span className="text-neutral-800">{assessment.glans}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-600 font-bold mr-3 w-24">Hoden:</span> 
                        <span className="text-neutral-800">{assessment.testicles}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-600 font-bold mr-3 w-24">Pflege:</span> 
                        <span className="text-neutral-800">{assessment.grooming}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mb-8 flex flex-col items-center">
                    <p className="text-neutral-500 text-sm uppercase tracking-widest mb-2">Gesamtrating (Grok AI)</p>
                    <div className="flex space-x-2 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-8 h-8 ${i < Math.round(assessment.rating / 2) ? 'fill-amber-400 text-amber-500' : 'text-neutral-300'}`} />
                      ))}
                    </div>
                    <p className="font-bold text-2xl text-neutral-900">{assessment.rating}/10 – {assessment.rating >= 9 ? 'Exzellent!' : 'Sehr Gut!'}</p>
                  </div>

                  <div className="bg-neutral-900 text-amber-400 px-8 py-4 rounded-lg shadow-inner mb-12 transform -rotate-1">
                    <p className="font-serif text-2xl font-bold tracking-wide">Titel: « {assessment.title} »</p>
                  </div>

                  <p className="text-xl font-serif text-neutral-800 italic mb-16">
                    "Ein wahres Meisterwerk der Natur – selbstbewusst einsetzen!"
                  </p>

                  <div className="w-full flex justify-between items-end border-t border-neutral-300 pt-6 px-4">
                    <div className="text-left">
                      <p className="font-bold text-neutral-800">Eronite Experten-Team</p>
                      <p className="text-xs text-neutral-500">Ausgestellt durch Grok AI & Designer Agent</p>
                    </div>
                    <div className="text-center">
                      <div className="w-20 h-20 border-4 border-amber-600 rounded-full flex items-center justify-center opacity-70 transform rotate-12">
                        <span className="font-bold text-amber-700 text-xs text-center uppercase leading-tight">Official<br/>Seal</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-mono text-neutral-600">ID: {assessment.id}</p>
                      <p className="text-sm text-neutral-500">{new Date().toLocaleDateString('de-DE')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      {/* Hide footer and unneeded elements when printing */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #certificate, #certificate * {
            visibility: visible;
          }
          #certificate {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100vh;
            margin: 0;
            padding: 20px;
            box-sizing: border-box;
            border-width: 4px;
          }
          /* Fix background colors for print */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
}