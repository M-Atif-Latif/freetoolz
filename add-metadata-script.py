#!/usr/bin/env python3
"""
Script to add SEO metadata to tools.ts
Automatically adds metaTitle, metaDescription, and keywords to tools that don't have them.
"""

import re
import json

# Metadata mapping for all tools
METADATA = {
    'duplicate-line-remover': {
        'metaTitle': 'Duplicate Line Remover - Remove Duplicates Online Free',
        'metaDescription': 'Remove duplicate lines instantly with our free online duplicate line remover tool. Organize text efficiently.',
        'keywords': 'duplicate line remover, remove duplicates, text tool, free online',
    },
    'line-sorter': {
        'metaTitle': 'Line Sorter - Sort Lines Online Free',
        'metaDescription': 'Sort lines alphabetically, numerically, or reverse with our free online line sorter tool today.',
        'keywords': 'line sorter, sort text, alphabetical sort, free online',
    },
    'compound-interest': {
        'metaTitle': 'Compound Interest - Calculate Interest Online Free',
        'metaDescription': 'Calculate compound interest instantly with our free online compound interest calculator.',
        'keywords': 'compound interest calculator, interest calculator, financial math, free online',
    },
    'loan-calculator': {
        'metaTitle': 'Loan Calculator - Calculate Loan Payments Free',
        'metaDescription': 'Calculate loan payments and amortization with our free online loan calculator tool.',
        'keywords': 'loan calculator, payment calculator, mortgage calculator, financial tool, free',
    },
    'tip-calculator': {
        'metaTitle': 'Tip Calculator - Calculate Tips Online Free',
        'metaDescription': 'Calculate tip amounts instantly with our free online tip calculator and splitter.',
        'keywords': 'tip calculator, tip calculator, restaurant tool, gratuity calculator, free online',
    },
    'discount-calculator': {
        'metaTitle': 'Discount Calculator - Calculate Discounts Free',
        'metaDescription': 'Calculate discount amounts and percentages with our free online discount calculator.',
        'keywords': 'discount calculator, percentage off, sale calculator, coupon calculator, free tool',
    },
    'unit-converter': {
        'metaTitle': 'Unit Converter - Convert Units Online Free',
        'metaDescription': 'Convert any unit instantly with our free online unit converter calculator.',
        'keywords': 'unit converter, measurement converter, length converter, weight converter, free online',
    },
    'currency-converter': {
        'metaTitle': 'Currency Converter - Convert Currency Online Free',
        'metaDescription': 'Convert currencies with live rates using our free online currency converter tool.',
        'keywords': 'currency converter, exchange rate, money converter, travel tool, free online',
    },
    'timezone-converter': {
        'metaTitle': 'Timezone Converter - Convert Timezones Online Free',
        'metaDescription': 'Convert between timezones instantly with our free online timezone converter tool.',
        'keywords': 'timezone converter, time zone converter, world clock, international time, free',
    },
    'css-minifier': {
        'metaTitle': 'CSS Minifier - Minify CSS Online Free',
        'metaDescription': 'Minify CSS code instantly with our free online CSS minifier tool for developers.',
        'keywords': 'CSS minifier, minify CSS, code minifier, web developer tool, free online',
    },
    'js-minifier': {
        'metaTitle': 'JavaScript Minifier - Minify JS Online Free',
        'metaDescription': 'Minify JavaScript code instantly with our free online JS minifier tool.',
        'keywords': 'JavaScript minifier, minify JS, code minifier, developer tool, free online',
    },
    'regex-tester': {
        'metaTitle': 'Regex Tester - Test Regular Expressions Online Free',
        'metaDescription': 'Test and debug regular expressions with our free online regex tester tool.',
        'keywords': 'regex tester, regular expression tester, pattern tester, developer tool, free',
    },
    'unix-timestamp': {
        'metaTitle': 'Unix Timestamp - Convert Unix Timestamp Online Free',
        'metaDescription': 'Convert Unix timestamps instantly with our free online Unix timestamp converter.',
        'keywords': 'unix timestamp, epoch converter, timestamp converter, developer tool, free',
    },
    'image-base64': {
        'metaTitle': 'Image to Base64 - Convert to Base64 Online Free',
        'metaDescription': 'Convert images to base64 encoding with our free online image converter tool.',
        'keywords': 'image to base64, base64 converter, image encoder, code tool, free online',
    },
    'hash-generator': {
        'metaTitle': 'Hash Generator - Generate Hashes Online Free',
        'metaDescription': 'Generate MD5, SHA hashes instantly with our free online hash generator tool.',
        'keywords': 'hash generator, MD5 generator, SHA generator, security tool, free online',
    },
    'text-diff': {
        'metaTitle': 'Text Diff Checker - Compare Text Online Free',
        'metaDescription': 'Compare text and find differences instantly with our free online text diff checker.',
        'keywords': 'text diff, compare text, text comparison, diff checker, free online',
    },
    'merge-pdf': {
        'metaTitle': 'Merge PDF - Combine PDF Files Online Free',
        'metaDescription': 'Merge multiple PDFs into one instantly with our free online PDF merge tool.',
        'keywords': 'merge PDF, combine PDFs, PDF joiner, PDF tool, free online',
    },
    'split-pdf': {
        'metaTitle': 'Split PDF - Extract PDF Pages Online Free',
        'metaDescription': 'Split and extract PDF pages instantly with our free online PDF split tool.',
        'keywords': 'split PDF, extract pages, PDF splitter, PDF tool, free online',
    },
    'compress-pdf': {
        'metaTitle': 'Compress PDF - Reduce PDF Size Online Free',
        'metaDescription': 'Compress PDF size instantly while keeping quality with our free online tool.',
        'keywords': 'compress PDF, reduce PDF size, PDF compressor, PDF tool, free online',
    },
    'rotate-pdf': {
        'metaTitle': 'Rotate PDF - Rotate PDF Pages Online Free',
        'metaDescription': 'Rotate PDF pages instantly with our free online PDF rotation tool.',
        'keywords': 'rotate PDF, PDF rotator, page rotator, PDF tool, free online',
    },
    'pdf-unlock': {
        'metaTitle': 'PDF Unlock - Unlock Password Protected PDF Free',
        'metaDescription': 'Unlock password protected PDFs instantly with our free online PDF unlock tool.',
        'keywords': 'PDF unlock, remove PDF password, unlock PDF, PDF tool, free online',
    },
    'extract-images-from-pdf': {
        'metaTitle': 'Extract Images from PDF - Extract PDF Images Free',
        'metaDescription': 'Extract images from PDFs instantly with our free online image extraction tool.',
        'keywords': 'extract images from PDF, image extractor, PDF tool, document converter, free',
    },
    'extract-pdf-pages': {
        'metaTitle': 'Extract PDF Pages - Extract PDF Pages Online Free',
        'metaDescription': 'Extract specific PDF pages instantly with our free online PDF extractor tool.',
        'keywords': 'extract PDF pages, page extractor, PDF splitter, PDF tool, free online',
    },
    'image-compressor': {
        'metaTitle': 'Image Compressor - Compress Images Online Free',
        'metaDescription': 'Compress images while maintaining quality with our free online image compressor.',
        'keywords': 'image compressor, reduce image size, image optimizer, web tool, free online',
    },
    'image-format-converter': {
        'metaTitle': 'Image Converter - Convert Image Format Online Free',
        'metaDescription': 'Convert images between formats instantly with our free online image converter.',
        'keywords': 'image converter, format converter, JPG to PNG, image tool, free online',
    },
    'grayscale-converter': {
        'metaTitle': 'Grayscale Converter - Convert to Grayscale Online',
        'metaDescription': 'Convert color images to grayscale with our free online grayscale converter.',
        'keywords': 'grayscale converter, black and white, image filter, photo tool, free online',
    },
    'text-to-binary': {
        'metaTitle': 'Text to Binary - Convert Text to Binary Online Free',
        'metaDescription': 'Convert text to binary code instantly with our free online text to binary converter.',
        'keywords': 'text to binary, binary converter, text encoder, programmer tool, free online',
    },
    'morse-code': {
        'metaTitle': 'Morse Code - Encode Morse Code Online Free',
        'metaDescription': 'Encode and decode morse code with our free online morse code converter.',
        'keywords': 'morse code translator, morse code converter, text encoder, communication tool, free',
    },
    'word-frequency': {
        'metaTitle': 'Word Frequency - Count Words Online Free',
        'metaDescription': 'Analyze word frequency and usage patterns with our free online word frequency counter tool.',
        'keywords': 'word frequency counter, text analysis, keyword frequency, free tool',
    },
    'syllable-counter': {
        'metaTitle': 'Syllable Counter - Count Syllables Online Free',
        'metaDescription': 'Count syllables in any text instantly using our free online syllable counter tool accurately.',
        'keywords': 'syllable counter, syllable counter free, text analysis, vowel counter',
    },
    'readability-score': {
        'metaTitle': 'Readability Score - Analyze Text Online Free',
        'metaDescription': 'Check readability score and grade level of your content with our free online readability analyzer.',
        'keywords': 'readability score, readability checker, text analysis, Flesch reading ease',
    },
    'find-replace': {
        'metaTitle': 'Find & Replace - Text Editor Tool Online Free',
        'metaDescription': 'Find and replace text instantly with our free online find & replace editor and processor.',
        'keywords': 'find replace, text editor, bulk replace, regex replace, free tool',
    },
    'date-calculator': {
        'metaTitle': 'Date Calculator - Calculate Days Between Dates',
        'metaDescription': 'Calculate days between dates instantly with our free online date calculator tool.',
        'keywords': 'date calculator, date difference, day calculator, date calculator online, free',
    },
    'gpa-calculator': {
        'metaTitle': 'GPA Calculator - Calculate GPA Online Free',
        'metaDescription': 'Calculate your GPA instantly with our free online GPA calculator for students.',
        'keywords': 'GPA calculator, grade calculator, student tool, academic calculator, free online',
    },
    'fuel-cost': {
        'metaTitle': 'Fuel Cost - Calculate Fuel Cost Online Free',
        'metaDescription': 'Calculate fuel costs and mileage with our free online fuel cost calculator.',
        'keywords': 'fuel cost calculator, gas calculator, mileage calculator, travel calculator, free',
    },
    'time-calculator': {
        'metaTitle': 'Time Calculator - Calculate Time Online Free',
        'metaDescription': 'Calculate time differences and conversions with our free online time calculator.',
        'keywords': 'time calculator, hour calculator, time converter, duration calculator, free tool',
    },
    'calories-calculator': {
        'metaTitle': 'Calorie Calculator - Calculate Calories Online Free',
        'metaDescription': 'Calculate daily calorie needs and track with our free online calorie calculator.',
        'keywords': 'calorie calculator, nutrition calculator, diet calculator, fitness tool, free online',
    },
    'barcode-generator': {
        'metaTitle': 'Barcode Generator - Generate Barcodes Online Free',
        'metaDescription': 'Generate barcodes instantly with our free online barcode generator tool.',
        'keywords': 'barcode generator, QR code generator, product code, business tool, free',
    },
    'credit-card-generator': {
        'metaTitle': 'Credit Card Generator - Test Card Numbers Online',
        'metaDescription': 'Generate test credit card numbers with our free online card number generator.',
        'keywords': 'credit card generator, test cards, card numbers, testing tool, free online',
    },
    'fake-data-generator': {
        'metaTitle': 'Fake Data Generator - Generate Fake Data Online Free',
        'metaDescription': 'Generate realistic fake data instantly with our free online fake data generator.',
        'keywords': 'fake data generator, random data, test data, developer tool, free online',
    },
    'gradient-generator': {
        'metaTitle': 'Gradient Generator - Create Gradients Online Free',
        'metaDescription': 'Create beautiful gradients instantly with our free online gradient generator.',
        'keywords': 'gradient generator, color gradient, CSS gradient, web design tool, free online',
    },
    'jwt-decoder': {
        'metaTitle': 'JWT Decoder - Decode JWT Online Free',
        'metaDescription': 'Decode and verify JWT tokens with our free online JWT decoder tool.',
        'keywords': 'JWT decoder, JWT encoder, token decoder, developer tool, free online',
    },
    'xml-formatter': {
        'metaTitle': 'XML Formatter - Format XML Online Free',
        'metaDescription': 'Format and validate XML instantly with our free online XML formatter tool.',
        'keywords': 'XML formatter, XML validator, code formatter, developer tool, free online',
    },
    'sql-formatter': {
        'metaTitle': 'SQL Formatter - Format SQL Online Free',
        'metaDescription': 'Format and beautify SQL queries with our free online SQL formatter tool.',
        'keywords': 'SQL formatter, SQL beautifier, code formatter, database tool, free online',
    },
}

# Read the file
with open('d:\\Website\\freetoolz\\src\\data\\tools.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# For each tool in metadata, find its block and add metadata fields
for tool_id, metadata in METADATA.items():
    # Find the tool definition
    pattern = r"(\{\s*id:\s*'" + re.escape(tool_id) + r"',[^}]*?path:\s*'[^']*')"
    match = re.search(pattern, content, re.DOTALL)
    
    if match:
        tool_block = match.group(1)
        
        # Check if it already has metaTitle
        if 'metaTitle:' not in tool_block:
            # Add metadata after path line
            new_tool_block = tool_block + f",\n    metaTitle: '{metadata['metaTitle']}',\n    metaDescription: '{metadata['metaDescription']}',\n    keywords: '{metadata['keywords']}'"
            content = content.replace(tool_block + ',', new_tool_block + ',')

# Write back
with open('d:\\Website\\freetoolz\\src\\data\\tools.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"✅ Successfully added metadata to {len(METADATA)} tools")
