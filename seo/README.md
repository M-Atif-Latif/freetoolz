# FreeToolz SEO + AEO Blueprint

This folder contains machine-generated metadata, structured content, and schema-ready assets for every tool inside FreeToolz.cloud. Use it as the central source of truth when updating page copy, rich results, and conversational answer snippets.

## Files

- `tool-seo-blueprint.json` – One entry per tool (currently 106) with:
  - Titles, meta descriptions, H1/H2 scaffolding
  - 5-paragraph long-form copy blocks
  - Feature lists, use cases, step-by-step guidance
  - Keyword clusters (primary/secondary/LSI)
  - People Also Ask prompts + answers
  - FAQ packs (6 Q&A each)
  - CTA strings and multiple answer formats (direct/snippet/conversational/voice)
  - Suggested internal links and hero image alt text
  - JSON-LD payloads (`SoftwareApplication`, `FAQPage`) and rating seeds

## Workflow

1. **Generate / Refresh data**

   ```powershell
   cd c:\Users\dell\Downloads\freetoolz\project
   node scripts\generate-seo-data.js
   ```

   This scans `src/tools/*.tsx`, infers categories + intents, and rewrites the blueprint.

2. **Ingest into CMS/build**
   - Create a small adapter (or use your existing data layer) to pull the relevant entry for each tool URL at build time.
   - Map fields to your React components:
     - Titles/meta → `vite.config.ts` / per-route head manager
     - Headings + paragraphs → markdown/MDX slots under the hero
     - FAQ + schema → inject `<script type="application/ld+json">`
     - Answer snippets → store in `data/answers.ts` for Chat/voice surfaces

3. **Content review loop**
   - Prioritize top 20% traffic tools first for human editing.
   - Track status with a sheet referencing `tool-seo-blueprint.json` IDs.
   - Update the JSON as edits finalize to keep a single canonical dataset.

## Next Steps

- Wire this blueprint into your build step (e.g., load JSON, hydrate props for each tool page).
- Extend the generator with analytics data (search volumes, difficulty) once available.
- When adding new tools, just drop a `.tsx` file in `src/tools`, rerun the script, and the blueprint stays in sync.
