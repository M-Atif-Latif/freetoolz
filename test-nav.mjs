import puppeteer from 'puppeteer';
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  try {
    console.log('=== TEST: Full Navigation Cycle ===\\n');
    
    // Load home
    await page.goto('http://localhost:5174', { waitUntil: 'networkidle0' });
    const homeData = await page.evaluate(() => ({
      url: window.location.pathname,
      h1: document.querySelector('h1')?.textContent,
      hasHero: !!document.querySelector('.hero-section')
    }));
    console.log('✓ 1. HOME PAGE');
    console.log(`  URL: ${homeData.url}`);
    console.log(`  H1: ${homeData.h1?.substring(0, 35)}...`);
    
    // Click on tool
    await page.evaluate(() => window.scrollBy(0, 300));
    await new Promise(r => setTimeout(r, 300));
    
    await page.click('button:has-text("Word Counter")').catch(() => {
      return page.$eval('body', (body) => {
        const btns = Array.from(body.querySelectorAll('button'));
        const btn = btns.find(b => b.textContent.includes('Word Counter'));
        if (btn) { btn.click(); return true; }
      });
    });
    
    await new Promise(r => setTimeout(r, 1500));
    const toolData = await page.evaluate(() => ({
      url: window.location.pathname,
      h1: document.querySelector('h1')?.textContent
    }));
    console.log('\\n✓ 2. TOOL PAGE');
    console.log(`  URL: ${toolData.url}`);
    console.log(`  H1: ${toolData.h1?.substring(0, 35)}...`);
    
    // Go back
    await page.goBack();
    await new Promise(r => setTimeout(r, 1500));
    
    const backData = await page.evaluate(() => ({
      url: window.location.pathname,
      h1: document.querySelector('h1')?.textContent,
      hasHero: !!document.querySelector('.hero-section')
    }));
    console.log('\\n✓ 3. AFTER BROWSER BACK');
    console.log(`  URL: ${backData.url}`);
    console.log(`  H1: ${backData.h1?.substring(0, 35)}...`);
    console.log(`  Page rendered correctly: ${backData.url === '/' && backData.h1?.includes('140+')}`);
    
    console.log('\\n' + (backData.url === '/' && backData.h1?.includes('140+') ? '✓ SUCCESS' : '✗ FAILED'));
    
  } catch (err) {
    console.error('✗ ERROR:', err.message);
  } finally {
    await browser.close();
  }
})();
