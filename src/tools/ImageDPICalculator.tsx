import { useEffect, useRef, useState } from 'react';
import {
  Image as ImageIcon,
  Ruler,
  Gauge,
  Sparkles,
  Info,
  Zap,
  RefreshCw,
  Copy,
  Bolt,
  BadgeCheck,
  Target
} from 'lucide-react';
import ToolFAQSection from '../components/ToolFAQSection';

export default function ImageDPICalculator() {
  const [widthPx, setWidthPx] = useState('');
  const [heightPx, setHeightPx] = useState('');
  const [widthInch, setWidthInch] = useState('');
  const [heightInch, setHeightInch] = useState('');
  const [dpi, setDpi] = useState('');
  const [megapixels, setMegapixels] = useState('');
  const [autoCalculate, setAutoCalculate] = useState(true);
  const [copyStatus, setCopyStatus] = useState('');
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const parseInputs = () => {
    const wpx = parseFloat(widthPx);
    const hpx = parseFloat(heightPx);
    const winch = parseFloat(widthInch);
    const hinch = parseFloat(heightInch);

    if ([wpx, hpx, winch, hinch].some((value) => isNaN(value) || value <= 0)) {
      return null;
    }

    return { wpx, hpx, winch, hinch };
  };

  const applyCalculation = (showInvalid = true) => {
    const parsed = parseInputs();
    if (!parsed) {
      if (showInvalid) {
        setDpi('Invalid input');
        setMegapixels('');
      } else {
        setDpi('');
        setMegapixels('');
      }
      return false;
    }

    const { wpx, hpx, winch, hinch } = parsed;
    const dpiWidth = wpx / winch;
    const dpiHeight = hpx / hinch;
    const avgDpi = (dpiWidth + dpiHeight) / 2;
    const mp = (wpx * hpx) / 1000000;

    setDpi(avgDpi.toFixed(2));
    setMegapixels(mp.toFixed(2));
    return true;
  };

  const calculate = () => {
    applyCalculation(true);
  };

  useEffect(() => {
    if (!autoCalculate) return;
    applyCalculation(false);
  }, [autoCalculate, widthPx, heightPx, widthInch, heightInch]);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const swapDimensions = () => {
    const currentWidthPx = widthPx;
    const currentHeightPx = heightPx;
    const currentWidthInch = widthInch;
    const currentHeightInch = heightInch;

    setWidthPx(currentHeightPx);
    setHeightPx(currentWidthPx);
    setWidthInch(currentHeightInch);
    setHeightInch(currentWidthInch);
  };

  const handleCopySummary = async () => {
    const parsed = parseInputs();
    if (!parsed || !dpi || dpi === 'Invalid input') {
      setCopyStatus('Enter valid dimensions first');
      return;
    }

    const summary = `Image: ${parsed.wpx} × ${parsed.hpx}px\nSurface: ${parsed.winch}" × ${parsed.hinch}"\nAverage DPI: ${dpi}\nMegapixels: ${megapixels} MP`;

    try {
      if (!navigator?.clipboard) {
        throw new Error('Clipboard API unavailable');
      }
      await navigator.clipboard.writeText(summary);
      setCopyStatus('Specs copied');
    } catch (error) {
      console.error(error);
      setCopyStatus('Clipboard blocked');
    }

    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current);
    }
    copyTimeoutRef.current = setTimeout(() => setCopyStatus(''), 2200);
  };

  const setPreset = (width: number, height: number, winch: number, hinch: number) => {
    setWidthPx(width.toString());
    setHeightPx(height.toString());
    setWidthInch(winch.toString());
    setHeightInch(hinch.toString());
  };

  const presetOptions = [
    { label: 'Full HD', meta: '1920 × 1080', width: 1920, height: 1080, winch: 8, hinch: 4.5 },
    { label: '4K UHD', meta: '3840 × 2160', width: 3840, height: 2160, winch: 16, hinch: 9 },
    { label: 'Letter', meta: '2100 × 2970', width: 2100, height: 2970, winch: 8.5, hinch: 11 },
    { label: 'A4 Print', meta: '2480 × 3508', width: 2480, height: 3508, winch: 8.3, hinch: 11.7 }
  ];

  const guideRanges = [
    { label: '72 – 150 DPI', usage: 'Web & on-screen', color: 'from-rose-500/20 to-orange-500/20', badge: 'Digital' },
    { label: '150 – 300 DPI', usage: 'Standard print work', color: 'from-amber-400/20 to-lime-400/20', badge: 'Print' },
    { label: '300+ DPI', usage: 'Fine art & editorial', color: 'from-emerald-500/20 to-cyan-500/20', badge: 'Premium' }
  ];

  const plannerTargets = [
    { dpiValue: 72, label: 'Digital signage' },
    { dpiValue: 150, label: 'Billboards & posters' },
    { dpiValue: 300, label: 'Gallery & editorial' },
    { dpiValue: 600, label: 'Micro-detail proofing' }
  ];

  const parsedInputs = parseInputs();
  const plannerRows = parsedInputs
    ? plannerTargets.map((target) => ({
        ...target,
        width: (parsedInputs.wpx / target.dpiValue).toFixed(2),
        height: (parsedInputs.hpx / target.dpiValue).toFixed(2)
      }))
    : [];

  const numericDpi = parseFloat(dpi);
  const hasValidDpi = !Number.isNaN(numericDpi) && numericDpi > 0;
  const qualityStatus = hasValidDpi
    ? numericDpi >= 350
      ? {
          badge: 'Exhibition',
          title: 'Exhibition grade clarity',
          detail: 'Safe for high-end gallery frames and luxury lookbooks.',
          tone: 'from-emerald-500/20 to-cyan-500/20'
        }
      : numericDpi >= 220
        ? {
            badge: 'Print suite',
            title: 'Print studio ready',
            detail: 'Ideal for retail posters, magazines, or premium packaging.',
            tone: 'from-sky-500/20 to-indigo-500/20'
          }
        : {
            badge: 'Digital',
            title: 'Screen-first clarity',
            detail: 'Optimized for responsive sites, ads, and social carousels.',
            tone: 'from-amber-400/20 to-rose-400/20'
          }
    : null;
  const qualityProgress = hasValidDpi ? Math.min((numericDpi / 450) * 100, 100) : 0;

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(147,197,253,0.25),_transparent_60%)]" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(120deg, rgba(15,23,42,0.8) 15%, rgba(15,23,42,0.3)), linear-gradient(90deg, rgba(56,189,248,0.05) 1px, transparent 1px)',
          backgroundSize: 'cover, 140px'
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 space-y-12">
        <section className="text-center space-y-6">
          <span className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium tracking-wide">
            <Sparkles className="h-4 w-4 text-sky-300" />
            <span>Pro Imaging Toolkit</span>
          </span>
          <div className="flex flex-col items-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white">
              Image DPI & Print Intelligence
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl">
              Translate pixels into confident print specs. Balance resolution, physical size, and clarity with a designer-grade interface tuned for photographers, studios, and brand teams.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'Accuracy locked', value: '±0.01', detail: 'Rounded DPI precision' },
              { title: 'Preset ready', value: '15+', detail: 'Studio-approved formats' },
              { title: 'Realtime clarity', value: 'Live status', detail: 'Instant suitability cues' }
            ].map((stat) => (
              <div key={stat.title} className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-left">
                <p className="text-sm uppercase tracking-wide text-slate-400">{stat.title}</p>
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
                <p className="text-sm text-slate-400">{stat.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8 shadow-2xl shadow-sky-900/10">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
              <div>
                <p className="text-sm uppercase tracking-wide text-slate-400">Step 01 · Feed your pixels</p>
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <ImageIcon className="h-6 w-6 text-sky-300" />Resolution Blueprint
                </h2>
              </div>
              <button
                onClick={() => {
                  setWidthPx('');
                  setHeightPx('');
                  setWidthInch('');
                  setHeightInch('');
                  setDpi('');
                  setMegapixels('');
                  setAutoCalculate(true);
                  setCopyStatus('');
                }}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-slate-200 hover:border-white/40"
              >
                <Zap className="h-4 w-4" />Reset form
              </button>
            </div>

            <div className="grid gap-6">
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                  <Ruler className="h-4 w-4" />
                  Image Dimensions (px)
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Width</label>
                    <input
                      type="number"
                      value={widthPx}
                      onChange={(e) => setWidthPx(e.target.value)}
                      placeholder="1920"
                      className="w-full rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-3 text-lg text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Height</label>
                    <input
                      type="number"
                      value={heightPx}
                      onChange={(e) => setHeightPx(e.target.value)}
                      placeholder="1080"
                      className="w-full rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-3 text-lg text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
                    />
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                  <Gauge className="h-4 w-4" />
                  Print Surface (inches)
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Width</label>
                    <input
                      type="number"
                      step="0.1"
                      value={widthInch}
                      onChange={(e) => setWidthInch(e.target.value)}
                      placeholder="8"
                      className="w-full rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-3 text-lg text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Height</label>
                    <input
                      type="number"
                      step="0.1"
                      value={heightInch}
                      onChange={(e) => setHeightInch(e.target.value)}
                      placeholder="10"
                      className="w-full rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-3 text-lg text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
                    />
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                  <Info className="h-4 w-4" />
                  Quick presets
                </div>
                <div className="flex flex-wrap gap-3">
                  {presetOptions.map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() =>
                        setPreset(preset.width, preset.height, preset.winch, preset.hinch)
                      }
                      className="group rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-sky-400 hover:bg-sky-400/10"
                    >
                      <p className="font-medium text-white">{preset.label}</p>
                      <p className="text-xs text-slate-400">{preset.meta}</p>
                    </button>
                  ))}
                </div>
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                  <Sparkles className="h-4 w-4" />Workflow boosters
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={swapDimensions}
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-2 text-sm text-slate-200 transition hover:border-sky-400 hover:bg-sky-400/10"
                  >
                    <RefreshCw className="h-4 w-4" />Swap orientation
                  </button>
                  <button
                    onClick={handleCopySummary}
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-2 text-sm text-slate-200 transition hover:border-emerald-400 hover:bg-emerald-400/10"
                  >
                    <Copy className="h-4 w-4" />Copy spec sheet
                  </button>
                  <button
                    onClick={() => setAutoCalculate((prev) => !prev)}
                    className={`inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm transition ${
                      autoCalculate
                        ? 'border-lime-300/60 bg-lime-400/10 text-lime-100'
                        : 'border-white/10 bg-slate-900/40 text-slate-200'
                    }`}
                  >
                    <Bolt className="h-4 w-4" />
                    {autoCalculate ? 'Auto-calc enabled' : 'Manual trigger' }
                  </button>
                </div>
                {copyStatus && (
                  <p className="text-xs text-emerald-200">{copyStatus}</p>
                )}
              </section>
            </div>

            <div className="mt-8 space-y-4">
              <button
                onClick={calculate}
                className="w-full rounded-2xl bg-gradient-to-r from-sky-400 via-sky-500 to-cyan-400 px-6 py-4 text-lg font-semibold text-slate-900 shadow-lg shadow-cyan-500/30 transition hover:translate-y-0.5"
              >
                Calculate DPI now
              </button>

              {dpi && dpi !== 'Invalid input' && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-3xl border border-emerald-400/30 bg-emerald-400/10 p-6">
                    <p className="text-sm uppercase tracking-wide text-emerald-200">DPI / PPI</p>
                    <p className="text-4xl font-semibold text-white">{dpi}</p>
                    <p className="text-sm text-emerald-100">Dots per inch for your print target</p>
                  </div>
                  <div className="rounded-3xl border border-blue-400/30 bg-blue-400/10 p-6">
                    <p className="text-sm uppercase tracking-wide text-blue-200">Megapixels</p>
                    <p className="text-4xl font-semibold text-white">{megapixels} MP</p>
                    <p className="text-sm text-blue-100">Overall resolution footprint</p>
                  </div>
                </div>
              )}

              {dpi === 'Invalid input' && (
                <div className="rounded-2xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                  Validate every field — numeric values only.
                </div>
              )}

              {qualityStatus && (
                <div className={`rounded-3xl border border-white/10 bg-gradient-to-r ${qualityStatus.tone} p-6`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-white/70">Confidence mode</p>
                      <h4 className="mt-2 flex items-center gap-2 text-xl font-semibold text-white">
                        <BadgeCheck className="h-5 w-5" />{qualityStatus.title}
                      </h4>
                      <p className="text-sm text-slate-100/90">{qualityStatus.detail}</p>
                    </div>
                    <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/80">{qualityStatus.badge}</span>
                  </div>
                  <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/20">
                    <div
                      className="h-full rounded-full bg-white/80"
                      style={{ width: `${qualityProgress}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-white/70">{numericDpi.toFixed(2)} DPI strength · scaled to 450 DPI benchmark</p>
                </div>
              )}

              {plannerRows.length > 0 && (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-400">Print planner</p>
                      <h4 className="text-lg font-semibold text-white flex items-center gap-2"><Target className="h-4 w-4" />Maximum surface guide</h4>
                    </div>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">Live</span>
                  </div>
                  <div className="mt-5 space-y-3">
                    {plannerRows.map((row) => (
                      <div key={row.dpiValue} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-900/30 px-4 py-3">
                        <div>
                          <p className="text-base font-semibold text-white">{row.dpiValue} DPI</p>
                          <p className="text-xs text-slate-400">{row.label}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-white">{row.width}" × {row.height}"</p>
                          <p className="text-xs text-slate-400">Max printable canvas</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm uppercase tracking-wide text-slate-400">Step 02 · Insight Layer</p>
              <h3 className="mt-2 text-xl font-semibold">Output confidence</h3>
              <p className="text-sm text-slate-400">Reference ranges to know whether your file is ready for press, gallery walls, or digital campaigns.</p>
              <div className="mt-6 space-y-4">
                {guideRanges.map((range) => (
                  <div
                    key={range.label}
                    className={`rounded-2xl border border-white/10 bg-gradient-to-r ${range.color} p-4`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-semibold text-white">{range.label}</p>
                      <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/80">
                        {range.badge}
                      </span>
                    </div>
                    <p className="text-sm text-slate-100">{range.usage}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-6">
              <p className="text-sm uppercase tracking-wide text-slate-500">Step 03 · Expert prompts</p>
              <h3 className="mt-2 text-xl font-semibold text-white">Smart tips</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li>• 300 DPI keeps editorial spreads razor sharp.</li>
                <li>• Large-format billboards tolerate 150–200 DPI viewed at distance.</li>
                <li>• Match DPI to viewing distance; lower DPI is fine for screens.</li>
                <li>• Keep compositions proportional when switching presets.</li>
              </ul>
            </div>
          </aside>
        </div>

        <ToolFAQSection toolId="image-dpi-calculator" />
      </div>
    </div>
  );
}
