#!/usr/bin/env python3
import os
import re
from pathlib import Path

tools_dir = Path('src/tools')
fixed = 0
failed = []

for file_path in sorted(tools_dir.glob('*.tsx')):
    if file_path.name == 'ToolComingSoon.tsx':
        continue
    
    content = file_path.read_text(encoding='utf-8')
    
    # Check if it imports HowItWorks but doesn't use it
    has_import = 'import HowItWorks' in content
    has_usage = '<HowItWorks' in content
    
    if not has_import or has_usage:
        continue  # Skip - either doesn't import or already uses it
    
    # Find the pattern: heading followed by description paragraph
    # Pattern: </h1> or </h2> ... </p>, then insert HowItWorks
    pattern = r'(</h[1-6]>.*?<p[^>]*>[^<]*</p>)'
    
    def replace_func(match):
        return match.group(1) + '\n      \n      <HowItWorks steps={howItWorks} />'
    
    new_content = re.sub(pattern, replace_func, content, count=1, flags=re.DOTALL)
    
    if new_content != content:
        try:
            file_path.write_text(new_content, encoding='utf-8')
            fixed += 1
            print(f'✓ Fixed: {file_path.name}')
        except Exception as e:
            failed.append(f'{file_path.name}: {str(e)}')
    else:
        failed.append(f'{file_path.name}: Pattern not found')

print(f'\n==== Summary ====')
print(f'Fixed: {fixed} files')
if failed:
    print(f'Failed/Skipped: {len(failed)} files')
    for f in failed[:10]:  # Show first 10
        print(f'  - {f}')
    if len(failed) > 10:
        print(f'  ... and {len(failed) - 10} more')
