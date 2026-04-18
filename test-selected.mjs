import puppeteer from 'puppeteer';

// Selected tools from different categories
const toolsToTest = [
  // Text Tools
  'word-counter', 'case-converter', 'text-reverser', 'remove-spaces', 'lorem-ipsum',
  'character-counter', 'text-to-slug', 'duplicate-line-remover', 'find-and-replace',
  'letter-counter', 'line-sorter', 'reverse-words', 'smart-sentence-splitter',
  'syllable-counter', 'text-diff', 'text-randomizer', 'text-to-binary',
  'contraction-expander', 'readability-score', 'title-headline-analyzer',
  
  // Calculators
  'age-calculator', 'bmi-calculator', 'percentage-calculator', 'business-days-calculator',
  'calories-calculator', 'compound-interest', 'date-calculator', 'discount-calculator',
  'fuel-cost-calculator', 'gpa-calculator', 'hex-calculator', 'loan-calculator',
  'permutation-combination-calculator', 'power-energy-converter', 'temperature-converter',
  'time-calculator', 'tip-calculator', 'timezone-converter', 'unix-timestamp',
  
  // PDF Tools
  'pdf-to-text', 'pdf-to-jpg', 'jpg-to-pdf', 'merge-pdf', 'split-pdf',
  'compress-pdf', 'pdf-to-word', 'pdf-to-excel', 'extract-images-from-pdf',
  
  // Image Tools
  'image-compressor', 'image-resizer', 'image-cropper', 'image-rotator',
  'image-format-converter', 'grayscale-converter', 'color-blindness-simulator',
  
  // Generators & Converters
  'password-generator', 'uuid-generator', 'qr-code-generator', 'barcode-generator',
  'base64-converter', 'url-encoder', 'hash-generator', 'binary-calculator',
  'currency-converter', 'random-number', 'random-picker', 'json-formatter'
];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const results = { working: 0, broken: [] };
  
  console.log(`Testing ${toolsToTest.length} selected tools...\n`);

  for (let i = 0; i < toolsToTest.length; i++) {
    const tool = toolsToTest[i];
    try {
      await page.goto(`http://localhost:5175/${tool}`, { timeout: 12000, waitUntil: 'domcontentloaded' });
      await new Promise(r => setTimeout(r, 200));
      const h1 = await page.evaluate(() => !!document.querySelector('h1'));
      
      if (h1) {
        results.working++;
        console.log(`✅ ${tool}`);
      } else {
        results.broken.push({ tool, reason: 'No H1' });
        console.log(`⚠️ ${tool}: No H1`);
      }
    } catch (e) {
      results.broken.push({ tool, reason: e.message.substring(0, 30) });
      console.log(`❌ ${tool}: ${e.message.substring(0, 30)}`);
    }
  }

  await browser.close();
  
  console.log('\n' + '='.repeat(60));
  console.log(`✅ Working: ${results.working}/${toolsToTest.length}`);
  console.log(`❌ Broken/Issues: ${results.broken.length}`);
  
  if (results.broken.length > 0) {
    console.log('\n🔴 Broken/Issue tools:');
    results.broken.forEach(b => console.log(`  - ${b.tool}: ${b.reason}`));
  } else {
    console.log('\n✅ All tested tools are working!');
  }
  console.log('='.repeat(60));
})();
