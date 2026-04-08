import { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import { Upload, Download } from 'lucide-react';
import HowItWorks from '../components/HowItWorks';
import { createBlobFromBytes } from '../utils/blob';

export default function PDFRedact() {
  const howItWorks = [
    { title: 'Upload PDF', description: 'Select a PDF file to redact' },
    { title: 'Configure', description: 'Set redaction area dimensions' },
    { title: 'Redact', description: 'Cover sensitive content with black boxes' },
    { title: 'Download', description: 'Save redacted PDF' }
  ];

  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [redactionAreas, setRedactionAreas] = useState([
    { x: 50, y: 100, width: 200, height: 30, page: 1 }
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const redactPDF = async () => {
    if (!file) return;
    setProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();

      redactionAreas.forEach((area) => {
        if (area.page <= pages.length) {
          const page = pages[area.page - 1];
          page.drawRectangle({
            x: area.x,
            y: area.y,
            width: area.width,
            height: area.height,
            color: rgb(0, 0, 0)
          });
        }
      });

      const pdfBytes = await pdfDoc.save();
      const blob = createBlobFromBytes(pdfBytes, 'application/pdf');
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name.replace('.pdf', '-redacted.pdf');
      a.click();
    } catch (error) {
      console.error('Error redacting PDF:', error);
    } finally {
      setProcessing(false);
    }
  };

  const addRedactionArea = () => {
    setRedactionAreas([
      ...redactionAreas,
      { x: 50, y: 100, width: 200, height: 30, page: 1 }
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Redact PDF</h1>
      <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">Cover sensitive content in PDF with redaction</p>

      <HowItWorks steps={howItWorks} />

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
        <div className="mb-6">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-12 h-12 mb-4 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">PDF files only</p>
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
          <>
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="font-semibold text-gray-900 dark:text-white">{file.name}</p>
            </div>

            <div className="mb-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 dark:text-white">Redaction Areas</h3>
                <button
                  onClick={addRedactionArea}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  + Add Area
                </button>
              </div>

              {redactionAreas.map((area, idx) => (
                <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Redaction Area {idx + 1}
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="X"
                      value={area.x}
                      onChange={(e) => {
                        const newAreas = [...redactionAreas];
                        newAreas[idx].x = parseInt(e.target.value) || 0;
                        setRedactionAreas(newAreas);
                      }}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Y"
                      value={area.y}
                      onChange={(e) => {
                        const newAreas = [...redactionAreas];
                        newAreas[idx].y = parseInt(e.target.value) || 0;
                        setRedactionAreas(newAreas);
                      }}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Width"
                      value={area.width}
                      onChange={(e) => {
                        const newAreas = [...redactionAreas];
                        newAreas[idx].width = parseInt(e.target.value) || 0;
                        setRedactionAreas(newAreas);
                      }}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Height"
                      value={area.height}
                      onChange={(e) => {
                        const newAreas = [...redactionAreas];
                        newAreas[idx].height = parseInt(e.target.value) || 0;
                        setRedactionAreas(newAreas);
                      }}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={redactPDF}
              disabled={processing}
              className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Download className="h-5 w-5" />
              <span>{processing ? 'Processing...' : 'Redact PDF'}</span>
            </button>
          </>
        )}
      </div>

      <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>Note:</strong> Redacted content is covered but may not be permanently removed. For sensitive documents, use professional redaction software.
        </p>
      </div>
    </div>
  );
}
