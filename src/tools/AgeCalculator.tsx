import { useState } from 'react';

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalWeeks: number;
    totalMonths: number;
    nextBirthday: string;
  } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    let nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < today) {
      nextBirthday = new Date(today.getFullYear() + 1, birth.getMonth(), birth.getDate());
    }
    const daysToNext = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    setResult({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      nextBirthday: `${daysToNext} days`
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Age Calculator</h1>
        <p className="text-gray-600 text-lg">
          Calculate your exact age in years, months, days, and more
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
          />
        </div>

        <button
          onClick={calculateAge}
          disabled={!birthDate}
          className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Calculate Age
        </button>

        {result && (
          <div className="mt-8 space-y-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-gray-100 rounded-xl">
              <div className="text-5xl font-bold text-gray-900 mb-2">
                {result.years}
              </div>
              <div className="text-lg text-gray-600">
                Years, {result.months} Months, {result.days} Days
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-600">{result.totalMonths.toLocaleString()}</div>
                <div className="text-gray-700">Total Months</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-600">{result.totalWeeks.toLocaleString()}</div>
                <div className="text-gray-700">Total Weeks</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-2xl font-bold text-purple-600">{result.totalDays.toLocaleString()}</div>
                <div className="text-gray-700">Total Days</div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="text-2xl font-bold text-orange-600">{result.nextBirthday}</div>
                <div className="text-gray-700">Until Next Birthday</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
