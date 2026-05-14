import puppeteer from 'puppeteer';

const specializedTools = [
  // More PDF tools
  'pdf-page-extractor', 'pdf-page-reorder', 'pdf-protect', 'pdf-redact',
  'pdf-unlock', 'pdf-to-pdfa', 'pdf-to-powerpoint', 'pdf-metadata-editor',
  'pdf-add-page-numbers', 'edit-pdf', 'organize-pdf', 'repair-pdf',
  'sign-pdf', 'rotate-pdf', 'extract-pdf-pages',
  
  // More specialized tools
  'console-log-formatter', 'csv-column-splitter', 'csv-duplicate-finder',
  'dataset-sampler', 'find-and-replace', 'invisible-character',
  'ocr-pdf', 'powerpoint-to-pdf', 'read-aloud-caption-generator',
  'regex-bulk-replace', 'sitemap-url-extractor', 'text-to-speech',
  'bulk-url-shortener', 'working-hours-timezone-converter',
  'svg-optimizer', 'compare-pdf', 'word-frequency'
];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  let working = 0;
  let broken = [];
  
  console.log('Testing specialized tools...\n');

  for (const tool of specializedTools) {
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
  console.log(`Working: ${working}/${specializedTools.length}`);
  if (broken.length > 0) {
    console.log('\n🔴 Broken/Issues:');
    broken.forEach(b => console.log(`  - ${b.tool}: ${b.reason}`));
  } else {
    console.log('\n✅ All specialized tools working!');
  }
})();
