#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, '../dist/index.html');

try {
  // Read the built index.html
  let html = fs.readFileSync(distPath, 'utf-8');

  // Find all stylesheet links and make them non-blocking where possible
  // Add loading="lazy" behavior using media query trick for non-critical CSS
  
  // Pattern to find stylesheet links
  const cssLinkRegex = /<link\s+rel="stylesheet"\s+(?:href="([^"]+)"|crossorigin="[^"]*"\s+href="([^"]+)")[^>]*>/g;
  
  // Track link count to identify critical vs non-critical
  let linkCount = 0;
  const replacements = [];
  
  let match;
  while ((match = cssLinkRegex.exec(html)) !== null) {
    const href = match[1] || match[2];
    linkCount++;
    
    // First CSS link should remain critical (usually combined styles)
    // Other CSS links can potentially be deferred
    if (linkCount === 1) {
      // Keep the first link as-is (critical path)
      replacements.push({
        original: match[0],
        optimized: match[0]
      });
    } else {
      // For subsequent links, add media="print" trick to load asynchronously
      // Then change media back to "all" once loaded
      const optimized = match[0].replace(
        /rel="stylesheet"/,
        'rel="stylesheet" media="print" onload="this.media=\'all\'"'
      );
      replacements.push({
        original: match[0],
        optimized: optimized
      });
    }
  }
  
  // Apply replacements
  let modifiedHtml = html;
  for (const replacement of replacements) {
    modifiedHtml = modifiedHtml.replace(replacement.original, replacement.optimized);
  }
  
  // Add a noscript fallback for CSS that was deferred
  if (replacements.length > 1) {
    // Find the last stylesheet link to add noscript after it
    const lastMatch = [...html.matchAll(/<link\s+rel="stylesheet"[^>]*>/g)].pop();
    if (lastMatch) {
      const noscriptCSS = replacements.slice(1).map(r => 
        r.optimized.replace(/\s+media="print"\s+onload="[^"]*"/, '')
      ).join('\n  ');
      
      const noscriptBlock = `\n    <noscript>\n      ${noscriptCSS}\n    </noscript>`;
      modifiedHtml = modifiedHtml.replace(lastMatch[0], lastMatch[0] + noscriptBlock);
    }
  }
  
  // Write the optimized HTML back
  fs.writeFileSync(distPath, modifiedHtml, 'utf-8');
  
  console.log('✓ CSS loading optimized - non-critical CSS will load asynchronously');
  console.log(`  - Total stylesheets found: ${linkCount}`);
  console.log(`  - Critical stylesheets: 1`);
  console.log(`  - Async stylesheets: ${linkCount - 1}`);
  
} catch (error) {
  console.error('Error optimizing CSS loading:', error);
  process.exit(1);
}
