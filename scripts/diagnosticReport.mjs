/**
 * Comprehensive Search & Tool Data Verification Script
 * Run this after deployment to verify all tool data is properly loaded
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import tools data
import('../src/data/tools.ts').then(module => {
  const { toolMasterList, tools, categories } = module;

  console.log('\n' + '='.repeat(70));
  console.log('🔍 COMPREHENSIVE TOOL & SEARCH DIAGNOSTIC REPORT');
  console.log('='.repeat(70) + '\n');

  // 1. Count verification
  console.log('📊 DATA COUNTS:');
  console.log(`   - tools[] array: ${tools.length} items`);
  console.log(`   - toolMasterList[] (processed): ${toolMasterList.length} items`);
  console.log(`   - categories[]: ${categories.length} items\n`);

  // 2. Category breakdown
  console.log('📂 CATEGORY BREAKDOWN:');
  categories.forEach(cat => {
    const count = tools.filter(t => t.category === cat.id).length;
    console.log(`   - ${cat.name} (${cat.id}): ${count} tools`);
  });
  console.log('');

  // 3. Sample data check
  console.log('📝 SAMPLE TOOLS (first 5):');
  toolMasterList.slice(0, 5).forEach((tool, i) => {
    console.log(`   ${i + 1}. ${tool.name}`);
    console.log(`      ID: ${tool.id}`);
    console.log(`      Category: ${tool.category}`);
    console.log(`      Path: ${tool.path}`);
    console.log(`      Slug: ${tool.slug}\n`);
  });

  // 4. Search simulation
  console.log('🔎 SEARCH SIMULATION TESTS:\n');

  const searchTests = [
    { query: 'word', expectedMin: 3 },
    { query: 'pdf', expectedMin: 25 },
    { query: 'calculator', expectedMin: 8 },
    { query: 'converter', expectedMin: 10 },
    { query: 'free', expectedMin: 140 },
    { query: 'online', expectedMin: 140 },
  ];

  let passedTests = 0;
  searchTests.forEach(test => {
    const results = toolMasterList.filter(tool =>
      tool.name.toLowerCase().includes(test.query.toLowerCase()) ||
      tool.description.toLowerCase().includes(test.query.toLowerCase())
    );

    const passed = results.length >= test.expectedMin;
    const status = passed ? '✅' : '❌';
    console.log(`   ${status} Query "${test.query}": ${results.length} results (expected >= ${test.expectedMin})`);

    if (passed) passedTests++;
  });
  console.log(`\n   PASSED: ${passedTests}/${searchTests.length} tests\n`);

  // 5. Data integrity checks
  console.log('🔐 DATA INTEGRITY CHECKS:\n');

  const checks = [];

  // Check for missing required fields
  const missingFields = toolMasterList.filter(tool =>
    !tool.id || !tool.name || !tool.description || !tool.category || !tool.path || !tool.slug
  );
  checks.push({
    name: 'Required fields present',
    passed: missingFields.length === 0,
    message: missingFields.length === 0 
      ? 'All tools have required fields' 
      : `${missingFields.length} tools missing fields`
  });

  // Check for duplicate IDs
  const idCounts = {};
  toolMasterList.forEach(tool => {
    idCounts[tool.id] = (idCounts[tool.id] || 0) + 1;
  });
  const duplicates = Object.entries(idCounts).filter(([_, count]) => count > 1);
  checks.push({
    name: 'No duplicate IDs',
    passed: duplicates.length === 0,
    message: duplicates.length === 0
      ? 'All tool IDs are unique'
      : `${duplicates.length} duplicate ID(s) found`
  });

  // Check for invalid categories
  const validCategoryIds = categories.map(c => c.id);
  const invalidCategories = toolMasterList.filter(
    tool => !validCategoryIds.includes(tool.category)
  );
  checks.push({
    name: 'Valid categories',
    passed: invalidCategories.length === 0,
    message: invalidCategories.length === 0
      ? 'All tools have valid categories'
      : `${invalidCategories.length} tools with invalid categories`
  });

  // Check for proper slug formatting
  const invalidSlugs = toolMasterList.filter(tool =>
    !tool.slug || tool.slug.includes(' ') || tool.slug !== tool.slug.toLowerCase()
  );
  checks.push({
    name: 'Valid slug format',
    passed: invalidSlugs.length === 0,
    message: invalidSlugs.length === 0
      ? 'All slugs properly formatted'
      : `${invalidSlugs.length} tools with invalid slugs`
  });

  // Check metadata presence
  const missingMeta = toolMasterList.filter(tool =>
    !tool.metaTitle || !tool.metaDescription
  );
  checks.push({
    name: 'Metadata present',
    passed: missingMeta.length === 0,
    message: missingMeta.length === 0
      ? 'All tools have SEO metadata'
      : `${missingMeta.length} tools missing SEO metadata`
  });

  checks.forEach(check => {
    const status = check.passed ? '✅' : '⚠️';
    console.log(`   ${status} ${check.name}`);
    console.log(`      → ${check.message}\n`);
  });

  const allPassed = checks.every(c => c.passed);

  // 6. Final Summary
  console.log('=' .repeat(70));
  if (allPassed && passedTests === searchTests.length) {
    console.log('✅ ALL DIAGNOSTICS PASSED - TOOL DATA IS HEALTHY\n');
  } else {
    console.log('⚠️ SOME ISSUES DETECTED - SEE ABOVE FOR DETAILS\n');
  }
  console.log('=' .repeat(70) + '\n');

  // 7. Recommendations
  console.log('💡 RECOMMENDATIONS FOR DEBUGGING:\n');
  console.log('   1. If search shows 0 results on the website:');
  console.log('      - Check browser console for JavaScript errors');
  console.log('      - Verify toolMasterList is exported from src/data/tools.ts');
  console.log('      - Check if dist/assets/data-*.js file is loaded in network tab');
  console.log('');
  console.log('   2. If some tools are missing from search:');
  console.log('      - Verify tool is in the tools[] array in src/data/tools.ts');
  console.log('      - Check if tool name/description includes search keywords');
  console.log('      - Look for special characters or encoding issues');
  console.log('');
  console.log('   3. Performance considerations:');
  console.log('      - Current bundle size allows full data load');
  console.log('      - Search filtering is client-side (no server requests)');
  console.log('      - Consider virtualization if tool count exceeds 500');
  console.log('');
}).catch(err => {
  console.error('❌ Error loading tools data:', err.message);
  process.exit(1);
});
