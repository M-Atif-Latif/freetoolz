import { useState } from 'react';
import { FileArchive, Info } from 'lucide-react';

interface ZipFileInfo {
  name: string;
  size: number;
  compressedSize: number;
  ratio: string;
  type: string;
}

export default function ZIPFileInspector() {
  const [files, setFiles] = useState<ZipFileInfo[]>([]);
  const [totalSize, setTotalSize] = useState(0);
  const [totalCompressed, setTotalCompressed] = useState(0);
  const [fileName, setFileName] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    
    // Note: Full ZIP parsing requires a library like jszip
    // This is a simplified version showing file metadata
    const fileList: ZipFileInfo[] = [{
      name: file.name,
      size: file.size,
      compressedSize: file.size,
      ratio: '0%',
      type: file.type || 'application/zip',
    }];

    setFiles(fileList);
    setTotalSize(file.size);
    setTotalCompressed(file.size);
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-500 to-slate-600 rounded-2xl mb-4 shadow-lg">
            <FileArchive className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            ZIP File Inspector
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Inspect ZIP archive contents, sizes, and compression ratios
          </p>
        </div>

        {/* Upload */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-gray-500 to-slate-600 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Upload ZIP File</h2>
          </div>
          <div className="p-8">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
              <FileArchive className="h-16 w-16 text-gray-400 mb-4" />
              <span className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {fileName || 'Click to upload ZIP file'}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Supports .zip files
              </span>
              <input
                type="file"
                accept=".zip"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Summary */}
        {files.length > 0 && (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Files</div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {files.length}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Uncompressed</div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {formatBytes(totalSize)}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Compressed</div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {formatBytes(totalCompressed)}
                </div>
              </div>
            </div>

            {/* File List */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 px-6 py-4">
                <h2 className="text-lg font-semibold text-white">File Contents</h2>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                          Filename
                        </th>
                        <th className="px-4 py-3 text-right font-semibold text-gray-900 dark:text-white">
                          Size
                        </th>
                        <th className="px-4 py-3 text-right font-semibold text-gray-900 dark:text-white">
                          Compressed
                        </th>
                        <th className="px-4 py-3 text-right font-semibold text-gray-900 dark:text-white">
                          Ratio
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {files.map((file, idx) => (
                        <tr key={idx} className="border-t border-gray-200 dark:border-gray-700">
                          <td className="px-4 py-3 text-gray-900 dark:text-white font-mono text-xs">
                            {file.name}
                          </td>
                          <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-400">
                            {formatBytes(file.size)}
                          </td>
                          <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-400">
                            {formatBytes(file.compressedSize)}
                          </td>
                          <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-400">
                            {file.ratio}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Note */}
        <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800 flex items-start">
          <Info className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Note</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              This is a basic ZIP file inspector showing file metadata. For full ZIP extraction and
              detailed analysis, a dedicated ZIP library would be required. Currently displays basic file
              information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
