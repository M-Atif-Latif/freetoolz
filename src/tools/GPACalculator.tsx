import { useState } from 'react';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import ToolNavigation from '../components/ToolNavigation';

interface Course {
  id: number;
  name: string;
  credits: number;
  grade: string;
}

const gradePoints: { [key: string]: number } = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'D-': 0.7,
  'F': 0.0
};

export default function GPACalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: '', credits: 3, grade: 'A' }
  ]);

  const addCourse = () => {
    setCourses([...courses, { id: Date.now(), name: '', credits: 3, grade: 'A' }]);
  };

  const removeCourse = (id: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  const updateCourse = (id: number, field: keyof Course, value: string | number) => {
    setCourses(courses.map(course =>
      course.id === id ? { ...course, [field]: value } : course
    ));
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      if (course.credits > 0 && course.grade) {
        totalPoints += gradePoints[course.grade] * course.credits;
        totalCredits += course.credits;
      }
    });

    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  };

  const gpa = calculateGPA();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-gray-100 dark:border-gray-700 p-8">
        <ToolNavigation />
        
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">GPA Calculator</h1>
            <p className="text-gray-600 dark:text-gray-400">Calculate your Grade Point Average</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {courses.map((course, index) => (
            <div key={course.id} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border-2 border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Course {index + 1}</h3>
                {courses.length > 1 && (
                  <button
                    onClick={() => removeCourse(course.id)}
                    className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Course Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                    placeholder="e.g., Calculus I"
                    className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Credits
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={course.credits}
                    onChange={(e) => updateCourse(course.id, 'credits', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Grade
                  </label>
                  <select
                    value={course.grade}
                    onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    {Object.keys(gradePoints).map(grade => (
                      <option key={grade} value={grade}>{grade} ({gradePoints[grade].toFixed(1)})</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addCourse}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Course</span>
        </button>

        <div className="mt-8 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-8 border-2 border-green-200 dark:border-green-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Your GPA</h2>
          <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
            {gpa}
          </div>
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Total Credits: {courses.reduce((sum, c) => sum + (c.credits || 0), 0).toFixed(1)}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {parseFloat(gpa) >= 3.7 && (
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                Dean's List
              </span>
            )}
            {parseFloat(gpa) >= 3.5 && (
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                Honors
              </span>
            )}
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📚 GPA Scale:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-700 dark:text-gray-300">
            <div>A (4.0): Excellent</div>
            <div>B (3.0): Good</div>
            <div>C (2.0): Average</div>
            <div>D (1.0): Below Average</div>
          </div>
        </div>
      </div>
    </div>
  );
}
