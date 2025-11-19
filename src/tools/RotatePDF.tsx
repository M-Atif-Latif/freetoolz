import { useState } from 'react';
import { PDFDocument, degrees } from 'pdf-lib';
import { Upload, Download, RotateCw } from 'lucide-react';

export default function RotatePDF() {
  const [file, setFile] = useState<File | null>(null);
  const [rotation, setRotation] = useState(90);
  const [processing, setProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const rotatePDF = async () => {
    if (!file) return;
    setProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();

      pages.forEach(page => {
        page.setRotation(degrees(rotation));
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name.replace('.pdf', '-rotated.pdf');
      a.click();
    } catch (error) {
      alert('Error rotating PDF: ' + error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Rotate PDF</h1>
      <p className="text-gray-600 text-lg mb-6">Rotate all pages in your PDF document</p>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="mb-6">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-12 h-12 mb-4 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">Select a PDF file</p>
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
          </div>
        )}

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Rotation Angle</label>
          <div className="grid grid-cols-4 gap-3">
            {[90, 180, 270, 360].map(angle => (
              <button
                key={angle}
                onClick={() => setRotation(angle)}
                className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                  rotation === angle
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <RotateCw className="h-5 w-5 mx-auto mb-1" />
                {angle}°
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={rotatePDF}
          disabled={!file || processing}
          className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <Download className="h-5 w-5" />
          <span>{processing ? 'Rotating...' : 'Rotate PDF'}</span>
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
