import { lazy, Suspense, type LazyExoticComponent } from 'react';
import type { LucideIcon, LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

const iconCache = new Map<string, LazyExoticComponent<LucideIcon>>();
const loaders = dynamicIconImports as Record<string, () => Promise<{ default: LucideIcon }>>;

const fallbackClasses = 'text-blue-600 dark:text-blue-400';

type IconProps = Omit<LucideProps, 'ref'>;

const InlineFallback = ({ className, ...rest }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className ?? fallbackClasses}
    aria-hidden="true"
    {...rest}
  >
    <path d="M12 2L3 14l9 8 9-8-9-12z" />
    <path d="M12 22V13" />
    <path d="M7 12l5 5 5-5" />
  </svg>
);

function toKebabCase(name: string) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

function getLazyIcon(name: string) {
  if (iconCache.has(name)) {
    return iconCache.get(name)!;
  }

  const key = toKebabCase(name);
  const loader = loaders[key];

  if (!loader) {
    return null;
  }

  const LazyIcon = lazy(loader);
  iconCache.set(name, LazyIcon);
  return LazyIcon;
}

interface DynamicIconProps extends IconProps {
  name: string;
}

export default function DynamicIcon({ name, className, ...rest }: DynamicIconProps) {
  const IconComponent = getLazyIcon(name);

  if (!IconComponent) {
    return <InlineFallback className={className} {...rest} />;
  }

  return (
    <Suspense fallback={<InlineFallback className={className} {...rest} />}>
      <IconComponent className={className} {...rest} />
    </Suspense>
  );
}
