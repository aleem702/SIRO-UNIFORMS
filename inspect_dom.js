const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:4321/');
  await page.waitForTimeout(1000);
  
  // Try to simulate the user scrolling down a bit
  await page.evaluate(() => window.scrollBy(0, 400));
  await page.waitForTimeout(500);
  
  const metrics = await page.evaluate(() => {
    const nav = document.querySelector('nav');
    const hero = document.querySelector('.main-hero');
    const shelf = document.querySelector('.section-shelf');
    const body = document.body;
    
    return {
      scrollY: window.scrollY,
      nav: nav ? nav.getBoundingClientRect() : null,
      navComputedStyle: nav ? {
        position: window.getComputedStyle(nav).position,
        height: window.getComputedStyle(nav).height,
        background: window.getComputedStyle(nav).backgroundColor,
        top: window.getComputedStyle(nav).top
      } : null,
      hero: hero ? hero.getBoundingClientRect() : null,
      shelf: shelf ? shelf.getBoundingClientRect() : null,
      bodyHeight: body.scrollHeight
    };
  });
  
  console.log(JSON.stringify(metrics, null, 2));
  
  await browser.close();
})();
