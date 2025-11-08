import { useState } from 'react';

export default function ColorConverter() {
  const [hex, setHex] = useState('#3B82F6');
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 });
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 });

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    } else {
      s = 0;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const updateFromHex = (newHex: string) => {
    setHex(newHex);
    const newRgb = hexToRgb(newHex);
    setRgb(newRgb);
    setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
  };

  const updateFromRgb = (newRgb: { r: number, g: number, b: number }) => {
    setRgb(newRgb);
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Color Converter</h1>
        <p className="text-gray-600 text-lg">
          Convert colors between HEX, RGB, and HSL formats
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-6">
        <div className="mb-8">
          <div
            className="w-full h-40 rounded-lg border-4 border-gray-200 shadow-inner"
            style={{ backgroundColor: hex }}
          />
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              HEX Color
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={hex}
                onChange={(e) => updateFromHex(e.target.value)}
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none font-mono"
              />
              <input
                type="color"
                value={hex}
                onChange={(e) => updateFromHex(e.target.value)}
                className="w-16 h-12 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              RGB Color
            </label>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Red</label>
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={rgb.r}
                  onChange={(e) => updateFromRgb({ ...rgb, r: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Green</label>
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={rgb.g}
                  onChange={(e) => updateFromRgb({ ...rgb, g: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Blue</label>
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={rgb.b}
                  onChange={(e) => updateFromRgb({ ...rgb, b: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
                />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600 font-mono">
              rgb({rgb.r}, {rgb.g}, {rgb.b})
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              HSL Color
            </label>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Hue</label>
                <input
                  type="number"
                  min="0"
                  max="360"
                  value={hsl.h}
                  readOnly
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Saturation</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={hsl.s}
                  readOnly
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Lightness</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={hsl.l}
                  readOnly
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg bg-gray-50"
                />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600 font-mono">
              hsl({hsl.h}°, {hsl.s}%, {hsl.l}%)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
