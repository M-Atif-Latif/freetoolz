import { useState } from 'react';
import { Image, Download } from 'lucide-react';

export default function SVGOptimizer() {
  const [svgInput, setSvgInput] = useState('');
  const [optimized, setOptimized] = useState('');
  const [stats, setStats] = useState({ original: 0, optimized: 0, saved: 0 });

  const optimize = () => {
    let svg = svgInput.trim();
    
    // Remove comments
    svg = svg.replace(/<!--[\s\S]*?-->/g, '');
    
    // Remove XML declarations
    svg = svg.replace(/<\?xml[\s\S]*?\?>/g, '');
    
    // Remove unnecessary whitespace
    svg = svg.replace(/\s+/g, ' ');
    svg = svg.replace(/>\s+</g, '><');
    
    // Remove default attributes
    svg = svg.replace(/\s*fill="none"/g, '');
    svg = svg.replace(/\s*stroke="none"/g, '');
    
    // Round numbers to 2 decimals
    svg = svg.replace(/\d+\.\d{3,}/g, (match) => parseFloat(match).toFixed(2));

    const originalSize = new Blob([svgInput]).size;
    const optimizedSize = new Blob([svg]).size;
    const savedBytes = originalSize - optimizedSize;
    const savedPercent = ((savedBytes / originalSize) * 100).toFixed(1);

    setOptimized(svg);
    setStats({
      original: originalSize,
      optimized: optimizedSize,
      saved: parseFloat(savedPercent),
    });
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(2)} MB`;
  };

  const downloadSVG = () => {
    const blob = new Blob([optimized], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'optimized.svg';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <Image className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            SVG Optimizer
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Compress and optimize SVG files by removing unnecessary data
          </p>
        </div>

        {stats.original > 0 && (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Original Size</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {formatBytes(stats.original)}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Optimized Size</div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {formatBytes(stats.optimized)}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Saved</div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {stats.saved}%
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Original SVG</h2>
            </div>
            <div className="p-6">
              <textarea
                value={svgInput}
                onChange={(e) => setSvgInput(e.target.value)}
                placeholder="<svg>...</svg>"
                className="w-full h-96 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-none"
              />
              <button
                onClick={optimize}
                disabled={!svgInput.trim()}
                className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
              >
                Optimize SVG
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Optimized SVG</h2>
            </div>
            <div className="p-6">
              <textarea
                value={optimized}
                readOnly
                className="w-full h-96 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-none"
              />
              {optimized && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <button
                    onClick={() => navigator.clipboard.writeText(optimized)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                  >
                    Copy
                  </button>
                  <button
                    onClick={downloadSVG}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center justify-center"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Optimizations Applied</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li>• Remove XML declarations and comments</li>
            <li>• Strip unnecessary whitespace</li>
            <li>• Remove default attributes</li>
            <li>• Round decimals to 2 places</li>
            <li>• Compress markup structure</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
