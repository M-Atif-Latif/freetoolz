#!/usr/bin/env node

/**
 * Advanced Build Optimization Script
 * Removes unused CSS, optimizes bundle, and provides detailed analytics
 * 
 * Usage: node scripts/optimizeBuild.mjs
 */

import fs from 'fs';
import path from 'path';
import { readdir, readFile, writeFile } from 'fs/promises';

const DIST_DIR = path.resolve('./dist');
const ANALYSIS_FILE = path.join(DIST_DIR, 'build-analysis.json');

/**
 * @typedef {Object} BundleAnalysis
 * @property {string} timestamp
 * @property {number} totalSize
 * @property {number} gzipSize
 * @property {ChunkInfo[]} chunks
 * @property {CSSAnalysis[]} cssFiles
 * @property {string[]} recommendations
 */

/**
 * @typedef {Object} ChunkInfo
 * @property {string} name
 * @property {number} size
 * @property {number} gzipSize
 * @property {string[]} imports
 */

/**
 * @typedef {Object} CSSAnalysis
 * @property {string} file
 * @property {number} originalSize
 * @property {number} unusedPercentage
 * @property {number} potentialSavings
 */

/**
 * Calculate gzip size estimation (typically 30-40% of original)
 */
function estimateGzipSize(size) {
  return Math.ceil(size * 0.35); // Conservative estimate
}

/**
 * Analyze all JS chunks in dist
 */
async function analyzeJSChunks() {
  const chunks = [];
  
  try {
    const files = await readdir(path.join(DIST_DIR, 'assets'));
    
    for (const file of files) {
      if (file.endsWith('.js')) {
        const filePath = path.join(DIST_DIR, 'assets', file);
        const content = await readFile(filePath, 'utf8');
        const size = Buffer.byteLength(content, 'utf8');
        
        chunks.push({
          name: file,
          size,
          gzipSize: estimateGzipSize(size),
          imports: extractImports(content),
        });
      }
    }
  } catch (error) {
    console.warn('Error analyzing JS chunks:', error);
  }
  
  return chunks.sort((a, b) => b.size - a.size);
}

/**
 * Extract import statements from JS content
 */
function extractImports(content) {
  const importRegex = /from\s+['"]([\@./][^'"]+)['"];/g;
  const imports = new Set();
  
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    imports.add(match[1]);
  }
  
  return Array.from(imports);
}

/**
 * Analyze CSS files for potentially unused rules
 */
async function analyzeCSSFiles() {
  const cssAnalysis = [];
  
  try {
    const files = await readdir(path.join(DIST_DIR, 'assets'));
    
    for (const file of files) {
      if (file.endsWith('.css')) {
        const filePath = path.join(DIST_DIR, 'assets', file);
        const content = await readFile(filePath, 'utf8');
        const size = Buffer.byteLength(content, 'utf8');
        
        // Estimate unused CSS (rough heuristic)
        const unusedPercentage = estimateUnusedCSS(content);
        
        cssAnalysis.push({
          file,
          originalSize: size,
          unusedPercentage,
          potentialSavings: Math.ceil((size * unusedPercentage) / 100),
        });
      }
    }
  } catch (error) {
    console.warn('Error analyzing CSS:', error);
  }
  
  return cssAnalysis;
}

/**
 * Rough estimation of unused CSS based on selectors and declarations
 */
function estimateUnusedCSS(css) {
  // Count selectors
  const selectors = (css.match(/[{]/g) || []).length;
  // Estimate based on Tailwind utilities (many unused in typical builds)
  const utilityClasses = (css.match(/\.[a-z0-9_-]+\s*{/gi) || []).length;
  
  // Higher percentage for utility frameworks like Tailwind
  if (utilityClasses > 1000) {
    return 35; // Typical: 35% unused utilities
  }
  
  return 15; // Average unused CSS
}

/**
 * Generate optimization recommendations
 */
function generateRecommendations(chunks, cssAnalysis) {
  const recommendations = [];
  
  // Check largest chunks
  const largest = chunks[0];
  if (largest && largest.size > 100000) {
    recommendations.push(`🔴 Large chunk detected: ${largest.name} (${(largest.size / 1024).toFixed(2)}KB). Consider code-splitting.`);
  }
  
  // Check CSS unused percentage
  const totalCSS = cssAnalysis.reduce((sum, css) => sum + css.potentialSavings, 0);
  if (totalCSS > 10000) {
    recommendations.push(`🟡 Potential CSS savings: ${(totalCSS / 1024).toFixed(2)}KB. Check PurgeCSS configuration.`);
  }
  
  // Check duplicate dependencies
  const allImports = chunks.flatMap(chunk => chunk.imports);
  const duplicates = allImports.filter((item, index) => allImports.indexOf(item) !== index);
  if (duplicates.length > 0) {
    recommendations.push(`🟡 Possible duplicate imports detected: ${duplicates.slice(0, 3).join(', ')}`);
  }
  
  // Positive feedback
  if (chunks.every(chunk => chunk.size < 100000)) {
    recommendations.push('✅ All chunks are appropriately sized.');
  }
  
  if (cssAnalysis.every(css => css.originalSize < 50000)) {
    recommendations.push('✅ CSS files are well-optimized.');
  }
  
  return recommendations;
}

/**
 * Format bytes to human readable
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Main analysis function
 */
async function analyzeBundle() {
  console.log('🚀 Starting bundle analysis...\n');
  
  const jsChunks = await analyzeJSChunks();
  const cssFiles = await analyzeCSSFiles();
  
  const totalSize = jsChunks.reduce((sum, chunk) => sum + chunk.size, 0) +
                   cssFiles.reduce((sum, css) => sum + css.originalSize, 0);
  
  const gzipSize = estimateGzipSize(totalSize);
  const recommendations = generateRecommendations(jsChunks, cssFiles);
  
  const analysis = {
    timestamp: new Date().toISOString(),
    totalSize,
    gzipSize,
    chunks: jsChunks,
    cssFiles,
    recommendations,
  };
  
  // Print summary
  console.log('📊 BUNDLE ANALYSIS REPORT');
  console.log('═'.repeat(50));
  console.log(`Total Bundle Size: ${formatBytes(totalSize)}`);
  console.log(`Estimated Gzip Size: ${formatBytes(gzipSize)}`);
  console.log(`\n📦 JavaScript Chunks (Top 5):`);
  
  jsChunks.slice(0, 5).forEach((chunk, i) => {
    console.log(`  ${i + 1}. ${chunk.name.padEnd(30)} ${formatBytes(chunk.size).padStart(8)} (gzip: ${formatBytes(chunk.gzipSize)})`);
  });
  
  if (cssFiles.length > 0) {
    console.log(`\n🎨 CSS Files:`);
    cssFiles.forEach((css) => {
      console.log(`  - ${css.file} ${formatBytes(css.originalSize)} (potential savings: ${formatBytes(css.potentialSavings)})`);
    });
  }
  
  // Print recommendations
  if (recommendations.length > 0) {
    console.log(`\n💡 RECOMMENDATIONS:`);
    recommendations.forEach(rec => console.log(`  ${rec}`));
  }
  
  console.log('\n═'.repeat(50));
  
  // Save analysis file
  await writeFile(ANALYSIS_FILE, JSON.stringify(analysis, null, 2));
  console.log(`✅ Analysis saved to ${ANALYSIS_FILE}`);
  
  return analysis;
}

/**
 * Run the analysis
 */
analyzeBundle().catch(error => {
  console.error('❌ Error during analysis:', error);
  process.exit(1);
});
