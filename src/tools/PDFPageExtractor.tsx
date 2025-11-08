import { useState } from 'react';
import { FileText, Download } from 'lucide-react';

export default function PDFPageExtractor() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pageRange, setPageRange] = useState('');
  const [status, setStatus] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      setStatus(`Loaded: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`);
    }
  };

  const extractPages = () => {
    if (!pdfFile) {
      setStatus('Please upload a PDF file first');
      return;
    }

    setStatus('⚠️ PDF extraction requires a backend library like pdf-lib or PDFjs. This is a demo placeholder.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl mb-4 shadow-lg">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            PDF Page Extractor
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Extract specific pages from PDF documents
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-red-500 to-orange-600 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Upload PDF</h2>
          </div>
          <div className="p-8">
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
              <FileText className="h-12 w-12 text-gray-400 mb-3" />
              <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                {pdfFile ? pdfFile.name : 'Click to upload PDF'}
              </span>
              <input type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />
            </label>

            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Page Range (e.g., 1-3, 5, 7-9)
              </label>
              <input
                type="text"
                value={pageRange}
                onChange={(e) => setPageRange(e.target.value)}
                placeholder="1-5"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <button
              onClick={extractPages}
              disabled={!pdfFile}
              className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center"
            >
              <Download className="h-5 w-5 mr-2" />
              Extract Pages
            </button>

            {status && (
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <p className="text-sm text-gray-700 dark:text-gray-300">{status}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">⚠️ Note</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Full PDF manipulation requires server-side processing with libraries like pdf-lib or PyPDF2. This is a UI demonstration.
          </p>
        </div>
      </div>
    </div>
  );
}
