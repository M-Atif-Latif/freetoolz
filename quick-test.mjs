import puppeteer from 'puppeteer';

const toolsToTest = [
  'word-counter', 'case-converter', 'text-reverser', 'remove-spaces', 'lorem-ipsum',
  'age-calculator', 'bmi-calculator', 'character-counter', 'text-to-slug',
  'json-formatter', 'password-generator', 'uuid-generator', 'qr-code-generator',
  'color-picker', 'base64-converter', 'url-encoder', 'hash-generator',
  'currency-converter', 'image-compressor', 'binary-calculator', 'markdown-to-html',
  'hex-calculator', 'regex-tester', 'http-status-tester', 'pdf-to-text',
  'image-resizer', 'image-format-converter', 'favicon-generator', 'barcode-generator'
];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const results = [];

  console.log('Testing tools...\n');

  for (const tool of toolsToTest) {
    try {
      await page.goto(`http://localhost:5175/${tool}`, { timeout: 10000, waitUntil: 'domcontentloaded' });
      await new Promise(r => setTimeout(r, 300));
      
      const hasH1 = await page.evaluate(() => !!document.querySelector('h1'));
      
      if (hasH1) {
        results.push(`✅ ${tool}`);
      } else {
        results.push(`⚠️ ${tool}: No H1 found`);
      }
    } catch (e) {
      results.push(`❌ ${tool}: ${e.message.substring(0, 30)}`);
    }
  }

  await browser.close();
  
  console.log(results.join('\n'));
  
  const working = results.filter(r => r.startsWith('✅')).length;
  const broken = results.filter(r => !r.startsWith('✅')).length;
  
  console.log(`\n${working} working, ${broken} broken or with issues`);
})();
