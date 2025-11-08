import { useState } from 'react';
import { Globe, Clock } from 'lucide-react';

export default function WorkingHoursTimezoneConverter() {
  const [time, setTime] = useState('09:00');
  const [fromTimezone, setFromTimezone] = useState('America/New_York');
  const [results, setResults] = useState<{ timezone: string; time: string; isWorkingHours: boolean }[]>([]);

  const timezones = [
    { value: 'America/New_York', label: 'New York (EST/EDT)', offset: -5 },
    { value: 'America/Los_Angeles', label: 'Los Angeles (PST/PDT)', offset: -8 },
    { value: 'America/Chicago', label: 'Chicago (CST/CDT)', offset: -6 },
    { value: 'Europe/London', label: 'London (GMT/BST)', offset: 0 },
    { value: 'Europe/Paris', label: 'Paris (CET/CEST)', offset: 1 },
    { value: 'Asia/Tokyo', label: 'Tokyo (JST)', offset: 9 },
    { value: 'Asia/Dubai', label: 'Dubai (GST)', offset: 4 },
    { value: 'Asia/Singapore', label: 'Singapore (SGT)', offset: 8 },
    { value: 'Australia/Sydney', label: 'Sydney (AEDT/AEST)', offset: 10 },
    { value: 'Pacific/Auckland', label: 'Auckland (NZDT/NZST)', offset: 12 },
  ];

  const isWorkingHours = (hour: number): boolean => {
    return hour >= 9 && hour < 17; // 9 AM to 5 PM
  };

  const convert = () => {
    const [hours, minutes] = time.split(':').map(Number);
    const fromOffset = timezones.find((tz) => tz.value === fromTimezone)?.offset || 0;

    const converted = timezones.map((tz) => {
      const offsetDiff = tz.offset - fromOffset;
      let newHour = hours + offsetDiff;
      
      // Handle day rollover
      if (newHour < 0) newHour += 24;
      if (newHour >= 24) newHour -= 24;

      const timeString = `${String(newHour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
      
      return {
        timezone: tz.label,
        time: timeString,
        isWorkingHours: isWorkingHours(newHour),
      };
    });

    setResults(converted);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl mb-4 shadow-lg">
            <Globe className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Working Hours Timezone Converter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Convert working hours across global timezones for team collaboration
          </p>
        </div>

        {/* Input */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-cyan-500 to-teal-600 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Set Your Time</h2>
          </div>
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Your Time
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-2xl font-bold text-center"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Your Timezone
                </label>
                <select
                  value={fromTimezone}
                  onChange={(e) => setFromTimezone(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {timezones.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={convert}
              className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center justify-center"
            >
              <Clock className="h-5 w-5 mr-2" />
              Convert to All Timezones
            </button>
          </div>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Time Across Timezones</h2>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-4">
                {results.map((result, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border-2 ${
                      result.isWorkingHours
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                        : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {result.timezone}
                      </div>
                      {result.isWorkingHours ? (
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-400 text-xs font-bold rounded">
                          Working Hours
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs font-bold rounded">
                          Off Hours
                        </span>
                      )}
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {result.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">💼 Working Hours</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li>• Working hours are considered 9:00 AM - 5:00 PM (09:00 - 17:00)</li>
            <li>• Green highlights indicate standard business hours</li>
            <li>• Perfect for scheduling international meetings</li>
            <li>• Helps find overlap for global team collaboration</li>
            <li>• Note: This uses simplified timezone offsets (DST may vary)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
