import { useState } from 'react';
import { Expand, Shrink, ArrowLeftRight } from 'lucide-react';

export default function ContractionExpander() {
  const [text, setText] = useState('');
  const [mode, setMode] = useState<'expand' | 'compress'>('expand');

  const contractions: { [key: string]: string } = {
    "won't": "will not", "can't": "cannot", "n't": " not",
    "I'm": "I am", "you're": "you are", "he's": "he is", "she's": "she is",
    "it's": "it is", "we're": "we are", "they're": "they are",
    "I've": "I have", "you've": "you have", "we've": "we have", "they've": "they have",
    "I'll": "I will", "you'll": "you will", "he'll": "he will", "she'll": "she will",
    "we'll": "we will", "they'll": "they will",
    "I'd": "I would", "you'd": "you would", "he'd": "he would", "she'd": "she would",
    "we'd": "we would", "they'd": "they would",
    "isn't": "is not", "aren't": "are not", "wasn't": "was not", "weren't": "were not",
    "hasn't": "has not", "haven't": "have not", "hadn't": "had not",
    "doesn't": "does not", "don't": "do not", "didn't": "did not",
    "couldn't": "could not", "shouldn't": "should not", "wouldn't": "would not",
    "mightn't": "might not", "mustn't": "must not"
  };

  const expand = (input: string): string => {
    let result = input;
    Object.entries(contractions).forEach(([contraction, expansion]) => {
      const regex = new RegExp(`\\b${contraction}\\b`, 'gi');
      result = result.replace(regex, expansion);
    });
    return result;
  };

  const compress = (input: string): string => {
    let result = input;
    // Reverse the contractions map
    const reversed: { [key: string]: string } = {};
    Object.entries(contractions).forEach(([k, v]) => {
      reversed[v] = k;
    });
    
    Object.entries(reversed).forEach(([expansion, contraction]) => {
      const regex = new RegExp(`\\b${expansion}\\b`, 'gi');
      result = result.replace(regex, contraction);
    });
    return result;
  };

  const processedText = mode === 'expand' ? expand(text) : compress(text);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <ArrowLeftRight className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Contraction Expander / Compressor
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Expand contractions (can't → cannot) or compress them (cannot → can't) for formal or casual writing.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-1">
            <button
              onClick={() => setMode('expand')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                mode === 'expand'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Expand className="h-5 w-5" />
              <span>Expand</span>
            </button>
            <button
              onClick={() => setMode('compress')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                mode === 'compress'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Shrink className="h-5 w-5" />
              <span>Compress</span>
            </button>
          </div>
        </div>

        {/* Input/Output Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Input</h2>
            </div>
            <div className="p-6">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={mode === 'expand' ? "I can't believe it's not butter!" : "I cannot believe it is not butter!"}
                className="w-full h-64 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all outline-none resize-none text-lg leading-relaxed"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Output</h2>
            </div>
            <div className="p-6">
              <div className="w-full h-64 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white overflow-y-auto text-lg leading-relaxed whitespace-pre-wrap">
                {processedText || <span className="text-gray-400">Result will appear here...</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
