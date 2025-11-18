import { MarketTarget } from '../types';

const META_FLAG = 'data-market-meta';

const normalizeHref = (href: string): string => {
  try {
    return new URL(href).href;
  } catch (error) {
    console.warn('Unable to normalize canonical URL for market meta', error);
    return href;
  }
};

const injectNode = (node: HTMLElement): void => {
  node.setAttribute(META_FLAG, 'true');
  document.head.appendChild(node);
};

export const applyMarketTargetMeta = (targets: MarketTarget[], canonicalHref: string): void => {
  if (typeof document === 'undefined') {
    return;
  }

  document.head.querySelectorAll(`[${META_FLAG}]`).forEach(node => node.remove());

  const normalized = normalizeHref(canonicalHref);

  const xDefault = document.createElement('link');
  xDefault.rel = 'alternate';
  xDefault.hreflang = 'x-default';
  xDefault.href = normalized;
  injectNode(xDefault);

  const distribution = document.createElement('meta');
  distribution.name = 'distribution';
  distribution.content = 'global';
  injectNode(distribution);

  targets.forEach(target => {
    const alt = document.createElement('link');
    alt.rel = 'alternate';
    alt.hreflang = target.hreflang;
    alt.href = normalized;
    injectNode(alt);

    const locale = document.createElement('meta');
    locale.setAttribute('property', 'og:locale:alternate');
    locale.content = target.ogLocale;
    injectNode(locale);

    const region = document.createElement('meta');
    region.name = 'geo.region';
    region.content = target.countryCode;
    injectNode(region);

    const place = document.createElement('meta');
    place.name = 'geo.placename';
    place.content = target.regionName;
    injectNode(place);
  });
};
