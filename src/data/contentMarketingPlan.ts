import { BlogIdea, BlogCluster, BacklinkTarget, SearchIntent } from '../types';
import { tools } from './tools';
import { marketTargets } from './seo/marketTargets';

const categoryIntentMap: Record<string, SearchIntent> = {
  pdf: 'transactional',
  converter: 'informational',
  calculator: 'informational',
  generator: 'commercial',
  developer: 'commercial',
  text: 'informational',
  image: 'commercial',
  utility: 'informational',
  security: 'commercial'
};

const industries = ['startups', 'students', 'marketers', 'developers'];

const createIdea = (toolId: string, toolName: string, market: string, intent: SearchIntent, angle: string): BlogIdea => {
  return {
    toolId,
    title: `${angle} with ${toolName} (${market} Playbook)`,
    targetMarket: market,
    audienceIntent: intent,
    outline: [
      `Why ${toolName} solves the ${angle.toLowerCase()} bottleneck`,
      `Step-by-step workflow tailored for ${market} teams`,
      `Automation stack that pairs with ${toolName}`,
      `Success checklist and metrics to watch`
    ]
  };
};

export const contentMarketingPlan: BlogIdea[] = tools.flatMap(tool => {
  const intent = categoryIntentMap[tool.category] || 'informational';
  const baseAngles = [
    `How ${tool.name} becomes a billable service for US-based ${industries[0]} teams`,
    `Creative ways students and exam aspirants in ${marketTargets[1].regionName} use ${tool.name} for government-ready submissions`
  ];

  return marketTargets.map((market, index) =>
    createIdea(tool.id, tool.name, market.regionName, intent, baseAngles[index % baseAngles.length])
  );
});

export const getBlogIdeasForTool = (toolId: string): BlogIdea[] =>
  contentMarketingPlan.filter(idea => idea.toolId === toolId);

const backlinkTargets: BacklinkTarget[] = [
  {
    name: 'Indie Hackers Product Launch',
    url: 'https://www.indiehackers.com/',
    type: 'forum',
    regionFocus: 'United States',
    pitchAngle: 'Show how FreeToolz lets solo founders productize browser workflows into $500+/month service packages.',
    submissionNotes: ['Share monetization case study slide', 'Link to top US-focused pillar post', 'Reply to 3 related threads the same week']
  },
  {
    name: 'StackShare Tool Stack',
    url: 'https://stackshare.io/',
    type: 'review',
    regionFocus: 'United States',
    pitchAngle: 'Position FreeToolz as the lightweight alternative to paid PDF suites and AI authoring bundles.',
    submissionNotes: ['Highlight security promise (client-side processing)', 'List 3 developer-focused tools', 'Ask two agencies for testimonials']
  },
  {
    name: 'Reddit r/Entrepreneur Ride-Along',
    url: 'https://www.reddit.com/r/Entrepreneur/',
    type: 'forum',
    regionFocus: 'United States',
    pitchAngle: 'Share the “Earn $150/day with FreeToolz automations” pillar post with transparent numbers.',
    submissionNotes: ['Disclose it is your product', 'Answer monetization questions for 24h', 'Link only once in the body']
  },
  {
    name: 'Pagalguy Exam Community',
    url: 'https://www.pagalguy.com/',
    type: 'forum',
    regionFocus: 'India',
    pitchAngle: 'Explain how FreeToolz speeds up government form prep, PDF merging, and mark-sheet digitisation.',
    submissionNotes: ['Translate summary into neutral English', 'Include screenshots of PDF tools', 'Respond to moderator follow-ups']
  },
  {
    name: 'Shiksha.com Resource Library',
    url: 'https://www.shiksha.com/',
    type: 'edu',
    regionFocus: 'India',
    pitchAngle: 'Pitch FreeToolz as a free digital kit for exam aspirants uploading documents.',
    submissionNotes: ['Reference DPDP compliance', 'Offer to co-create a PDF checklist', 'Provide teacher testimonial']
  },
  {
    name: 'IndiaStack Case Study Index',
    url: 'https://www.indiastack.org/',
    type: 'edu',
    regionFocus: 'India',
    pitchAngle: 'Detail how FreeToolz complements DigiLocker and eSign stacks for SMB filings.',
    submissionNotes: ['Map each relevant FreeToolz PDF utility to an IndiaStack layer', 'Share load-time metrics', 'Offer bilingual summary']
  }
];

const selectIdeasByMarket = (marketName: string, count: number): BlogIdea[] =>
  contentMarketingPlan.filter(idea => idea.targetMarket === marketName).slice(0, count);

export const blogClusters: BlogCluster[] = [
  {
    id: 'us-monetization',
    market: 'United States',
    theme: 'Browser Monetization Workflows',
    goal: 'Teach US freelancers and agencies to turn FreeToolz automations into recurring revenue.',
    pillarHeadline: 'Earn $150/Day Productizing FreeToolz Automations for US Clients',
    spokes: selectIdeasByMarket('United States', 6),
    backlinkTargets: backlinkTargets.filter(target => target.regionFocus === 'United States'),
    successMetrics: [
      'Organic traffic from “free automation stack” keywords',
      'At least 10 mentions on monetization/agency forums',
      '5 qualified backlinks from SaaS review directories'
    ]
  },
  {
    id: 'india-exam-government',
    market: 'India',
    theme: 'Exam & Government Workflow Acceleration',
    goal: 'Help students and SMBs prep compliant paperwork using FreeToolz PDF and text utilities.',
    pillarHeadline: 'The Zero-Cost Digital Kit for Indian Exams, PSU Applications, and Tender Responses',
    spokes: selectIdeasByMarket('India', 6),
    backlinkTargets: backlinkTargets.filter(target => target.regionFocus === 'India'),
    successMetrics: [
      'Rank for “free pdf tools for exams” and related SERPs',
      'Earn 5+ .in or .edu backlinks referencing the pillar',
      'Drive 1,000 monthly sessions from WhatsApp/Telegram shares'
    ]
  }
];

export const backlinkPlan = backlinkTargets;
