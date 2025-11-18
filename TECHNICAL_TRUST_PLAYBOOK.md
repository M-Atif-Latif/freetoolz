# Technical Trust Playbook

This checklist keeps FreeToolz credible for both Google and users across the US and India. Follow it every release cycle.

## 1. Core Web Vitals Guardrails

| Metric | Budget | How to Verify |
| --- | --- | --- |
| LCP | ≤ 2.5 s on 4G | `npm run build` → `npm run preview` → run Lighthouse in Chrome DevTools (Mobile/Throttled) |
| INP | ≤ 200 ms | Trace interaction latency with the Performance panel; hydrate heavy tools lazily |
| CLS | ≤ 0.1 | Audit layout shifts after suspense boundaries resolve |
| TTFB | ≤ 0.6 s | Monitor edge cache status via hosting provider logs |

**Daily workflow**
1. `npm run build`
2. `npm run preview`
3. Run Lighthouse (mobile + desktop) on: `/`, `/tools/word-counter`, `/tools/compress-pdf`, `/tools/regex-tester`.
4. Log scores in Notion; regress if any metric > budget.
5. Ship only if lab scores are green and bundle size diffs look safe (`npm run build -- --report`).

## 2. Sitemap & Robots Integrity

- `scripts/generateSiteFiles.ts` now regenerates `sitemap.xml` and `robots.txt` with every `npm run build` (thanks to the `postbuild` hook).
- Run locally whenever tool paths change:

```powershell
npm run generate:site-files
```

- Verify `robots.txt` keeps AI crawlers (GPTBot, Google-Extended, PerplexityBot, Claude-Web) allowed and still blocks `/api`.
- Spot check `sitemap.xml` (should list 127+ URLs with today’s `lastmod`).
- Re-upload both files via the hosting provider or CI artifact after each deploy.

## 3. Google Search Console Geo Targeting

1. Create/verify **Domain property** `freetoolz.com`.
2. Add two **URL-prefix properties**:
   - `https://freetoolz.com/` (United States focus).
   - `https://freetoolz.com/?market=in` (or a folder filter like `/in/` if you spin up localized URLs).
3. In each property, open *Legacy Tools → International Targeting* and set:
   - United States for the US property.
   - India for the India property.
4. Upload the latest `sitemap.xml` to both properties.
5. Use *URL Inspection* on the top 5 tools per market after every major release.
6. Monitor *Page Experience* and *Core Web Vitals* dashboards weekly; export issues into Jira if any metric drops.

## 4. Change Management Checklist

- [ ] PR includes `npm run typecheck` and Lighthouse screenshots.
- [ ] `npm run build` auto-updates sitemap/robots; artifacts attached to release ticket.
- [ ] Deployment note records which Search Console properties were resubmitted.
- [ ] New tools link to at least two existing spokes (internal links) before go-live.

Keep this file updated whenever deployment tooling changes so that anyone on the team can re-run the trust checklist without tribal knowledge.
