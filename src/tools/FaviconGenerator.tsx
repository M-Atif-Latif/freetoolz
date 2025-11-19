import { useState } from 'react';
import { Image as ImageIcon, Sparkles } from 'lucide-react';

export default function FaviconGenerator() {
  const [text, setText] = useState('F');
  const [bgColor, setBgColor] = useState('#4F46E5');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [fontSize, setFontSize] = useState('48');

  const generateFavicon = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    if (!ctx) return '';

    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, 64, 64);

    // Text
    ctx.fillStyle = textColor;
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text.charAt(0).toUpperCase(), 32, 32);

    return canvas.toDataURL('image/png');
  };

  const downloadFavicon = () => {
    const dataUrl = generateFavicon();
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'favicon.png';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
            <ImageIcon className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Favicon Generator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Create custom favicons from text and colors
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-blue-600 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Customize Favicon</h2>
          </div>
          <div className="p-8">
            <div className="flex items-center justify-center mb-8">
              <div className="w-32 h-32 rounded-2xl shadow-2xl overflow-hidden border-4 border-gray-300 dark:border-gray-600">
                <img src={generateFavicon()} alt="Favicon Preview" className="w-full h-full" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Text/Letter
                </label>
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  maxLength={1}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-center text-2xl font-bold"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Font Size
                </label>
                <input
                  type="range"
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  min="24"
                  max="56"
                  className="w-full"
                />
                <div className="text-center text-gray-600 dark:text-gray-400 text-sm mt-1">
                  {fontSize}px
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Background Color
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-16 h-16 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono uppercase"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Text Color
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-16 h-16 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono uppercase"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={downloadFavicon}
              className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center justify-center"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Download Favicon (64x64)
            </button>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">📝 How to Use</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li>1. Enter a single letter or character</li>
            <li>2. Choose colors and size</li>
            <li>3. Download as favicon.png</li>
            <li>4. Add to your HTML: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">&lt;link rel="icon" href="favicon.png"&gt;</code></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
