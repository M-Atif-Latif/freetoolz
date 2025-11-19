import { useState } from 'react';

export default function TimeZoneConverter() {
  const [time, setTime] = useState('12:00');
  const [fromZone, setFromZone] = useState('UTC');
  const [toZone, setToZone] = useState('America/New_York');

  const zones = [
    'UTC',
    'America/New_York',
    'America/Los_Angeles',
    'America/Chicago',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Australia/Sydney',
  ];

  const convertTime = () => {
    try {
      const date = new Date(`2024-01-01T${time}:00`);
      return date.toLocaleTimeString('en-US', { timeZone: toZone, hour: '2-digit', minute: '2-digit' });
    } catch {
      return 'Invalid';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Time Zone Converter</h1>
      <p className="text-gray-600 text-lg mb-6">Convert times between time zones</p>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
            <select
              value={fromZone}
              onChange={(e) => setFromZone(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
            >
              {zones.map(zone => <option key={zone} value={zone}>{zone}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <select
              value={toZone}
              onChange={(e) => setToZone(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
            >
              {zones.map(zone => <option key={zone} value={zone}>{zone}</option>)}
            </select>
          </div>
        </div>
        <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-gray-100 rounded-xl">
          <div className="text-sm text-gray-600 mb-2">Converted Time</div>
          <div className="text-5xl font-bold text-blue-600">{convertTime()}</div>
        </div>
      </div>
    </div>
  );
}
