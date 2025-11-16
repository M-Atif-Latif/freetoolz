import { HelpCircle } from 'lucide-react';
import { getToolSeoEntry } from '../data/seo/toolSeoConfig';

interface ToolFAQSectionProps {
  toolId: string;
  heading?: string;
  className?: string;
}

export default function ToolFAQSection({ toolId, heading = 'Frequently asked questions', className = '' }: ToolFAQSectionProps) {
  const entry = getToolSeoEntry(toolId);
  const faqs = entry?.faqs ?? [];

  if (!faqs.length) {
    return null;
  }

  return (
    <section className={`mt-16 ${className}`} aria-labelledby={`faq-${toolId}`}>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 lg:p-8 backdrop-blur">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Need quick answers?</p>
            <h3 id={`faq-${toolId}`} className="mt-2 text-2xl font-semibold text-white flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-sky-300" />
              {heading}
            </h3>
            <p className="text-sm text-slate-300 max-w-2xl">
              Pulled from real support prompts and search queries so users (and AI assistants) get instant clarity.
            </p>
          </div>
        </div>
        <div className="mt-8 space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-left text-white/90"
            >
              <summary className="cursor-pointer list-none text-base font-semibold text-white">
                {faq.question}
              </summary>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
