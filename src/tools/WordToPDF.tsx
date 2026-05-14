import { useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import HowItWorks from '../components/HowItWorks';

export default function WordToPDF() {
  const howItWorks = [
    { title: 'Upload Word', description: 'Select a .docx or .doc file' },
    { title: 'Review', description: 'Check file content and formatting' },
    { title: 'Convert', description: 'Convert to PDF format' },
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
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Word to PDF</h1>
      <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">Convert Word documents (.docx, .doc) to PDF</p>

      <HowItWorks steps={howItWorks} />

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
        <div className="mb-6 p-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800 dark:text-primary-300">
            <p className="font-semibold mb-1">Native Microsoft Tools</p>
            <p>Word to PDF conversion is easiest with:</p>
            <ul className="mt-2 space-y-1 ml-4">
              <li>• Microsoft Word (File → Export as PDF)</li>
              <li>• LibreOffice Writer (free)</li>
              <li>• Online converters (Smallpdf, ILovePDF)</li>
              <li>• Cloud services (Google Drive)</li>
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
              <p className="text-xs text-gray-500 dark:text-gray-400">Word files (.docx, .doc)</p>
            </div>
            <input
              type="file"
              accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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
            <strong>Recommendation:</strong> For best results, use Microsoft Word's native "Save as PDF" feature to maintain formatting.
          </p>
        </div>
      </div>
    </div>
  );
}

