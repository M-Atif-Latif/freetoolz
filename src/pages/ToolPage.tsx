import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Tool, categories, toolMasterList } from '../data/tools';
import { ReactNode, useEffect } from 'react';
import ShareButton from '../components/ShareButton';
import { useRecentTools } from '../hooks/useRecentTools';
import { useTrending } from '../hooks/useTrending';

interface Props {
  tool: Tool;
  children?: ReactNode;
}

const cleanUseCasePrefix = (text: string): string =>
  text.replace(/^Use Case:\s*/i, '').trim();

const ensureSentence = (text: string): string =>
  /[.!?]$/.test(text) ? text : `${text}.`;

export default function ToolPage({ tool, children }: Props) {
  const { addRecent } = useRecentTools();
  const { trackToolUsage } = useTrending();
  
  // Track tool visit in recent tools and trending
  useEffect(() => {
    addRecent(tool.id, tool.name);
    trackToolUsage(tool.id, tool.name);
  }, [tool.id, tool.name, addRecent, trackToolUsage]);

  const canonicalPath = tool.slug ?? tool.id;
  const canonicalUrl = `https://freetoolz.cloud/${canonicalPath}`;
  const title = tool.metaTitle ?? `${tool.name} | Free Toolz`;
  const description = tool.metaDescription ?? cleanUseCasePrefix(tool.description);
  const categoryLabel = categories.find((category) => category.id === tool.category)?.name ?? 'Tools';
  const relatedTools = toolMasterList
    .filter(
      (candidate) =>
        candidate.id !== tool.id &&
        candidate.category === tool.category &&
        candidate.indexable !== false
    )
    .slice(0, 6);
  const useCaseDescription = ensureSentence(cleanUseCasePrefix(tool.description));

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
      </Helmet>

      <nav className="container-responsive pt-5 text-sm text-gray-600 dark:text-gray-400" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li>
            <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Home</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link to="/sitemap" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Tools</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-gray-800 dark:text-gray-200 font-medium truncate">{tool.name}</li>
        </ol>
      </nav>

      {children ?? (
        <main className="container-responsive py-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">{tool.name}</h1>
          <p className="mt-3 text-base sm:text-lg text-gray-600 dark:text-gray-300">{description}</p>
        </main>
      )}

      <section className="container-responsive py-8 md:py-10">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur p-6 md:p-8 shadow-sm">
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              About {tool.name}
            </h2>
            <ShareButton
              title={`Check out ${tool.name} - Free Tool`}
              description={description}
              url={`https://freetoolz.cloud/${canonicalPath}`}
              toolName={tool.name}
            />
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {useCaseDescription} This free {categoryLabel.toLowerCase()} utility runs directly in your browser so you can get instant results without account signup.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Why use this tool</h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 list-disc pl-5">
                <li>Instant browser-based processing with no software installation.</li>
                <li>Optimized workflow for fast results on desktop and mobile.</li>
                <li>Privacy-focused usage for everyday professional tasks.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Best for</h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 list-disc pl-5">
                <li>Students and freelancers working on quick tasks.</li>
                <li>Teams needing a reliable online {categoryLabel.toLowerCase()} workflow.</li>
                <li>Creators and developers who need clean outputs fast.</li>
              </ul>
            </div>
          </div>

          {relatedTools.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Related {categoryLabel}</h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {relatedTools.map((relatedTool) => (
                  <Link
                    key={relatedTool.id}
                    to={`/${relatedTool.slug ?? relatedTool.id}`}
                    className="rounded-xl border border-gray-200 dark:border-gray-700 p-3 hover:border-primary-400 dark:hover:border-primary-500 hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-all"
                  >
                    <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{relatedTool.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{cleanUseCasePrefix(relatedTool.description)}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}


