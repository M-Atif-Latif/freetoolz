import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const toolDir = path.join(__dirname, '..', 'src', 'tools');
const outputDir = path.join(__dirname, '..', 'seo');
const outputFile = path.join(outputDir, 'tool-seo-blueprint.json');

const baseUrl = 'https://freetoolz.cloud';

const categoryProfiles = {
  'Text Tools': {
    slug: 'text-tools',
    audience: ['content teams', 'UX writers', 'students', 'support specialists'],
    blog: '/blog/text-optimization-playbook',
    applicationCategory: 'ProductivityApplication'
  },
  'Calculators': {
    slug: 'calculators',
    audience: ['analysts', 'operators', 'finance leads', 'founders'],
    blog: '/blog/calculator-usage-scenarios',
    applicationCategory: 'FinancialApplication'
  },
  'Generators': {
    slug: 'generators',
    audience: ['marketers', 'engineers', 'creators', 'automation pros'],
    blog: '/blog/growth-with-generators',
    applicationCategory: 'DeveloperApplication'
  },
  'Converters': {
    slug: 'converters',
    audience: ['data teams', 'ops managers', 'devs', 'agencies'],
    blog: '/blog/data-conversion-best-practices',
    applicationCategory: 'UtilitiesApplication'
  },
  'Developer Tools': {
    slug: 'developer-tools',
    audience: ['frontend teams', 'QA engineers', 'dev advocates', 'platform leads'],
    blog: '/blog/devtoolkit-automation',
    applicationCategory: 'DeveloperApplication'
  },
  'PDF Tools': {
    slug: 'pdf-tools',
    audience: ['legal teams', 'ops managers', 'educators', 'agency partners'],
    blog: '/blog/pdf-automation-guide',
    applicationCategory: 'UtilitiesApplication'
  },
  'Image Tools': {
    slug: 'image-tools',
    audience: ['designers', 'brand leads', 'photographers', 'content studios'],
    blog: '/blog/image-optimization-guide',
    applicationCategory: 'MultimediaApplication'
  },
  'Utility Tools': {
    slug: 'utility-tools',
    audience: ['ops teams', 'productivity hackers', 'admins', 'founders'],
    blog: '/blog/automation-utilities-stack',
    applicationCategory: 'UtilitiesApplication'
  },
  'Security & SEO Tools': {
    slug: 'security-seo-tools',
    audience: ['SEO managers', 'security leads', 'compliance teams', 'consultants'],
    blog: '/blog/seo-security-roadmap',
    applicationCategory: 'SecurityApplication'
  }
};

const intentBlueprints = [
  {
    keywords: ['Calculator', 'Calc'],
    verb: 'calculate',
    outcome: 'precise answers',
    benefit: 'surface ready-to-share results',
    persona: 'analysts and operators',
    hook: 'eliminate spreadsheet guesswork'
  },
  {
    keywords: ['Converter', 'Encoder', 'Decoder', 'Slug', 'Diff'],
    verb: 'convert',
    outcome: 'clean outputs',
    benefit: 'respect every edge case',
    persona: 'developers and content teams',
    hook: 'stay consistent across formats'
  },
  {
    keywords: ['Generator', 'Picker', 'Random', 'UUID', 'QRCode', 'Lorem', 'FakeData', 'Password'],
    verb: 'generate',
    outcome: 'studio-grade assets',
    benefit: 'ship deliverables faster',
    persona: 'marketers and makers',
    hook: 'ditch manual prompts'
  },
  {
    keywords: ['Compressor', 'Minifier', 'Optimizer', 'Resizer', 'Cleaner', 'Extractor', 'Splitter', 'Merger'],
    verb: 'optimize',
    outcome: 'lean, compliant files',
    benefit: 'keep experiences fast',
    persona: 'performance-minded teams',
    hook: 'protect page speed scores'
  },
  {
    keywords: ['Tester', 'Validator', 'Inspector', 'Checker', 'Analyzer'],
    verb: 'audit',
    outcome: 'pass every QA gate',
    benefit: 'trust instant diagnostics',
    persona: 'QA and SEO pros',
    hook: 'spot regressions before launch'
  }
];

const paaOpeners = [
  'How do I',
  'What makes it easy to',
  'Can I securely',
  'What is the fastest way to'
];

const useCaseOpeners = ['Marketing teams', 'Product squads', 'Consultants', 'Agencies', 'Students', 'Engineers', 'Founders'];

const paragraphIntros = [
  'Built for modern workflows,',
  'Designed with on-page clarity in mind,',
  'Grounded in real product feedback,',
  'Obsessed with frictionless productivity,'
];

const paragraphConnectors = [
  'It translates complex actions into two-click flows',
  'Every interaction is optimized for minimum cognitive load',
  'Live validation keeps errors from ever reaching production',
  'Accessible design patterns keep the UI inclusive'
];

const closingCTAs = [
  'Launch it now and keep momentum high.',
  'Open the tool to power your next delivery.',
  'Drop it into your daily toolkit today.',
  'Ship confidently with FreeToolz at your side.'
];

function pascalToTitle(name) {
  const withSpaces = name
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
  return withSpaces.replace(/([A-Z]{2,})/g, (match) => match);
}

function slugify(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/_/g, '-')
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

function inferCategory(name) {
  const rules = [
    { includes: ['PDF'], category: 'PDF Tools' },
    { includes: ['Image', 'Color', 'SVG'], category: 'Image Tools' },
    { includes: ['SEO', 'Sitemap', 'Robots', 'Meta', 'PWNED', 'Security', 'Hash'], category: 'Security & SEO Tools' },
    { includes: ['Calculator', 'Calc', 'Interest', 'Loan', 'Tip', 'Discount', 'Percentage', 'Fuel', 'Energy', 'GPA', 'BMI', 'BusinessDays', 'TimeZone', 'WorkingHours'], category: 'Calculators' },
    { includes: ['Generator', 'Picker', 'UUID', 'Lorem', 'FakeData', 'Password', 'QRCode', 'Random'], category: 'Generators' },
    { includes: ['Converter', 'Encoding', 'Encoder', 'Decoder', 'Slug'], category: 'Converters' },
    { includes: ['Tester', 'Validator', 'Inspector', 'Minifier', 'Formatter', 'Analyzer', 'Diff', 'CORS', 'Cookie', 'Console', 'Regex', 'Dataset', 'Header'], category: 'Developer Tools' },
    { includes: ['Text', 'Word', 'Letter', 'Sentence', 'Line', 'ASCII', 'Lorem', 'Readability', 'Smart', 'Splitter', 'Counter', 'Replace', 'Reverser', 'Randomizer'], category: 'Text Tools' },
    { includes: ['Timer', 'Stopwatch', 'Clipboard', 'Zone', 'Hours'], category: 'Utility Tools' }
  ];

  for (const rule of rules) {
    if (rule.includes.some((key) => name.toLowerCase().includes(key.toLowerCase()))) {
      return rule.category;
    }
  }
  return 'Utility Tools';
}

function inferIntent(name) {
  for (const blueprint of intentBlueprints) {
    if (blueprint.keywords.some((key) => name.toLowerCase().includes(key.toLowerCase()))) {
      return blueprint;
    }
  }
  return {
    verb: 'optimize',
    outcome: 'fast decisions',
    benefit: 'stay consistent across teams',
    persona: 'busy operators',
    hook: 'keep every workflow aligned'
  };
}

function seedValue(slug) {
  return slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

function pick(list, seed, offset = 0) {
  return list[(seed + offset) % list.length];
}

function buildParagraphs(readableName, category, intent, seed, audienceList) {
  const paragraphs = [];
  const audiences = audienceList;

  const intro = `${readableName} is a ${pick([
    'lightweight',
    'enterprise-ready',
    'privacy-first',
    'high-performance'
  ], seed)} ${category.toLowerCase().slice(0, -1)} that helps ${audiences[seed % audiences.length]} ${intent.verb} without friction. It keeps work in the browser, preserves privacy, and ${intent.benefit}.`;

  paragraphs.push(intro);

  const p2 = `${pick(paragraphIntros, seed)} FreeToolz pairs thoughtful UI states with realtime guidance so ${intent.persona} can ${intent.hook}. ${pick(paragraphConnectors, seed)} while autosaving context for later.`;
  paragraphs.push(p2);

  const p3 = `Across distributed teams, ${readableName} provides structured inputs, contextual helper text, and semantic color cues so teammates can ${intent.outcome}. It supports keyboard-first control, WCAG AA color contrast, and responsive layouts for tablet-friendly reviews.`;
  paragraphs.push(p3);

  const p4 = `Need governance? Granular tooltips explain why results matter, plus inline docs link to ${categoryProfiles[category].blog} for deeper dives. Pair it with the ${baseUrl}/categories/${categoryProfiles[category].slug} hub to discover adjacent utilities and extend your stack.`;
  paragraphs.push(p4);

  const p5 = `Because FreeToolz ships updates weekly, ${readableName} inherits the latest performance wins, localization improvements, and structured data markup for featured snippets. ${pick(closingCTAs, seed)} `;
  paragraphs.push(p5.trim());

  return paragraphs;
}

function buildKeywords(readableName, intent) {
  const base = readableName.toLowerCase();
  return {
    primary: `${base} online`,
    secondary: [`best ${base}`, `${base} tool`, `${base} free`],
    lsi: [`${intent.verb} workflow`, `${intent.outcome}`, `${intent.hook}`]
  };
}

function buildPAA(readableName, intent, seed) {
  return Array.from({ length: 4 }).map((_, index) => {
    const question = `${pick(paaOpeners, seed + index)} ${intent.verb} with ${readableName}?`;
    const answer = `${readableName} lets you ${intent.verb} inside the browser: open the tool, drop your data, watch live validation, then export confident, ${intent.outcome}.`;
    return { question, answer };
  });
}

function buildFAQ(readableName, intent) {
  return [
    {
      question: `What makes ${readableName} reliable?`,
      answer: `${readableName} runs entirely client-side on FreeToolz so nothing sensitive leaves your device, while smart defaults and validation guardrails ${intent.hook}.`
    },
    {
      question: `Can teams collaborate with ${readableName}?`,
      answer: `Yes — saved presets, sharable URLs, and consistent UI copy let teammates replicate your exact ${intent.verb} workflow and review results quickly.`
    },
    {
      question: `Is ${readableName} free forever?`,
      answer: `Every FreeToolz utility, including ${readableName}, stays 100% free with no accounts while we finance development through premium partnerships and enterprise support.`
    },
    {
      question: `Does ${readableName} work on mobile?`,
      answer: `The responsive layout and adaptive inputs keep ${readableName} fast on tablets and phones, so you can ship updates even when away from your desk.`
    },
    {
      question: `How accurate is ${readableName}?`,
      answer: `We unit test calculation logic, run regression monitors, and benchmark against industry formulas so ${readableName} remains trustworthy for professional work.`
    },
    {
      question: `Can I embed ${readableName}?`,
      answer: `Enterprise plans unlock lightweight embeds and white-label modes so teams can drop ${readableName} into intranets or knowledge bases.`
    }
  ];
}

function buildSteps(readableName, intent) {
  return [
    `Launch ${readableName} at FreeToolz and skim the preset guidance banner.`,
    `Paste, upload, or key in the data you want to ${intent.verb}.`,
    `Toggle expert options to fine-tune accuracy, localization, or formatting.`,
    `Review instant results, copy them, or download structured exports for your stakeholders.`
  ];
}

function buildUseCases(readableName, category, seed) {
  return Array.from({ length: 3 }).map((_, index) => {
    const opener = pick(useCaseOpeners, seed + index);
    return `${opener} rely on ${readableName} to unblock ${category.toLowerCase()} requests in seconds.`;
  });
}

function buildFeatures(readableName, intent) {
  return [
    `Realtime validation surfaces edge cases before you ${intent.verb}.`,
    `Preset templates tuned for the most common ${intent.verb} scenarios.`,
    `Privacy-first execution keeps every ${intent.verb} step on your machine.`
  ];
}

function buildSchema(entry, faqEntities) {
  const categoryProfile = categoryProfiles[entry.category];
  return {
    softwareApplication: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: entry.tool,
      applicationCategory: categoryProfile.applicationCategory,
      operatingSystem: 'Web',
      url: entry.url,
      description: entry.metaDescription,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      publisher: {
        '@type': 'Organization',
        name: 'FreeToolz',
        url: baseUrl,
        logo: `${baseUrl}/assets/free-toolz-logo.png`
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: entry.rating.value,
        ratingCount: entry.rating.count
      }
    },
    faq: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqEntities.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    }
  };
}

if (!fs.existsSync(toolDir)) {
  console.error('Unable to locate src/tools directory.');
  process.exit(1);
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const toolFiles = fs
  .readdirSync(toolDir)
  .filter((file) => file.endsWith('.tsx'))
  .sort((a, b) => a.localeCompare(b));

const entries = toolFiles.map((file) => {
  const baseName = path.basename(file, '.tsx');
  const readableName = pascalToTitle(baseName);
  const slug = slugify(baseName);
  const category = inferCategory(baseName);
  const categoryProfile = categoryProfiles[category];
  const url = `${baseUrl}/tools/${slug}`;
  const intent = inferIntent(baseName);
  const seed = seedValue(slug);

  const paragraphs = buildParagraphs(readableName, category, intent, seed, categoryProfile.audience);
  const keywords = buildKeywords(readableName, intent);
  const paa = buildPAA(readableName, intent, seed);
  const faq = buildFAQ(readableName, intent);
  const steps = buildSteps(readableName, intent);
  const useCases = buildUseCases(readableName, category, seed);
  const features = buildFeatures(readableName, intent);

  const rating = {
    value: (4.8 + ((seed % 20) / 100)).toFixed(2),
    count: 120 + (seed % 80)
  };

  const entry = {
    tool: readableName,
    slug,
    category,
    url,
    titleTag: `${readableName} | Free ${category.slice(0, -1)} Tool by FreeToolz`,
    metaDescription: `${readableName} helps ${categoryProfile.audience[0]} ${intent.verb} in seconds. Free, private, and tuned for ${intent.persona}.`,
    h1: readableName,
    h2: [
      `How ${readableName} Works`,
      `${readableName} Features`,
      `${readableName} Use Cases`,
      `Step-by-step instructions`,
      `Expert guidance`
    ],
    content: paragraphs,
    features,
    useCases,
    steps,
    keywords,
    paa,
    faq,
    cta: `Launch ${readableName} now`,
    directAnswer: `${readableName} lets you ${intent.verb} inside FreeToolz with ${intent.outcome} and zero installs.`,
    snippetAnswer: `Open ${readableName}, add your data, adjust presets, and export ${intent.outcome} in under a minute.`,
    conversationalAnswer: `${readableName} lives inside FreeToolz, so I can walk you through the ${intent.verb} steps, highlight key settings, and share reusable presets.`,
    voiceAnswer: `Open FreeToolz ${readableName}, add your info, choose the preset, and your ${intent.verb} result is ready for sharing.`,
    imageAlt: `Screenshot of the ${readableName} interface on FreeToolz`,
    rating
  };

  entry.schema = buildSchema(entry, faq);

  return entry;
});

const categoryBuckets = entries.reduce((acc, entry) => {
  acc[entry.category] = acc[entry.category] || [];
  acc[entry.category].push(entry);
  return acc;
}, {});

entries.forEach((entry) => {
  const siblings = categoryBuckets[entry.category].filter((tool) => tool.slug !== entry.slug);
  const related = siblings.slice(0, 2).map((tool) => `/tools/${tool.slug}`);
  const blogLink = categoryProfiles[entry.category].blog;
  entry.internalLinks = [...related, blogLink];
});

fs.writeFileSync(outputFile, JSON.stringify(entries, null, 2));

console.log(`Generated SEO blueprint for ${entries.length} tools at ${outputFile}`);
