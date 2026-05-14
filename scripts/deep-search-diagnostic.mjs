#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('\n========================================');
console.log('🔍 DEEP SEARCH DIAGNOSTIC');
console.log('========================================\n');

// Test 1: Check if toolMasterList exists in built output
console.log('TEST 1: Checking built data bundle...');
const dataBundle = fs.readdirSync(path.join(__dirname, '../dist/assets')).find(f => f.startsWith('data-'));
if (dataBundle) {
  console.log(`✅ Data bundle found: ${dataBundle}`);
  const stats = fs.statSync(path.join(__dirname, '../dist/assets', dataBundle));
  console.log(`   Size: ${stats.size} bytes`);
  
  // Read and analyze content
  const content = fs.readFileSync(path.join(__dirname, '../dist/assets', dataBundle), 'utf8');
  
  // Check for tool identifiers
  const hasWordCounter = content.includes('Word Counter') || content.includes('word-counter');
  const hasPDF = content.includes('pdf') || content.includes('PDF');
  const hasCalculator = content.includes('calculator') || content.includes('Calculator');
  
  console.log(`   Contains "Word Counter": ${hasWordCounter ? '✅' : '❌'}`);
  console.log(`   Contains "PDF": ${hasPDF ? '✅' : '❌'}`);
  console.log(`   Contains "Calculator": ${hasCalculator ? '✅' : '❌'}`);
} else {
  console.log('❌ Data bundle NOT found in dist/assets');
}

// Test 2: Check if index.html loads the data bundle
console.log('\n TEST 2: Checking index.html...');
const indexPath = path.join(__dirname, '../dist/index.html');
if (fs.existsSync(indexPath)) {
  console.log('✅ dist/index.html exists');
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  const hasDataScript = indexContent.includes('data-');
  console.log(`   Contains data bundle script tag: ${hasDataScript ? '✅' : '❌'}`);
  
  // Check for React and Vite runtime
  const hasReact = indexContent.includes('react');
  const hasViteRuntime = indexContent.includes('vite');
  console.log(`   Contains React references: ${hasReact ? '✅' : '❌'}`);
  console.log(`   Contains Vite runtime: ${hasViteRuntime ? '✅' : '❌'}`);
} else {
  console.log('❌ dist/index.html NOT found');
}

// Test 3: Check source data file
console.log('\n TEST 3: Checking source data file...');
const toolsPath = path.join(__dirname, '../src/data/tools.ts');
if (fs.existsSync(toolsPath)) {
  console.log('✅ src/data/tools.ts exists');
  const toolsContent = fs.readFileSync(toolsPath, 'utf8');
  
  // Count export statements
  const toolsExportMatch = toolsContent.match(/export const tools.*?=.*?\[/);
  const toolMasterListExportMatch = toolsContent.match(/export const toolMasterList/);
  const categoriesExportMatch = toolsContent.match(/export const categories/);
  
  console.log(`   Contains "export const tools": ${toolsExportMatch ? '✅' : '❌'}`);
  console.log(`   Contains "export const toolMasterList": ${toolMasterListExportMatch ? '✅' : '❌'}`);
  console.log(`   Contains "export const categories": ${categoriesExportMatch ? '✅' : '❌'}`);
  
  // Count approximate tools
  const toolCount = (toolsContent.match(/{\s*id:\s*['"`]/g) || []).length;
  console.log(`   Approximate tool definitions: ${toolCount}`);
} else {
  console.log('❌ src/data/tools.ts NOT found');
}

// Test 4: Check if search filter logic is present in Home.tsx
console.log('\n TEST 4: Checking search filter implementation...');
const homePath = path.join(__dirname, '../src/pages/Home.tsx');
if (fs.existsSync(homePath)) {
  console.log('✅ src/pages/Home.tsx exists');
  const homeContent = fs.readFileSync(homePath, 'utf8');
  
  const hasSearchState = homeContent.includes('searchQuery');
  const hasFilter = homeContent.includes('filteredTools');
  const hasLowerCase = homeContent.includes('toLowerCase');
  const hasIncludes = homeContent.includes('includes');
  const hasUseMemo = homeContent.includes('useMemo');
  
  console.log(`   Contains searchQuery state: ${hasSearchState ? '✅' : '❌'}`);
  console.log(`   Contains filteredTools logic: ${hasFilter ? '✅' : '❌'}`);
  console.log(`   Uses toLowerCase() for matching: ${hasLowerCase ? '✅' : '❌'}`);
  console.log(`   Uses .includes() for search: ${hasIncludes ? '✅' : '❌'}`);
  console.log(`   Uses useMemo for performance: ${hasUseMemo ? '✅' : '❌'}`);
} else {
  console.log('❌ src/pages/Home.tsx NOT found');
}

// Test 5: List some pre-rendered pages to verify build
console.log('\n TEST 5: Checking pre-rendered pages...');
const distPath = path.join(__dirname, '../dist');
const preRenderedCount = fs.readdirSync(distPath)
  .filter(f => fs.statSync(path.join(distPath, f)).isDirectory())
  .length;
console.log(`   Pre-rendered page directories: ${preRenderedCount}`);

const sampleDirs = fs.readdirSync(distPath)
  .filter(f => fs.statSync(path.join(distPath, f)).isDirectory())
  .slice(0, 3);
console.log(`   Sample directories: ${sampleDirs.join(', ')}`);

// Test 6: Vite build config
console.log('\n TEST 6: Checking Vite configuration...');
const vitePath = path.join(__dirname, '../vite.config.ts');
if (fs.existsSync(vitePath)) {
  console.log('✅ vite.config.ts exists');
  const viteContent = fs.readFileSync(vitePath, 'utf8');
  
  const hasReact = viteContent.includes('react');
  const hasCodeSplit = viteContent.includes('chunk') || viteContent.includes('manualChunks');
  
  console.log(`   Contains React plugin: ${hasReact ? '✅' : '❌'}`);
  console.log(`   Has chunk/manual chunks config: ${hasCodeSplit ? '✅' : '❌'}`);
} else {
  console.log('❌ vite.config.ts NOT found');
}

console.log('\n========================================');
console.log('RECOMMENDATIONS:');
console.log('========================================');
console.log('1. Deploy the dist/ folder to production');
console.log('2. Visit /debug page to verify tool data loads at runtime');
console.log('3. Open browser console (F12) to check for errors');
console.log('4. Test search with common terms: "word", "pdf", "calculator"');
console.log('5. Check Network tab to verify data-*.js loads without 404');
console.log('========================================\n');
