import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: 'General',
    question: 'What is FreeToolz?',
    answer: 'FreeToolz is a comprehensive collection of 54+ free online tools designed to help with text processing, PDF manipulation, image editing, calculations, conversions, and more. All tools work directly in your browser without requiring any downloads, installations, or registrations.'
  },
  {
    category: 'General',
    question: 'Is FreeToolz really free?',
    answer: 'Yes! All tools on FreeToolz are completely free to use with no hidden costs, subscriptions, or premium features. We believe essential digital utilities should be accessible to everyone.'
  },
  {
    category: 'General',
    question: 'Do I need to create an account?',
    answer: 'No! You can use all our tools without creating an account, signing up, or providing any personal information. Simply visit the tool you need and start using it immediately.'
  },
  {
    category: 'Privacy & Security',
    question: 'Is my data safe when using FreeToolz?',
    answer: 'Absolutely! All processing happens directly in your browser using client-side JavaScript. Your files and data never leave your device, are not uploaded to any server, and are not stored or transmitted anywhere. This ensures maximum privacy and security.'
  },
  {
    category: 'Privacy & Security',
    question: 'Do you collect or store my files?',
    answer: 'No, we do not collect, store, or have access to any files you process. All file operations occur locally in your browser. Once you close the browser tab, all data is cleared from memory.'
  },
  {
    category: 'Privacy & Security',
    question: 'Can I use these tools for sensitive documents?',
    answer: 'Yes! Since all processing happens locally in your browser and no data is transmitted to our servers, you can safely use our tools for sensitive documents. However, always exercise caution and ensure you\'re using a secure device and network connection.'
  },
  {
    category: 'Technical',
    question: 'What browsers are supported?',
    answer: 'FreeToolz works on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. For the best experience, we recommend using the latest version of your preferred browser.'
  },
  {
    category: 'Technical',
    question: 'Do I need an internet connection?',
    answer: 'You need an internet connection to load the website initially. However, once loaded, most tools can work offline since they process data in your browser. Some tools that require external APIs (like currency conversion) will need an active internet connection.'
  },
  {
    category: 'Technical',
    question: 'Are there file size limitations?',
    answer: 'File size limitations depend on your browser\'s memory capacity and your device\'s processing power. Most modern browsers can handle files up to several hundred megabytes. For very large files, processing may be slower.'
  },
  {
    category: 'Technical',
    question: 'Why is my tool running slowly?',
    answer: 'Processing speed depends on your device\'s capabilities and the file size. Large files or complex operations may take longer. Close unnecessary browser tabs and applications to free up memory for better performance.'
  },
  {
    category: 'Features',
    question: 'What types of tools are available?',
    answer: 'We offer tools in multiple categories: Text Processing (word counter, case converter, etc.), PDF Tools (merge, split, compress), Image Tools (resize, compress, convert), Calculators (BMI, loan, percentage), Converters (units, currency, color), Generators (password, QR code, UUID), and Developer Tools (JSON formatter, minifiers, regex tester).'
  },
  {
    category: 'Features',
    question: 'Can I use these tools for commercial purposes?',
    answer: 'Yes! All tools are free to use for both personal and commercial purposes. However, please note that results should be verified for critical business applications.'
  },
  {
    category: 'Features',
    question: 'Can I suggest new tools?',
    answer: 'Absolutely! We love hearing from our users. If you have suggestions for new tools or features, please contact us through our Contact page. We regularly add new tools based on user feedback.'
  },
  {
    category: 'Support',
    question: 'What if I encounter an error or bug?',
    answer: 'If you experience any errors or bugs, please contact us with details about the issue, including your browser version and what you were trying to do. We actively maintain and improve our tools based on user feedback.'
  },
  {
    category: 'Support',
    question: 'How can I report a problem?',
    answer: 'You can report problems through our Contact page. Please include as much detail as possible, such as the tool you were using, your browser and operating system, and steps to reproduce the issue.'
  },
  {
    category: 'Support',
    question: 'Do you provide customer support?',
    answer: 'Yes! While all tools are self-service, we provide support through email. Feel free to contact us with any questions, issues, or feedback through our Contact page.'
  },
  {
    category: 'Usage',
    question: 'How accurate are the calculators and converters?',
    answer: 'Our calculators and converters are designed to provide accurate results for general use. However, for critical applications (financial decisions, medical purposes, legal matters), we recommend consulting with professionals and verifying results independently.'
  },
  {
    category: 'Usage',
    question: 'Can I bookmark specific tools?',
    answer: 'Yes! Each tool has its own unique URL that you can bookmark for quick access. Simply navigate to the tool you use frequently and bookmark that page.'
  },
  {
    category: 'Usage',
    question: 'Are the tools mobile-friendly?',
    answer: 'Yes! All our tools are fully responsive and work seamlessly on smartphones and tablets. You can access FreeToolz from any device with a web browser.'
  }
];

const categories = ['All', 'General', 'Privacy & Security', 'Technical', 'Features', 'Support', 'Usage'];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredFaqs = selectedCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <HelpCircle className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about FreeToolz, our tools, privacy, and more.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full font-medium transition-all transform hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 pr-4">
                  <div className="flex items-start space-x-3">
                    <span className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mt-1">
                      {faq.category}
                    </span>
                    <h3 className="font-semibold text-gray-900 text-lg leading-relaxed">
                      {faq.question}
                    </h3>
                  </div>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform flex-shrink-0 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 pt-2">
                  <div className="pl-0 sm:pl-20">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Still Have Questions?</h2>
          <p className="text-blue-50 mb-6 max-w-2xl mx-auto">
            Can't find the answer you're looking for? We're here to help! 
            Reach out to us and we'll get back to you as soon as possible.
          </p>
          <a
            href="mailto:muhammadatiflatif67@gmail.com"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all hover:scale-105 shadow-lg"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
