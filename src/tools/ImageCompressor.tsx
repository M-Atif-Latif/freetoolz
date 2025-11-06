import { useState } from 'react';
import { Upload, Download } from 'lucide-react';

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [quality, setQuality] = useState(80);
  const [compressed, setCompressed] = useState('');
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setOriginalSize(selectedFile.size);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const compressImage = () => {
    if (!preview) return;

    const canvas = document.createElement('canvas');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            setCompressedSize(blob.size);
            const url = URL.createObjectURL(blob);
            setCompressed(url);
          }
        },
        'image/jpeg',
        quality / 100
      );
    };
    img.src = preview;
  };

  const downloadImage = () => {
    if (!compressed) return;
    const a = document.createElement('a');
    a.href = compressed;
    a.download = file?.name.replace(/\.[^/.]+$/, '') + '-compressed.jpg' || 'compressed.jpg';
    a.click();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Image Compressor</h1>
      <p className="text-gray-600 text-lg mb-6">Reduce image file size while maintaining quality</p>

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

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Quality: {quality}%
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <button
              onClick={compressImage}
              className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg mb-4"
            >
              Compress Image
            </button>

            {compressed && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Original</p>
                    <p className="text-lg font-bold text-gray-900">{(originalSize / 1024).toFixed(2)} KB</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Compressed</p>
                    <p className="text-lg font-bold text-green-600">{(compressedSize / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
                <button
                  onClick={downloadImage}
                  className="w-full px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center space-x-2"
                >
                  <Download className="h-5 w-5" />
                  <span>Download Compressed Image</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
