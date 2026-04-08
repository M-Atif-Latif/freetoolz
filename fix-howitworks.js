#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, 'src', 'tools');
const files = fs.readdirSync(toolsDir).filter(f => f.endsWith('.tsx'));

let fixed = 0;
let failed = [];

files.forEach(file => {
  if (file === 'ToolComingSoon.tsx') return;
  
  const filePath = path.join(toolsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Check if it imports HowItWorks but doesn't use it
  const hasImport = content.includes('import HowItWorks');
  const hasUsage = content.includes('<HowItWorks');
  
  if (!hasImport || hasUsage) {
    return; // Skip - either doesn't import or already uses it
  }
  
  // Find the return statement and first <p or <div after heading
  // Look for pattern: </h1> or </h2> then <p> or similar description
  const returnMatch = content.match(/return\s*\(\s*<div[^>]*className="[^"]*mx-auto[^"]*"[^>]*>/);
  if (!returnMatch) {
    failed.push(`${file}: Could not find return div`);
    return;
  }
  
  // Find the description paragraph - look for the <p> after heading that contains description text
  const descPattern = /<p\s+className=".*?text-gray-6\d{2}.*?">[^<]*description[^<]*<\/p>/i;
  const firstDescPattern = /<h[1-6][^>]*>.*?<\/h[1-6]>\s*\n\s*<p/;
  
  // More robust approach: find after heading and before first div/button
  const headingEndIndex = content.indexOf('</h1>') || content.indexOf('</h2>');
  if (headingEndIndex === -1) {
    failed.push(`${file}: Could not find heading`);
    return;
  }
  
  // Find the first closing </p> after the heading
  const afterHeading = content.substring(headingEndIndex);
  const pEndMatch = afterHeading.match(/<\/p>/);
  if (!pEndMatch) {
    failed.push(`${file}: Could not find description paragraph`);
    return;
  }
  
  const insertIndex = headingEndIndex + afterHeading.indexOf(pEndMatch[0]) + pEndMatch[0].length;
  
  // Insert HowItWorks component after description
  const insertText = '\n      \n      <HowItWorks steps={howItWorks} />';
  const newContent = content.substring(0, insertIndex) + insertText + content.substring(insertIndex);
  
  try {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    fixed++;
    console.log(`✓ Fixed: ${file}`);
  } catch (err) {
    failed.push(`${file}: Write error - ${err.message}`);
  }
});

console.log(`\n==== Summary ====`);
console.log(`Fixed: ${fixed} files`);
if (failed.length > 0) {
  console.log(`Failed: ${failed.length} files`);
  failed.forEach(f => console.log(`  - ${f}`));
}
