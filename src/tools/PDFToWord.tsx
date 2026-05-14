import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, AlertCircle } from 'lucide-react';
import HowItWorks from '../components/HowItWorks';

export default function PDFToWord() {
  const howItWorks = [
    { title: 'Upload PDF', description: 'Select a PDF file to convert' },
    { title: 'Review', description: 'Check PDF content and formatting' },
    { title: 'Convert', description: 'Process conversion to Word format' },
    { title: 'Download', description: 'Save as .docx file' }
  ];

  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      setPageCount(pdf.getPageCount());
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">PDF to Word</h1>
      <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">Convert PDF documents to editable Word files</p>

      <HowItWorks steps={howItWorks} />

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
        <div className="mb-6 p-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800 dark:text-primary-300">
            <p className="font-semibold mb-1">Advanced Feature</p>
            <p>This tool requires integration with professional conversion services. For best results with complex PDFs, use dedicated tools like:</p>
            <ul className="mt-2 space-y-1 ml-4">
              <li>• Adobe Acrobat</li>
              <li>• Microsoft Word (Open PDF)</li>
              <li>• CloudConvert API</li>
              <li>• Zamzar or similar services</li>
            </ul>
          </div>
        </div>

        <div className="mb-6">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all">
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
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
            <p className="font-semibold text-gray-900 dark:text-white mb-1">{file.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Pages: {pageCount}</p>
          </div>
        )}

        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <p className="text-sm text-yellow-800 dark:text-yellow-300">
            <strong>Coming Soon:</strong> This tool will soon support direct PDF to Word conversion for text-based PDFs.
          </p>
        </div>
      </div>
    </div>
  );
}

