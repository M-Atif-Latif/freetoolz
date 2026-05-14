#!/usr/bin/env python3
import re
from pathlib import Path

tools_dir = Path('src/tools')
needs_fixing = []

for file_path in sorted(tools_dir.glob('*.tsx')):
    if file_path.name == 'ToolComingSoon.tsx':
        continue
    
    content = file_path.read_text(encoding='utf-8')
    has_import = 'import HowItWorks' in content
    has_usage = '<HowItWorks' in content
    
    if has_import and not has_usage:
        needs_fixing.append(file_path.name)

print(f"Tools stil needing HowItWorks rendering: {len(needs_fixing)}\n")
for tool in needs_fixing:
    print(f"- {tool}")

with open('tools_needing_fixes.txt', 'w') as f:
    f.write(f"Total: {len(needs_fixing)}\n\n")
    for tool in needs_fixing:
        f.write(f"{tool}\n")

print(f"\nSaved to tools_needing_fixes.txt")
