interface HowItWorksStep {
  title: string;
  description: string;
}

interface HowItWorksProps {
  steps: HowItWorksStep[];
}

export default function HowItWorks({ steps }: HowItWorksProps) {
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-800 p-6 my-8">
      <div className="flex items-start gap-3 mb-4">
        <span className="text-2xl">💡</span>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">How it works:</h3>
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{step.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
