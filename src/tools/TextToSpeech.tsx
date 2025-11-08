import { useState, useEffect } from 'react';
import { Volume2, Pause, Play } from 'lucide-react';

export default function TextToSpeech() {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<number>(0);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = () => {
    if (speaking) {
      speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices[selectedVoice];
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.onend = () => setSpeaking(false);

    speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <Volume2 className="h-16 w-16 mx-auto text-blue-500 mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Text to Speech</h1>
        <p className="text-gray-600 text-lg">Convert text to speech using browser API</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to speak..."
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none mb-6"
          rows={6}
        />

        <div className="space-y-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Voice</label>
            <select
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(parseInt(e.target.value))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
            >
              {voices.map((voice, index) => (
                <option key={index} value={index}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Speed: {rate}x</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pitch: {pitch}</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={pitch}
              onChange={(e) => setPitch(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>

        <button
          onClick={speak}
          disabled={!text}
          className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-semibold text-lg shadow-lg disabled:bg-gray-300 flex items-center justify-center space-x-2"
        >
          {speaking ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          <span>{speaking ? 'Stop' : 'Speak'}</span>
        </button>
      </div>
    </div>
  );
}
