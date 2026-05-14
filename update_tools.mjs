import fs from 'fs';

let code = fs.readFileSync('src/data/tools.ts', 'utf8');

// Update description block to include Use Case
code = code.replace(/description:\s*'([^']+)'/g, (match, desc) => {
  if (desc.startsWith('Use Case: ')) return match;
  return `description: 'Use Case: ${desc}'`;
});
code = code.replace(/description:\s*`([^`]+)`/g, (match, desc) => {
  if (desc.startsWith('Use Case: ')) return match;
  return `description: \`Use Case: ${desc}\``;
});
code = code.replace(/description:\s*"([^"]+)"/g, (match, desc) => {
  if (desc.startsWith('Use Case: ')) return match;
  return `description: "Use Case: ${desc}"`;
});


fs.writeFileSync('src/data/tools.ts', code);
console.log('Updated 140+ Tools with Use Cases');
