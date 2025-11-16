import { useMemo, useState } from 'react';
import { ArrowDownAZ, ArrowDownZA, Hash, ListOrdered, RefreshCw, Shuffle, Sparkles, Check, Copy, Trash2 } from 'lucide-react';
import ToolFAQSection from '../components/ToolFAQSection';

type SortMode =
  | 'alphabetical'
  | 'alphabetical-desc'
  | 'numeric'
  | 'numeric-desc'
  | 'length'
  | 'length-desc'
  | 'random';

const sortModeOptions = [
  { value: 'alphabetical', label: 'Alphabetical (A → Z)', icon: ArrowDownAZ },
  { value: 'alphabetical-desc', label: 'Alphabetical (Z → A)', icon: ArrowDownZA },
  { value: 'numeric', label: 'Numeric (Lowest → Highest)', icon: Hash },
  { value: 'numeric-desc', label: 'Numeric (Highest → Lowest)', icon: Hash },
  { value: 'length', label: 'Length (Shortest → Longest)', icon: ListOrdered },
  { value: 'length-desc', label: 'Length (Longest → Shortest)', icon: ListOrdered },
  { value: 'random', label: 'Random Shuffle', icon: Shuffle }
];

const sampleSets = [
  {
    label: 'QA checklist',
    value: 'Open pull request\nLink issue\nRun regression tests\nUpdate docs\nPing reviewer'
  },
  {
    label: 'Glossary terms',
    value: 'Accessibility\nBrand voice\nCanonical tag\nDomain authority\nEngagement rate'
  },
  {
    label: 'Conference raffle',
    value: 'Ava\nKenji\nMaya\nPriya\nLeo\nAngel\nJonas\nElena'
  }
];

const numberMatcher = /-?\d+(?:\.\d+)?/;

export default function LineSorter() {
  const [input, setInput] = useState('');
  const [sortMode, setSortMode] = useState<SortMode>('alphabetical');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [trimWhitespace, setTrimWhitespace] = useState(true);
  const [removeDuplicates, setRemoveDuplicates] = useState(true);
  const [preserveBlankLines, setPreserveBlankLines] = useState(false);
  const [copied, setCopied] = useState(false);

  const collator = useMemo(
    () => new Intl.Collator(undefined, { sensitivity: caseSensitive ? 'variant' : 'base' }),
    [caseSensitive]
  );

  const processed = useMemo(() => {
    const rawLines = input.split(/\r?\n/);
    const trimmedLines = trimWhitespace ? rawLines.map((line) => line.trim()) : rawLines;
    const blankLines = trimmedLines.filter((line) => line.length === 0).length;
    let workingLines = preserveBlankLines ? trimmedLines : trimmedLines.filter((line) => line.length > 0);

    let duplicatesRemoved = 0;
    if (removeDuplicates) {
      const seen = new Set<string>();
      workingLines = workingLines.filter((line) => {
        const key = caseSensitive ? line : line.toLowerCase();
        if (seen.has(key) && line.length > 0) {
          duplicatesRemoved += 1;
          return false;
        }
        seen.add(key);
        return true;
      });
    }

    const numericValue = (line: string) => {
      const match = line.match(numberMatcher);
      return match ? parseFloat(match[0]) : Number.NaN;
    };

    const sortedLines = [...workingLines];
    const alphabeticalSort = (direction = 1) =>
      sortedLines.sort((a, b) => direction * collator.compare(a, b));

    switch (sortMode) {
      case 'alphabetical':
        alphabeticalSort(1);
        break;
      case 'alphabetical-desc':
        alphabeticalSort(-1);
        break;
      case 'numeric':
      case 'numeric-desc': {
        const direction = sortMode === 'numeric' ? 1 : -1;
        sortedLines.sort((a, b) => {
          const aNum = numericValue(a);
          const bNum = numericValue(b);
          if (Number.isNaN(aNum) && Number.isNaN(bNum)) {
            return direction * collator.compare(a, b);
          }
          if (Number.isNaN(aNum)) return 1;
          if (Number.isNaN(bNum)) return -1;
          if (aNum === bNum) {
            return direction * collator.compare(a, b);
          }
          return direction * (aNum - bNum);
        });
        break;
      }
      case 'length':
      case 'length-desc': {
        const direction = sortMode === 'length' ? 1 : -1;
        sortedLines.sort((a, b) => {
          if (a.length === b.length) {
            return direction * collator.compare(a, b);
          }
          return direction * (a.length - b.length);
        });
        break;
      }
      case 'random': {
        for (let i = sortedLines.length - 1; i > 0; i -= 1) {
          const j = Math.floor(Math.random() * (i + 1));
          [sortedLines[i], sortedLines[j]] = [sortedLines[j], sortedLines[i]];
        }
        break;
      }
      default:
        alphabeticalSort(1);
    }

    return {
      lines: sortedLines,
      stats: {
        originalLines: trimmedLines.filter((line) => line.length > 0).length,
        blankLines,
        duplicatesRemoved,
        uniqueLines: sortedLines.filter((line) => line.length > 0).length,
        mode: sortMode
      }
    };
  }, [input, sortMode, trimWhitespace, preserveBlankLines, removeDuplicates, caseSensitive, collator]);

  const output = processed.lines.join('\n');

  const handleCopy = async () => {
    if (!output.trim() || !navigator?.clipboard) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleClear = () => {
    setInput('');
  };

  const activeMode = sortModeOptions.find((option) => option.value === sortMode);

  return (
    <div className="bg-slate-950 text-white py-14">
      <div className="max-w-6xl mx-auto px-4 space-y-10">
        <header className="space-y-4 text-center">
          <div className="inline-flex items-center space-x-2 rounded-full border border-white/20 px-4 py-1 text-sm uppercase tracking-wide text-slate-200">
            <Sparkles className="h-4 w-4 text-amber-300" />
            <span>Pro list wrangler</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold">Line Sorter & Smart Organizer</h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Alphabetize, rank by length, shuffle for raffles, or isolate numeric orderings. Dial in case sensitivity,
            deduping, and whitespace rules to ship audit-ready lists every time.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-6">
            <div className="flex flex-wrap gap-3">
              {sampleSets.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => setInput(preset.value)}
                  className="px-3 py-1.5 rounded-full bg-white/10 text-sm text-slate-100 border border-white/10 hover:border-amber-300/60 transition"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div>
              <label className="block text-sm font-semibold tracking-wide text-slate-200 mb-2">Input lines</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste checklist items, glossary entries, raffle names, or QA steps..."
                className="w-full min-h-[280px] rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-base text-white focus:outline-none focus:border-amber-300/70"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleClear}
                className="flex items-center space-x-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-200 hover:border-rose-400/60"
              >
                <Trash2 className="h-4 w-4" />
                <span>Clear input</span>
              </button>
              <button
                onClick={handleCopy}
                className="flex items-center space-x-2 rounded-xl border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200 hover:bg-emerald-400/20"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? 'Copied!' : 'Copy sorted list'}</span>
              </button>
            </div>
          </section>

          <section className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white">Sorting logic</h2>
              <div className="space-y-3">
                {sortModeOptions.map((option) => {
                  const Icon = option.icon;
                  const active = sortMode === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setSortMode(option.value as SortMode)}
                      className={`flex w-full items-center space-x-3 rounded-2xl border px-4 py-3 text-left transition ${
                        active
                          ? 'border-amber-300/70 bg-amber-200/10 text-white'
                          : 'border-white/10 text-slate-200 hover:border-amber-200/40'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white">Cleanup rules</h2>
              <div className="grid gap-3">
                <label className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-sm">
                  <span className="text-slate-200">Case sensitive comparisons</span>
                  <input
                    type="checkbox"
                    checked={caseSensitive}
                    onChange={(e) => setCaseSensitive(e.target.checked)}
                    className="h-4 w-4 accent-amber-300"
                  />
                </label>
                <label className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-sm">
                  <span className="text-slate-200">Trim surrounding whitespace</span>
                  <input
                    type="checkbox"
                    checked={trimWhitespace}
                    onChange={(e) => setTrimWhitespace(e.target.checked)}
                    className="h-4 w-4 accent-amber-300"
                  />
                </label>
                <label className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-sm">
                  <span className="text-slate-200">Remove duplicate lines</span>
                  <input
                    type="checkbox"
                    checked={removeDuplicates}
                    onChange={(e) => setRemoveDuplicates(e.target.checked)}
                    className="h-4 w-4 accent-amber-300"
                  />
                </label>
                <label className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-sm">
                  <span className="text-slate-200">Preserve blank lines</span>
                  <input
                    type="checkbox"
                    checked={preserveBlankLines}
                    onChange={(e) => setPreserveBlankLines(e.target.checked)}
                    className="h-4 w-4 accent-amber-300"
                  />
                </label>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white">Output</h2>
              <textarea
                value={output}
                readOnly
                placeholder="Sorted output appears here..."
                className="w-full min-h-[200px] rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-sm text-slate-100"
              />
              <div className="grid grid-cols-2 gap-3 text-center text-xs text-slate-300">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-2xl font-semibold text-white">{processed.stats.uniqueLines}</p>
                  <p>Unique lines</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-2xl font-semibold text-white">{processed.stats.duplicatesRemoved}</p>
                  <p>Duplicates removed</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-2xl font-semibold text-white">{processed.stats.originalLines}</p>
                  <p>Original lines</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-2xl font-semibold text-white">{processed.stats.blankLines}</p>
                  <p>Blank lines removed</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {activeMode && (
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-amber-500/10 to-rose-500/10 px-6 py-5 text-sm text-slate-100">
            <div className="flex items-center space-x-2">
              <RefreshCw className="h-4 w-4 text-amber-200" />
              <p>
                Active logic: <span className="font-semibold">{activeMode.label}</span>. Flip options anytime to compare
                different sequences without leaving the page.
              </p>
            </div>
          </div>
        )}

        <ToolFAQSection toolId="line-sorter" />
      </div>
    </div>
  );
}
