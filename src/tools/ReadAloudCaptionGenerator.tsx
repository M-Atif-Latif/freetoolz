import { useState } from 'react';
import { MessageSquare, Volume2 } from 'lucide-react';

export default function ReadAloudCaptionGenerator() {
  const [text, setText] = useState('');
  const [wordsPerMinute, setWordsPerMinute] = useState(150);

  const generateCaptions = () => {
    if (!text.trim()) return [];
    
    const words = text.trim().split(/\s+/);
    const wordsPerCaption = Math.ceil((wordsPerMinute / 60) * 3); // 3-second captions
    const captions: { text: string; start: number; end: number }[] = [];
    
    for (let i = 0; i < words.length; i += wordsPerCaption) {
      const captionWords = words.slice(i, i + wordsPerCaption);
      const start = (i / wordsPerMinute) * 60;
      const end = ((i + captionWords.length) / wordsPerMinute) * 60;
      
      captions.push({
        text: captionWords.join(' '),
        start: Math.round(start * 10) / 10,
        end: Math.round(end * 10) / 10
      });
    }
    
    return captions;
  };

  const captions = generateCaptions();

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = (seconds % 60).toFixed(1);
    return `${mins}:${secs.padStart(4, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <MessageSquare className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Read-Aloud Caption Generator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Generate timed captions for videos or audio narration. Perfect for accessibility and video editing.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Script / Narration Text
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your script or narration text here..."
              className="w-full h-64 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all outline-none resize-none text-base leading-relaxed"
            />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              <Volume2 className="inline h-4 w-4 mr-2" />
              Speaking Speed (WPM)
            </label>
            <input
              type="range"
              min="100"
              max="200"
              value={wordsPerMinute}
              onChange={(e) => setWordsPerMinute(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="text-center mt-2">
              <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{wordsPerMinute}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">words/minute</span>
            </div>
            <div className="mt-6 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p><strong>Slow:</strong> 100-130 WPM</p>
              <p><strong>Normal:</strong> 130-160 WPM</p>
              <p><strong>Fast:</strong> 160-200 WPM</p>
            </div>
          </div>
        </div>

        {captions.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Generated Captions ({captions.length})</h2>
            </div>
            <div className="p-6 space-y-3 max-h-[500px] overflow-y-auto">
              {captions.map((caption, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-mono text-gray-600 dark:text-gray-400">
                      {formatTime(caption.start)} → {formatTime(caption.end)}
                    </span>
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                      #{index + 1}
                    </span>
                  </div>
                  <p className="text-gray-900 dark:text-white leading-relaxed">{caption.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
