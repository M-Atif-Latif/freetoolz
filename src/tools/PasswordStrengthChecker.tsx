import { useState } from 'react';
import { Shield, Check, X } from 'lucide-react';

export default function PasswordStrengthChecker() {
  const [password, setPassword] = useState('');

  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length;
  const strength = score <= 2 ? 'Weak' : score <= 4 ? 'Medium' : 'Strong';
  const strengthColor = score <= 2 ? 'red' : score <= 4 ? 'yellow' : 'green';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <Shield className="h-16 w-16 mx-auto text-blue-500 mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Password Strength Checker</h1>
        <p className="text-gray-600 text-lg">Check how strong your password is</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password to test..."
          className="w-full px-4 py-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none text-lg mb-6 font-mono"
        />

        {password && (
          <>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Strength</span>
                <span className={`text-sm font-bold text-${strengthColor}-600`}>{strength}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className={`h-4 rounded-full transition-all bg-${strengthColor}-500`}
                  style={{ width: `${(score / 5) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className={`flex items-center space-x-3 p-3 rounded-lg ${checks.length ? 'bg-green-50' : 'bg-red-50'}`}>
                {checks.length ? (
                  <Check className="h-5 w-5 text-green-600" />
                ) : (
                  <X className="h-5 w-5 text-red-600" />
                )}
                <span className={checks.length ? 'text-green-700' : 'text-red-700'}>
                  At least 8 characters
                </span>
              </div>

              <div className={`flex items-center space-x-3 p-3 rounded-lg ${checks.uppercase ? 'bg-green-50' : 'bg-red-50'}`}>
                {checks.uppercase ? (
                  <Check className="h-5 w-5 text-green-600" />
                ) : (
                  <X className="h-5 w-5 text-red-600" />
                )}
                <span className={checks.uppercase ? 'text-green-700' : 'text-red-700'}>
                  Contains uppercase letter
                </span>
              </div>

              <div className={`flex items-center space-x-3 p-3 rounded-lg ${checks.lowercase ? 'bg-green-50' : 'bg-red-50'}`}>
                {checks.lowercase ? (
                  <Check className="h-5 w-5 text-green-600" />
                ) : (
                  <X className="h-5 w-5 text-red-600" />
                )}
                <span className={checks.lowercase ? 'text-green-700' : 'text-red-700'}>
                  Contains lowercase letter
                </span>
              </div>

              <div className={`flex items-center space-x-3 p-3 rounded-lg ${checks.number ? 'bg-green-50' : 'bg-red-50'}`}>
                {checks.number ? (
                  <Check className="h-5 w-5 text-green-600" />
                ) : (
                  <X className="h-5 w-5 text-red-600" />
                )}
                <span className={checks.number ? 'text-green-700' : 'text-red-700'}>
                  Contains number
                </span>
              </div>

              <div className={`flex items-center space-x-3 p-3 rounded-lg ${checks.special ? 'bg-green-50' : 'bg-red-50'}`}>
                {checks.special ? (
                  <Check className="h-5 w-5 text-green-600" />
                ) : (
                  <X className="h-5 w-5 text-red-600" />
                )}
                <span className={checks.special ? 'text-green-700' : 'text-red-700'}>
                  Contains special character
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
