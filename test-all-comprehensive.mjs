import puppeteer from 'puppeteer';

const allTools = [
  'age-calculator', 'ascii-art-generator', 'barcode-generator', 'base64-converter',
  'binary-calculator', 'bmi-calculator', 'bulk-url-shortener', 'business-days-calculator',
  'calories-calculator', 'case-converter', 'character-counter', 'clipboard-history',
  'coin-flip', 'color-blindness-simulator', 'color-contrast-checker', 'color-converter',
  'color-picker', 'compound-interest', 'compress-pdf', 'console-log-formatter',
  'contraction-expander', 'cookie-inspector', 'cors-header-checker', 'credit-card-generator',
  'css-minifier', 'css-tailwind-classifier', 'csv-column-splitter', 'csv-duplicate-finder',
  'currency-converter', 'dataset-sampler', 'date-calculator', 'dice-roller',
  'discount-calculator', 'duplicate-line-remover', 'edit-pdf', 'excel-to-pdf',
  'extract-images-from-pdf', 'extract-pdf-pages', 'fake-data-generator', 'favicon-generator',
  'file-encoding-detector', 'find-and-replace', 'fuel-cost-calculator', 'gpa-calculator',
  'gradient-generator', 'grayscale-converter', 'hash-generator', 'hash-identifier',
  'hex-calculator', 'htaccess-generator', 'html-encoder', 'html-to-pdf',
  'http-status-tester', 'image-background-remover', 'image-base64', 'image-compressor',
  'image-cropper', 'image-dpi-calculator', 'image-format-converter', 'image-resizer',
  'image-rotator', 'invisible-character', 'jpg-to-pdf', 'js-minifier',
  'json-formatter', 'jwt-decoder', 'letter-counter', 'line-sorter',
  'loan-calculator', 'lorem-ipsum', 'markdown-to-html', 'merge-pdf',
  'meta-robots-tester', 'morse-code-converter', 'number-base-converter', 'ocr-pdf',
  'organize-pdf', 'password-generator', 'password-strength-analyzer', 'password-strength-checker',
  'pdf-add-page-numbers', 'pdf-metadata-editor', 'pdf-page-extractor', 'pdf-page-reorder',
  'pdf-protect', 'pdf-redact', 'pdf-to-excel', 'pdf-to-jpg',
  'pdf-to-pdfa', 'pdf-to-powerpoint', 'pdf-to-text', 'pdf-to-word',
  'pdf-unlock', 'pdf-watermark', 'percentage-calculator', 'permutation-combination-calculator',
  'power-energy-converter', 'powerpoint-to-pdf', 'pwned-password-check', 'qr-code-generator',
  'random-number', 'random-picker', 'readability-score', 'read-aloud-caption-generator',
  'regex-bulk-replace', 'regex-tester', 'remove-spaces', 'repair-pdf',
  'reverse-words', 'roman-numeral-converter', 'rotate-pdf', 'sign-pdf',
  'sitemap-url-extractor', 'smart-sentence-splitter', 'split-pdf', 'sql-formatter',
  'stopwatch', 'structured-data-validator', 'svg-optimizer', 'syllable-counter',
  'temperature-converter', 'text-diff', 'text-randomizer', 'text-reverser',
  'text-to-binary', 'text-to-slug', 'text-to-speech', 'time-calculator',
  'timer', 'timezone-converter', 'tip-calculator', 'title-headline-analyzer',
  'unit-converter', 'unix-timestamp', 'url-encoder', 'uuid-generator',
  'word-counter', 'word-frequency', 'word-to-pdf', 'working-hours-timezone-converter',
  'xml-formatter', 'yaml-json-converter', 'zip-file-inspector'
];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const working = [];
  const broken = [];
  
  console.log(`Testing ${allTools.length} tools...\n`);

  for (let i = 0; i < allTools.length; i++) {
    const tool = allTools[i];
    try {
      await page.goto(`http://localhost:5175/${tool}`, { timeout: 12000, waitUntil: 'domcontentloaded' });
      await new Promise(r => setTimeout(r, 200));
      const h1 = await page.evaluate(() => !!document.querySelector('h1'));
      
      if (h1) {
        working.push(tool);
        console.log(`✅ ${tool}`);
      } else {
        broken.push({ tool, reason: 'No H1' });
        console.log(`⚠️ ${tool}: No H1`);
      }
    } catch (e) {
      broken.push({ tool, reason: e.message.substring(0, 25) });
      console.log(`❌ ${tool}: ${e.message.substring(0, 25)}`);
    }
    if ((i + 1) % 20 === 0) console.log(`Progress: ${i + 1} / ${allTools.length}\n`);
  }

  await browser.close();
  
  console.log('\n' + '='.repeat(60));
  console.log(`✅ Working: ${working.length}`);
  console.log(`❌ Broken: ${broken.length}`);
  
  if (broken.length > 0) {
    console.log('\n🔴 Broken/Issue tools:');
    broken.forEach(b => console.log(`  - ${b.tool}: ${b.reason}`));
  }
  console.log('='.repeat(60));
})();
