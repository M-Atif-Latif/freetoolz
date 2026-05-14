#!/usr/bin/env python3
import os
import re
from pathlib import Path

tools_dir = Path('src/tools')
replacements_list = []

# Tools that still need fixing (78 - 4 already fixed = 74 remaining)
tools_to_fix = [
    'ASCIIArtGenerator.tsx', 'BulkURLShortener.tsx', 'BusinessDaysCalculator.tsx',
    'ClipboardHistory.tsx', 'CoinFlip.tsx', 'ColorBlindnessSimulator.tsx',
    'ColorContrastChecker.tsx', 'ColorConverter.tsx', 'ColorPicker.tsx',
    'CompressPDF.tsx', 'ContractionExpander.tsx', 'ConsoleLogFormatter.tsx',
    'CookieInspector.tsx', 'CORSHeaderChecker.tsx', 'CSVColumnSplitter.tsx',
    'CSVDuplicateFinder.tsx', 'CSSMinifier.tsx', 'CSSTailwindClassifier.tsx',
    'DatasetSampler.tsx', 'DateCalculator.tsx', 'DuplicateLineRemover.tsx',
    'FakeDataGenerator.tsx', 'FaviconGenerator.tsx', 'FileEncodingDetector.tsx',
    'FindAndReplace.tsx', 'GPACalculator.tsx', 'GrayscaleConverter.tsx',
    'HashIdentifier.tsx', 'HTTPStatusTester.tsx', 'ImageBackgroundRemover.tsx',
    'ImageBase64.tsx', 'ImageFormatConverter.tsx', 'ImageResizer.tsx',
    'InvisibleCharacter.tsx', 'JSONFormatter.tsx', 'JSMinifier.tsx',
    'LetterCounter.tsx', 'LineSorter.tsx', 'LoanCalculator.tsx',
    'MergePDF.tsx', 'MetaRobotsTester.tsx', 'NumberBaseConverter.tsx',
    'PasswordStrengthAnalyzer.tsx', 'PercentageCalculator.tsx',
    'PermutationCombinationCalculator.tsx', 'PWNEDPasswordCheck.tsx',
    'RandomPicker.tsx', 'ReadAloudCaptionGenerator.tsx', 'RegexBulkReplace.tsx',
    'RemoveSpaces.tsx', 'ReverseWords.tsx', 'SitemapURLExtractor.tsx',
    'SmartSentenceSplitter.tsx', 'SplitPDF.tsx', 'StructuredDataValidator.tsx',
    'SVGOptimizer.tsx', 'SyllableCounter.tsx', 'TextRandomizer.tsx',
    'TextToSpeech.tsx', 'TimeZoneConverter.tsx', 'TipCalculator.tsx',
    'TitleHeadlineAnalyzer.tsx', 'UnitConverter.tsx', 'UnixTimestamp.tsx',
    'WordFrequency.tsx', 'WorkingHoursTimezoneConverter.tsx', 'YAMLJSONConverter.tsx'
]

for filename in tools_to_fix[:10]:  # Start with first 10
    filepath = tools_dir / filename
    if not filepath.exists():
        print(f'File not found: {filename}')
        continue
    
    content = filepath.read_text(encoding='utf-8')
    
    # Look for pattern: heading and description paragraph
    # Pattern: <h[1-6]...>...</h[1-6]>\n<p...>...</p>
    match = re.search(
        r'(<h[1-6][^>]*>.*?</h[1-6]>\s*\n\s*<p[^>]*>.*?</p>)',
        content,
        re.DOTALL
    )
    
    if match:
        old_text = match.group(1)
        # Add HowItWorks after paragraph
        new_text = old_text + '\n      \n      <HowItWorks steps={howItWorks} />'
        replacements_list.append({
            'file': filename,
            'old': old_text,
            'new': new_text
        })
        print(f'✓ Found pattern in: {filename}')
    else:
        print(f'✗ Pattern not found in: {filename}')

#Print replacement commands
print('\n' + '='*60)
print(f'Found {len(replacements_list)} tools to fix')
for r in replacements_list:
    print(f'\nFile: {r["file"]}')
    print(f'Pattern found, ready to replace')
