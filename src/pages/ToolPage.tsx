import { Helmet } from 'react-helmet-async';
import { Tool } from '../data/tools';
import { ReactNode } from 'react';

interface Props {
  tool: Tool;
  children?: ReactNode;
}

export default function ToolPage({ tool, children }: Props) {
  const canonicalPath = tool.slug ?? tool.id;
  const canonicalUrl = `https://freetoolz.cloud/${canonicalPath}`;
  const title = tool.metaTitle ?? `${tool.name} | Free Toolz`;
  const description = tool.metaDescription ?? tool.description;

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

      {children ?? (
        <main className="container-responsive py-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{tool.name}</h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300">{tool.description}</p>
        </main>
      )}
    </>
  );
}
