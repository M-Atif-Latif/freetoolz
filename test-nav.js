const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('LOG:', msg.text()));
  page.on('pageerror', err => console.log('ERROR:', err.toString()));
  await page.goto('http://localhost:5177');
  await page.waitForTimeout(2000);
  console.log('[Test] Current URL:', page.url());
  const btns = await page.
const fs = require('fs');
fs.writeFileSync('test-nav.js', 
const puppeteer = require('puppeteer');
(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.toString()));
  
  console.log('Navigating to http://localhost:5177');
  await page.goto('http://localhost:5177', { waitUntil: 'networkidle0' });
  
  console.log('Loaded home page. Current URL:', page.url());
  
  console.log('Clicking About button...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const aboutBtn = btns.find(b => b.textContent && b.textContent.includes('About'));
    if (aboutBtn) {
       console.log('Found about button, clicking it!');
       aboutBtn.click();
    } else {
       console.log('About button not found!');
    }
  });
  
  await page.waitForTimeout(2000);
  console.log('URL after click:', page.url());
  
  console.log('Fetching page title...');
  const title = await page.title();
  console.log('Title:', title);
  
  await browser.close();
})().catch(console.error);
);
('button');
  for (const btn of btns) {
    const text = await btn.evaluate(el => el.textContent);
    if (text.includes('About')) {
      console.log('[Test] Clicking About button...');
      await btn.click();
      break;
    }
  }
  await page.waitForTimeout(2000);
  console.log('[Test] URL after click:', page.url());
  const header = await page.h1;
  const hText = header ? await header.evaluate(el => el.textContent) : 'null';
  console.log('[Test] New H1 text:', hText);
  await browser.close();
})();
