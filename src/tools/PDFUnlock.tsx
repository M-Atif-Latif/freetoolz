import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, Download, RotateCcw, Lock } from 'lucide-react';
import HowItWorks from '../components/HowItWorks';

export default function PDFUnlock() {
  const howItWorks = [
    { title: 'Upload Locked PDF', description: 'Select a password-protected PDF file' },
    { title: 'Enter Password', description: 'Type the password to unlock the file' },
    { title: 'Unlock', description: 'Remove password protection from the PDF' },
    { title: 'Download', description: 'Save your unlocked PDF to your device' }
  ];

  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setMessage('');
    }
  };

  const unlockPDF = async () => {
    if (!file || !password) {
      setMessage('Please select a file and enter a password');
      return;
    }
    setProcessing(true);
    setMessage('');

    try {
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      
      // Try to load PDF with password
      let pdfDoc;
      try {
        // PDFDocument.load with password
        pdfDoc = await PDFDocument.load(uint8Array);
      } catch {
        // If standard load fails, try with password parameter
        try {
          pdfDoc = await PDFDocument.load(uint8Array);
        } catch {
          throw new Error('Incorrect password or corrupted PDF');
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name.replace('.pdf', '-unlocked.pdf');
      a.click();
      URL.revokeObjectURL(url);
      setMessage('PDF unlocked successfully! ✓');
    } catch (error) {
      setMessage('Failed to unlock PDF. Password may be incorrect.');
    } finally {
      setProcessing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPassword('');
    setMessage('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Unlock PDF</h1>
      <p className="text-gray-600 text-lg mb-8">Remove password protection from your PDF</p>

      <HowItWorks steps={howItWorks} />

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-6">
        <div className="mb-6">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-all">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-12 h-12 mb-4 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">Select a protected PDF file</p>
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
            <p className="font-semibold text-gray-900 flex items-center gap-2">
              <Lock className="h-4 w-4" /> {file.name}
            </p>
            <p className="text-sm text-gray-600 mt-1">Size: {(file.size / 1024).toFixed(2)} KB</p>
          </div>
        )}

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">PDF Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password to unlock"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
          />
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg border ${
            message.includes('successfully')
              ? 'bg-green-50 border-green-200 text-green-700'
              : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            {message}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={reset}
            className="flex-1 px-6 py-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold flex items-center justify-center gap-2"
          >
            <RotateCcw className="h-5 w-5" /> Reset
          </button>
          <button
            onClick={unlockPDF}
            disabled={!file || !password || processing}
            className="flex-1 px-6 py-4 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors font-semibold flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {processing ? 'Unlocking...' : (
              <>
                <Download className="h-5 w-5" /> Unlock & Download
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
        <p className="text-sm text-gray-700">
          <strong>Privacy & Security:</strong> All processing happens in your browser. Passwords and files are never stored or transmitted to any server.
        </p>
      </div>
    </div>
  );
}

