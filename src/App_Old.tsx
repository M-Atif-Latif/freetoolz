import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Disclaimer from './pages/Disclaimer';
import Blog from './pages/Blog';
import FAQ from './pages/FAQ';
import Sitemap from './pages/Sitemap';
import WordCounter from './tools/WordCounter';
import CaseConverter from './tools/CaseConverter';
import TextReverser from './tools/TextReverser';
import RemoveSpaces from './tools/RemoveSpaces';
import LoremIpsum from './tools/LoremIpsum';
import CharacterCounter from './tools/CharacterCounter';
import TextToSlug from './tools/TextToSlug';
import MarkdownToHTML from './tools/MarkdownToHTML';
import DuplicateLineRemover from './tools/DuplicateLineRemover';
import LineSorter from './tools/LineSorter';
import TextDiff from './tools/TextDiff';
import PasswordGenerator from './tools/PasswordGenerator';
import QRCodeGenerator from './tools/QRCodeGenerator';
import UUIDGenerator from './tools/UUIDGenerator';
import RandomNumber from './tools/RandomNumber';
import Base64Converter from './tools/Base64Converter';
import URLEncoder from './tools/URLEncoder';
import ColorConverter from './tools/ColorConverter';
import UnitConverter from './tools/UnitConverter';
import CurrencyConverter from './tools/CurrencyConverter';
import TimeZoneConverter from './tools/TimeZoneConverter';
import ImageBase64 from './tools/ImageBase64';
import JSONFormatter from './tools/JSONFormatter';
import HTMLEncoder from './tools/HTMLEncoder';
import CSSMinifier from './tools/CSSMinifier';
import JSMinifier from './tools/JSMinifier';
import RegexTester from './tools/RegexTester';
import UnixTimestamp from './tools/UnixTimestamp';
import HashGenerator from './tools/HashGenerator';
import BMICalculator from './tools/BMICalculator';
import AgeCalculator from './tools/AgeCalculator';
import PercentageCalculator from './tools/PercentageCalculator';
import CompoundInterest from './tools/CompoundInterest';
import LoanCalculator from './tools/LoanCalculator';
import TipCalculator from './tools/TipCalculator';
import DiscountCalculator from './tools/DiscountCalculator';
import MergePDF from './tools/MergePDF';
import SplitPDF from './tools/SplitPDF';
import CompressPDF from './tools/CompressPDF';
import RotatePDF from './tools/RotatePDF';
import ImageCompressor from './tools/ImageCompressor';
import ImageResizer from './tools/ImageResizer';
import ImageFormatConverter from './tools/ImageFormatConverter';
import GrayscaleConverter from './tools/GrayscaleConverter';
import RandomPicker from './tools/RandomPicker';
import CoinFlip from './tools/CoinFlip';
import TemperatureConverter from './tools/TemperatureConverter';
import BinaryCalculator from './tools/BinaryCalculator';
import HexCalculator from './tools/HexCalculator';
import Stopwatch from './tools/Stopwatch';
import Timer from './tools/Timer';
import ColorPicker from './tools/ColorPicker';
import TextToSpeech from './tools/TextToSpeech';
import PasswordStrengthChecker from './tools/PasswordStrengthChecker';
import WordFrequency from './tools/WordFrequency';
import DateCalculator from './tools/DateCalculator';
import GPACalculator from './tools/GPACalculator';
import FuelCostCalculator from './tools/FuelCostCalculator';
import TextToBinary from './tools/TextToBinary';
import MorseCodeConverter from './tools/MorseCodeConverter';
import RomanNumeralConverter from './tools/RomanNumeralConverter';
import FindAndReplace from './tools/FindAndReplace';
import ReadabilityScore from './tools/ReadabilityScore';
import SyllableCounter from './tools/SyllableCounter';
import LetterCounter from './tools/LetterCounter';

interface RouteConfig {
  path: string;
  component: JSX.Element;
  title: string;
  description: string;
}

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update browser history when path changes
  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
    }
  };

  const routes: RouteConfig[] = [
    {
      path: '/',
      component: <Home onNavigate={setCurrentPath} />,
      title: 'FreeToolz - 80+ Free Online Tools',
      description: 'Access 80+ free online tools for text processing, PDF manipulation, image editing, calculations, conversions, code formatting and more. No registration required.'
    },
    {
      path: '/about',
      component: <About />,
      title: 'About Us - FreeToolz',
      description: 'Learn about FreeToolz mission to provide free, professional-grade online tools for everyone.'
    },
    {
      path: '/contact',
      component: <Contact />,
      title: 'Contact Us - FreeToolz',
      description: 'Get in touch with FreeToolz. We value your feedback and questions.'
    },
    {
      path: '/privacy',
      component: <Privacy />,
      title: 'Privacy Policy - FreeToolz',
      description: 'Read our privacy policy to understand how we protect your data and respect your privacy.'
    },
    {
      path: '/terms',
      component: <Terms />,
      title: 'Terms of Service - FreeToolz',
      description: 'Review the terms and conditions for using FreeToolz services.'
    },
    {
      path: '/disclaimer',
      component: <Disclaimer />,
      title: 'Disclaimer - FreeToolz',
      description: 'Important information and disclaimers about using FreeToolz services.'
    },
    {
      path: '/blog',
      component: <Blog />,
      title: 'Blog - FreeToolz',
      description: 'Read our latest articles, guides, and insights on productivity, privacy, and online tools.'
    },
    {
      path: '/faq',
      component: <FAQ />,
      title: 'FAQ - Frequently Asked Questions | FreeToolz',
      description: 'Find answers to common questions about FreeToolz, our tools, privacy, security, and more.'
    },
    {
      path: '/sitemap',
      component: <Sitemap onNavigate={setCurrentPath} />,
      title: 'Sitemap - All Pages | FreeToolz',
      description: 'Browse all pages and tools available on FreeToolz. Complete site navigation and tool directory.'
    },
    {
      path: '/tools/word-counter',
      component: <WordCounter />,
      title: 'Word Counter - Free Online Tool | FreeToolz',
      description: 'Count words, characters, sentences, and paragraphs instantly. Free word counter tool with real-time statistics.'
    },
    {
      path: '/tools/case-converter',
      component: <CaseConverter />,
      title: 'Case Converter - Change Text Case Online | FreeToolz',
      description: 'Convert text to uppercase, lowercase, title case, camelCase, and more. Free online case converter tool.'
    },
    {
      path: '/tools/text-reverser',
      component: <TextReverser />,
      title: 'Text Reverser - Reverse Text Online | FreeToolz',
      description: 'Reverse text or flip it upside down instantly. Free online text reverser tool.'
    },
    {
      path: '/tools/remove-spaces',
      component: <RemoveSpaces />,
      title: 'Remove Extra Spaces - Clean Text Online | FreeToolz',
      description: 'Remove extra whitespace and clean up your text. Free space remover tool.'
    },
    {
      path: '/tools/lorem-ipsum',
      component: <LoremIpsum />,
      title: 'Lorem Ipsum Generator - Placeholder Text | FreeToolz',
      description: 'Generate Lorem Ipsum placeholder text for your designs. Free text generator tool.'
    },
    {
      path: '/tools/password-generator',
      component: <PasswordGenerator />,
      title: 'Secure Password Generator - Create Strong Passwords | FreeToolz',
      description: 'Generate strong, random passwords with custom requirements. Free secure password generator tool.'
    },
    {
      path: '/tools/qr-code-generator',
      component: <QRCodeGenerator />,
      title: 'QR Code Generator - Create Free QR Codes | FreeToolz',
      description: 'Generate QR codes for URLs, text, and more. Free online QR code generator tool.'
    },
    {
      path: '/tools/uuid-generator',
      component: <UUIDGenerator />,
      title: 'UUID Generator - Create Unique IDs | FreeToolz',
      description: 'Generate UUIDs (unique identifiers) for your applications. Free UUID generator tool.'
    },
    {
      path: '/tools/random-number',
      component: <RandomNumber />,
      title: 'Random Number Generator - Free Online Tool | FreeToolz',
      description: 'Generate random numbers within any range. Free random number generator.'
    },
    {
      path: '/tools/base64-encoder',
      component: <Base64Converter />,
      title: 'Base64 Encoder/Decoder - Free Online Tool | FreeToolz',
      description: 'Encode and decode Base64 strings instantly. Free Base64 converter tool for developers.'
    },
    {
      path: '/tools/url-encoder',
      component: <URLEncoder />,
      title: 'URL Encoder/Decoder - Free Online Tool | FreeToolz',
      description: 'Encode and decode URL strings for safe web transmission. Free URL encoder tool.'
    },
    {
      path: '/tools/color-converter',
      component: <ColorConverter />,
      title: 'Color Converter - HEX RGB HSL | FreeToolz',
      description: 'Convert colors between HEX, RGB, and HSL formats. Free color converter tool.'
    },
    {
      path: '/tools/json-formatter',
      component: <JSONFormatter />,
      title: 'JSON Formatter & Validator - Free Online Tool | FreeToolz',
      description: 'Format, minify, and validate JSON data instantly. Free JSON formatter for developers.'
    },
    {
      path: '/tools/bmi-calculator',
      component: <BMICalculator />,
      title: 'BMI Calculator - Body Mass Index Calculator | FreeToolz',
      description: 'Calculate your BMI and understand your health status. Free BMI calculator with detailed results.'
    },
    {
      path: '/tools/age-calculator',
      component: <AgeCalculator />,
      title: 'Age Calculator - Calculate Your Exact Age | FreeToolz',
      description: 'Calculate your age in years, months, days, and more. Free age calculator tool.'
    },
    {
      path: '/tools/percentage-calculator',
      component: <PercentageCalculator />,
      title: 'Percentage Calculator - Free Online Tool | FreeToolz',
      description: 'Calculate percentages, increases, and decreases easily. Free percentage calculator.'
    },
    {
      path: '/tools/character-counter',
      component: <CharacterCounter />,
      title: 'Character Counter - Free Online Tool | FreeToolz',
      description: 'Count characters with and without spaces.'
    },
    {
      path: '/tools/text-to-slug',
      component: <TextToSlug />,
      title: 'Text to Slug Converter | FreeToolz',
      description: 'Convert text to URL-friendly slugs.'
    },
    {
      path: '/tools/markdown-to-html',
      component: <MarkdownToHTML />,
      title: 'Markdown to HTML Converter | FreeToolz',
      description: 'Convert Markdown to HTML instantly.'
    },
    {
      path: '/tools/duplicate-line-remover',
      component: <DuplicateLineRemover />,
      title: 'Duplicate Line Remover | FreeToolz',
      description: 'Remove duplicate lines from text.'
    },
    {
      path: '/tools/line-sorter',
      component: <LineSorter />,
      title: 'Line Sorter | FreeToolz',
      description: 'Sort lines alphabetically.'
    },
    {
      path: '/tools/text-diff',
      component: <TextDiff />,
      title: 'Text Diff Checker | FreeToolz',
      description: 'Compare two texts and see differences.'
    },
    {
      path: '/tools/compound-interest',
      component: <CompoundInterest />,
      title: 'Compound Interest Calculator | FreeToolz',
      description: 'Calculate compound interest on investments.'
    },
    {
      path: '/tools/loan-calculator',
      component: <LoanCalculator />,
      title: 'Loan Calculator | FreeToolz',
      description: 'Calculate monthly loan payments.'
    },
    {
      path: '/tools/tip-calculator',
      component: <TipCalculator />,
      title: 'Tip Calculator | FreeToolz',
      description: 'Calculate tips and split bills.'
    },
    {
      path: '/tools/discount-calculator',
      component: <DiscountCalculator />,
      title: 'Discount Calculator | FreeToolz',
      description: 'Calculate discounted prices.'
    },
    {
      path: '/tools/unit-converter',
      component: <UnitConverter />,
      title: 'Unit Converter | FreeToolz',
      description: 'Convert between units of measurement.'
    },
    {
      path: '/tools/currency-converter',
      component: <CurrencyConverter />,
      title: 'Currency Converter | FreeToolz',
      description: 'Convert between currencies.'
    },
    {
      path: '/tools/timezone-converter',
      component: <TimeZoneConverter />,
      title: 'Time Zone Converter | FreeToolz',
      description: 'Convert times between time zones.'
    },
    {
      path: '/tools/image-base64',
      component: <ImageBase64 />,
      title: 'Image to Base64 Converter | FreeToolz',
      description: 'Convert images to Base64.'
    },
    {
      path: '/tools/html-encoder',
      component: <HTMLEncoder />,
      title: 'HTML Entity Encoder | FreeToolz',
      description: 'Encode and decode HTML entities.'
    },
    {
      path: '/tools/css-minifier',
      component: <CSSMinifier />,
      title: 'CSS Minifier | FreeToolz',
      description: 'Minify CSS code.'
    },
    {
      path: '/tools/js-minifier',
      component: <JSMinifier />,
      title: 'JavaScript Minifier | FreeToolz',
      description: 'Minify JavaScript code.'
    },
    {
      path: '/tools/regex-tester',
      component: <RegexTester />,
      title: 'Regex Tester | FreeToolz',
      description: 'Test regular expressions.'
    },
    {
      path: '/tools/unix-timestamp',
      component: <UnixTimestamp />,
      title: 'Unix Timestamp Converter | FreeToolz',
      description: 'Convert Unix timestamps and dates.'
    },
    {
      path: '/tools/hash-generator',
      component: <HashGenerator />,
      title: 'Hash Generator | FreeToolz',
      description: 'Generate SHA-1 and SHA-256 hashes.'
    },
    {
      path: '/tools/merge-pdf',
      component: <MergePDF />,
      title: 'Merge PDF Files | FreeToolz',
      description: 'Combine multiple PDF files into one.'
    },
    {
      path: '/tools/split-pdf',
      component: <SplitPDF />,
      title: 'Split PDF File | FreeToolz',
      description: 'Split PDF into separate pages.'
    },
    {
      path: '/tools/compress-pdf',
      component: <CompressPDF />,
      title: 'Compress PDF | FreeToolz',
      description: 'Reduce PDF file size.'
    },
    {
      path: '/tools/rotate-pdf',
      component: <RotatePDF />,
      title: 'Rotate PDF Pages | FreeToolz',
      description: 'Rotate pages in PDF document.'
    },
    {
      path: '/tools/image-compressor',
      component: <ImageCompressor />,
      title: 'Image Compressor | FreeToolz',
      description: 'Compress images to reduce file size.'
    },
    {
      path: '/tools/image-resizer',
      component: <ImageResizer />,
      title: 'Image Resizer | FreeToolz',
      description: 'Resize images to custom dimensions.'
    },
    {
      path: '/tools/image-format-converter',
      component: <ImageFormatConverter />,
      title: 'Image Format Converter | FreeToolz',
      description: 'Convert images between formats.'
    },
    {
      path: '/tools/grayscale-converter',
      component: <GrayscaleConverter />,
      title: 'Grayscale Image Converter | FreeToolz',
      description: 'Convert color images to grayscale.'
    },
    {
      path: '/tools/random-picker',
      component: <RandomPicker />,
      title: 'Random Picker | FreeToolz',
      description: 'Pick random items from your list.'
    },
    {
      path: '/tools/coin-flip',
      component: <CoinFlip />,
      title: 'Coin Flip & Dice Roll | FreeToolz',
      description: 'Flip a coin or roll a dice.'
    },
    {
      path: '/tools/temperature-converter',
      component: <TemperatureConverter />,
      title: 'Temperature Converter | FreeToolz',
      description: 'Convert Celsius, Fahrenheit, Kelvin.'
    },
    {
      path: '/tools/binary-calculator',
      component: <BinaryCalculator />,
      title: 'Binary Calculator | FreeToolz',
      description: 'Binary arithmetic calculator.'
    },
    {
      path: '/tools/hex-calculator',
      component: <HexCalculator />,
      title: 'Hex Calculator | FreeToolz',
      description: 'Hexadecimal calculator.'
    },
    {
      path: '/tools/stopwatch',
      component: <Stopwatch />,
      title: 'Stopwatch | FreeToolz',
      description: 'Accurate time measurement.'
    },
    {
      path: '/tools/timer',
      component: <Timer />,
      title: 'Timer | FreeToolz',
      description: 'Countdown timer.'
    },
    {
      path: '/tools/color-picker',
      component: <ColorPicker />,
      title: 'Color Picker | FreeToolz',
      description: 'Pick and convert colors.'
    },
    {
      path: '/tools/text-to-speech',
      component: <TextToSpeech />,
      title: 'Text to Speech | FreeToolz',
      description: 'Convert text to speech.'
    },
    {
      path: '/tools/password-strength',
      component: <PasswordStrengthChecker />,
      title: 'Password Strength Checker | FreeToolz',
      description: 'Check password strength.'
    },
    {
      path: '/tools/word-frequency',
      component: <WordFrequency />,
      title: 'Word Frequency Counter - Analyze Text | FreeToolz',
      description: 'Analyze word frequency in text with detailed statistics and CSV export.'
    },
    {
      path: '/tools/date-calculator',
      component: <DateCalculator />,
      title: 'Date Calculator - Calculate Date Difference | FreeToolz',
      description: 'Calculate the difference between two dates in years, months, days, and more.'
    },
    {
      path: '/tools/gpa-calculator',
      component: <GPACalculator />,
      title: 'GPA Calculator - Calculate Grade Point Average | FreeToolz',
      description: 'Calculate your GPA with support for multiple courses and different grading scales.'
    },
    {
      path: '/tools/fuel-cost',
      component: <FuelCostCalculator />,
      title: 'Fuel Cost Calculator - Trip Cost Estimator | FreeToolz',
      description: 'Calculate fuel costs for your trips with support for different units and efficiency.'
    },
    {
      path: '/tools/text-to-binary',
      component: <TextToBinary />,
      title: 'Text to Binary Converter - Free Online Tool | FreeToolz',
      description: 'Convert text to binary and binary to text instantly with our free converter.'
    },
    {
      path: '/tools/morse-code',
      component: <MorseCodeConverter />,
      title: 'Morse Code Converter - Text to Morse | FreeToolz',
      description: 'Convert text to Morse code and back with audio playback support.'
    },
    {
      path: '/tools/roman-numeral',
      component: <RomanNumeralConverter />,
      title: 'Roman Numeral Converter - Number Converter | FreeToolz',
      description: 'Convert between numbers and Roman numerals instantly (1-3999).'
    },
    {
      path: '/tools/find-replace',
      component: <FindAndReplace />,
      title: 'Find and Replace - Text Editor Tool | FreeToolz',
      description: 'Find and replace text with regex support and case-sensitive options.'
    },
    {
      path: '/tools/readability-score',
      component: <ReadabilityScore />,
      title: 'Readability Score - Flesch Reading Ease | FreeToolz',
      description: 'Analyze text readability with Flesch Reading Ease and Flesch-Kincaid Grade scores.'
    },
    {
      path: '/tools/syllable-counter',
      component: <SyllableCounter />,
      title: 'Syllable Counter - Count Syllables in Text | FreeToolz',
      description: 'Count syllables in text and words with detailed word-by-word breakdown.'
    },
    {
      path: '/tools/letter-counter',
      component: <LetterCounter />,
      title: 'Letter Counter - Letter Frequency Analyzer | FreeToolz',
      description: 'Count and analyze letter frequency in text with vowel and consonant statistics.'
    },
  ];

  const currentRoute = routes.find(route => route.path === currentPath) || routes[0];

  useEffect(() => {
    document.title = currentRoute.title;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', currentRoute.description);

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', currentRoute.title);

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute('content', currentRoute.description);

    window.scrollTo(0, 0);
  }, [currentRoute]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-all duration-300">
      <Header currentPath={currentPath} onNavigate={navigate} />
      <main className="flex-grow">
        {currentRoute.component}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}

export default App;
