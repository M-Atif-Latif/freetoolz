import { useEffect, useState } from 'react';
import { updateMetaTags, generateToolStructuredData, generateHowToStructuredData, generateFAQStructuredData, generateBreadcrumbs } from '../utils/seo';
import { getToolSEO, type ToolSEO } from '../data/toolSEO';
import { marketTargets } from '../data/seo/marketTargets';

interface SEOWrapperProps {
  toolId: string;
  children: React.ReactNode;
}

/**
 * SEO Wrapper Component
 * Wraps tool pages with comprehensive SEO metadata
 * Implements professional SEO best practices with 15+ years experience
 */
export function SEOWrapper({ toolId, children }: SEOWrapperProps) {
  useEffect(() => {
    const seoData = getToolSEO(toolId);
    
    if (!seoData) {
      console.warn(`SEO data not found for tool: ${toolId}`);
      return;
    }

    const keywordSet = new Set(seoData.keywords);
    seoData.marketPackages?.forEach(pkg => {
      pkg.primaryKeywords.forEach(keyword => keywordSet.add(keyword));
      pkg.secondaryKeywords.forEach(keyword => keywordSet.add(keyword));
    });

    // Update meta tags
    updateMetaTags({
      title: seoData.title,
      description: seoData.description,
      keywords: Array.from(keywordSet).join(', '),
      ogTitle: seoData.title,
      ogDescription: seoData.description,
      ogUrl: seoData.canonicalUrl,
      ogImage: `https://freetoolz.com/og-images/${toolId}.png`,
      canonical: seoData.canonicalUrl,
      twitterCard: 'summary_large_image',
      marketTargets
    });

    // Generate WebApplication structured data
    generateToolStructuredData({
      name: seoData.h1,
      description: seoData.description,
      url: seoData.canonicalUrl,
      applicationCategory: seoData.schema.applicationCategory,
      operatingSystem: 'Any (Web-based)',
      offers: {
        price: seoData.schema.offers.price,
        priceCurrency: seoData.schema.offers.priceCurrency,
      },
      author: {
        name: 'FreeToolz',
        url: 'https://freetoolz.com',
      },
      marketTargets,
    });

    // Generate HowTo structured data
    if (seoData.content.howTo && seoData.content.howTo.length > 0) {
      generateHowToStructuredData({
        name: `How to Use ${seoData.h1}`,
        description: seoData.content.intro,
        steps: seoData.content.howTo,
        totalTime: 'PT2M', // 2 minutes average
        tool: seoData.h1,
      });
    }

    // Generate FAQ structured data
    if (seoData.content.faqs && seoData.content.faqs.length > 0) {
      generateFAQStructuredData(seoData.content.faqs);
    }

    // Generate breadcrumbs
    const category = getCategoryFromToolId(toolId);
    generateBreadcrumbs([
      { name: 'Home', url: 'https://freetoolz.com/' },
      { name: 'Tools', url: 'https://freetoolz.com/#tools' },
      ...(category ? [{ name: category, url: `https://freetoolz.com/#${category}` }] : []),
      { name: seoData.h1, url: seoData.canonicalUrl },
    ]);

    // Scroll to top on mount (better UX)
    window.scrollTo(0, 0);

    // Cleanup function to remove structured data scripts when component unmounts
    return () => {
      const scripts = ['tool-structured-data', 'howto-structured-data', 'faq-structured-data', 'breadcrumb-data'];
      scripts.forEach(id => {
        const script = document.getElementById(id);
        if (script) {
          script.remove();
        }
      });
    };
  }, [toolId]);

  return <>{children}</>;
}

/**
 * Helper function to determine category from tool ID
 */
function getCategoryFromToolId(toolId: string): string | null {
  const categoryMap: Record<string, string> = {
    'word-counter': 'Text Tools',
    'case-converter': 'Text Tools',
    'character-counter': 'Text Tools',
    'text-reverser': 'Text Tools',
    'remove-spaces': 'Text Tools',
    'lorem-ipsum': 'Text Tools',
    'text-to-slug': 'Text Tools',
    'markdown-to-html': 'Text Tools',
    'duplicate-line-remover': 'Text Tools',
    'line-sorter': 'Text Tools',
    'text-diff': 'Text Tools',
    'word-frequency': 'Text Tools',
    'syllable-counter': 'Text Tools',
    'readability-score': 'Text Tools',
    'find-replace': 'Text Tools',
    'letter-counter': 'Text Tools',
    
    'password-generator': 'Generators',
    'qr-code-generator': 'Generators',
    'uuid-generator': 'Generators',
    'random-number': 'Generators',
    
    'image-compressor': 'Image Tools',
    'image-resizer': 'Image Tools',
    'image-format-converter': 'Image Tools',
    'grayscale-converter': 'Image Tools',
    
    'json-formatter': 'Developer Tools',
    'base64-encoder': 'Converters',
    'url-encoder': 'Converters',
    'html-encoder': 'Developer Tools',
    'css-minifier': 'Developer Tools',
    'js-minifier': 'Developer Tools',
    'regex-tester': 'Developer Tools',
    'hash-generator': 'Developer Tools',
    'unix-timestamp': 'Developer Tools',
    
    'merge-pdf': 'PDF Tools',
    'split-pdf': 'PDF Tools',
    'compress-pdf': 'PDF Tools',
    'rotate-pdf': 'PDF Tools',
    
    'bmi-calculator': 'Calculators',
    'age-calculator': 'Calculators',
    'percentage-calculator': 'Calculators',
    'loan-calculator': 'Calculators',
    'tip-calculator': 'Calculators',
    'discount-calculator': 'Calculators',
    'compound-interest': 'Calculators',
    'date-calculator': 'Calculators',
    'gpa-calculator': 'Calculators',
    'fuel-cost': 'Calculators',
    'binary-calculator': 'Calculators',
    'hex-calculator': 'Calculators',
    
    'color-converter': 'Converters',
    'unit-converter': 'Converters',
    'currency-converter': 'Converters',
    'timezone-converter': 'Converters',
    'temperature-converter': 'Converters',
    'image-base64': 'Converters',
    'text-to-binary': 'Converters',
    'morse-code': 'Converters',
    'roman-numeral': 'Converters',
    
    'stopwatch': 'Utility Tools',
    'timer': 'Utility Tools',
    'coin-flip': 'Utility Tools',
    'random-picker': 'Utility Tools',
    'text-to-speech': 'Utility Tools',
    'color-picker': 'Utility Tools',
    'password-strength': 'Utility Tools',
  };

  return categoryMap[toolId] || null;
}

/**
 * SEO Content Component
 * Renders SEO-optimized content for tool pages
 */
interface SEOContentProps {
  toolId: string;
}

export function SEOContent({ toolId }: SEOContentProps) {
  const seoData = getToolSEO(toolId);

  if (!seoData) {
    return null;
  }

  const howToParagraphs = buildHowToGuide(seoData);
  const enrichedFaqs = buildEnrichedFaqs(seoData);
  const workflowPairings = buildWorkflowPairings(seoData.relatedTools || []);
  const trustNarrative = buildTrustNarrative(seoData);
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({});

  return (
    <div className="mt-12 max-w-4xl mx-auto px-4 space-y-8 text-gray-700 dark:text-gray-300">
      {/* 200+ word How-To Guide */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{seoData.h1} – Complete How-To Guide</h2>
        {howToParagraphs.map(paragraph => (
          <p key={paragraph.slice(0, 30)} className="text-lg leading-relaxed mb-4 last:mb-0">
            {paragraph}
          </p>
        ))}
      </section>

      {/* How To Use */}
      {seoData.content.howTo && seoData.content.howTo.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            {seoData.h2.find(h => h.includes('How to')) || 'How to Use'}
          </h2>
          <ol className="list-decimal list-inside space-y-2">
            {seoData.content.howTo.map((step, index) => (
              <li key={index} className="text-lg">{step}</li>
            ))}
          </ol>
        </section>
      )}

      {/* Key Features */}
      {seoData.content.features && seoData.content.features.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            {seoData.h2.find(h => h.includes('Features')) || 'Key Features'}
          </h2>
          <ul className="list-disc list-inside space-y-2">
            {seoData.content.features.map((feature, index) => (
              <li key={index} className="text-lg">{feature}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Benefits */}
      {seoData.content.benefits && seoData.content.benefits.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            {seoData.h2.find(h => h.includes('Why')) || 'Why Use This Tool?'}
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {seoData.content.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Use Cases */}
      {seoData.content.useCases && seoData.content.useCases.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            {seoData.h2.find(h => h.includes('Perfect For') || h.includes('Uses')) || 'Perfect For'}
          </h2>
          <ul className="list-disc list-inside space-y-2">
            {seoData.content.useCases.map((useCase, index) => (
              <li key={index} className="text-lg">{useCase}</li>
            ))}
          </ul>
        </section>
      )}

      {/* FAQs */}
      {enrichedFaqs.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            {seoData.h2.find(h => h.includes('FAQ') || h.includes('Questions')) || 'Frequently Asked Questions'}
          </h2>
          <div className="space-y-6">
            {enrichedFaqs.map((faq, index) => {
              const isOpen = openFaqs[index] ?? false;
              return (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white/70 dark:bg-gray-900/30">
                  <button
                    type="button"
                    onClick={() => setOpenFaqs(prev => ({ ...prev, [index]: !isOpen }))}
                    className="w-full flex items-center justify-between px-4 py-3 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">{faq.question}</span>
                    <span className="text-blue-600 dark:text-blue-300 text-2xl leading-none" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-gray-700 dark:text-gray-300 border-t border-gray-100 dark:border-gray-800">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Related Tools */}
      {workflowPairings.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Workflow Pairings</h2>
          <p className="mb-3">Pair this tool with adjacent spokes to cover the full task without hunting for more software.</p>
          <ul className="space-y-3">
            {workflowPairings.map(pairing => (
              <li key={pairing.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white/80 dark:bg-gray-900/40">
                <a href={`/tools/${pairing.id}`} className="text-blue-600 dark:text-blue-300 font-semibold hover:underline">
                  {pairing.name}
                </a>
                <p className="text-sm mt-1">{pairing.summary}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {seoData.relatedTools && seoData.relatedTools.length > 0 && (
        <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Related Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {seoData.relatedTools.map((relatedToolId) => {
              const relatedSEO = getToolSEO(relatedToolId);
              if (!relatedSEO) return null;
              return (
                <a
                  key={relatedToolId}
                  href={`/tools/${relatedToolId}`}
                  className="block p-3 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                >
                  <span className="font-medium text-blue-600 dark:text-blue-400">
                    {relatedSEO.h1.replace('Free Online ', '').replace('Free ', '')}
                  </span>
                </a>
              );
            })}
          </div>
        </section>
      )}

      {/* Trust Signals */}
      <section className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">100%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Free Forever</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">🔒</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Client-Side & Private</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">∞</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Unlimited Usage</div>
          </div>
        </div>
        <div className="mt-4 text-sm text-left space-y-2">
          {trustNarrative.map(statement => (
            <p key={statement}>{statement}</p>
          ))}
        </div>
      </section>

    </div>
  );
}

export default SEOWrapper;

const MIN_GUIDE_WORDS = 260;
const MAX_GUIDE_WORDS = 380;

const buildHowToGuide = (seoData: ToolSEO): string[] => {
  const steps = seoData.content.howTo || [];
  const features = seoData.content.features || [];
  const benefits = seoData.content.benefits || [];
  const useCases = seoData.content.useCases || [];

  const paragraphs: string[] = [];
  paragraphs.push(
    `${seoData.content.intro} This guide walks you through the exact workflow US and Indian teams follow to get reliable results in under a minute.`
  );

  steps.forEach((step, index) => {
    const feature = features[index % (features.length || 1)] || 'Keeps everything fast and private.';
    paragraphs.push(
      `Step ${index + 1}: ${step}. ${feature} That means your crew can keep shipping work without switching tabs or exposing data.`
    );
  });

  const benefitSummary = benefits.slice(0, 2).join(' ');
  const useCaseSummary = useCases.slice(0, 2).join(' ');
  paragraphs.push(
    `After the final step, review the insights panel to confirm counts, conversions, or optimizations before sharing. ${benefitSummary || ''}`.trim()
  );
  paragraphs.push(
    `Teams in New York, San Francisco, Delhi, Bengaluru, and beyond rely on ${seoData.h1} because it handles ${useCaseSummary || 'everyday productivity tasks'} without installs, seats, or hidden limits.`
  );

  let depthIndex = 0;
  while (wordCount(paragraphs) < MIN_GUIDE_WORDS) {
    paragraphs.push(buildDepthParagraph(seoData, depthIndex));
    depthIndex += 1;
  }

  return clampGuideLength(paragraphs);
};

const wordCount = (paragraphs: string[]): number =>
  paragraphs
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;

const buildDepthParagraph = (seoData: ToolSEO, index: number): string => {
  const markets = marketTargets.map(target => target.regionName).join(' and ');
  if (index % 2 === 0) {
    return `The interface highlights every metric you need for compliance reviews, making it easy for teams in ${markets} to capture screenshots for auditors or clients. Save the results panel as a PDF and attach it to Jira, Notion, or Google Drive without exporting sensitive source files.`;
  }
  const related = seoData.relatedTools?.slice(0, 2) || [];
  if (related.length > 0) {
    return `Advanced workflow tip: run ${seoData.h1} alongside ${related.join(' and ')} so you can hand off clean numbers, formatted assets, or sanitized text to the next teammate without switching stacks.`;
  }
  return `${seoData.h1} is fully responsive, so analysts can review drafts during commutes or late-night release checks on mobile devices without compromising accuracy.`;
};

const clampGuideLength = (paragraphs: string[]): string[] => {
  const totalWords = wordCount(paragraphs);
  if (totalWords <= MAX_GUIDE_WORDS) {
    return paragraphs;
  }

  const trimmed: string[] = [];
  let runningCount = 0;
  for (const paragraph of paragraphs) {
    const paragraphWords = paragraphWordCount(paragraph);
    if (runningCount + paragraphWords <= MAX_GUIDE_WORDS) {
      trimmed.push(paragraph);
      runningCount += paragraphWords;
      continue;
    }

    if (runningCount >= MAX_GUIDE_WORDS) {
      break;
    }

    const remaining = MAX_GUIDE_WORDS - runningCount;
    const words = paragraph.split(/\s+/).slice(0, remaining);
    if (words.length) {
      trimmed.push(words.join(' '));
    }
    break;
  }

  return trimmed;
};

const paragraphWordCount = (text: string): number => text.split(/\s+/).filter(Boolean).length;

const buildEnrichedFaqs = (seoData: ToolSEO): { question: string; answer: string }[] => {
  const baseFaqs = seoData.content.faqs || [];
  const deduped: { question: string; answer: string }[] = [];
  const seen = new Set<string>();

  baseFaqs.forEach(faq => {
    const key = faq.question.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      deduped.push(faq);
    }
  });

  const generatedFaqs: { question: string; answer: string }[] = [
    {
      question: `Is ${seoData.h1} safe for confidential data?`,
      answer: `${seoData.h1} runs entirely in the browser, so your input never leaves your device. It is a perfect fit for SOC 2-conscious US companies and Indian startups navigating DPDP compliance.`
    },
    {
      question: `Are there any limits on how many times I can use ${seoData.h1}?`,
      answer: `No usage caps, tiers, or logins are required. Keep the tab open all day and rerun the tool as many times as needed for classrooms, agencies, or enterprise teams.`
    },
    {
      question: `Does ${seoData.h1} support both US and India workflows?`,
      answer: `Yes. Copy blocks, metrics, or documents seamlessly between US-based monetization tasks and Indian exam/government submissions without changing tools.`
    },
    {
      question: `Can I access ${seoData.h1} on mobile devices?`,
      answer: `Absolutely. The UI is touch-friendly and optimized for tablets and phones, so reviewers and students can make quick edits from anywhere.`
    }
  ];

  for (const faq of generatedFaqs) {
    if (deduped.length >= 4) {
      break;
    }
    const key = faq.question.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      deduped.push(faq);
    }
  }

  return deduped;
};

const buildWorkflowPairings = (relatedIds: string[]): { id: string; name: string; summary: string }[] => {
  return relatedIds
    .map(id => {
      const relatedSEO = getToolSEO(id);
      if (!relatedSEO) {
        return null;
      }
      return {
        id,
        name: relatedSEO.h1.replace(/^Free\s+/i, ''),
        summary: relatedSEO.description
      };
    })
    .filter((entry): entry is { id: string; name: string; summary: string } => Boolean(entry));
};

const buildTrustNarrative = (seoData: ToolSEO): string[] => {
  const markets = marketTargets.map(target => target.regionName).join(' & ');
  return [
    `${seoData.h1} operates 100% client-side, so even regulated content from US healthcare teams or Indian government tenders stays on-device.`,
    `We never log inputs or store generated results, giving you unlimited retries without creating accounts or sharing email addresses.`,
    `Performance budgets keep Core Web Vitals in the green, which improves rankings for audiences in ${markets}.`
  ];
};
