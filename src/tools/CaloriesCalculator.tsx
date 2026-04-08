import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import HowItWorks from '../components/HowItWorks';
import CopyButton from '../components/CopyButton';

export default function CaloriesCalculator() {
  const howItWorks = [
    { title: 'Enter Personal Details', description: 'Provide your age, weight, height, and gender' },
    { title: 'Select Activity Level', description: 'Choose your typical daily activity level' },
    { title: 'Pick Your Goal', description: 'Select maintenance, weight loss, or gain' },
    { title: 'View Calorie Needs', description: 'Get daily calorie recommendations instantly' }
  ];

  const [age, setAge] = useState('30');
  const [weight, setWeight] = useState('75');
  const [height, setHeight] = useState('180');
  const [gender, setGender] = useState('male');
  const [activity, setActivity] = useState('moderate');
  const [goal, setGoal] = useState('maintenance');

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  };

  const calculateBMR = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);

    if (gender === 'male') {
      return 88.362 + 13.397 * w + 4.799 * h - 5.677 * a;
    } else {
      return 447.593 + 9.247 * w + 3.098 * h - 4.33 * a;
    }
  };

  const bmr = calculateBMR();
  const tdee = bmr * activityMultipliers[activity as keyof typeof activityMultipliers];

  let calorieGoal = tdee;
  if (goal === 'loss') calorieGoal = tdee - 500;
  if (goal === 'gain') calorieGoal = tdee + 500;

  const reset = () => {
    setAge('30');
    setWeight('75');
    setHeight('180');
    setGender('male');
    setActivity('moderate');
    setGoal('maintenance');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Calories Calculator</h1>
      <p className="text-gray-600 text-lg mb-8">Estimate your daily calorie needs</p>

      <HowItWorks steps={howItWorks} />

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-6">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age (years)</label>
            <input
              type="number"
              min="10"
              max="120"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
            <input
              type="number"
              min="20"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
            <input
              type="number"
              min="100"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
            >
              <option value="sedentary">Sedentary (little exercise)</option>
              <option value="light">Light (1-3 days/week)</option>
              <option value="moderate">Moderate (3-5 days/week)</option>
              <option value="active">Active (6-7 days/week)</option>
              <option value="veryActive">Very Active (intense training)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Goal</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
            >
              <option value="maintenance">Maintenance</option>
              <option value="loss">Weight Loss (-500 cal)</option>
              <option value="gain">Weight Gain (+500 cal)</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200 text-center">
            <div className="text-sm text-gray-600 mb-1">BMR</div>
            <div className="text-3xl font-bold text-yellow-600">{Math.round(bmr)}</div>
            <div className="text-xs text-gray-500 mt-1">kcal/day</div>
          </div>
          <div className="p-6 bg-blue-50 rounded-lg border border-blue-200 text-center">
            <div className="text-sm text-gray-600 mb-1">TDEE</div>
            <div className="text-3xl font-bold text-blue-600">{Math.round(tdee)}</div>
            <div className="text-xs text-gray-500 mt-1">kcal/day</div>
          </div>
          <div className="p-6 bg-green-50 rounded-lg border border-green-200 text-center">
            <div className="text-sm text-gray-600 mb-1">Goal</div>
            <div className="text-3xl font-bold text-green-600">{Math.round(calorieGoal)}</div>
            <div className="text-xs text-gray-500 mt-1">kcal/day</div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={reset}
            className="flex-1 px-6 py-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold flex items-center justify-center gap-2"
          >
            <RotateCcw className="h-5 w-5" /> Reset
          </button>
          <CopyButton text={`BMR: ${Math.round(bmr)} kcal, TDEE: ${Math.round(tdee)} kcal, Goal: ${Math.round(calorieGoal)} kcal`} />
        </div>
      </div>
    </div>
  );
}
