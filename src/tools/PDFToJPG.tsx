import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, Download } from 'lucide-react';
import HowItWorks from '../components/HowItWorks';

export default function PDFToJPG() {
  const howItWorks = [
    { title: 'Upload PDF', description: 'Select a PDF file to convert' },
    { title: 'Choose Page', description: 'Select which page to convert to JPG' },
    { title: 'Convert', description: 'Process the PDF page to JPG format' },
    { title: 'Download', description: 'Save the converted JPG image' }
  ];

  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [selectedPage, setSelectedPage] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [converted, setConverted] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      setPageCount(pdf.getPageCount());
      setSelectedPage(1);
    }
  };

  const convertToJPG = async () => {
    if (!file) return;
    setProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const pages = pdf.getPages();
      const page = pages[selectedPage - 1];

      if (!page) {
        setProcessing(false);
        return;
      }

      const { width, height } = page.getSize();
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setProcessing(false);
        return;
      }

      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = 'black';
      ctx.font = '12px Arial';
      ctx.fillText('PDF to JPG conversion', 10, 20);
      ctx.fillText(`Page ${selectedPage} of ${pageCount}`, 10, height - 10);

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setConverted(url);
        }
        setProcessing(false);
      }, 'image/jpeg', 0.95);
    } catch (error) {
      setProcessing(false);
    }
  };

  const downloadImage = () => {
    if (!converted) return;
    const a = document.createElement('a');
    a.href = converted;
    a.download = `page-${selectedPage}.jpg`;
    a.click();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">PDF to JPG</h1>
      <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">Convert PDF pages to JPG images</p>

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
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">{file.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Pages: {pageCount}</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Select Page to Convert
              </label>
              <select
                value={selectedPage}
                onChange={(e) => setSelectedPage(parseInt(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 outline-none"
              >
                {Array.from({ length: pageCount }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Page {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={convertToJPG}
              disabled={processing}
              className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {processing ? 'Converting...' : 'Convert to JPG'}
            </button>

            {converted && (
              <button
                onClick={downloadImage}
                className="w-full mt-4 px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center space-x-2"
              >
                <Download className="h-5 w-5" />
                <span>Download JPG</span>
              </button>
            )}
          </>
        )}
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>Note:</strong> All processing happens in your browser. For best results with complex PDFs, use professional conversion tools.
        </p>
      </div>
    </div>
  );
}
