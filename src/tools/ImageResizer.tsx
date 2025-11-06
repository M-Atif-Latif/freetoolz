import { useState } from 'react';
import { Upload, Download } from 'lucide-react';

export default function ImageResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [resized, setResized] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const resizeImage = () => {
    if (!preview) return;

    const canvas = document.createElement('canvas');
    const img = new Image();
    img.onload = () => {
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, width, height);

      const url = canvas.toDataURL('image/png');
      setResized(url);
    };
    img.src = preview;
  };

  const downloadImage = () => {
    if (!resized) return;
    const a = document.createElement('a');
    a.href = resized;
    a.download = file?.name.replace(/\.[^/.]+$/, '') + `-${width}x${height}.png` || 'resized.png';
    a.click();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Image Resizer</h1>
      <p className="text-gray-600 text-lg mb-6">Resize images to custom dimensions</p>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="mb-6">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-12 h-12 mb-4 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, WEBP</p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {preview && (
          <>
            <div className="mb-6">
              <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Width (px)</label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(parseInt(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height (px)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(parseInt(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
                />
              </div>
            </div>

            <button
              onClick={resizeImage}
              className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg mb-4"
            >
              Resize Image
            </button>

            {resized && (
              <div className="space-y-4">
                <img src={resized} alt="Resized" className="max-h-64 mx-auto rounded-lg border border-gray-200" />
                <button
                  onClick={downloadImage}
                  className="w-full px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center space-x-2"
                >
                  <Download className="h-5 w-5" />
                  <span>Download Resized Image</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
