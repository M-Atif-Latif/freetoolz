import { lazy, Suspense, useEffect, useCallback, useMemo } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ScrollManager from './components/ScrollManager';
import { useSEO, homeSEO, aboutSEO, blogSEO, contactSEO, generateToolSEO } from './utils/useSEO';
import { tools, toolMasterList } from './data/tools';

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
const ToolPage = lazy(() => import('./pages/ToolPage'));

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
const PDFMetadataEditor = lazy(() => import('./tools/PDFMetadataEditor'));
const PDFPageReorder = lazy(() => import('./tools/PDFPageReorder'));

// New PDF Conversion Tools - Phase 4
const PDFToJPG = lazy(() => import('./tools/PDFToJPG'));
const JPGToPDF = lazy(() => import('./tools/JPGToPDF'));
const PDFAddPageNumbers = lazy(() => import('./tools/PDFAddPageNumbers'));
const PDFRedact = lazy(() => import('./tools/PDFRedact'));
const PDFToWord = lazy(() => import('./tools/PDFToWord'));
const PDFToPowerPoint = lazy(() => import('./tools/PDFToPowerPoint'));
const PDFToExcel = lazy(() => import('./tools/PDFToExcel'));
const HTMLToPDF = lazy(() => import('./tools/HTMLToPDF'));
const PDFProtect = lazy(() => import('./tools/PDFProtect'));
const WordToPDF = lazy(() => import('./tools/WordToPDF'));
const PowerPointToPDF = lazy(() => import('./tools/PowerPointToPDF'));
const ExcelToPDF = lazy(() => import('./tools/ExcelToPDF'));
const PDFToPDFA = lazy(() => import('./tools/PDFToPDFA'));
const EditPDF = lazy(() => import('./tools/EditPDF'));
const SignPDF = lazy(() => import('./tools/SignPDF'));
const OCRPDF = lazy(() => import('./tools/OCRPDF'));
const ComparePDF = lazy(() => import('./tools/ComparePDF'));
const RepairPDF = lazy(() => import('./tools/RepairPDF'));
const OrganizePDF = lazy(() => import('./tools/OrganizePDF'));

// Newly Implemented Tools
const TimeCalculator = lazy(() => import('./tools/TimeCalculator'));
const CaloriesCalculator = lazy(() => import('./tools/CaloriesCalculator'));
const BarcodeGenerator = lazy(() => import('./tools/BarcodeGenerator'));
const CreditCardGenerator = lazy(() => import('./tools/CreditCardGenerator'));
const GradientGenerator = lazy(() => import('./tools/GradientGenerator'));
const PDFToText = lazy(() => import('./tools/PDFToText'));
const PDFWatermark = lazy(() => import('./tools/PDFWatermark'));
const PDFUnlock = lazy(() => import('./tools/PDFUnlock'));
const ExtractImagesFromPDF = lazy(() => import('./tools/ExtractImagesFromPDF'));
const ExtractPDFPages = lazy(() => import('./tools/ExtractPDFPages'));
const JWTDecoder = lazy(() => import('./tools/JWTDecoder'));
const XMLFormatter = lazy(() => import('./tools/XMLFormatter'));
const SQLFormatter = lazy(() => import('./tools/SQLFormatter'));
const HTAccessGenerator = lazy(() => import('./tools/HTAccessGenerator'));
const ImageCropper = lazy(() => import('./tools/ImageCropper'));
const ImageRotator = lazy(() => import('./tools/ImageRotator'));
const DiceRoller = lazy(() => import('./tools/DiceRoller'));

const ToolComingSoon = lazy(() => import('./tools/ToolComingSoon'));

interface RouteConfig {
  path: string;
  component: JSX.Element;
  title: string;
  description: string;
  keywords?: string;
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // Scroll to top on route change - defer to next frame
  useEffect(() => {
    // Use requestAnimationFrame to defer scroll to avoid blocking
    const frameId = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
    return () => cancelAnimationFrame(frameId);
  }, [location.pathname]);

  const navigateTo = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);

  // Create route elements with location-based keys to force remounting
  const createRouteElement = useCallback((route: RouteConfig) => {
    switch (route.path) {
      case '/':
        return <Home key={currentPath} onNavigate={navigateTo} />;
      case '/about':
        return <About key={currentPath} />;
      case '/contact':
        return <Contact key={currentPath} />;
      case '/blog':
        return <Blog key={currentPath} />;
      case '/faq':
        return <FAQ key={currentPath} />;
      case '/sitemap':
        return <Sitemap key={currentPath} onNavigate={navigateTo} />;
      case '/privacy':
        return <Privacy key={currentPath} />;
      case '/terms':
        return <Terms key={currentPath} />;
      case '/disclaimer':
        return <Disclaimer key={currentPath} />;
      default:
        return route.component;
    }
  }, [currentPath, navigateTo]);

  const routes: RouteConfig[] = [
    {
      path: '/',
      component: <Home onNavigate={navigateTo} />,
      title: 'Free Tools - 140+ Free Online Tools | No Sign Up Required',
      description: 'Access 140+ free online tools for text processing, PDF manipulation, image editing, calculations, conversions, code formatting and more. Completely free, secure, and privacy-focused. No registration required.',
      keywords: 'free online tools, text converter, PDF tools, image editor, calculator'
    },
    {
      path: '/about',
      component: <About />,
      title: 'About Us - Free Tools',
      description: 'Learn about Free Tools mission to provide free, professional-grade online tools for everyone.'
    },
    {
      path: '/contact',
      component: <Contact />,
      title: 'Contact Us - Free Tools',
      description: 'Get in touch with Free Tools. We value your feedback and questions.'
    },
    {
      path: '/privacy',
      component: <Privacy />,
      title: 'Privacy Policy - Free Tools',
      description: 'Read our privacy policy to understand how we protect your data and respect your privacy.'
    },
    {
      path: '/terms',
      component: <Terms />,
      title: 'Terms of Service - Free Tools',
      description: 'Review the terms and conditions for using Free Tools services.'
    },
    {
      path: '/disclaimer',
      component: <Disclaimer />,
      title: 'Disclaimer - Free Tools',
      description: 'Important information and disclaimers about using Free Tools services.'
    },
    {
      path: '/blog',
      component: <Blog />,
      title: 'Blog - Free Tools',
      description: 'Read our latest articles, guides, and insights on productivity, privacy, and online tools.'
    },
    {
      path: '/faq',
      component: <FAQ />,
      title: 'FAQ - Frequently Asked Questions | Free Tools',
      description: 'Find answers to common questions about Free Tools, our tools, privacy, security, and more.'
    },
    {
      path: '/sitemap',
      component: <Sitemap onNavigate={navigateTo} />,
      title: 'Sitemap - All Pages | Free Tools',
      description: 'Browse all pages and tools available on Free Tools. Complete site navigation and tool directory.'
    },
    {
      path: '/tools/word-counter',
      component: <WordCounter />,
      title: 'Word Counter - Free Online Tool | Free Tools',
      description: 'Count words, characters, sentences, and paragraphs instantly. Free word counter tool with real-time statistics.',
      keywords: 'word counter, character count, word count tool'
    },
    {
      path: '/tools/case-converter',
      component: <CaseConverter />,
      title: 'Case Converter - Change Text Case Online | Free Tools',
      description: 'Convert text to uppercase, lowercase, title case, camelCase, and more. Free online case converter tool.'
    },
    {
      path: '/tools/text-reverser',
      component: <TextReverser />,
      title: 'Text Reverser - Reverse Text Online | Free Tools',
      description: 'Reverse text or flip it upside down instantly. Free online text reverser tool.'
    },
    {
      path: '/tools/remove-spaces',
      component: <RemoveSpaces />,
      title: 'Remove Extra Spaces - Clean Text Online | Free Tools',
      description: 'Remove extra whitespace and clean up your text. Free space remover tool.'
    },
    {
      path: '/tools/lorem-ipsum',
      component: <LoremIpsum />,
      title: 'Lorem Ipsum Generator - Placeholder Text | Free Tools',
      description: 'Generate Lorem Ipsum placeholder text for your designs. Free text generator tool.'
    },
    {
      path: '/tools/password-generator',
      component: <PasswordGenerator />,
      title: 'Secure Password Generator - Create Strong Passwords | Free Tools',
      description: 'Generate strong, random passwords with custom requirements. Free secure password generator tool.'
    },
    {
      path: '/tools/qr-code-generator',
      component: <QRCodeGenerator />,
      title: 'QR Code Generator - Create Free QR Codes | Free Tools',
      description: 'Generate QR codes for URLs, text, and more. Free online QR code generator tool.'
    },
    {
      path: '/tools/uuid-generator',
      component: <UUIDGenerator />,
      title: 'UUID Generator - Create Unique IDs | Free Tools',
      description: 'Generate UUIDs (unique identifiers) for your applications. Free UUID generator tool.'
    },
    {
      path: '/tools/random-number',
      component: <RandomNumber />,
      title: 'Random Number Generator - Free Online Tool | Free Tools',
      description: 'Generate random numbers within any range. Free random number generator.'
    },
    {
      path: '/tools/base64-encoder',
      component: <Base64Converter />,
      title: 'Base64 Encoder/Decoder - Free Online Tool | Free Tools',
      description: 'Encode and decode Base64 strings instantly. Free Base64 converter tool for developers.'
    },
    {
      path: '/tools/url-encoder',
      component: <URLEncoder />,
      title: 'URL Encoder/Decoder - Free Online Tool | Free Tools',
      description: 'Encode and decode URL strings for safe web transmission. Free URL encoder tool.'
    },
    {
      path: '/tools/color-converter',
      component: <ColorConverter />,
      title: 'Color Converter - HEX RGB HSL | Free Tools',
      description: 'Convert colors between HEX, RGB, and HSL formats. Free color converter tool.'
    },
    {
      path: '/tools/json-formatter',
      component: <JSONFormatter />,
      title: 'JSON Formatter & Validator - Free Online Tool | Free Tools',
      description: 'Format, minify, and validate JSON data instantly. Free JSON formatter for developers.'
    },
    {
      path: '/tools/bmi-calculator',
      component: <BMICalculator />,
      title: 'BMI Calculator - Body Mass Index Calculator | Free Tools',
      description: 'Calculate your BMI and understand your health status. Free BMI calculator with detailed results.'
    },
    {
      path: '/tools/age-calculator',
      component: <AgeCalculator />,
      title: 'Age Calculator - Calculate Your Exact Age | Free Tools',
      description: 'Calculate your age in years, months, days, and more. Free age calculator tool.'
    },
    {
      path: '/tools/percentage-calculator',
      component: <PercentageCalculator />,
      title: 'Percentage Calculator - Free Online Tool | Free Tools',
      description: 'Calculate percentages, increases, and decreases easily. Free percentage calculator.'
    },
    {
      path: '/tools/character-counter',
      component: <CharacterCounter />,
      title: 'Character Counter - Free Online Tool | Free Tools',
      description: 'Count characters with and without spaces.'
    },
    {
      path: '/tools/text-to-slug',
      component: <TextToSlug />,
      title: 'Text to Slug Converter | Free Tools',
      description: 'Convert text to URL-friendly slugs.'
    },
    {
      path: '/tools/markdown-to-html',
      component: <MarkdownToHTML />,
      title: 'Markdown to HTML Converter | Free Tools',
      description: 'Convert Markdown to HTML instantly.'
    },
    {
      path: '/tools/duplicate-line-remover',
      component: <DuplicateLineRemover />,
      title: 'Duplicate Line Remover | Free Tools',
      description: 'Remove duplicate lines from text.'
    },
    {
      path: '/tools/line-sorter',
      component: <LineSorter />,
      title: 'Line Sorter | Free Tools',
      description: 'Sort lines alphabetically.'
    },
    {
      path: '/tools/text-diff',
      component: <TextDiff />,
      title: 'Text Diff Checker | Free Tools',
      description: 'Compare two texts and see differences.'
    },
    {
      path: '/tools/compound-interest',
      component: <CompoundInterest />,
      title: 'Compound Interest Calculator | Free Tools',
      description: 'Calculate compound interest on investments.'
    },
    {
      path: '/tools/loan-calculator',
      component: <LoanCalculator />,
      title: 'Loan Calculator | Free Tools',
      description: 'Calculate monthly loan payments.'
    },
    {
      path: '/tools/tip-calculator',
      component: <TipCalculator />,
      title: 'Tip Calculator | Free Tools',
      description: 'Calculate tips and split bills.'
    },
    {
      path: '/tools/discount-calculator',
      component: <DiscountCalculator />,
      title: 'Discount Calculator | Free Tools',
      description: 'Calculate discounted prices.'
    },
    {
      path: '/tools/unit-converter',
      component: <UnitConverter />,
      title: 'Unit Converter | Free Tools',
      description: 'Convert between units of measurement.'
    },
    {
      path: '/tools/currency-converter',
      component: <CurrencyConverter />,
      title: 'Currency Converter | Free Tools',
      description: 'Convert between currencies.'
    },
    {
      path: '/tools/timezone-converter',
      component: <TimeZoneConverter />,
      title: 'Time Zone Converter | Free Tools',
      description: 'Convert times between time zones.'
    },
    {
      path: '/tools/image-base64',
      component: <ImageBase64 />,
      title: 'Image to Base64 Converter | Free Tools',
      description: 'Convert images to Base64.'
    },
    {
      path: '/tools/html-encoder',
      component: <HTMLEncoder />,
      title: 'HTML Entity Encoder | Free Tools',
      description: 'Encode and decode HTML entities.'
    },
    {
      path: '/tools/css-minifier',
      component: <CSSMinifier />,
      title: 'CSS Minifier | Free Tools',
      description: 'Minify CSS code.'
    },
    {
      path: '/tools/js-minifier',
      component: <JSMinifier />,
      title: 'JavaScript Minifier | Free Tools',
      description: 'Minify JavaScript code.'
    },
    {
      path: '/tools/regex-tester',
      component: <RegexTester />,
      title: 'Regex Tester | Free Tools',
      description: 'Test regular expressions.'
    },
    {
      path: '/tools/unix-timestamp',
      component: <UnixTimestamp />,
      title: 'Unix Timestamp Converter | Free Tools',
      description: 'Convert Unix timestamps and dates.'
    },
    {
      path: '/tools/hash-generator',
      component: <HashGenerator />,
      title: 'Hash Generator | Free Tools',
      description: 'Generate SHA-1 and SHA-256 hashes.'
    },
    {
      path: '/tools/merge-pdf',
      component: <MergePDF />,
      title: 'Merge PDF Files | Free Tools',
      description: 'Combine multiple PDF files into one.'
    },
    {
      path: '/tools/split-pdf',
      component: <SplitPDF />,
      title: 'Split PDF File | Free Tools',
      description: 'Split PDF into separate pages.'
    },
    {
      path: '/tools/compress-pdf',
      component: <CompressPDF />,
      title: 'Compress PDF | Free Tools',
      description: 'Reduce PDF file size.'
    },
    {
      path: '/tools/rotate-pdf',
      component: <RotatePDF />,
      title: 'Rotate PDF Pages | Free Tools',
      description: 'Rotate pages in PDF document.'
    },
    {
      path: '/tools/pdf-unlock',
      component: <PDFUnlock />,
      title: 'PDF Unlock | Free Tools',
      description: 'Remove password protection from PDF files.'
    },
    {
      path: '/tools/extract-images-from-pdf',
      component: <ExtractImagesFromPDF />,
      title: 'Extract Images from PDF | Free Tools',
      description: 'Extract all images from PDF documents.'
    },
    {
      path: '/tools/extract-pdf-pages',
      component: <ExtractPDFPages />,
      title: 'Extract PDF Pages | Free Tools',
      description: 'Extract specific page ranges from PDF files.'
    },
    {
      path: '/tools/image-compressor',
      component: <ImageCompressor />,
      title: 'Image Compressor | Free Tools',
      description: 'Compress images to reduce file size.'
    },
    {
      path: '/tools/image-resizer',
      component: <ImageResizer />,
      title: 'Image Resizer | Free Tools',
      description: 'Resize images to custom dimensions.'
    },
    {
      path: '/tools/image-format-converter',
      component: <ImageFormatConverter />,
      title: 'Image Format Converter | Free Tools',
      description: 'Convert images between formats.'
    },
    {
      path: '/tools/grayscale-converter',
      component: <GrayscaleConverter />,
      title: 'Grayscale Image Converter | Free Tools',
      description: 'Convert color images to grayscale.'
    },
    {
      path: '/tools/background-remover',
      component: <ImageBackgroundRemover />,
      title: 'Image Background Remover | Free Tools',
      description: 'Remove background from images easily.'
    },
    {
      path: '/tools/random-picker',
      component: <RandomPicker />,
      title: 'Random Picker | Free Tools',
      description: 'Pick random items from your list.'
    },
    {
      path: '/tools/coin-flip',
      component: <CoinFlip />,
      title: 'Coin Flip & Dice Roll | Free Tools',
      description: 'Flip a coin or roll a dice.'
    },
    {
      path: '/tools/temperature-converter',
      component: <TemperatureConverter />,
      title: 'Temperature Converter | Free Tools',
      description: 'Convert Celsius, Fahrenheit, Kelvin.'
    },
    {
      path: '/tools/binary-calculator',
      component: <BinaryCalculator />,
      title: 'Binary Calculator | Free Tools',
      description: 'Binary arithmetic calculator.'
    },
    {
      path: '/tools/hex-calculator',
      component: <HexCalculator />,
      title: 'Hex Calculator | Free Tools',
      description: 'Hexadecimal calculator.'
    },
    {
      path: '/tools/stopwatch',
      component: <Stopwatch />,
      title: 'Stopwatch | Free Tools',
      description: 'Accurate time measurement.'
    },
    {
      path: '/tools/timer',
      component: <Timer />,
      title: 'Timer | Free Tools',
      description: 'Countdown timer.'
    },
    {
      path: '/tools/color-picker',
      component: <ColorPicker />,
      title: 'Color Picker | Free Tools',
      description: 'Pick and convert colors.'
    },
    {
      path: '/tools/text-to-speech',
      component: <TextToSpeech />,
      title: 'Text to Speech | Free Tools',
      description: 'Convert text to speech.'
    },
    {
      path: '/tools/password-strength',
      component: <PasswordStrengthChecker />,
      title: 'Password Strength Checker | Free Tools',
      description: 'Check password strength.'
    },
    {
      path: '/tools/word-frequency',
      component: <WordFrequency />,
      title: 'Word Frequency Counter - Analyze Text | Free Tools',
      description: 'Analyze word frequency in text with detailed statistics and CSV export.'
    },
    {
      path: '/tools/date-calculator',
      component: <DateCalculator />,
      title: 'Date Calculator - Calculate Date Difference | Free Tools',
      description: 'Calculate the difference between two dates in years, months, days, and more.'
    },
    {
      path: '/tools/gpa-calculator',
      component: <GPACalculator />,
      title: 'GPA Calculator - Calculate Grade Point Average | Free Tools',
      description: 'Calculate your GPA with support for multiple courses and different grading scales.'
    },
    {
      path: '/tools/fuel-cost',
      component: <FuelCostCalculator />,
      title: 'Fuel Cost Calculator - Trip Cost Estimator | Free Tools',
      description: 'Calculate fuel costs for your trips with support for different units and efficiency.'
    },
    {
      path: '/tools/time-calculator',
      component: <TimeCalculator />,
      title: 'Time Calculator - Add & Subtract Time | Free Tools',
      description: 'Add and subtract hours and minutes instantly. Time calculator tool.'
    },
    {
      path: '/tools/calories-calculator',
      component: <CaloriesCalculator />,
      title: 'Calories Calculator - Daily Calorie Needs | Free Tools',
      description: 'Estimate daily calorie requirements for maintenance, loss, or gain.'
    },
    {
      path: '/tools/barcode-generator',
      component: <BarcodeGenerator />,
      title: 'Barcode Generator - Create Barcode Images | Free Tools',
      description: 'Create barcodes in popular formats for products and inventory.'
    },
    {
      path: '/tools/credit-card-generator',
      component: <CreditCardGenerator />,
      title: 'Test Credit Card Generator | Free Tools',
      description: 'Generate test-only credit card numbers for development and QA.'
    },
    {
      path: '/tools/gradient-generator',
      component: <GradientGenerator />,
      title: 'CSS Gradient Generator - Gradient Builder | Free Tools',
      description: 'Create beautiful CSS gradients and export ready-to-use CSS.'
    },
    {
      path: '/tools/pdf-to-text',
      component: <PDFToText />,
      title: 'PDF to Text Extractor | Free Tools',
      description: 'Extract text from PDF files quickly in your browser.'
    },
    {
      path: '/tools/pdf-watermark',
      component: <PDFWatermark />,
      title: 'PDF Watermark Tool | Free Tools',
      description: 'Add custom watermarks to PDF files online.'
    },
    {
      path: '/tools/jwt-decoder',
      component: <JWTDecoder />,
      title: 'JWT Decoder - Decode JSON Web Tokens | Free Tools',
      description: 'Decode JWT tokens and inspect payload claims quickly.'
    },
    {
      path: '/tools/xml-formatter',
      component: <XMLFormatter />,
      title: 'XML Formatter & Beautifier | Free Tools',
      description: 'Format and beautify XML data with clean indentation.'
    },
    {
      path: '/tools/sql-formatter',
      component: <SQLFormatter />,
      title: 'SQL Formatter - Beautify SQL Queries | Free Tools',
      description: 'Format SQL queries with consistent style and indentation.'
    },
    {
      path: '/tools/htaccess-generator',
      component: <HTAccessGenerator />,
      title: '.htaccess Generator - Apache Rules | Free Tools',
      description: 'Generate Apache .htaccess rules for redirects and rewrites.'
    },
    {
      path: '/tools/image-cropper',
      component: <ImageCropper />,
      title: 'Image Cropper - Crop Images Online | Free Tools',
      description: 'Crop images to custom dimensions and aspect ratios.'
    },
    {
      path: '/tools/image-rotator',
      component: <ImageRotator />,
      title: 'Image Rotator - Rotate & Flip Images | Free Tools',
      description: 'Rotate and flip images online in seconds.'
    },
    {
      path: '/tools/dice-roller',
      component: <DiceRoller />,
      title: 'Dice Roller - Virtual Dice Tool | Free Tools',
      description: 'Roll virtual dice with configurable sides and counts.'
    },
    {
      path: '/tools/text-to-binary',
      component: <TextToBinary />,
      title: 'Text to Binary Converter - Free Online Tool | Free Tools',
      description: 'Convert text to binary and binary to text instantly with our free converter.'
    },
    {
      path: '/tools/morse-code',
      component: <MorseCodeConverter />,
      title: 'Morse Code Converter - Text to Morse | Free Tools',
      description: 'Convert text to Morse code and back with audio playback support.'
    },
    {
      path: '/tools/roman-numeral',
      component: <RomanNumeralConverter />,
      title: 'Roman Numeral Converter - Number Converter | Free Tools',
      description: 'Convert between numbers and Roman numerals instantly (1-3999).'
    },
    {
      path: '/tools/find-replace',
      component: <FindAndReplace />,
      title: 'Find and Replace - Text Editor Tool | Free Tools',
      description: 'Find and replace text with regex support and case-sensitive options.'
    },
    {
      path: '/tools/readability-score',
      component: <ReadabilityScore />,
      title: 'Readability Score - Flesch Reading Ease | Free Tools',
      description: 'Analyze text readability with Flesch Reading Ease and Flesch-Kincaid Grade scores.'
    },
    {
      path: '/tools/syllable-counter',
      component: <SyllableCounter />,
      title: 'Syllable Counter - Count Syllables in Text | Free Tools',
      description: 'Count syllables in text and words with detailed word-by-word breakdown.'
    },
    {
      path: '/tools/letter-counter',
      component: <LetterCounter />,
      title: 'Letter Counter - Letter Frequency Analyzer | Free Tools',
      description: 'Count and analyze letter frequency in text with vowel and consonant statistics.'
    },
    {
      path: '/tools/number-base',
      component: <NumberBaseConverter />,
      title: 'Number Base Converter - Convert Between Bases (2-36) | Free Tools',
      description: 'Convert numbers between different bases including binary, octal, decimal, hexadecimal, and more.'
    },
    {
      path: '/tools/reverse-words',
      component: <ReverseWords />,
      title: 'Reverse Words - Reverse Word Order | Free Tools',
      description: 'Reverse the order of words in sentences while keeping individual words intact.'
    },
    {
      path: '/tools/invisible-character',
      component: <InvisibleCharacter />,
      title: 'Invisible Character Generator - Copy Blank Text | Free Tools',
      description: 'Generate and copy invisible Unicode characters for Discord, WhatsApp, and more.'
    },
    {
      path: '/tools/fake-data-generator',
      component: <FakeDataGenerator />,
      title: 'Fake Data Generator - Generate Test Data | Free Tools',
      description: 'Generate realistic fake personal data for testing, development, and placeholder purposes.'
    },
    // New Tools - Text Tools
    {
      path: '/tools/smart-sentence-splitter',
      component: <SmartSentenceSplitter />,
      title: 'Smart Sentence Splitter - AI Text Analysis | Free Tools',
      description: 'Split text into sentences intelligently with AI-powered analysis. Handles abbreviations, quotes, and edge cases.',
      keywords: 'sentence splitter, text analysis, NLP tool, text segmentation'
    },
    {
      path: '/tools/contraction-expander',
      component: <ContractionExpander />,
      title: 'Contraction Expander - Expand Contractions | Free Tools',
      description: 'Expand contractions like "don\'t" to "do not" automatically. Perfect for formal writing and academic papers.',
      keywords: 'contraction expander, text formatter, formal writing'
    },
    {
      path: '/tools/read-aloud-caption-generator',
      component: <ReadAloudCaptionGenerator />,
      title: 'Read Aloud Caption Generator - Text to Captions | Free Tools',
      description: 'Generate captions and subtitles from text with customizable timing and formatting for videos.',
      keywords: 'caption generator, subtitle maker, SRT generator'
    },
    {
      path: '/tools/title-headline-analyzer',
      component: <TitleHeadlineAnalyzer />,
      title: 'Title & Headline Analyzer - SEO Score | Free Tools',
      description: 'Analyze headlines and titles for engagement, SEO score, emotional impact, and readability.',
      keywords: 'headline analyzer, title optimizer, SEO analyzer'
    },
    {
      path: '/tools/text-randomizer',
      component: <TextRandomizer />,
      title: 'Text Randomizer - Shuffle Words & Lines | Free Tools',
      description: 'Randomize text by shuffling words, lines, or characters. Perfect for testing and data anonymization.',
      keywords: 'text randomizer, word shuffler, text shuffler'
    },
    // New Tools - Developer Tools
    {
      path: '/tools/csv-column-splitter',
      component: <CSVColumnSplitter />,
      title: 'CSV Column Splitter - Extract CSV Columns | Free Tools',
      description: 'Extract specific columns from CSV files and export them. Perfect for data manipulation and analysis.',
      keywords: 'CSV splitter, column extractor, CSV parser'
    },
    {
      path: '/tools/yaml-json-converter',
      component: <YAMLJSONConverter />,
      title: 'YAML to JSON Converter - Bidirectional | Free Tools',
      description: 'Convert between YAML and JSON formats instantly. Perfect for config files and data transformation.',
      keywords: 'YAML converter, JSON converter, config converter'
    },
    {
      path: '/tools/css-tailwind-classifier',
      component: <CSSTailwindClassifier />,
      title: 'CSS to Tailwind Classifier - Convert Styles | Free Tools',
      description: 'Convert CSS styles to Tailwind CSS classes automatically. Speed up your Tailwind development.',
      keywords: 'CSS to Tailwind, Tailwind converter, utility classes'
    },
    {
      path: '/tools/http-status-tester',
      component: <HTTPStatusTester />,
      title: 'HTTP Status Code Tester - Check Response Codes | Free Tools',
      description: 'Test HTTP status codes and check website response codes. Essential tool for developers and SEO.',
      keywords: 'HTTP tester, status code checker, response tester'
    },
    {
      path: '/tools/cors-header-checker',
      component: <CORSHeaderChecker />,
      title: 'CORS Header Checker - Test CORS Configuration | Free Tools',
      description: 'Check CORS headers and test cross-origin resource sharing configuration for APIs.',
      keywords: 'CORS checker, CORS tester, API headers'
    },
    // New Tools - Calculators & Converters
    {
      path: '/tools/power-energy-converter',
      component: <PowerEnergyConverter />,
      title: 'Power & Energy Converter - Watts to kWh | Free Tools',
      description: 'Convert between power and energy units including watts, kilowatts, BTU, and joules.',
      keywords: 'power converter, energy converter, watt calculator'
    },
    {
      path: '/tools/file-encoding-detector',
      component: <FileEncodingDetector />,
      title: 'File Encoding Detector - Detect Text Encoding | Free Tools',
      description: 'Detect and identify file encoding formats including UTF-8, ASCII, ISO-8859, and more.',
      keywords: 'encoding detector, charset detector, file encoding'
    },
    {
      path: '/tools/image-dpi-calculator',
      component: <ImageDPICalculator />,
      title: 'Image DPI Calculator - Print Size Calculator | Free Tools',
      description: 'Calculate DPI, print size, and pixel dimensions for images. Essential for print design.',
      keywords: 'DPI calculator, print size calculator, image resolution'
    },
    {
      path: '/tools/hash-identifier',
      component: <HashIdentifier />,
      title: 'Hash Identifier - Identify Hash Types | Free Tools',
      description: 'Identify hash types including MD5, SHA-1, SHA-256, and more from hash strings.',
      keywords: 'hash identifier, hash type detector, crypto hash'
    },
    {
      path: '/tools/permutation-combination-calculator',
      component: <PermutationCombinationCalculator />,
      title: 'Permutation & Combination Calculator | Free Tools',
      description: 'Calculate permutations and combinations with detailed formulas and explanations.',
      keywords: 'permutation calculator, combination calculator, probability'
    },
    // New Tools - Design & Time Tools
    {
      path: '/tools/color-blindness-simulator',
      component: <ColorBlindnessSimulator />,
      title: 'Color Blindness Simulator - Test Accessibility | Free Tools',
      description: 'Simulate different types of color blindness on colors and images for accessibility testing.',
      keywords: 'color blindness simulator, accessibility checker, color vision'
    },
    {
      path: '/tools/business-days-calculator',
      component: <BusinessDaysCalculator />,
      title: 'Business Days Calculator - Working Days | Free Tools',
      description: 'Calculate business days between dates excluding weekends and holidays.',
      keywords: 'business days calculator, working days calculator, date calculator'
    },
    {
      path: '/tools/ascii-art-generator',
      component: <ASCIIArtGenerator />,
      title: 'ASCII Art Generator - Text to ASCII Art | Free Tools',
      description: 'Convert text to ASCII art with multiple fonts and styles. Create banner text for terminals.',
      keywords: 'ASCII art generator, text art, banner generator'
    },
    {
      path: '/tools/working-hours-timezone-converter',
      component: <WorkingHoursTimezoneConverter />,
      title: 'Working Hours Timezone Converter - Global Time | Free Tools',
      description: 'Convert working hours across timezones. Perfect for global teams and remote collaboration.',
      keywords: 'timezone converter, working hours, global time'
    },
    // New Tools - Utilities & Data Tools
    {
      path: '/tools/csv-duplicate-finder',
      component: <CSVDuplicateFinder />,
      title: 'CSV Duplicate Finder - Find Duplicate Rows | Free Tools',
      description: 'Find and remove duplicate rows in CSV files based on selected columns.',
      keywords: 'CSV duplicate finder, duplicate remover, data cleaner'
    },
    {
      path: '/tools/regex-bulk-replace',
      component: <RegexBulkReplace />,
      title: 'Regex Bulk Replace - Multiple Find & Replace | Free Tools',
      description: 'Perform multiple find and replace operations with regex support in bulk.',
      keywords: 'regex replace, bulk replace, text editor'
    },
    {
      path: '/tools/bulk-url-shortener',
      component: <BulkURLShortener />,
      title: 'Bulk URL Shortener - Shorten Multiple URLs | Free Tools',
      description: 'Shorten multiple URLs at once. Perfect for social media and marketing campaigns.',
      keywords: 'URL shortener, bulk URL, link shortener'
    },
    {
      path: '/tools/clipboard-history',
      component: <ClipboardHistory />,
      title: 'Clipboard History Manager - Track Copies | Free Tools',
      description: 'Track and manage your clipboard history with timestamps and search functionality.',
      keywords: 'clipboard manager, clipboard history, copy tracker'
    },
    {
      path: '/tools/dataset-sampler',
      component: <DatasetSampler />,
      title: 'Dataset Sampler - Random CSV Sampling | Free Tools',
      description: 'Extract random samples from large CSV datasets for testing and analysis.',
      keywords: 'dataset sampler, CSV sampler, random sampling'
    },
    // New Tools - File & Debug Tools
    {
      path: '/tools/zip-file-inspector',
      component: <ZIPFileInspector />,
      title: 'ZIP File Inspector - View ZIP Contents | Free Tools',
      description: 'Inspect ZIP file contents without extracting. View file list, sizes, and compression ratios.',
      keywords: 'ZIP inspector, archive viewer, file inspector'
    },
    {
      path: '/tools/console-log-formatter',
      component: <ConsoleLogFormatter />,
      title: 'Console Log Formatter - Format Debug Logs | Free Tools',
      description: 'Format and beautify console logs for better readability. Supports JSON and custom formats.',
      keywords: 'log formatter, console formatter, debug tool'
    },
    // New Tools - Image & Media Tools
    {
      path: '/tools/svg-optimizer',
      component: <SVGOptimizer />,
      title: 'SVG Optimizer - Compress SVG Files | Free Tools',
      description: 'Optimize and compress SVG files by removing unnecessary data. Reduce file size instantly.',
      keywords: 'SVG optimizer, SVG compressor, SVG minifier'
    },
    {
      path: '/tools/favicon-generator',
      component: <FaviconGenerator />,
      title: 'Favicon Generator - Create Favicons Online | Free Tools',
      description: 'Generate favicons from text or colors. Create 16x16, 32x32, and 64x64 favicon sizes.',
      keywords: 'favicon generator, icon creator, website icon'
    },
    {
      path: '/tools/color-contrast-checker',
      component: <ColorContrastChecker />,
      title: 'Color Contrast Checker - WCAG Accessibility | Free Tools',
      description: 'Check color contrast ratios for WCAG accessibility compliance. Test foreground and background colors.',
      keywords: 'contrast checker, WCAG checker, accessibility tool'
    },
    // New Tools - Security & SEO Tools
    {
      path: '/tools/password-strength-analyzer',
      component: <PasswordStrengthAnalyzer />,
      title: 'Password Strength Analyzer - Security Checker | Free Tools',
      description: 'Analyze password strength with detailed security feedback and improvement suggestions.',
      keywords: 'password analyzer, password checker, security tool'
    },
    {
      path: '/tools/cookie-inspector',
      component: <CookieInspector />,
      title: 'Cookie Inspector - View Browser Cookies | Free Tools',
      description: 'Inspect, view, and manage browser cookies for the current domain. Privacy and debugging tool.',
      keywords: 'cookie inspector, cookie viewer, browser cookies'
    },
    {
      path: '/tools/meta-robots-tester',
      component: <MetaRobotsTester />,
      title: 'Meta Robots Tester - Validate Robots Tags | Free Tools',
      description: 'Test and validate meta robots tags including noindex, nofollow, and other directives.',
      keywords: 'meta robots tester, SEO validator, robots tag checker'
    },
    {
      path: '/tools/structured-data-validator',
      component: <StructuredDataValidator />,
      title: 'Structured Data Validator - Schema Markup | Free Tools',
      description: 'Validate JSON-LD, Microdata, and RDFa structured data for SEO and rich snippets.',
      keywords: 'schema validator, structured data, JSON-LD validator'
    },
    {
      path: '/tools/sitemap-url-extractor',
      component: <SitemapURLExtractor />,
      title: 'Sitemap URL Extractor - Extract URLs from XML | Free Tools',
      description: 'Extract all URLs from XML sitemaps. Export to TXT or CSV for analysis and SEO audits.',
      keywords: 'sitemap extractor, URL extractor, XML parser'
    },
    // New Tools - PDF & Document Tools
    {
      path: '/tools/pdf-page-extractor',
      component: <PDFPageExtractor />,
      title: 'PDF Page Extractor - Extract PDF Pages | Free Tools',
      description: 'Extract specific pages from PDF documents. Select page ranges and create new PDFs.',
      keywords: 'PDF extractor, PDF splitter, page extractor'
    },
    {
      path: '/tools/pdf-metadata-editor',
      component: <PDFMetadataEditor />,
      title: 'PDF Metadata Editor - Edit Document Properties | Free Tools',
      description: 'Edit PDF metadata including title, author, subject, and keywords.',
      keywords: 'PDF metadata, document properties, editor'
    },
    {
      path: '/tools/pdf-page-reorder',
      component: <PDFPageReorder />,
      title: 'PDF Page Reorder - Rearrange PDF Pages | Free Tools',
      description: 'Reorder, rearrange, and reorganize PDF pages with interactive controls.',
      keywords: 'page reorder, PDF reorganize, page management'
    },
    // New PDF Conversion Tools - Phase 4
    {
      path: '/tools/pdf-to-jpg',
      component: <PDFToJPG />,
      title: 'PDF to JPG - Convert PDF Pages to Images | Free Tools',
      description: 'Convert PDF pages to JPG image files. Select specific pages and adjust compression quality.',
      keywords: 'PDF to JPG, PDF to image, PDF converter'
    },
    {
      path: '/tools/jpg-to-pdf',
      component: <JPGToPDF />,
      title: 'JPG to PDF - Convert Images to PDF | Free Tools',
      description: 'Convert JPG and other image files to PDF documents. Support for multiple images.',
      keywords: 'JPG to PDF, image to PDF, PDF creator'
    },
    {
      path: '/tools/pdf-add-page-numbers',
      component: <PDFAddPageNumbers />,
      title: 'PDF Add Page Numbers - Number PDF Pages | Free Tools',
      description: 'Add page numbers to PDF documents. Choose position and customize font size.',
      keywords: 'page numbers, PDF numbering, annotation'
    },
    {
      path: '/tools/pdf-redact',
      component: <PDFRedact />,
      title: 'PDF Redact - Remove Sensitive Content | Free Tools',
      description: 'Redact sensitive text and content from PDF documents. Create permanent black boxes.',
      keywords: 'PDF redact, sensitive data, privacy tool'
    },
    {
      path: '/tools/pdf-to-word',
      component: <PDFToWord />,
      title: 'PDF to Word - Convert PDF to DOCX | Free Tools',
      description: 'Convert PDF documents to editable Word format. Extract text and preserve formatting.',
      keywords: 'PDF to Word, DOCX converter, document conversion'
    },
    {
      path: '/tools/pdf-to-powerpoint',
      component: <PDFToPowerPoint />,
      title: 'PDF to PowerPoint - Convert to PPTX | Free Tools',
      description: 'Convert PDF pages to PowerPoint presentation slides. Create editable presentations.',
      keywords: 'PDF to PowerPoint, PPTX converter, slide conversion'
    },
    {
      path: '/tools/pdf-to-excel',
      component: <PDFToExcel />,
      title: 'PDF to Excel - Extract Tables to Spreadsheets | Free Tools',
      description: 'Extract tables and data from PDF to Excel format. Convert structured data easily.',
      keywords: 'PDF to Excel, table extraction, spreadsheet converter'
    },
    {
      path: '/tools/html-to-pdf',
      component: <HTMLToPDF />,
      title: 'HTML to PDF - Convert HTML to PDF | Free Tools',
      description: 'Convert HTML content to PDF documents. Preserve formatting and styling.',
      keywords: 'HTML to PDF, web to PDF, document converter'
    },
    {
      path: '/tools/protect-pdf',
      component: <PDFProtect />,
      title: 'Protect PDF - Add Password Protection | Free Tools',
      description: 'Add password protection to PDF files. Set restrictions and encryption.',
      keywords: 'PDF protection, password protection, security'
    },
    {
      path: '/tools/word-to-pdf',
      component: <WordToPDF />,
      title: 'Word to PDF - Convert DOCX to PDF | Free Tools',
      description: 'Convert Word documents to PDF format. Maintain formatting and layout.',
      keywords: 'Word to PDF, DOCX to PDF, document conversion'
    },
    {
      path: '/tools/powerpoint-to-pdf',
      component: <PowerPointToPDF />,
      title: 'PowerPoint to PDF - Convert PPTX to PDF | Free Tools',
      description: 'Convert PowerPoint presentations to PDF. Export slides as PDF document.',
      keywords: 'PowerPoint to PDF, PPTX to PDF, presentation converter'
    },
    {
      path: '/tools/excel-to-pdf',
      component: <ExcelToPDF />,
      title: 'Excel to PDF - Convert Spreadsheet to PDF | Free Tools',
      description: 'Convert Excel spreadsheets to PDF format. Preserve formatting and data.',
      keywords: 'Excel to PDF, spreadsheet to PDF, format conversion'
    },
    {
      path: '/tools/pdf-to-pdfa',
      component: <PDFToPDFA />,
      title: 'PDF to PDF/A - Archive Format Converter | Free Tools',
      description: 'Convert PDF to PDF/A format for long-term archival and preservation.',
      keywords: 'PDF/A, archival format, document preservation'
    },
    {
      path: '/tools/edit-pdf',
      component: <EditPDF />,
      title: 'Edit PDF - Remove and Reorder Pages | Free Tools',
      description: 'Edit PDF documents by removing, reordering, or deleting pages easily.',
      keywords: 'edit PDF, page removal, PDF editor'
    },
    {
      path: '/tools/sign-pdf',
      component: <SignPDF />,
      title: 'Sign PDF - Add Signatures to Documents | Free Tools',
      description: 'Add digital signatures and signature text to PDF documents.',
      keywords: 'PDF signature, sign document, digital signature'
    },
    {
      path: '/tools/ocr-pdf',
      component: <OCRPDF />,
      title: 'OCR PDF - Extract Text from Scanned PDFs | Free Tools',
      description: 'Use OCR to extract text from scanned PDF documents and images.',
      keywords: 'OCR, text extraction, scanned documents'
    },
    {
      path: '/tools/compare-pdf',
      component: <ComparePDF />,
      title: 'Compare PDF - Identify PDF Differences | Free Tools',
      description: 'Compare two PDF files and identify differences between documents.',
      keywords: 'PDF comparison, diff tool, document compare'
    },
    {
      path: '/tools/repair-pdf',
      component: <RepairPDF />,
      title: 'Repair PDF - Fix Corrupted PDF Files | Free Tools',
      description: 'Repair corrupted or damaged PDF files and restore accessibility.',
      keywords: 'PDF repair, corrupted files, file recovery'
    },
    {
      path: '/tools/organize-pdf',
      component: <OrganizePDF />,
      title: 'Organize PDF - Merge and Reorder Pages | Free Tools',
      description: 'Organize PDF documents by merging, reordering, and managing pages.',
      keywords: 'PDF organization, merge, page management'
    },
  ];

  const routeComponentByPath = new Map(routes.map((route) => [route.path, route.component]));
  const canonicalSlugById = new Map(toolMasterList.map((tool) => [tool.id, tool.slug ?? tool.id]));
  const legacySlugRedirects = toolMasterList
    .filter((tool) => (tool.slug ?? tool.id) !== tool.id)
    .map((tool) => ({ from: `/${tool.id}`, to: `/${tool.slug}` }));

  const slugTool = toolMasterList.find((tool) => `/${tool.slug}` === currentPath);
  const staticRoute = routes.find((route) => !route.path.startsWith('/tools/') && route.path === currentPath);
  const isNotFound = !slugTool && !staticRoute;

  // Generate dynamic SEO config based on current route
  let seoConfig = homeSEO;
  
  if (slugTool) {
    const canonicalUrl = `https://freetoolz.cloud/${slugTool.slug}`;
    seoConfig = {
      title: slugTool.metaTitle ?? `${slugTool.name} | Free Toolz`,
      description: slugTool.metaDescription ?? slugTool.description,
      canonical: canonicalUrl,
      keywords: slugTool.keyword ?? `${slugTool.name.toLowerCase()} online free`,
      author: 'Muhammad Atif Latif',
      robots: slugTool.indexable === false
        ? 'noindex, follow'
        : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      toolName: slugTool.name,
      toolCategory: slugTool.category,
      toolUrl: canonicalUrl,
    };
  } else if (isNotFound) {
    seoConfig = {
      title: '404 - Page Not Found | Free Tools',
      description: 'The page you are looking for does not exist. Browse our 140+ free online tools.',
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
  } else if (currentPath === '/privacy') {
    seoConfig = {
      title: 'Privacy Policy - Free Tools',
      description: 'Read our privacy policy to understand how we protect your data and respect your privacy. All tools run locally in your browser.',
      canonical: 'https://freetoolz.cloud/privacy',
      keywords: 'privacy policy, data protection, freetoolz privacy',
      author: 'Muhammad Atif Latif'
    };
  } else if (currentPath === '/disclaimer') {
    seoConfig = {
      title: 'Disclaimer - Free Tools',
      description: 'Important legal disclaimers and terms of use for Free Tools online tools.',
      canonical: 'https://freetoolz.cloud/disclaimer',
      keywords: 'disclaimer, terms, legal',
      author: 'Muhammad Atif Latif'
    };
  } else if (currentPath === '/faq') {
    seoConfig = {
      title: 'FAQ - Frequently Asked Questions | Free Tools',
      description: 'Find answers to common questions about Free Tools tools, features, privacy, and usage.',
      canonical: 'https://freetoolz.cloud/faq',
      keywords: 'faq, help, questions, support, freetoolz help',
      author: 'Muhammad Atif Latif'
    };
  }

  // Apply SEO using our custom hook
  useSEO(seoConfig);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-all duration-300">
      <ScrollManager />
      <Header onNavigate={navigateTo} />
      <main className="flex-grow">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes key={currentPath.startsWith('/tools/') || toolMasterList.some(t => `/${t.slug}` === currentPath) ? 'tool' : 'static'}>
            {routes.filter((route) => !route.path.startsWith('/tools/')).map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={createRouteElement(route)}
              />
            ))}
            {toolMasterList.map((tool) => (
              <Route
                key={`slug-${tool.id}`}
                path={`/${tool.slug}`}
                element={<ToolPage tool={tool}>{routeComponentByPath.get(tool.path)}</ToolPage>}
              />
            ))}
            {legacySlugRedirects.map((redirect) => (
              <Route
                key={`legacy-${redirect.from}`}
                path={redirect.from}
                element={<Navigate to={redirect.to} replace />}
              />
            ))}
            <Route path="*" element={<NotFound onNavigate={navigateTo} />} />
          </Routes>
        </Suspense>
      </main>
      <Footer onNavigate={navigateTo} />
    </div>
  );
}

export default App;
