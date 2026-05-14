import puppeteer from 'puppeteer';

// Sample of tools to test
const toolSlugs = [
  'word-counter', 'case-converter', 'text-reverser', 'remove-spaces', 'lorem-ipsum',
  'age-calculator', 'bmi-calculator', 'percentage-calculator', 'character-counter',
  'text-to-slug', 'markdown-to-html', 'json-formatter', 'password-generator',
  'uuid-generator', 'qr-code-generator', 'color-picker', 'image-compressor',
  'pdf-to-jpg', 'pdf-to-text', 'base64-converter', 'url-encoder',
  'hex-calculator', 'binary-calculator', 'hash-generator', 'currency-converter'
];

(async () => {
  const browser = await puppeteer.launch();
  const results = { working: [], broken: [] };

  console.log(`\n🔍 Testing ${toolSlugs.length} tools...\n`);

  for (let i = 0; i < toolSlugs.length; i++) {
    const slug = toolSlugs[i];
    try {
      const page = await browser.newPage();
      let errorCaught = false;
      
      page.on('console', msg => {
        if (msg.type() === 'error') {
          if (msg.text().includes('does not provide an export') || 
              msg.text().includes('Cannot find module') ||
              msg.text().includes('is not defined')) {
            errorCaught = true;
          }
        }
      });

      await page.goto(`http://localhost:5175/${slug}`, { waitUntil: 'networkidle2', timeout: 8000 });
      
      const h1 = await page.evaluate(() => {
        const heading = document.querySelector('h1');
        return heading ? heading.textContent.substring(0, 50) : null;
      });

      if (errorCaught || !h1) {
        results.broken.push({ slug, reason: 'failed to load' });
        console.log(`❌ ${slug}: FAILED`);
      } else {
        results.working.push(slug);
        console.log(`✅ ${slug}: OK`);
      }

      await page.close();
    } catch (error) {
      results.broken.push({ slug, reason: error.message.substring(0, 50) });
      console.log(`❌ ${slug}: ERROR - ${error.message.substring(0, 50)}`);
    }

    if ((i + 1) % 5 === 0) {
      console.log(`   Progress: ${i + 1}/${toolSlugs.length}`);
    }
  }

  await browser.close();

  console.log('\n' + '='.repeat(60));
  console.log(`✅ WORKING: ${results.working.length}`);
  console.log(`❌ BROKEN: ${results.broken.length}`);
  
  if (results.broken.length > 0) {
    console.log('\n🔴 BROKEN TOOLS:');
    results.broken.forEach(item => {
      console.log(`  - ${item.slug}: ${item.reason}`);
    });
  }

  console.log('='.repeat(60));
})();
