import puppeteer from 'puppeteer';

const additionalTools = [
  'regex-tester', 'html-encoder', 'xml-formatter', 'yaml-json-converter',
  'sql-formatter', 'css-minifier', 'js-minifier', 'json-formatter',
  'markdown-to-html', 'html-to-pdf', 'color-picker', 'gradient-generator',
  'favicon-generator', 'ascii-art-generator', 'morse-code-converter',
  'roman-numeral-converter', 'number-base-converter', 'jwt-decoder',
  'http-status-tester', 'cors-header-checker', 'meta-robots-tester',
  'structured-data-validator', 'password-strength-checker', 'pwned-password-check',
  'coin-flip', 'dice-roller', 'stopwatch', 'timer', 'color-converter',
  'color-contrast-checker', 'image-background-remover', 'image-base64',
  'cookie-inspector', 'clipboard-history', 'credit-card-generator', 'fake-data-generator',
  'file-encoding-detector', 'hash-identifier', 'htaccess-generator', 'zip-file-inspector'
];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  let working = 0;
  let broken = [];
  
  console.log('Testing additional tools...\n');

  for (const tool of additionalTools) {
    try {
      await page.goto(`http://localhost:5175/${tool}`, { timeout: 12000, waitUntil: 'domcontentloaded' });
      await new Promise(r => setTimeout(r, 150));
      const h1 = await page.evaluate(() => !!document.querySelector('h1'));
      
      if (h1) {
        working++;
        console.log(`✅ ${tool}`);
      } else {
        broken.push({ tool, reason: 'No H1' });
        console.log(`⚠️ ${tool}: No H1`);
      }
    } catch (e) {
      broken.push({ tool, reason: e.message.substring(0, 25) });
      console.log(`❌ ${tool}: ${e.message.substring(0, 25)}`);
    }
  }

  await browser.close();
  
  console.log('\n' + '='.repeat(50));
  console.log(`Working: ${working}/${additionalTools.length}`);
  if (broken.length > 0) {
    console.log('\nBroken:');
    broken.forEach(b => console.log(`  - ${b.tool}: ${b.reason}`));
  } else {
    console.log('\n✅ All additional tools working!');
  }
})();
