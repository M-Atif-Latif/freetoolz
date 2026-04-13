import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import HowItWorks from '../components/HowItWorks';

export default function CreditCardGenerator() {
  const howItWorks = [
    { title: 'Select Card Type', description: 'Choose between Visa, Mastercard, American Express, Discover' },
    { title: 'View Test Card', description: 'See the generated test card number instantly' },
    { title: 'Copy Number', description: 'Copy the card number for development and testing' },
    { title: 'Use for Testing', description: 'Use these numbers only in development and QA environments' }
  ];

  const [cardType, setCardType] = useState('visa');
  const [copied, setCopied] = useState(false);

  const cardDetails = {
    visa: {
      prefix: '4532',
      number: '4532015112830366',
      cvv: '123',
      expiry: '12/25'
    },
    mastercard: {
      prefix: '5425',
      number: '5425233010103519',
      cvv: '123',
      expiry: '12/25'
    },
    amex: {
      prefix: '378',
      number: '378282246310005',
      cvv: '1234',
      expiry: '12/25'
    },
    discover: {
      prefix: '6011',
      number: '6011111111111117',
      cvv: '123',
      expiry: '12/25'
    }
  };

  const current = cardDetails[cardType as keyof typeof cardDetails];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatCardNumber = (num: string) => {
    return num.replace(/(\d{4})/g, '$1 ').trim();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Test Credit Card Generator</h1>
      <p className="text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
        ⚠️ <strong>For Development Only:</strong> These are test card numbers for QA and development purposes only. Never use them with real payment systems.
      </p>

      <HowItWorks steps={howItWorks} />

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-6">
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-4">Card Type</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.keys(cardDetails).map((type) => (
              <button
                key={type}
                onClick={() => setCardType(type)}
                className={`py-3 px-4 rounded-lg font-semibold transition-colors text-sm capitalize ${
                  cardType === type
                    ? 'bg-accent-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8 p-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl text-white shadow-lg">
          <div className="mb-12">
            <div className="text-sm opacity-75 mb-2">CARD NUMBER</div>
            <div className="text-2xl font-mono font-bold tracking-widest">{formatCardNumber(current.number)}</div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="text-xs opacity-75 mb-1">VALID THRU</div>
              <div className="text-lg font-mono font-semibold">{current.expiry}</div>
            </div>
            <div className="text-right">
              <div className="text-xs opacity-75 mb-1">CVV</div>
              <div className="text-lg font-mono font-semibold">{current.cvv}</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-2">Card Number</div>
            <div className="font-mono text-lg text-gray-900 mb-3 break-all">{current.number}</div>
            <button
              onClick={() => copyToClipboard(current.number)}
              className="w-full px-4 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors text-sm font-semibold flex items-center justify-center gap-2"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-2">CVV</div>
            <div className="font-mono text-lg text-gray-900 mb-3">{current.cvv}</div>
            <button
              onClick={() => copyToClipboard(current.cvv)}
              className="w-full px-4 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors text-sm font-semibold flex items-center justify-center gap-2"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg text-sm text-gray-700">
          <strong>Test Details:</strong> Use any future expiry date and any 3-4 digit CVV for testing payment gateways.
        </div>
      </div>
    </div>
  );
}

