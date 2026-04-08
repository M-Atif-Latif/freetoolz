#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toolsDir = path.join(__dirname, 'src', 'tools');

// Tools already updated
const UPDATED_TOOLS = new Set([
  'Base64Converter.tsx',
  'CaseConverter.tsx',
  'HTMLEncoder.tsx',
  'MarkdownToHTML.tsx',
  'RomanNumeralConverter.tsx',
  'TextReverser.tsx',
  'URLEncoder.tsx',
]);

// Tool-specific "How it works" steps
const toolSteps = {
  'AgeCalculator': [
    { title: 'Select Your Birth Date', description: 'Pick your date of birth from the calendar picker' },
    { title: 'Click Calculate', description: 'Press the calculate button to process your age' },
    { title: 'View Your Age', description: 'See your exact age in years, months, days and more metrics' },
    { title: 'Check Additional Stats', description: 'Review total days, weeks, months lived and next birthday countdown' }
  ],
  'PasswordGenerator': [
    { title: 'Set Password Length', description: 'Use the slider to choose your desired password length (8-32 characters)' },
    { title: 'Click Generate', description: 'Press the generate button to create a secure random password' },
    { title: 'View Generated Password', description: 'Your new password appears with a mix of letters, numbers, and symbols' },
    { title: 'Copy to Clipboard', description: 'Click the copy icon to save the password to your clipboard' }
  ],
  'WordCounter': [
    { title: 'Paste or Type Text', description: 'Enter your text in the input area to analyze' },
    { title: 'View Statistics', description: 'Instantly see word count, character count, sentences, and more' },
    { title: 'Copy Results', description: 'Use the copy button to save your text or statistics' },
    { title: 'Additional Metrics', description: 'Check reading time, speaking time, and average word length' }
  ],
  'CharacterCounter': [
    { title: 'Enter Your Text', description: 'Type or paste the text you want to analyze' },
    { title: 'View Character Count', description: 'See total characters with and without spaces' },
    { title: 'Get Additional Metrics', description: 'Check word count, line count, and sentence information' },
    { title: 'Copy Your Results', description: 'Use the copy button to export your analysis' }
  ],
  'CurrencyConverter': [
    { title: 'Enter Amount', description: 'Type the amount of money you want to convert' },
    { title: 'Select Source Currency', description: 'Choose the currency you\'re converting from' },
    { title: 'Select Target Currency', description: 'Pick the currency you want to convert to' },
    { title: 'View Converted Amount', description: 'See the instant conversion result with current exchange rates' }
  ],
  'JSONFormatter': [
    { title: 'Paste JSON Code', description: 'Enter your JSON data in the input area' },
    { title: 'Click Format', description: 'Press the format button to validate and beautify your JSON' },
    { title: 'View Formatted Output', description: 'See properly indented and structured JSON code' },
    { title: 'Copy Formatted JSON', description: 'Use the copy button to grab your formatted code' }
  ],
  'QRCodeGenerator': [
    { title: 'Enter Your Text/URL', description: 'Type the text or URL you want to encode into a QR code' },
    { title: 'Adjust Options', description: 'Choose QR code size and color preferences if available' },
    { title: 'Generate QR Code', description: 'Click generate to create your QR code' },
    { title: 'Download or Copy', description: 'Save your QR code as an image to use anywhere' }
  ],
  'ImageCompressor': [
    { title: 'Upload Your Image', description: 'Select an image file from your computer' },
    { title: 'Choose Compression Level', description: 'Select quality or compression settings' },
    { title: 'Compress', description: 'Process the image to reduce file size' },
    { title: 'Download Result', description: 'Save your compressed image to your device' }
  ],
  'TextToSlug': [
    { title: 'Enter Your Text', description: 'Type or paste the text you want to convert' },
    { title: 'Click Convert', description: 'Press the convert button to generate a URL-friendly slug' },
    { title: 'View Slug Format', description: 'See your text converted to lowercase with hyphens' },
    { title: 'Copy Slug', description: 'Use the copy button to grab your slug for use in URLs' }
  ],
  'HashGenerator': [
    { title: 'Enter Your Text', description: 'Type or paste the text you want to hash' },
    { title: 'Select Hash Type', description: 'Choose from MD5, SHA1, SHA256, or other hash algorithms' },
    { title: 'Generate Hash', description: 'Click generate to create your hash' },
    { title: 'Copy Hash', description: 'Use the copy button to save your generated hash' }
  ],
  'UUIDGenerator': [
    { title: 'Choose UUID Version', description: 'Select UUID version 1, 4, or 5 based on your needs' },
    { title: 'Click Generate', description: 'Press the generate button to create a new UUID' },
    { title: 'View Generated UUID', description: 'See your unique identifier displayed' },
    { title: 'Copy UUID', description: 'Use the copy button to save your UUID' }
  ],
  'Stopwatch': [
    { title: 'Press Start', description: 'Click the start button to begin timing' },
    { title: 'Watch Time Accumulate', description: 'See hours, minutes, seconds, and milliseconds increase' },
    { title: 'Pause or Stop', description: 'Click pause to freeze the timer or stop to reset' },
    { title: 'Record Times', description: 'Use lap feature to record split times if available' }
  ],
  'Timer': [
    { title: 'Set Duration', description: 'Enter hours, minutes, and seconds for your timer' },
    { title: 'Click Start', description: 'Press the start button to begin the countdown' },
    { title: 'Watch Countdown', description: 'See the time remaining decrease in real-time' },
    { title: 'Notification Alert', description: 'Get alerted when the timer reaches zero' }
  ],
  'BMICalculator': [
    { title: 'Enter Your Height', description: 'Input your height in your preferred unit (cm or inches)' },
    { title: 'Enter Your Weight', description: 'Type your weight in kilograms or pounds' },
    { title: 'Click Calculate', description: 'Press calculate to compute your BMI' },
    { title: 'View Your Results', description: 'See your BMI number and corresponding health category' }
  ],
  'TemperatureConverter': [
    { title: 'Enter Temperature Value', description: 'Type the temperature you want to convert' },
    { title: 'Select Source Unit', description: 'Choose from Celsius, Fahrenheit, or Kelvin' },
    { title: 'Select Target Unit', description: 'Pick the unit you want to convert to' },
    { title: 'View Conversion', description: 'See instant result of your temperature conversion' }
  ],
  'UnitConverter': [
    { title: 'Select Unit Type', description: 'Choose what you\'re converting (length, weight, volume, etc.)' },
    { title: 'Enter Amount', description: 'Type the value in your source unit' },
    { title: 'Select Units', description: 'Pick your source and target units' },
    { title: 'View Result', description: 'See instant conversion with precise calculations' }
  ],
  'DiscountCalculator': [
    { title: 'Enter Original Price', description: 'Type the original price before discount' },
    { title: 'Enter Discount Percentage', description: 'Input the discount percentage to apply' },
    { title: 'Click Calculate', description: 'Press calculate to compute final price' },
    { title: 'View Savings', description: 'See discounted price and amount saved' }
  ],
  'TipCalculator': [
    { title: 'Enter Bill Amount', description: 'Type the total bill amount before tip' },
    { title: 'Select Tip Percentage', description: 'Choose tip percentage (15%, 18%, 20%, etc.)' },
    { title: 'Calculate Split', description: 'Optionally split the bill among multiple people' },
    { title: 'View Total and Tip', description: 'See per-person amount and total with tip' }
  ],
};

function getToolName(filename) {
  return filename.replace('.tsx', '');
}

function getDefaultSteps(toolName) {
  return [
    { title: 'Step 1: Input', description: 'Enter your data or select from available options' },
    { title: 'Step 2: Process', description: 'Click the button or trigger the conversion/calculation' },
    { title: 'Step 3: View Results', description: 'See the output displayed on your screen' },
    { title: 'Step 4: Copy or Use', description: 'Copy the result to clipboard or use it as needed' }
  ];
}

function addHowItWorksComponent(content, toolName) {
  // Check if HowItWorks already exists
  if (content.includes('HowItWorks')) {
    return content;
  }

  // Get tool-specific steps or use defaults
  const steps = toolSteps[toolName] || getDefaultSteps(toolName);
  const stepsJson = JSON.stringify(steps, null, 4);

  // Add imports after first import
  const importMatch = content.match(/import\s+{[^}]*}\s+from\s+['"][^'"]+['"]/);
  if (!importMatch) return content;

  const firstImportEnd = importMatch.index + importMatch[0].length;
  const beforeImport = content.substring(0, firstImportEnd);
  const afterImport = content.substring(firstImportEnd);

  let newContent = beforeImport;
  
  // Add HowItWorks and CopyButton imports if not present
  if (!content.includes("import HowItWorks")) {
    newContent += "\nimport HowItWorks from '../components/HowItWorks';";
  }
  if (!content.includes("import CopyButton")) {
    newContent += "\nimport CopyButton from '../components/CopyButton';";
  }

  // Find the export default function and add howItWorks const
  const functionMatch = afterImport.match(/export\s+default\s+function\s+\w+\s*\(/);
  if (!functionMatch) {
    return content; // Cannot safely add component
  }

  const functionStart = afterImport.indexOf('{', functionMatch.index) + 1;
  const beforeFunction = afterImport.substring(0, functionStart);
  const afterFunctionStart = afterImport.substring(functionStart);

  const stepsDeclaration = `\n  const howItWorks = ${stepsJson};\n`;

  newContent += beforeFunction + stepsDeclaration + afterFunctionStart;

  // Find return JSX and add HowItWorks component
  // Look for common patterns like <div className="max-w-... and insert after h1
  const h1Match = newContent.match(/<h1[^>]*>.*?<\/h1>/s);
  if (h1Match) {
    const h1End = h1Match.index + h1Match[0].length;
    const beforeH1End = newContent.substring(0, h1End);
    const afterH1End = newContent.substring(h1End);
    
    // Add HowItWorks component after description paragraph if exists, or after h1
    const pMatch = afterH1End.match(/<p[^>]*>.*?<\/p>/s);
    if (pMatch) {
      const pEnd = pMatch.index + pMatch[0].length;
      const beforeInsert = afterH1End.substring(0, pEnd);
      const afterInsert = afterH1End.substring(pEnd);
      newContent = beforeH1End + beforeInsert + '\n        <HowItWorks steps={howItWorks} />\n' + afterInsert;
    } else {
      newContent = beforeH1End + '\n        <HowItWorks steps={howItWorks} />\n' + afterH1End;
    }
  }

  return newContent;
}

function replaceCopyButtons(content) {
  // This is a simple pattern - in most tools, look for manual copy logic
  // We'll do basic replacements for common patterns
  
  // Pattern 1: Replace basic inline copy buttons with CopyButton
  // But we need to be careful - many tools have custom logic
  // So we'll add a marker comment indicating this tool might need manual review
  
  if (!content.includes('CopyButton') && (content.includes('copyToClipboard') || content.includes('navigator.clipboard'))) {
    // Mark for potential manual review but don't break the tool
    const comment = '\n// TODO: Review and consider replacing manual copy logic with CopyButton component\n';
    return comment + content;
  }
  
  return content;
}

function updateToolFile(filename) {
  try {
    const filepath = path.join(toolsDir, filename);
    const content = fs.readFileSync(filepath, 'utf-8');
    const toolName = getToolName(filename);

    let updated = addHowItWorksComponent(content, toolName);
    updated = replaceCopyButtons(updated);

    if (updated !== content) {
      fs.writeFileSync(filepath, updated, 'utf-8');
      return { success: true, file: filename };
    }
    return { success: false, file: filename, reason: 'No changes needed' };
  } catch (error) {
    return { success: false, file: filename, reason: error.message };
  }
}

// Main execution
console.log('🚀 Starting tool updates...\n');

const files = fs.readdirSync(toolsDir).filter(f => f.endsWith('.tsx'));
const remaining = files.filter(f => !UPDATED_TOOLS.has(f));

console.log(`📊 Total tools: ${files.length}`);
console.log(`✅ Already updated: ${UPDATED_TOOLS.size}`);
console.log(`⏳ Remaining to update: ${remaining.length}\n`);

let updated = 0;
let failed = 0;

remaining.forEach(file => {
  const result = updateToolFile(file);
  if (result.success) {
    console.log(`✅ Updated: ${file}`);
    updated++;
  } else {
    console.log(`⚠️  ${file} - ${result.reason}`);
    if (result.reason !== 'No changes needed') {
      failed++;
    }
  }
});

console.log(`\n📈 Summary:`);
console.log(`✅ Successfully updated: ${updated}`);
console.log(`⚠️  Failed/Skipped: ${failed}`);
console.log(`\n✨ Tool update complete!`);
