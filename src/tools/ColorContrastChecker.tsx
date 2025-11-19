import { useState } from 'react';
import { Palette, Check } from 'lucide-react';

export default function ColorContrastChecker() {
  const [foreground, setForeground] = useState('#000000');
  const [background, setBackground] = useState('#FFFFFF');

  // Calculate relative luminance
  const getLuminance = (hex: string): number => {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  // Calculate contrast ratio
  const getContrastRatio = (): number => {
    const l1 = getLuminance(foreground);
    const l2 = getLuminance(background);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  };

  const ratio = getContrastRatio();

  // WCAG Compliance
  const wcagAA = {
    normalText: ratio >= 4.5,
    largeText: ratio >= 3,
  };

  const wcagAAA = {
    normalText: ratio >= 7,
    largeText: ratio >= 4.5,
  };

  const getGrade = (): string => {
    if (wcagAAA.normalText) return 'AAA';
    if (wcagAA.normalText) return 'AA';
    if (wcagAA.largeText) return 'AA (Large Text Only)';
    return 'Fail';
  };

  const getGradeColor = (): string => {
    const grade = getGrade();
    if (grade === 'AAA') return 'from-green-500 to-emerald-600';
    if (grade.startsWith('AA')) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Palette className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Color Contrast Checker
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Check color contrast ratios for WCAG compliance. Ensure your designs are accessible to everyone.
          </p>
        </div>

        {/* Color Inputs */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Foreground Color (Text)
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="color"
                value={foreground}
                onChange={(e) => setForeground(e.target.value)}
                className="w-20 h-20 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
              />
              <input
                type="text"
                value={foreground}
                onChange={(e) => setForeground(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono uppercase"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Background Color
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="color"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="w-20 h-20 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
              />
              <input
                type="text"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono uppercase"
              />
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          <div className={`bg-gradient-to-r ${getGradeColor()} px-6 py-4`}>
            <h2 className="text-lg font-semibold text-white">Contrast Preview & Results</h2>
          </div>
          <div className="p-8">
            <div
              className="p-8 rounded-xl border-2 border-gray-300 dark:border-gray-600 mb-6"
              style={{ backgroundColor: background }}
            >
              <h3 className="text-3xl font-bold mb-4" style={{ color: foreground }}>
                The quick brown fox jumps over the lazy dog
              </h3>
              <p className="text-base mb-4" style={{ color: foreground }}>
                Normal text (14pt/18.5px). Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <p className="text-xl" style={{ color: foreground }}>
                Large text (18pt/24px or 14pt bold)
              </p>
            </div>

            {/* Contrast Ratio */}
            <div className="text-center mb-6">
              <div className="text-6xl font-bold text-gray-900 dark:text-white mb-2">
                {ratio.toFixed(2)}:1
              </div>
              <div className="text-xl text-gray-600 dark:text-gray-400">Contrast Ratio</div>
              <div className={`inline-block mt-4 px-6 py-2 rounded-full bg-gradient-to-r ${getGradeColor()} text-white font-bold text-lg`}>
                WCAG {getGrade()}
              </div>
            </div>

            {/* WCAG Compliance */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 dark:text-white mb-3">WCAG AA</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Normal Text (4.5:1):</span>
                    <span className={wcagAA.normalText ? 'text-green-600 font-bold' : 'text-red-600'}>
                      {wcagAA.normalText ? <Check className="inline h-5 w-5" /> : '✗'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Large Text (3:1):</span>
                    <span className={wcagAA.largeText ? 'text-green-600 font-bold' : 'text-red-600'}>
                      {wcagAA.largeText ? <Check className="inline h-5 w-5" /> : '✗'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 dark:text-white mb-3">WCAG AAA</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Normal Text (7:1):</span>
                    <span className={wcagAAA.normalText ? 'text-green-600 font-bold' : 'text-red-600'}>
                      {wcagAAA.normalText ? <Check className="inline h-5 w-5" /> : '✗'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Large Text (4.5:1):</span>
                    <span className={wcagAAA.largeText ? 'text-green-600 font-bold' : 'text-red-600'}>
                      {wcagAAA.largeText ? <Check className="inline h-5 w-5" /> : '✗'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">WCAG Guidelines</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li>• <strong>AA:</strong> Minimum for web accessibility (4.5:1 for normal text)</li>
            <li>• <strong>AAA:</strong> Enhanced accessibility (7:1 for normal text)</li>
            <li>• <strong>Large Text:</strong> 18pt+ or 14pt+ bold has lower requirements</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
