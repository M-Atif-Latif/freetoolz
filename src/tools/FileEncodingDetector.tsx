import { useState } from 'react';
import { FileSearch, Upload } from 'lucide-react';

export default function FileEncodingDetector() {
  const [text, setText] = useState('');
  const [fileName, setFileName] = useState('');
  const [encoding, setEncoding] = useState('');
  const [details, setDetails] = useState<string[]>([]);

  const detectEncoding = (content: string) => {
    const bytes = new TextEncoder().encode(content);
    const detectedDetails: string[] = [];
    let detectedEncoding = 'UTF-8';

    // Check for BOM (Byte Order Mark)
    if (bytes.length >= 3 && bytes[0] === 0xEF && bytes[1] === 0xBB && bytes[2] === 0xBF) {
      detectedEncoding = 'UTF-8 with BOM';
      detectedDetails.push('✓ UTF-8 BOM detected (EF BB BF)');
    } else if (bytes.length >= 2 && bytes[0] === 0xFE && bytes[1] === 0xFF) {
      detectedEncoding = 'UTF-16 BE';
      detectedDetails.push('✓ UTF-16 Big Endian BOM detected (FE FF)');
    } else if (bytes.length >= 2 && bytes[0] === 0xFF && bytes[1] === 0xFE) {
      detectedEncoding = 'UTF-16 LE';
      detectedDetails.push('✓ UTF-16 Little Endian BOM detected (FF FE)');
    }

    // Check for ASCII
    const isAscii = bytes.every(b => b < 128);
    if (isAscii) {
      detectedEncoding = 'ASCII';
      detectedDetails.push('✓ All characters are ASCII (0-127)');
    }

    // Check for extended ASCII or UTF-8
    const hasExtendedAscii = bytes.some(b => b >= 128 && b < 256);
    if (hasExtendedAscii) {
      detectedDetails.push('✓ Contains extended ASCII/UTF-8 characters (128-255)');
      
      // Simple UTF-8 validation
      let isValidUtf8 = true;
      for (let i = 0; i < bytes.length; i++) {
        if (bytes[i] > 127) {
          if ((bytes[i] & 0xE0) === 0xC0) {
            if (i + 1 >= bytes.length || (bytes[i + 1] & 0xC0) !== 0x80) {
              isValidUtf8 = false;
              break;
            }
            i += 1;
          } else if ((bytes[i] & 0xF0) === 0xE0) {
            if (i + 2 >= bytes.length || (bytes[i + 1] & 0xC0) !== 0x80 || (bytes[i + 2] & 0xC0) !== 0x80) {
              isValidUtf8 = false;
              break;
            }
            i += 2;
          }
        }
      }
      
      if (isValidUtf8) {
        detectedEncoding = 'UTF-8';
        detectedDetails.push('✓ Valid UTF-8 encoding detected');
      }
    }

    // Character statistics
    detectedDetails.push(`Total bytes: ${bytes.length}`);
    detectedDetails.push(`Total characters: ${content.length}`);
    
    const uniqueChars = new Set(content).size;
    detectedDetails.push(`Unique characters: ${uniqueChars}`);

    // Line ending detection
    const hasCRLF = content.includes('\r\n');
    const hasLF = content.includes('\n');
    const hasCR = content.includes('\r');
    
    if (hasCRLF) detectedDetails.push('Line endings: CRLF (Windows)');
    else if (hasLF) detectedDetails.push('Line endings: LF (Unix/Mac)');
    else if (hasCR) detectedDetails.push('Line endings: CR (Old Mac)');

    setEncoding(detectedEncoding);
    setDetails(detectedDetails);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setText(content.substring(0, 10000)); // Limit to first 10k chars for display
      detectEncoding(content);
    };
    
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl mb-4 shadow-lg">
            <FileSearch className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            File Encoding Detector
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Detect character encoding of text files (UTF-8, ASCII, UTF-16, etc.)
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Input Text or Upload File</h2>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="flex items-center justify-center w-full px-4 py-6 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-all">
                  <Upload className="h-6 w-6 text-gray-500 dark:text-gray-400 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {fileName || 'Click to upload file'}
                  </span>
                  <input
                    type="file"
                    accept=".txt,.csv,.json,.xml,.html,.css,.js,.md"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="text-center text-gray-500 dark:text-gray-400 text-sm mb-4">OR</div>

              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your text here to detect encoding..."
                className="w-full h-64 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-none"
              />

              <button
                onClick={() => detectEncoding(text)}
                disabled={!text}
                className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FileSearch className="inline h-5 w-5 mr-2" />
                Detect Encoding
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Detection Results</h2>
            </div>
            <div className="p-6">
              {encoding ? (
                <>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-800 mb-6">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Detected Encoding:</div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {encoding}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Details:</h3>
                    {details.map((detail, idx) => (
                      <div
                        key={idx}
                        className="flex items-start p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                          {detail}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                  Upload a file or paste text to detect encoding
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Common Encodings</h3>
          <ul className="grid md:grid-cols-2 gap-2 text-gray-700 dark:text-gray-300 text-sm">
            <li>• <strong>ASCII:</strong> 7-bit encoding (0-127)</li>
            <li>• <strong>UTF-8:</strong> Universal, variable-width (1-4 bytes)</li>
            <li>• <strong>UTF-16:</strong> Fixed 2 or 4 bytes per character</li>
            <li>• <strong>ISO-8859-1:</strong> Latin-1, Western European</li>
            <li>• <strong>Windows-1252:</strong> Extended Latin alphabet</li>
            <li>• <strong>BOM:</strong> Byte Order Mark at file start</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
