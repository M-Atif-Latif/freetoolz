import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload } from 'lucide-react';
import HowItWorks from '../components/HowItWorks';
import { createBlobFromBytes } from '../utils/blob';

export default function JPGToPDF() {
  const howItWorks = [
    { title: 'Upload JPG', description: 'Select one or more JPG images' },
    { title: 'Arrange', description: 'Set the order of images in PDF' },
    { title: 'Convert', description: 'Combine images into PDF' },
    { title: 'Download', description: 'Save as PDF file' }
  ];

  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      setFiles(Array.from(selectedFiles));
    }
  };

  const createPDF = async () => {
    if (files.length === 0) return;
    setProcessing(true);

    try {
      const pdfDoc = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const image = await pdfDoc.embedJpg(arrayBuffer);
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();
        const imgWidth = Math.min(width - 40, 500);
        const imgHeight = (imgWidth / image.width) * image.height;
        page.drawImage(image, {
          x: (width - imgWidth) / 2,
          y: height - imgHeight - 20,
          width: imgWidth,
          height: imgHeight
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = createBlobFromBytes(pdfBytes, 'application/pdf');
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'images.pdf';
      a.click();
    } catch (error) {
      console.error('Error creating PDF:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">JPG to PDF</h1>
      <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">Convert JPG images to PDF</p>

      <HowItWorks steps={howItWorks} />

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
        <div className="mb-6">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-12 h-12 mb-4 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">JPG, JPEG files</p>
            </div>
            <input
              type="file"
              accept="image/jpeg,image/jpg"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {files.length > 0 && (
          <>
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">Selected Files: {files.length}</p>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                {files.map((file, idx) => (
                  <li key={idx}>{idx + 1}. {file.name}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={createPDF}
              disabled={processing}
              className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {processing ? 'Creating PDF...' : 'Create PDF'}
            </button>
          </>
        )}
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>Privacy:</strong> All processing happens in your browser. Images are not uploaded to any server.
        </p>
      </div>
    </div>
  );
}
