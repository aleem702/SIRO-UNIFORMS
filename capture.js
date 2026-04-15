const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Navigate to local dev server
  await page.goto('http://localhost:4321/');
  
  // Wait a moment for animations/fonts to hit
  await page.waitForTimeout(1000);
  
  // Capture screenshot
  const targetPath = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\85f1b886-2fad-4824-a7bf-29a74430ebca\\artifacts\\verify_layout_final_fix.png';
  await page.screenshot({ path: targetPath, fullPage: true });
  
  console.log(`Saved screenshot to ${targetPath}`);
  
  await browser.close();
})();
