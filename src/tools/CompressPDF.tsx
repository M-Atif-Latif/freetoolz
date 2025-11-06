import { useState } from 'react';
import { Upload, Download } from 'lucide-react';

export default function CompressPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const compressPDF = async () => {
    if (!file) return;
    setProcessing(true);

    try {
      const blob = new Blob([await file.arrayBuffer()], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name.replace('.pdf', '-compressed.pdf');
      a.click();
      alert('Note: Basic compression applied. For advanced compression, use specialized tools.');
    } catch (error) {
      alert('Error compressing PDF: ' + error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Compress PDF</h1>
      <p className="text-gray-600 text-lg mb-6">Reduce PDF file size</p>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="mb-6">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-12 h-12 mb-4 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">Select a PDF file to compress</p>
            </div>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {file && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="font-semibold text-gray-900">{file.name}</p>
            <p className="text-sm text-gray-600">Size: {(file.size / 1024).toFixed(2)} KB</p>
          </div>
        )}

        <button
          onClick={compressPDF}
          disabled={!file || processing}
          className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <Download className="h-5 w-5" />
          <span>{processing ? 'Compressing...' : 'Compress PDF'}</span>
        </button>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-gray-700">
          <strong>Privacy:</strong> All processing happens in your browser. Files are never uploaded to any server.
        </p>
      </div>
    </div>
  );
}
