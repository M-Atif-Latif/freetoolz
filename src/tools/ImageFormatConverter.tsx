import { useState } from 'react';
import { Upload, Download } from 'lucide-react';

export default function ImageFormatConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [format, setFormat] = useState<'png' | 'jpeg' | 'webp'>('png');
  const [converted, setConverted] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const convertImage = () => {
    if (!preview) return;

    const canvas = document.createElement('canvas');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);

      const mimeType = format === 'jpeg' ? 'image/jpeg' : format === 'webp' ? 'image/webp' : 'image/png';
      const url = canvas.toDataURL(mimeType, 0.9);
      setConverted(url);
    };
    img.src = preview;
  };

  const downloadImage = () => {
    if (!converted) return;
    const a = document.createElement('a');
    a.href = converted;
    a.download = file?.name.replace(/\.[^/.]+$/, '') + `.${format}` || `converted.${format}`;
    a.click();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Image Format Converter</h1>
      <p className="text-gray-600 text-lg mb-6">Convert images between PNG, JPG, and WEBP formats</p>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="mb-6">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-12 h-12 mb-4 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
            </div>
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
        </div>

        {preview && (
          <>
            <div className="mb-6">
              <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Convert to:</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'png', label: 'PNG' },
                  { value: 'jpeg', label: 'JPG' },
                  { value: 'webp', label: 'WEBP' }
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => setFormat(value as any)}
                    className={`px-4 py-3 rounded-lg border-2 font-medium ${
                      format === value ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={convertImage} className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg mb-4">
              Convert Image
            </button>

            {converted && (
              <button onClick={downloadImage} className="w-full px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center space-x-2">
                <Download className="h-5 w-5" />
                <span>Download {format.toUpperCase()}</span>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
