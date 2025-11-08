import { useState } from 'react';
import { Upload, Download } from 'lucide-react';

export default function GrayscaleConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [grayscale, setGrayscale] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const convertToGrayscale = () => {
    if (!preview) return;

    const canvas = document.createElement('canvas');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
        data[i] = gray;
        data[i + 1] = gray;
        data[i + 2] = gray;
      }

      ctx.putImageData(imageData, 0, 0);
      setGrayscale(canvas.toDataURL('image/png'));
    };
    img.src = preview;
  };

  const downloadImage = () => {
    if (!grayscale) return;
    const a = document.createElement('a');
    a.href = grayscale;
    a.download = file?.name.replace(/\.[^/.]+$/, '') + '-grayscale.png' || 'grayscale.png';
    a.click();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Grayscale Image Converter</h1>
      <p className="text-gray-600 text-lg mb-6">Convert color images to grayscale</p>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="mb-6">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-12 h-12 mb-4 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span></p>
            </div>
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
        </div>

        {preview && (
          <>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold mb-2">Original</h3>
                <img src={preview} alt="Original" className="w-full rounded-lg border border-gray-200" />
              </div>
              {grayscale && (
                <div>
                  <h3 className="font-semibold mb-2">Grayscale</h3>
                  <img src={grayscale} alt="Grayscale" className="w-full rounded-lg border border-gray-200" />
                </div>
              )}
            </div>

            {!grayscale ? (
              <button onClick={convertToGrayscale} className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg">
                Convert to Grayscale
              </button>
            ) : (
              <button onClick={downloadImage} className="w-full px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center space-x-2">
                <Download className="h-5 w-5" />
                <span>Download Grayscale Image</span>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
