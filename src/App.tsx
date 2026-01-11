import { lazy, Suspense } from 'react';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import { useSEO, homeSEO, aboutSEO, blogSEO, contactSEO, generateToolSEO } from './utils/useSEO';
import { tools } from './data/tools';

// Eagerly load critical pages
import Home from './pages/Home';

// Lazy load pages
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Disclaimer = lazy(() => import('./pages/Disclaimer'));
const Blog = lazy(() => import('./pages/Blog'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Sitemap = lazy(() => import('./pages/Sitemap'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Lazy load tools
const WordCounter = lazy(() => import('./tools/WordCounter'));
const CaseConverter = lazy(() => import('./tools/CaseConverter'));
const TextReverser = lazy(() => import('./tools/TextReverser'));
const RemoveSpaces = lazy(() => import('./tools/RemoveSpaces'));
const LoremIpsum = lazy(() => import('./tools/LoremIpsum'));
const CharacterCounter = lazy(() => import('./tools/CharacterCounter'));
const TextToSlug = lazy(() => import('./tools/TextToSlug'));
const MarkdownToHTML = lazy(() => import('./tools/MarkdownToHTML'));
const DuplicateLineRemover = lazy(() => import('./tools/DuplicateLineRemover'));
const LineSorter = lazy(() => import('./tools/LineSorter'));
const TextDiff = lazy(() => import('./tools/TextDiff'));
const PasswordGenerator = lazy(() => import('./tools/PasswordGenerator'));
const QRCodeGenerator = lazy(() => import('./tools/QRCodeGenerator'));
const UUIDGenerator = lazy(() => import('./tools/UUIDGenerator'));
const RandomNumber = lazy(() => import('./tools/RandomNumber'));
const Base64Converter = lazy(() => import('./tools/Base64Converter'));
const URLEncoder = lazy(() => import('./tools/URLEncoder'));
const ColorConverter = lazy(() => import('./tools/ColorConverter'));
const UnitConverter = lazy(() => import('./tools/UnitConverter'));
const CurrencyConverter = lazy(() => import('./tools/CurrencyConverter'));
const TimeZoneConverter = lazy(() => import('./tools/TimeZoneConverter'));
const ImageBase64 = lazy(() => import('./tools/ImageBase64'));
const JSONFormatter = lazy(() => import('./tools/JSONFormatter'));
const HTMLEncoder = lazy(() => import('./tools/HTMLEncoder'));
const CSSMinifier = lazy(() => import('./tools/CSSMinifier'));
const JSMinifier = lazy(() => import('./tools/JSMinifier'));
const RegexTester = lazy(() => import('./tools/RegexTester'));
const UnixTimestamp = lazy(() => import('./tools/UnixTimestamp'));
const HashGenerator = lazy(() => import('./tools/HashGenerator'));
const BMICalculator = lazy(() => import('./tools/BMICalculator'));
const AgeCalculator = lazy(() => import('./tools/AgeCalculator'));
const PercentageCalculator = lazy(() => import('./tools/PercentageCalculator'));
const CompoundInterest = lazy(() => import('./tools/CompoundInterest'));
const LoanCalculator = lazy(() => import('./tools/LoanCalculator'));
const TipCalculator = lazy(() => import('./tools/TipCalculator'));
const DiscountCalculator = lazy(() => import('./tools/DiscountCalculator'));
const MergePDF = lazy(() => import('./tools/MergePDF'));
const SplitPDF = lazy(() => import('./tools/SplitPDF'));
const CompressPDF = lazy(() => import('./tools/CompressPDF'));
const RotatePDF = lazy(() => import('./tools/RotatePDF'));
const ImageCompressor = lazy(() => import('./tools/ImageCompressor'));
const ImageResizer = lazy(() => import('./tools/ImageResizer'));
const ImageFormatConverter = lazy(() => import('./tools/ImageFormatConverter'));
const GrayscaleConverter = lazy(() => import('./tools/GrayscaleConverter'));
const ImageBackgroundRemover = lazy(() => import('./tools/ImageBackgroundRemover'));
const RandomPicker = lazy(() => import('./tools/RandomPicker'));
const CoinFlip = lazy(() => import('./tools/CoinFlip'));
const TemperatureConverter = lazy(() => import('./tools/TemperatureConverter'));
const BinaryCalculator = lazy(() => import('./tools/BinaryCalculator'));
const HexCalculator = lazy(() => import('./tools/HexCalculator'));
const Stopwatch = lazy(() => import('./tools/Stopwatch'));
const Timer = lazy(() => import('./tools/Timer'));
const ColorPicker = lazy(() => import('./tools/ColorPicker'));
const TextToSpeech = lazy(() => import('./tools/TextToSpeech'));
const PasswordStrengthChecker = lazy(() => import('./tools/PasswordStrengthChecker'));
const WordFrequency = lazy(() => import('./tools/WordFrequency'));
const DateCalculator = lazy(() => import('./tools/DateCalculator'));
const GPACalculator = lazy(() => import('./tools/GPACalculator'));
const FuelCostCalculator = lazy(() => import('./tools/FuelCostCalculator'));
const TextToBinary = lazy(() => import('./tools/TextToBinary'));
const MorseCodeConverter = lazy(() => import('./tools/MorseCodeConverter'));
const RomanNumeralConverter = lazy(() => import('./tools/RomanNumeralConverter'));
const FindAndReplace = lazy(() => import('./tools/FindAndReplace'));
const ReadabilityScore = lazy(() => import('./tools/ReadabilityScore'));
const SyllableCounter = lazy(() => import('./tools/SyllableCounter'));
const LetterCounter = lazy(() => import('./tools/LetterCounter'));
const NumberBaseConverter = lazy(() => import('./tools/NumberBaseConverter'));
const ReverseWords = lazy(() => import('./tools/ReverseWords'));
const InvisibleCharacter = lazy(() => import('./tools/InvisibleCharacter'));
const FakeDataGenerator = lazy(() => import('./tools/FakeDataGenerator'));

// New tools - Text Tools
const SmartSentenceSplitter = lazy(() => import('./tools/SmartSentenceSplitter'));
const ContractionExpander = lazy(() => import('./tools/ContractionExpander'));
const ReadAloudCaptionGenerator = lazy(() => import('./tools/ReadAloudCaptionGenerator'));
const TitleHeadlineAnalyzer = lazy(() => import('./tools/TitleHeadlineAnalyzer'));
const TextRandomizer = lazy(() => import('./tools/TextRandomizer'));

// New tools - Developer Tools
const CSVColumnSplitter = lazy(() => import('./tools/CSVColumnSplitter'));
const YAMLJSONConverter = lazy(() => import('./tools/YAMLJSONConverter'));
const CSSTailwindClassifier = lazy(() => import('./tools/CSSTailwindClassifier'));
const HTTPStatusTester = lazy(() => import('./tools/HTTPStatusTester'));
const CORSHeaderChecker = lazy(() => import('./tools/CORSHeaderChecker'));

// New tools - Calculators & Converters
const PowerEnergyConverter = lazy(() => import('./tools/PowerEnergyConverter'));
const FileEncodingDetector = lazy(() => import('./tools/FileEncodingDetector'));
const ImageDPICalculator = lazy(() => import('./tools/ImageDPICalculator'));
const HashIdentifier = lazy(() => import('./tools/HashIdentifier'));
const PermutationCombinationCalculator = lazy(() => import('./tools/PermutationCombinationCalculator'));

// New tools - Design & Time Tools
const ColorBlindnessSimulator = lazy(() => import('./tools/ColorBlindnessSimulator'));
const BusinessDaysCalculator = lazy(() => import('./tools/BusinessDaysCalculator'));
const ASCIIArtGenerator = lazy(() => import('./tools/ASCIIArtGenerator'));
const WorkingHoursTimezoneConverter = lazy(() => import('./tools/WorkingHoursTimezoneConverter'));

// New tools - Utilities & Data Tools
const CSVDuplicateFinder = lazy(() => import('./tools/CSVDuplicateFinder'));
const RegexBulkReplace = lazy(() => import('./tools/RegexBulkReplace'));
const BulkURLShortener = lazy(() => import('./tools/BulkURLShortener'));
const ClipboardHistory = lazy(() => import('./tools/ClipboardHistory'));
const DatasetSampler = lazy(() => import('./tools/DatasetSampler'));

// New tools - File & Debug Tools
const ZIPFileInspector = lazy(() => import('./tools/ZIPFileInspector'));
const ConsoleLogFormatter = lazy(() => import('./tools/ConsoleLogFormatter'));

// New tools - Image & Media Tools
const SVGOptimizer = lazy(() => import('./tools/SVGOptimizer'));
const FaviconGenerator = lazy(() => import('./tools/FaviconGenerator'));
const ColorContrastChecker = lazy(() => import('./tools/ColorContrastChecker'));

// New tools - Security & SEO Tools
const PasswordStrengthAnalyzer = lazy(() => import('./tools/PasswordStrengthAnalyzer'));
const CookieInspector = lazy(() => import('./tools/CookieInspector'));
const MetaRobotsTester = lazy(() => import('./tools/MetaRobotsTester'));
const StructuredDataValidator = lazy(() => import('./tools/StructuredDataValidator'));
const SitemapURLExtractor = lazy(() => import('./tools/SitemapURLExtractor'));

// New tools - PDF & Document Tools
const PDFPageExtractor = lazy(() => import('./tools/PDFPageExtractor'));

interface RouteConfig {
  path: string;
  component: JSX.Element;
  title: string;
  description: string;
  keywords?: string;
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
      component: <Home onNavigate={navigate} />,
      title: 'FreeToolz - 80+ Free Online Tools | No Sign Up Required',
      description: 'Access 80+ free online tools for text processing, PDF manipulation, image editing, calculations, conversions, code formatting and more. Completely free, secure, and privacy-focused. No registration required.',
      keywords: 'free online tools, text converter, PDF tools, image editor, calculator'
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
      component: <Sitemap onNavigate={navigate} />,
      title: 'Sitemap - All Pages | FreeToolz',
      description: 'Browse all pages and tools available on FreeToolz. Complete site navigation and tool directory.'
    },
    {
      path: '/tools/word-counter',
      component: <WordCounter />,
      title: 'Word Counter - Free Online Tool | FreeToolz',
      description: 'Count words, characters, sentences, and paragraphs instantly. Free word counter tool with real-time statistics.',
      keywords: 'word counter, character count, word count tool'
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
      path: '/tools/background-remover',
      component: <ImageBackgroundRemover />,
      title: 'Image Background Remover | FreeToolz',
      description: 'Remove background from images easily.'
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
    {
      path: '/tools/number-base',
      component: <NumberBaseConverter />,
      title: 'Number Base Converter - Convert Between Bases (2-36) | FreeToolz',
      description: 'Convert numbers between different bases including binary, octal, decimal, hexadecimal, and more.'
    },
    {
      path: '/tools/reverse-words',
      component: <ReverseWords />,
      title: 'Reverse Words - Reverse Word Order | FreeToolz',
      description: 'Reverse the order of words in sentences while keeping individual words intact.'
    },
    {
      path: '/tools/invisible-character',
      component: <InvisibleCharacter />,
      title: 'Invisible Character Generator - Copy Blank Text | FreeToolz',
      description: 'Generate and copy invisible Unicode characters for Discord, WhatsApp, and more.'
    },
    {
      path: '/tools/fake-data-generator',
      component: <FakeDataGenerator />,
      title: 'Fake Data Generator - Generate Test Data | FreeToolz',
      description: 'Generate realistic fake personal data for testing, development, and placeholder purposes.'
    },
    // New Tools - Text Tools
    {
      path: '/tools/smart-sentence-splitter',
      component: <SmartSentenceSplitter />,
      title: 'Smart Sentence Splitter - AI Text Analysis | FreeToolz',
      description: 'Split text into sentences intelligently with AI-powered analysis. Handles abbreviations, quotes, and edge cases.',
      keywords: 'sentence splitter, text analysis, NLP tool, text segmentation'
    },
    {
      path: '/tools/contraction-expander',
      component: <ContractionExpander />,
      title: 'Contraction Expander - Expand Contractions | FreeToolz',
      description: 'Expand contractions like "don\'t" to "do not" automatically. Perfect for formal writing and academic papers.',
      keywords: 'contraction expander, text formatter, formal writing'
    },
    {
      path: '/tools/read-aloud-caption-generator',
      component: <ReadAloudCaptionGenerator />,
      title: 'Read Aloud Caption Generator - Text to Captions | FreeToolz',
      description: 'Generate captions and subtitles from text with customizable timing and formatting for videos.',
      keywords: 'caption generator, subtitle maker, SRT generator'
    },
    {
      path: '/tools/title-headline-analyzer',
      component: <TitleHeadlineAnalyzer />,
      title: 'Title & Headline Analyzer - SEO Score | FreeToolz',
      description: 'Analyze headlines and titles for engagement, SEO score, emotional impact, and readability.',
      keywords: 'headline analyzer, title optimizer, SEO analyzer'
    },
    {
      path: '/tools/text-randomizer',
      component: <TextRandomizer />,
      title: 'Text Randomizer - Shuffle Words & Lines | FreeToolz',
      description: 'Randomize text by shuffling words, lines, or characters. Perfect for testing and data anonymization.',
      keywords: 'text randomizer, word shuffler, text shuffler'
    },
    // New Tools - Developer Tools
    {
      path: '/tools/csv-column-splitter',
      component: <CSVColumnSplitter />,
      title: 'CSV Column Splitter - Extract CSV Columns | FreeToolz',
      description: 'Extract specific columns from CSV files and export them. Perfect for data manipulation and analysis.',
      keywords: 'CSV splitter, column extractor, CSV parser'
    },
    {
      path: '/tools/yaml-json-converter',
      component: <YAMLJSONConverter />,
      title: 'YAML to JSON Converter - Bidirectional | FreeToolz',
      description: 'Convert between YAML and JSON formats instantly. Perfect for config files and data transformation.',
      keywords: 'YAML converter, JSON converter, config converter'
    },
    {
      path: '/tools/css-tailwind-classifier',
      component: <CSSTailwindClassifier />,
      title: 'CSS to Tailwind Classifier - Convert Styles | FreeToolz',
      description: 'Convert CSS styles to Tailwind CSS classes automatically. Speed up your Tailwind development.',
      keywords: 'CSS to Tailwind, Tailwind converter, utility classes'
    },
    {
      path: '/tools/http-status-tester',
      component: <HTTPStatusTester />,
      title: 'HTTP Status Code Tester - Check Response Codes | FreeToolz',
      description: 'Test HTTP status codes and check website response codes. Essential tool for developers and SEO.',
      keywords: 'HTTP tester, status code checker, response tester'
    },
    {
      path: '/tools/cors-header-checker',
      component: <CORSHeaderChecker />,
      title: 'CORS Header Checker - Test CORS Configuration | FreeToolz',
      description: 'Check CORS headers and test cross-origin resource sharing configuration for APIs.',
      keywords: 'CORS checker, CORS tester, API headers'
    },
    // New Tools - Calculators & Converters
    {
      path: '/tools/power-energy-converter',
      component: <PowerEnergyConverter />,
      title: 'Power & Energy Converter - Watts to kWh | FreeToolz',
      description: 'Convert between power and energy units including watts, kilowatts, BTU, and joules.',
      keywords: 'power converter, energy converter, watt calculator'
    },
    {
      path: '/tools/file-encoding-detector',
      component: <FileEncodingDetector />,
      title: 'File Encoding Detector - Detect Text Encoding | FreeToolz',
      description: 'Detect and identify file encoding formats including UTF-8, ASCII, ISO-8859, and more.',
      keywords: 'encoding detector, charset detector, file encoding'
    },
    {
      path: '/tools/image-dpi-calculator',
      component: <ImageDPICalculator />,
      title: 'Image DPI Calculator - Print Size Calculator | FreeToolz',
      description: 'Calculate DPI, print size, and pixel dimensions for images. Essential for print design.',
      keywords: 'DPI calculator, print size calculator, image resolution'
    },
    {
      path: '/tools/hash-identifier',
      component: <HashIdentifier />,
      title: 'Hash Identifier - Identify Hash Types | FreeToolz',
      description: 'Identify hash types including MD5, SHA-1, SHA-256, and more from hash strings.',
      keywords: 'hash identifier, hash type detector, crypto hash'
    },
    {
      path: '/tools/permutation-combination-calculator',
      component: <PermutationCombinationCalculator />,
      title: 'Permutation & Combination Calculator | FreeToolz',
      description: 'Calculate permutations and combinations with detailed formulas and explanations.',
      keywords: 'permutation calculator, combination calculator, probability'
    },
    // New Tools - Design & Time Tools
    {
      path: '/tools/color-blindness-simulator',
      component: <ColorBlindnessSimulator />,
      title: 'Color Blindness Simulator - Test Accessibility | FreeToolz',
      description: 'Simulate different types of color blindness on colors and images for accessibility testing.',
      keywords: 'color blindness simulator, accessibility checker, color vision'
    },
    {
      path: '/tools/business-days-calculator',
      component: <BusinessDaysCalculator />,
      title: 'Business Days Calculator - Working Days | FreeToolz',
      description: 'Calculate business days between dates excluding weekends and holidays.',
      keywords: 'business days calculator, working days calculator, date calculator'
    },
    {
      path: '/tools/ascii-art-generator',
      component: <ASCIIArtGenerator />,
      title: 'ASCII Art Generator - Text to ASCII Art | FreeToolz',
      description: 'Convert text to ASCII art with multiple fonts and styles. Create banner text for terminals.',
      keywords: 'ASCII art generator, text art, banner generator'
    },
    {
      path: '/tools/working-hours-timezone-converter',
      component: <WorkingHoursTimezoneConverter />,
      title: 'Working Hours Timezone Converter - Global Time | FreeToolz',
      description: 'Convert working hours across timezones. Perfect for global teams and remote collaboration.',
      keywords: 'timezone converter, working hours, global time'
    },
    // New Tools - Utilities & Data Tools
    {
      path: '/tools/csv-duplicate-finder',
      component: <CSVDuplicateFinder />,
      title: 'CSV Duplicate Finder - Find Duplicate Rows | FreeToolz',
      description: 'Find and remove duplicate rows in CSV files based on selected columns.',
      keywords: 'CSV duplicate finder, duplicate remover, data cleaner'
    },
    {
      path: '/tools/regex-bulk-replace',
      component: <RegexBulkReplace />,
      title: 'Regex Bulk Replace - Multiple Find & Replace | FreeToolz',
      description: 'Perform multiple find and replace operations with regex support in bulk.',
      keywords: 'regex replace, bulk replace, text editor'
    },
    {
      path: '/tools/bulk-url-shortener',
      component: <BulkURLShortener />,
      title: 'Bulk URL Shortener - Shorten Multiple URLs | FreeToolz',
      description: 'Shorten multiple URLs at once. Perfect for social media and marketing campaigns.',
      keywords: 'URL shortener, bulk URL, link shortener'
    },
    {
      path: '/tools/clipboard-history',
      component: <ClipboardHistory />,
      title: 'Clipboard History Manager - Track Copies | FreeToolz',
      description: 'Track and manage your clipboard history with timestamps and search functionality.',
      keywords: 'clipboard manager, clipboard history, copy tracker'
    },
    {
      path: '/tools/dataset-sampler',
      component: <DatasetSampler />,
      title: 'Dataset Sampler - Random CSV Sampling | FreeToolz',
      description: 'Extract random samples from large CSV datasets for testing and analysis.',
      keywords: 'dataset sampler, CSV sampler, random sampling'
    },
    // New Tools - File & Debug Tools
    {
      path: '/tools/zip-file-inspector',
      component: <ZIPFileInspector />,
      title: 'ZIP File Inspector - View ZIP Contents | FreeToolz',
      description: 'Inspect ZIP file contents without extracting. View file list, sizes, and compression ratios.',
      keywords: 'ZIP inspector, archive viewer, file inspector'
    },
    {
      path: '/tools/console-log-formatter',
      component: <ConsoleLogFormatter />,
      title: 'Console Log Formatter - Format Debug Logs | FreeToolz',
      description: 'Format and beautify console logs for better readability. Supports JSON and custom formats.',
      keywords: 'log formatter, console formatter, debug tool'
    },
    // New Tools - Image & Media Tools
    {
      path: '/tools/svg-optimizer',
      component: <SVGOptimizer />,
      title: 'SVG Optimizer - Compress SVG Files | FreeToolz',
      description: 'Optimize and compress SVG files by removing unnecessary data. Reduce file size instantly.',
      keywords: 'SVG optimizer, SVG compressor, SVG minifier'
    },
    {
      path: '/tools/favicon-generator',
      component: <FaviconGenerator />,
      title: 'Favicon Generator - Create Favicons Online | FreeToolz',
      description: 'Generate favicons from text or colors. Create 16x16, 32x32, and 64x64 favicon sizes.',
      keywords: 'favicon generator, icon creator, website icon'
    },
    {
      path: '/tools/color-contrast-checker',
      component: <ColorContrastChecker />,
      title: 'Color Contrast Checker - WCAG Accessibility | FreeToolz',
      description: 'Check color contrast ratios for WCAG accessibility compliance. Test foreground and background colors.',
      keywords: 'contrast checker, WCAG checker, accessibility tool'
    },
    // New Tools - Security & SEO Tools
    {
      path: '/tools/password-strength-analyzer',
      component: <PasswordStrengthAnalyzer />,
      title: 'Password Strength Analyzer - Security Checker | FreeToolz',
      description: 'Analyze password strength with detailed security feedback and improvement suggestions.',
      keywords: 'password analyzer, password checker, security tool'
    },
    {
      path: '/tools/cookie-inspector',
      component: <CookieInspector />,
      title: 'Cookie Inspector - View Browser Cookies | FreeToolz',
      description: 'Inspect, view, and manage browser cookies for the current domain. Privacy and debugging tool.',
      keywords: 'cookie inspector, cookie viewer, browser cookies'
    },
    {
      path: '/tools/meta-robots-tester',
      component: <MetaRobotsTester />,
      title: 'Meta Robots Tester - Validate Robots Tags | FreeToolz',
      description: 'Test and validate meta robots tags including noindex, nofollow, and other directives.',
      keywords: 'meta robots tester, SEO validator, robots tag checker'
    },
    {
      path: '/tools/structured-data-validator',
      component: <StructuredDataValidator />,
      title: 'Structured Data Validator - Schema Markup | FreeToolz',
      description: 'Validate JSON-LD, Microdata, and RDFa structured data for SEO and rich snippets.',
      keywords: 'schema validator, structured data, JSON-LD validator'
    },
    {
      path: '/tools/sitemap-url-extractor',
      component: <SitemapURLExtractor />,
      title: 'Sitemap URL Extractor - Extract URLs from XML | FreeToolz',
      description: 'Extract all URLs from XML sitemaps. Export to TXT or CSV for analysis and SEO audits.',
      keywords: 'sitemap extractor, URL extractor, XML parser'
    },
    // New Tools - PDF & Document Tools
    {
      path: '/tools/pdf-page-extractor',
      component: <PDFPageExtractor />,
      title: 'PDF Page Extractor - Extract PDF Pages | FreeToolz',
      description: 'Extract specific pages from PDF documents. Select page ranges and create new PDFs.',
      keywords: 'PDF extractor, PDF splitter, page extractor'
    },
  ];

  const currentRoute = routes.find(route => route.path === currentPath);
  const isNotFound = !currentRoute;

  // Generate dynamic SEO config based on current route
  let seoConfig = homeSEO;
  
  if (isNotFound) {
    seoConfig = {
      title: '404 - Page Not Found | FreeToolz Cloud',
      description: 'The page you are looking for does not exist. Browse our 120+ free online tools.',
      canonical: 'https://freetoolz.cloud/404',
      keywords: '404, not found, freetoolz',
      author: 'Muhammad Atif Latif'
    };
  } else if (currentPath === '/about') {
    seoConfig = aboutSEO;
  } else if (currentPath === '/blog') {
    seoConfig = blogSEO;
  } else if (currentPath === '/contact') {
    seoConfig = contactSEO;
  } else if (currentPath.startsWith('/tools/')) {
    // Find the tool in our tools data
    const tool = tools.find(t => t.path === currentPath);
    if (tool) {
      seoConfig = generateToolSEO(
        tool.name,
        tool.description,
        tool.category,
        tool.path,
        [tool.name.toLowerCase(), tool.category, 'online tool', 'free', 'no signup']
      );
    }
  } else if (currentPath === '/privacy') {
    seoConfig = {
      title: 'Privacy Policy - FreeToolz Cloud',
      description: 'Read our privacy policy to understand how we protect your data and respect your privacy. All tools run locally in your browser.',
      canonical: 'https://freetoolz.cloud/privacy',
      keywords: 'privacy policy, data protection, freetoolz privacy',
      author: 'Muhammad Atif Latif'
    };
  } else if (currentPath === '/disclaimer') {
    seoConfig = {
      title: 'Disclaimer - FreeToolz Cloud',
      description: 'Important legal disclaimers and terms of use for FreeToolz Cloud online tools.',
      canonical: 'https://freetoolz.cloud/disclaimer',
      keywords: 'disclaimer, terms, legal',
      author: 'Muhammad Atif Latif'
    };
  } else if (currentPath === '/faq') {
    seoConfig = {
      title: 'FAQ - Frequently Asked Questions | FreeToolz Cloud',
      description: 'Find answers to common questions about FreeToolz Cloud tools, features, privacy, and usage.',
      canonical: 'https://freetoolz.cloud/faq',
      keywords: 'faq, help, questions, support, freetoolz help',
      author: 'Muhammad Atif Latif'
    };
  }

  // Apply SEO using our custom hook
  useSEO(seoConfig);

  // Smooth scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPath]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-all duration-300">
      <Header currentPath={currentPath} onNavigate={navigate} />
      <main className="flex-grow">
        <Suspense fallback={<LoadingSpinner />}>
          {isNotFound ? <NotFound onNavigate={navigate} /> : currentRoute.component}
        </Suspense>
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}

export default App;
