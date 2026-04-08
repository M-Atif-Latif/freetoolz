#!/usr/bin/env python3
import os
import re
import json
from pathlib import Path

tools_dir = Path('src/tools')

# Tools already updated
UPDATED_TOOLS = {
    'Base64Converter.tsx',
    'CaseConverter.tsx',
    'HTMLEncoder.tsx',
    'MarkdownToHTML.tsx',
    'RomanNumeralConverter.tsx',
    'TextReverser.tsx',
    'URLEncoder.tsx',
}

# Tool-specific steps
TOOL_STEPS = {
    'AgeCalculator': [
        {'title': 'Select Your Birth Date', 'description': 'Pick your date of birth from the calendar picker'},
        {'title': 'Click Calculate', 'description': 'Press the calculate button to process your age'},
        {'title': 'View Your Age', 'description': 'See your exact age in years, months, days and more metrics'},
        {'title': 'Check Additional Stats', 'description': 'Review total days, weeks, months lived and next birthday countdown'}
    ],
    'PasswordGenerator': [
        {'title': 'Set Password Length', 'description': 'Use the slider to choose your desired password length (8-32 characters)'},
        {'title': 'Click Generate', 'description': 'Press the generate button to create a secure random password'},
        {'title': 'View Generated Password', 'description': 'Your new password appears with a mix of letters, numbers, and symbols'},
        {'title': 'Copy to Clipboard', 'description': 'Click the copy icon to save the password to your clipboard'}
    ],
    'WordCounter': [
        {'title': 'Paste or Type Text', 'description': 'Enter your text in the input area to analyze'},
        {'title': 'View Statistics', 'description': 'Instantly see word count, character count, sentences, and more'},
        {'title': 'Copy Results', 'description': 'Use the copy button to save your text or statistics'},
        {'title': 'Additional Metrics', 'description': 'Check reading time, speaking time, and average word length'}
    ],
}

def get_default_steps():
    return [
        {'title': 'Step 1: Input', 'description': 'Enter your data or select from available options'},
        {'title': 'Step 2: Process', 'description': 'Click the button or trigger the conversion/calculation'},
        {'title': 'Step 3: View Results', 'description': 'See the output displayed on your screen'},
        {'title': 'Step 4: Copy or Use', 'description': 'Copy the result to clipboard or use it as needed'}
    ]

def get_tool_steps(tool_name):
    return TOOL_STEPS.get(tool_name, get_default_steps())

def add_how_it_works_component(content, tool_name):
    """Add HowItWorks component to tool file"""
    if 'HowItWorks' in content:
        return content
    
    # Get steps for this tool
    steps = get_tool_steps(tool_name)
    steps_json = json.dumps(steps)
    
    # Add imports after first import
    import_pattern = r'import\s+{[^}]*}\s+from\s+[\'"][^\'"]+[\'"]'
    import_match = re.search(import_pattern, content)
    
    if not import_match:
        return content
    
    import_end = import_match.end()
    before_import = content[:import_end]
    after_import = content[import_end:]
    
    # Add imports if not present
    if "import HowItWorks" not in content:
        before_import += "\nimport HowItWorks from '../components/HowItWorks';"
    if "import CopyButton" not in content:
        before_import += "\nimport CopyButton from '../components/CopyButton';"
    
    content = before_import + after_import
    
    # Find the export default function and add howItWorks const
    func_pattern = r'export\s+default\s+function\s+\w+\s*\([^)]*\)\s*{'
    func_match = re.search(func_pattern, content)
    
    if not func_match:
        return content
    
    # Insert after function opening brace
    insert_pos = func_match.end()
    steps_declaration = f"\n  const howItWorks = {steps_json};\n"
    content = content[:insert_pos] + steps_declaration + content[insert_pos:]
    
    # Find h1 and add HowItWorks after description
    h1_pattern = r'<h1[^>]*>.*?</h1>'
    h1_match = re.search(h1_pattern, content, re.DOTALL)
    
    if h1_match:
        h1_end = h1_match.end()
        # Look for description p after h1
        after_h1 = content[h1_end:]
        p_match = re.search(r'<p[^>]*>.*?</p>', after_h1, re.DOTALL)
        
        if p_match:
            insert_pos2 = h1_end + p_match.end()
            content = content[:insert_pos2] + '\n        <HowItWorks steps={howItWorks} />\n' + content[insert_pos2:]
        else:
            content = content[:h1_end] + '\n        <HowItWorks steps={howItWorks} />\n' + content[h1_end:]
    
    return content

def update_tool_file(filename):
    """Update a single tool file"""
    try:
        filepath = tools_dir / filename
        content = filepath.read_text(encoding='utf-8')
        tool_name = filename.replace('.tsx', '')
        
        original = content
        content = add_how_it_works_component(content, tool_name)
        
        if content != original:
            filepath.write_text(content, encoding='utf-8')
            return True, filename
        return False, filename
    except Exception as e:
        return False, f"{filename} - Error: {str(e)}"

# Main execution
print('🚀 Starting tool updates...\n')

files = sorted([f for f in os.listdir(tools_dir) if f.endswith('.tsx')])
remaining = [f for f in files if f not in UPDATED_TOOLS]

print(f'📊 Total tools: {len(files)}')
print(f'✅ Already updated: {len(UPDATED_TOOLS)}')
print(f'⏳ Remaining to update: {len(remaining)}\n')

updated = 0
failed = 0

for file in remaining:
    success, msg = update_tool_file(file)
    if success:
        print(f'✅ Updated: {file}')
        updated += 1
    else:
        print(f'⚠️  {msg}')
        failed += 1

print(f'\n📈 Summary:')
print(f'✅ Successfully updated: {updated}')
print(f'⚠️  Failed/Skipped: {failed}')
print(f'\n✨ Tool update complete!')
