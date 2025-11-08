import { useState } from 'react';
import { Eye } from 'lucide-react';

type ColorBlindnessType = 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

export default function ColorBlindnessSimulator() {
  const [color, setColor] = useState('#3B82F6');
  const [activeView, setActiveView] = useState<ColorBlindnessType>('normal');

  const simulateColorBlindness = (hex: string, type: ColorBlindnessType): string => {
    const rgb = parseInt(hex.slice(1), 16);
    let r = (rgb >> 16) & 0xff;
    let g = (rgb >> 8) & 0xff;
    let b = (rgb >> 0) & 0xff;

    // Normalize to 0-1
    r = r / 255;
    g = g / 255;
    b = b / 255;

    let nr, ng, nb;

    switch (type) {
      case 'protanopia': // Red-blind
        nr = 0.567 * r + 0.433 * g;
        ng = 0.558 * r + 0.442 * g;
        nb = 0.242 * g + 0.758 * b;
        break;

      case 'deuteranopia': // Green-blind
        nr = 0.625 * r + 0.375 * g;
        ng = 0.7 * r + 0.3 * g;
        nb = 0.3 * g + 0.7 * b;
        break;

      case 'tritanopia': // Blue-blind
        nr = 0.95 * r + 0.05 * g;
        ng = 0.433 * g + 0.567 * b;
        nb = 0.475 * g + 0.525 * b;
        break;

      case 'achromatopsia': // Total color blindness (grayscale)
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        nr = gray;
        ng = gray;
        nb = gray;
        break;

      default:
        return hex;
    }

    // Denormalize and convert back to hex
    const toHex = (val: number) => {
      const clamped = Math.max(0, Math.min(255, Math.round(val * 255)));
      return clamped.toString(16).padStart(2, '0');
    };

    return `#${toHex(nr)}${toHex(ng)}${toHex(nb)}`;
  };

  const views: { type: ColorBlindnessType; name: string; description: string; prevalence: string }[] = [
    {
      type: 'normal',
      name: 'Normal Vision',
      description: 'Full color spectrum',
      prevalence: '~92% of population',
    },
    {
      type: 'protanopia',
      name: 'Protanopia',
      description: 'Red-blind (missing red cones)',
      prevalence: '~1% of males',
    },
    {
      type: 'deuteranopia',
      name: 'Deuteranopia',
      description: 'Green-blind (missing green cones)',
      prevalence: '~1% of males',
    },
    {
      type: 'tritanopia',
      name: 'Tritanopia',
      description: 'Blue-blind (missing blue cones)',
      prevalence: '~0.001% of population',
    },
    {
      type: 'achromatopsia',
      name: 'Achromatopsia',
      description: 'Total color blindness (monochrome)',
      prevalence: '~0.003% of population',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl mb-4 shadow-lg">
            <Eye className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Color Blindness Simulator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            See how colors appear to people with different types of color blindness
          </p>
        </div>

        {/* Color Picker */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-rose-500 to-pink-600 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Select Color</h2>
          </div>
          <div className="p-8">
            <div className="flex items-center justify-center space-x-6 mb-6">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-32 h-32 rounded-xl border-4 border-gray-300 dark:border-gray-600 cursor-pointer shadow-lg"
              />
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Hex Color
                </label>
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono uppercase text-lg"
                />
              </div>
            </div>

            {/* Quick Color Presets */}
            <div className="flex flex-wrap justify-center gap-2">
              {['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080'].map(
                (preset) => (
                  <button
                    key={preset}
                    onClick={() => setColor(preset)}
                    className="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:scale-110 transition-transform"
                    style={{ backgroundColor: preset }}
                    title={preset}
                  />
                )
              )}
            </div>
          </div>
        </div>

        {/* Vision Type Selector */}
        <div className="grid md:grid-cols-5 gap-4 mb-8">
          {views.map((view) => {
            const simColor = view.type === 'normal' ? color : simulateColorBlindness(color, view.type);
            const isActive = activeView === view.type;

            return (
              <button
                key={view.type}
                onClick={() => setActiveView(view.type)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  isActive
                    ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-gray-400'
                }`}
              >
                <div
                  className="w-full h-16 rounded-lg mb-3 border-2 border-gray-300 dark:border-gray-600"
                  style={{ backgroundColor: simColor }}
                />
                <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-1">{view.name}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">{view.prevalence}</p>
              </button>
            );
          })}
        </div>

        {/* Large Preview */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">
              {views.find((v) => v.type === activeView)?.name} View
            </h2>
          </div>
          <div className="p-8">
            <div
              className="w-full h-64 rounded-xl border-4 border-gray-300 dark:border-gray-600 mb-6 flex items-center justify-center shadow-xl"
              style={{
                backgroundColor:
                  activeView === 'normal' ? color : simulateColorBlindness(color, activeView),
              }}
            >
              <div className="text-center">
                <div className="text-5xl font-bold text-white drop-shadow-lg mb-2">
                  {activeView === 'normal' ? color : simulateColorBlindness(color, activeView)}
                </div>
                <div className="text-white text-lg drop-shadow-lg">
                  {views.find((v) => v.type === activeView)?.description}
                </div>
              </div>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-3 gap-4">
              {['Sample Text', 'Button', 'Icon'].map((label, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-center"
                  style={{
                    backgroundColor:
                      activeView === 'normal' ? color : simulateColorBlindness(color, activeView),
                  }}
                >
                  <div className="text-white font-bold drop-shadow">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
            About Color Blindness
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li>• <strong>Protanopia:</strong> Red color blindness (~1% of males)</li>
            <li>• <strong>Deuteranopia:</strong> Green color blindness (~1% of males)</li>
            <li>• <strong>Tritanopia:</strong> Blue color blindness (very rare)</li>
            <li>• <strong>Achromatopsia:</strong> Complete color blindness (extremely rare)</li>
            <li>• Always test designs for accessibility using contrast checkers</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
