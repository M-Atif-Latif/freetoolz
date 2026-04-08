import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import HowItWorks from '../components/HowItWorks';

export default function HTMLToPDF() {
  const howItWorks = [
    { title: 'Enter HTML', description: 'Paste your HTML content' },
    { title: 'Preview', description: 'See how it will look in PDF' },
    { title: 'Convert', description: 'Generate PDF from HTML' },
    { title: 'Download', description: 'Save as PDF file' }
  ];

  const [html, setHtml] = useState('');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">HTML to PDF</h1>
      <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">Convert HTML content to PDF documents</p>

      <HowItWorks steps={howItWorks} />

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800 dark:text-blue-300">
            <p className="font-semibold mb-1">HTML Rendering</p>
            <p>For reliable HTML to PDF conversion with complex layouts:</p>
            <ul className="mt-2 space-y-1 ml-4">
              <li>• wkhtmltopdf (command line)</li>
              <li>• Puppeteer (Node.js)</li>
              <li>• html2pdf JavaScript library</li>
              <li>• Professional services (PrintFriendly, etc.)</li>
            </ul>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">HTML Content</label>
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            placeholder="Paste your HTML here..."
            className="w-full h-64 px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-none focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <p className="text-sm text-yellow-800 dark:text-yellow-300">
            <strong>Coming Soon:</strong> Full HTML to PDF rendering with CSS support coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}
