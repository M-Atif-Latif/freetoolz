import { useState } from 'react';
import { Image as ImageIcon, Ruler } from 'lucide-react';

export default function ImageDPICalculator() {
  const [widthPx, setWidthPx] = useState('');
  const [heightPx, setHeightPx] = useState('');
  const [widthInch, setWidthInch] = useState('');
  const [heightInch, setHeightInch] = useState('');
  const [dpi, setDpi] = useState('');
  const [megapixels, setMegapixels] = useState('');

  const calculate = () => {
    const wpx = parseFloat(widthPx);
    const hpx = parseFloat(heightPx);
    const winch = parseFloat(widthInch);
    const hinch = parseFloat(heightInch);

    if (isNaN(wpx) || isNaN(hpx) || isNaN(winch) || isNaN(hinch)) {
      setDpi('Invalid input');
      setMegapixels('');
      return;
    }

    const dpiWidth = wpx / winch;
    const dpiHeight = hpx / hinch;
    const avgDpi = (dpiWidth + dpiHeight) / 2;
    
    const mp = (wpx * hpx) / 1000000;

    setDpi(avgDpi.toFixed(2));
    setMegapixels(mp.toFixed(2));
  };

  const setPreset = (width: number, height: number, winch: number, hinch: number) => {
    setWidthPx(width.toString());
    setHeightPx(height.toString());
    setWidthInch(winch.toString());
    setHeightInch(hinch.toString());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl mb-4 shadow-lg">
            <ImageIcon className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Image DPI Calculator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Calculate DPI (Dots Per Inch) and PPI (Pixels Per Inch) for images
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-pink-500 to-rose-600 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Calculate DPI</h2>
          </div>
          <div className="p-8">
            {/* Image Dimensions in Pixels */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <Ruler className="h-5 w-5 mr-2" />
                Image Dimensions (Pixels)
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Width (px)
                  </label>
                  <input
                    type="number"
                    value={widthPx}
                    onChange={(e) => setWidthPx(e.target.value)}
                    placeholder="e.g. 1920"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Height (px)
                  </label>
                  <input
                    type="number"
                    value={heightPx}
                    onChange={(e) => setHeightPx(e.target.value)}
                    placeholder="e.g. 1080"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Print Dimensions */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <ImageIcon className="h-5 w-5 mr-2" />
                Print Size (Inches)
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Width (inches)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={widthInch}
                    onChange={(e) => setWidthInch(e.target.value)}
                    placeholder="e.g. 8"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Height (inches)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={heightInch}
                    onChange={(e) => setHeightInch(e.target.value)}
                    placeholder="e.g. 10"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Presets */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quick Presets:</h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setPreset(1920, 1080, 8, 4.5)}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-sm"
                >
                  Full HD (1920×1080)
                </button>
                <button
                  onClick={() => setPreset(3840, 2160, 16, 9)}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-sm"
                >
                  4K (3840×2160)
                </button>
                <button
                  onClick={() => setPreset(2100, 2970, 8.5, 11)}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-sm"
                >
                  Letter (8.5×11")
                </button>
                <button
                  onClick={() => setPreset(2480, 3508, 8.3, 11.7)}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-sm"
                >
                  A4
                </button>
              </div>
            </div>

            <button
              onClick={calculate}
              className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              Calculate DPI
            </button>

            {/* Results */}
            {dpi && dpi !== 'Invalid input' && (
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-800">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">DPI / PPI:</div>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white">
                    {dpi}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Dots/Pixels Per Inch
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-800">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Megapixels:</div>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white">
                    {megapixels} MP
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Total Resolution
                  </div>
                </div>
              </div>
            )}

            {dpi === 'Invalid input' && (
              <div className="mt-6 bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                <p className="text-red-900 dark:text-red-400">Please enter valid numbers for all fields.</p>
              </div>
            )}
          </div>
        </div>

        {/* DPI Guide */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">DPI Guide</h2>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                <div className="font-bold text-lg text-gray-900 dark:text-white mb-2">72-150 DPI</div>
                <p className="text-sm text-gray-700 dark:text-gray-300">Web & Screen Display</p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
                <div className="font-bold text-lg text-gray-900 dark:text-white mb-2">150-300 DPI</div>
                <p className="text-sm text-gray-700 dark:text-gray-300">Standard Printing</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                <div className="font-bold text-lg text-gray-900 dark:text-white mb-2">300+ DPI</div>
                <p className="text-sm text-gray-700 dark:text-gray-300">Professional/High-Quality Print</p>
              </div>
            </div>
            
            <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">💡 Tips</h3>
              <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>• Higher DPI = Better print quality but larger file size</li>
                <li>• 300 DPI is the industry standard for high-quality printing</li>
                <li>• 72-96 DPI is sufficient for web/screen display</li>
                <li>• Large format printing (posters) can use lower DPI (150-200)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
