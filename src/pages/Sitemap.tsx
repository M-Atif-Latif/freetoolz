import { FileText, Link as LinkIcon } from 'lucide-react';
import { categories, toolMasterList } from '../data/tools';
import { useSEO, sitemapSEO } from '../utils/useSEO';

interface SitemapLink {
  title: string;
  path: string;
  description: string;
}

const cleanDescription = (description: string): string =>
  description.replace(/^Use Case:\s*/i, '').trim();

const mainPageLinks: SitemapLink[] = [
  { title: 'Home', path: '/', description: 'Browse all free online tools' },
  { title: 'Blog', path: '/blog', description: 'Articles and guides for tools, SEO, and productivity' },
  { title: 'FAQ', path: '/faq', description: 'Frequently asked questions and support answers' },
  { title: 'About Us', path: '/about', description: 'Learn about FreeToolz and our mission' },
  { title: 'Contact', path: '/contact', description: 'Contact support and send feature requests' },
  { title: 'Sitemap', path: '/sitemap', description: 'Complete list of all pages and tools' },
];

const legalPageLinks: SitemapLink[] = [
  { title: 'Privacy Policy', path: '/privacy', description: 'How we protect your privacy and data' },
  { title: 'Terms of Service', path: '/terms', description: 'Terms and conditions for using FreeToolz' },
  { title: 'Disclaimer', path: '/disclaimer', description: 'Important legal notices and disclaimers' },
];

const dynamicToolSections = categories
  .map((category) => {
    const links = toolMasterList
      .filter((tool) => tool.category === category.id && tool.indexable !== false)
      .map((tool) => ({
        title: tool.name,
        path: `/${tool.slug ?? tool.id}`,
        description: cleanDescription(tool.metaDescription ?? tool.description),
      }));

    return {
      category: category.name,
      links,
    };
  })
  .filter((section) => section.links.length > 0);

const sitemapLinks: { category: string; links: SitemapLink[] }[] = [
  { category: 'Main Pages', links: mainPageLinks },
  { category: 'Legal Pages', links: legalPageLinks },
  ...dynamicToolSections,
];

interface SitemapProps {
  onNavigate: (path: string) => void;
}

export default function Sitemap({ onNavigate }: SitemapProps) {
  useSEO(sitemapSEO);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
            <FileText className="h-8 w-8 text-primary-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Sitemap
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Browse all pages and tools available on Free Tools
          </p>
        </div>

        <div className="space-y-12">
          {sitemapLinks.map((section, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <LinkIcon className="h-6 w-6 text-primary-600 mr-3" />
                {section.category}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.links.map((link, linkIdx) => (
                  <button
                    key={linkIdx}
                    onClick={() => onNavigate(link.path)}
                    className="text-left p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all group"
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-1">
                      {link.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{link.description}</p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

