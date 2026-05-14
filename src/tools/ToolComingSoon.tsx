interface ToolComingSoonProps {
  toolName: string;
  summary: string;
}

export default function ToolComingSoon({ toolName, summary }: ToolComingSoonProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-4">
            <h1 className="text-2xl md:text-3xl font-bold text-white">{toolName}</h1>
          </div>

          <div className="p-8">
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">{summary}</p>

            <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-5">
              <h2 className="text-lg font-semibold text-amber-800 dark:text-amber-300 mb-2">Coming Soon</h2>
              <p className="text-amber-700 dark:text-amber-200">
                This tool page is currently being finalized. Please check back soon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
