import { useEffect } from 'react';
import { updateMetaTags, generateToolStructuredData, generateHowToStructuredData, generateFAQStructuredData, generateBreadcrumbs } from '../utils/seo';
import { getToolSEO } from '../data/toolSEO';

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

    // Update meta tags
    updateMetaTags({
      title: seoData.title,
      description: seoData.description,
      keywords: seoData.keywords.join(', '),
      ogTitle: seoData.title,
      ogDescription: seoData.description,
      ogUrl: seoData.canonicalUrl,
      ogImage: `https://freetoolz.cloud/og-images/${toolId}.png`,
      canonical: seoData.canonicalUrl,
      twitterCard: 'summary_large_image',
    });

    // Generate WebApplication structured data
    generateToolStructuredData({
      name: seoData.h1,
      description: seoData.description,
      url: seoData.canonicalUrl,
      applicationCategory: seoData.schema.applicationCategory,
      operatingSystem: 'Any',
      offers: {
        price: seoData.schema.offers.price,
        priceCurrency: seoData.schema.offers.priceCurrency,
      },
      author: {
        name: 'FreeToolz',
        url: 'https://freetoolz.cloud',
      },
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
      { name: 'Home', url: 'https://freetoolz.cloud/' },
      { name: 'Tools', url: 'https://freetoolz.cloud/#tools' },
      ...(category ? [{ name: category, url: `https://freetoolz.cloud/#${category}` }] : []),
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

  return (
    <div className="mt-12 max-w-4xl mx-auto px-4 space-y-8 text-gray-700 dark:text-gray-300">
      {/* Introduction */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {seoData.h2[0]}
        </h2>
        <p className="text-lg leading-relaxed">{seoData.content.intro}</p>
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
      {seoData.content.faqs && seoData.content.faqs.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            {seoData.h2.find(h => h.includes('FAQ') || h.includes('Questions')) || 'Frequently Asked Questions'}
          </h2>
          <div className="space-y-6">
            {seoData.content.faqs.map((faq, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  {faq.question}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Tools */}
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
            <div className="text-sm text-gray-600 dark:text-gray-400">Secure & Private</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">∞</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Unlimited Usage</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SEOWrapper;
