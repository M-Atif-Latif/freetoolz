import { useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import HowItWorks from '../components/HowItWorks';

export default function PowerPointToPDF() {
  const howItWorks = [
    { title: 'Upload PowerPoint', description: 'Select a .pptx or .ppt file' },
    { title: 'Review', description: 'Check presentation content' },
    { title: 'Convert', description: 'Convert slides to PDF' },
    { title: 'Download', description: 'Save as PDF file' }
  ];

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">PowerPoint to PDF</h1>
      <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">Convert PowerPoint presentations to PDF</p>

      <HowItWorks steps={howItWorks} />

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800 dark:text-blue-300">
            <p className="font-semibold mb-1">Easy Conversion Options</p>
            <p>Convert PowerPoint to PDF quickly with:</p>
            <ul className="mt-2 space-y-1 ml-4">
              <li>• Microsoft PowerPoint (File → Export as PDF)</li>
              <li>• LibreOffice Impress (free)</li>
              <li>• Online tools (Smallpdf, CloudConvert)</li>
              <li>• Google Slides (Download as PDF)</li>
            </ul>
          </div>
        </div>

        <div className="mb-6">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-12 h-12 mb-4 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">PowerPoint files (.pptx, .ppt)</p>
            </div>
            <input
              type="file"
              accept=".ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {file && (
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="font-semibold text-gray-900 dark:text-white">{file.name}</p>
          </div>
        )}

        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <p className="text-sm text-yellow-800 dark:text-yellow-300">
            <strong>Pro Tip:</strong> Use PowerPoint's "File → Export as PDF" for best formatting and animation preservation.
          </p>
        </div>
      </div>
    </div>
  );
}
